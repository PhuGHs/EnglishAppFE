import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Keyboard, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faHeadphones,
    faMicrophone,
    faMicrophoneSlash,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import Accordion from '@component/Accordion';
import Modal from 'react-native-modal';
import User from '@component/User';
import EngComUser from '@component/EngComUser';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoomDetailsScreenProps, RootStackParamList } from '@type/index';
import { RouteProp } from '@react-navigation/native';
import { UserContext } from '@root/context/user-context';
import { LearningRoomApi } from '@root/api/learningroom.api';
import { TEnglishTopicQuestionDto, TLearningRoomMessage, TLearningRoomMessagePostDto, TParticipantDto, TPostMessage, TSearch } from '@type/T-type';
import { TopicApi } from '@root/api/topic.api';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useToast } from '@root/context/toast-context';
import {
    ArrowLeftStartOnRectangleIcon,
    ChatBubbleLeftRightIcon,
    UserPlusIcon,
    UsersIcon,
} from 'react-native-heroicons/solid';
import UserList from '@component/UserList';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import SearchBar from 'react-native-dynamic-search-bar';
import SearchItem from '@component/SearchItem';
import { UserApi } from '@root/api/user.api';
import { ChatApi } from '@root/api/chat.api';
import { useInput } from '@hook/useInput';
import LearningRoomMessage from '@component/LearningRoomMessage';
import { FlatList as FL } from 'react-native-gesture-handler';

const getParticpantId = (participants: TParticipantDto[], user_id: number) => {
    let participant;
    participants.forEach((item, index) => {
        if (item.user.user_id === user_id) {
            participant = item;
            return;
        }
    });
    return participant;
};

const RoomDetails = ({
    route,
    navigation,
}: RoomDetailsScreenProps & { route: RouteProp<RootStackParamList, 'RoomDetails'> }) => {
    const { user } = useContext(UserContext);
    const { showToast } = useToast();
    const { user_id, profile_picture } = user.user;
    const { room } = route.params;
    const { participants, id, is_private } = room;

    const [questions, setQuestions] = useState<TEnglishTopicQuestionDto[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [spinVisibility, setSpinVisibility] = useState<boolean>(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [userListVisible, setUserListVisible] = useState(false);
    const [people, setPeople] = useState<TParticipantDto[]>(participants);
    const [currentParticipant, setCurrentParticipant] = useState<TParticipantDto>(
        getParticpantId(people, user_id)
    );
    const [stompClient, setStompClient] = useState(null);
    const [users, setUsers] = useState<TSearch[]>([]);
    const [messages, setMessages] = useState<TLearningRoomMessage[]>([]);
    const [text, setText] = useState<string>('');
    
    const bottomSheetModalRef = useRef(null);
    const inviteModalRef = useRef(null);
    const snapPoints = useMemo(() => ['50%', '95%'], []);

    const {
        value: content,
        handleInputChange: handleContentChange,
        handleInputBlur: handleContentBlur,
        setEnteredValue: setContent,
        hasError: contentHasError,
        didEdit: contentDidEdit,
    } = useInput({ defaultValue: '', validationFn: (value) => value !== '' });

    const handleSearch = async (text) => {
        try {
            const data: TSearch[] = await UserApi.searchUsers(text, user_id);
            if (data) {
                setUsers(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleTextChange = (text) => {
        setText(text);
        setSpinVisibility(true);
        handleSearch(text);
    };

    const handleSendMessage = async () => {
        const body: TLearningRoomMessagePostDto = {
            learning_room_id: room.id,
            message: content,
            image: '',
            user_id: user_id
        };
        try {
            const { data, message, status } = await LearningRoomApi.sendMessage(body);
            if (status === 'SUCCESS') {
                setContent('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleInviteModalPress = useCallback(() => {
        inviteModalRef.current?.present();
    }, []);

    const handleSendLink = async (user: TSearch) => {
        const roomDto = {
            sender_id: user_id,
            receiver_id: user.id,
        };
        try {
            const {
                data: conversation,
                status,
                message,
            } = await ChatApi.checkIfExist(roomDto.sender_id, roomDto.receiver_id);
            if (status === 'SUCCESS') {
                const { data } = await LearningRoomApi.getPassword(room.id);
                const body: TPostMessage = {
                    message_room_id: conversation.message_room_id,
                    sender_id: roomDto.sender_id,
                    receiver_id: roomDto.receiver_id,
                    message: 'Sent you an invitation to a learning room',
                    is_read: false,
                    invitation: `${room.id}/${data}`,
                    image: ''
                };
                const { status } = await ChatApi.sendMessage(body);
                if (status === 'SUCCESS') {
                    showToast({type: 'success', description: 'Sent invitation', timeout: 3000});
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleQuit = async () => {
        const { status } = await LearningRoomApi.leaveRoom(
            room.id,
            currentParticipant.participant_id
        );
        if (status === 'SUCCESS') {
            navigation.popToTop();
        }
    };

    const getNumberOfListeners = (): number => {
        let count = 0;
        people.forEach((item) => {
            if (!item.is_speaker) {
                count = count + 1;
            }
        });
        return count;
    };

    const handleIncomingMessage = (message) => {
        const parsedMessage = JSON.parse(message);
        const { type, data } = parsedMessage;
        if (type === 'join') {
            setPeople((prev) => [data, ...prev]);
        } else if (type === 'leave') {
            setPeople((prev) => {
                return prev.filter((item) => item.participant_id !== data.participant_id);
            });
        } else if (type === 'end') {
            showToast({ type: 'info', description: 'Room has expired', timeout: 10000 });
        } else if (type === 'toggle') {
            setPeople((prev) =>
                prev.map((item: TParticipantDto) =>
                    item.participant_id === data.participant_id
                        ? { ...item, is_speaker: data.is_speaker }
                        : item
                )
            );
        } else if (type === 'promote') {
            setPeople((prev) =>
                prev.map((item: TParticipantDto) =>
                    item.participant_id === data.participant_id
                        ? { ...item, is_owner: data.is_owner }
                        : item
                )
            );
            if (data.user.user_id === user_id) {
                setCurrentParticipant(data);
                console.log(data);
            }
        }
    };

    const handleIncomingChatMessage = (message) => {
        const parsedMessage: TLearningRoomMessage = JSON.parse(message);
        setMessages(prev => [...prev, parsedMessage]);
    };

    const handleToggleSpeaker = async () => {
        try {
            const { data } = await LearningRoomApi.toggleSpeaker(currentParticipant.participant_id);
            setCurrentParticipant(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePromote = async (id: number) => {
        try {
            await LearningRoomApi.promoteToOwner({
                participant_id: id,
                owner_id: currentParticipant.participant_id,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleKick = async (id: number) => {
        try {
            await LearningRoomApi.leaveRoom(room.id, id);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const { data: dataMessages, status: messagesStatus} = await LearningRoomApi.getMessages(room.id);
            if (messagesStatus === 'SUCCESS') {
                setMessages(dataMessages);
            }
            const { data, status } = await TopicApi.getAllQuestions(room.topic.topic_id);
            if (status === 'SUCCESS') {
                setQuestions(data);
            }
        };
        fetch();
    }, [room.id]);

    useEffect(() => {
        const client = Stomp.over(function () {
            return new SockJS('http://10.0.2.2:8080/ws');
        });
        client.reconnectDelay = 5000;
        client.connectHeaders = {};
        client.heartbeatIncoming = 4000;
        client.heartbeatOutgoing = 4000;
        client.debug = (msg) => console.log('STOMP: ', msg);

        client.connect({}, () => {
            client.subscribe(`/topic/learning-room/${id}`, (message) => {
                handleIncomingMessage(message.body);
            });
            client.subscribe(`/topic/learning-room/message/${id}`, (message) => {
                handleIncomingChatMessage(message.body);
            });
        });

        setStompClient(client);
        return () => {
            client.disconnect();
        };
    }, [id]);

    const renderContent = () => (
        <View className='flex flex-1 bg-slate-100 px-3'>
            <View className='mt-4'>
                <View className='flex flex-row mb-5 items-center justify-between'>
                    <TouchableOpacity onPress={handleQuit} className='p-2'>
                        <ArrowLeftStartOnRectangleIcon color='#f87171' size={30} />
                    </TouchableOpacity>
                    <Text className='text-center  text-sky-600 text-[22px] font-nunitoSemi'>
                        EngCom Room
                    </Text>
                    <TouchableOpacity
                        onPress={handleInviteModalPress}
                    >
                        <UserPlusIcon size={30} color='#0284c7' />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='flex flex-row justify-between mb-4'>
                <Text className='p-3 bg-[#ACE5FF] text-[#005DB2] text-base w-[45%] rounded-lg text-center font-nunitoBold'>
                    {room.topic.english_level_name}
                </Text>
                <Text className='p-3 bg-[#F2DDCC] text-[#FF6B00] text-base w-[45%] rounded-lg text-center font-nunitoBold'>
                    {room.topic.header}
                </Text>
            </View>
            <Text className='text-gray-700 font-nunitoSemi text-lg mb-4'>{room.room_name}</Text>
            <View
                className='p-3 bg-white min-h-[300px] rounded-xl mb-4'
                style={{ elevation: 10, shadowColor: 'gray' }}
            >
                <View className='flex flex-row justify-between items-center mb-4'>
                    <Text className='text-[#005DB2] font-nunitoBold text-lg'>SPEAKERS</Text>
                    <TouchableOpacity
                        onPress={() => setIsVisible(!isVisible)}
                        className='flex flex-row bg-[#E1F0FF] w-fit px-4 py-1 space-x-3 rounded-full items-center justify-center'
                    >
                        <FontAwesomeIcon icon={faHeadphones} size={25} color='#005DB2' />
                        <Text className='text-[#005DB2] text-lg font-nunitoBold'>
                            {getNumberOfListeners()}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className='flex flex-row flex-wrap p-1'>
                    <FlatList
                        horizontal={true}
                        data={people}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if (item.is_speaker) {
                                return (
                                    <EngComUser
                                        name={item.user.full_name}
                                        isCreator={item.is_owner}
                                        avatar={item.user.profile_picture}
                                        withName={true}
                                        noUser={false}
                                    />
                                );
                            }
                        }}
                    />
                    {!currentParticipant.is_speaker && (
                        <EngComUser
                            handlePress={handleToggleSpeaker}
                            noUser={true}
                            isCreator={false}
                        />
                    )}
                </View>
            </View>
            <Text className='text-xl text-gray-700 font-nunitoBold mb-4'>
                There are {questions.length} sample questions
            </Text>
        </View>
    );

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className='flex flex-1'>
                <FlatList
                    data={questions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Accordion header={item.question} content={item.sample_answer} />
                    )}
                    ListHeaderComponent={renderContent}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
                <Modal
                    isVisible={isVisible}
                    onBackButtonPress={() => setIsVisible(!isVisible)}
                    onBackdropPress={() => setIsVisible(!isVisible)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <View className='w-[100%] h-[70%] bg-white flex rounded-xl p-4 flex-col items-center'>
                        <Text className='text-xl font-nunitoSemi text-sky-700'>Listeners</Text>
                        <View className='border-t-[1px] border-gray-700 mx-10 w-full mt-4' />
                        <View className='mt-4 flex flex-col items-start w-full'>
                            <FlatList
                                data={people}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    if (!item.is_speaker) {
                                        return (
                                            <User
                                                isModerator={false}
                                                nameOnRight={true}
                                                room={true}
                                                user={item.user}
                                            />
                                        );
                                    }
                                }}
                            />
                        </View>
                    </View>
                </Modal>
                <Modal
                    isVisible={userListVisible}
                    onBackButtonPress={() => setUserListVisible(!userListVisible)}
                    onBackdropPress={() => setUserListVisible(!userListVisible)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <View className='w-[100%] h-[70%] bg-white flex rounded-xl p-4 flex-col items-center'>
                        <Text className='text-xl font-nunitoSemi text-sky-700'>Participants</Text>
                        <View className='border-t-[1px] border-gray-700 mx-10 w-full mt-4' />
                        <View className='mt-4 flex flex-col items-start w-full'>
                            <FlatList
                                data={people}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <UserList
                                            handleKick={() => handleKick(item.participant_id)}
                                            handlePromote={() => handlePromote(item.participant_id)}
                                            participant={item}
                                            currentParticipant={currentParticipant}
                                        />
                                    );
                                }}
                            />
                        </View>
                    </View>
                </Modal>
                <BottomSheetModal
                    backdropComponent={(props) => <BottomSheetBackdrop {...props} opacity={0.7} />}
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                >
                    <BottomSheetView>
                        <View className='w-full h-full bg-slate-100'>
                        <FL
                            data={messages}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => <LearningRoomMessage key={index} is_mine={item.user.user_id === user_id} item={item} />}
                        /> 
                        <View
                        className={`w-full justify-between mt-4 bg-white ${isKeyboardVisible ? 'h-[15%]' : 'h-[10%]'} border-t-[1px] flex-row border-gray-500 items-center px-2`}
                        >
                        <Image
                            className='w-[7%] border-[1px]'
                            source={{ uri: profile_picture }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                                borderWidth: 1,
                            }}
                        />
                        <TextInput
                            value={content}
                            multiline={true}
                            onChange={handleContentChange}
                            onBlur={handleContentBlur}
                            placeholder='Place your message here ...'
                            className={`px-4 text-gray-700 text-lg rounded-3xl h-[80%] font-nunitoSemi text-base bg-gray-300 ${contentHasError ? 'w-[85%]' : 'w-[75%]'}`}
                        />
                        {!contentHasError && (
                            <TouchableOpacity
                                disabled={contentHasError}
                                onPress={handleSendMessage}
                                className='w-[10%] items-center justify-center'
                            >
                                <FontAwesomeIcon icon={faPaperPlane} size={25} color='#0ea5e9' />
                            </TouchableOpacity>
                        )}
                    </View>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
                <BottomSheetModal
                    backdropComponent={(props) => <BottomSheetBackdrop {...props} opacity={0.7} />}
                    ref={inviteModalRef}
                    index={1}
                    snapPoints={snapPoints}
                >
                    <BottomSheetView>
                    <View className='h-[12%]'>
                        <SearchBar
                            style={{ height: 55 }}
                            textInputStyle={{ fontSize: 18 }}
                            className='bg-gray-200 rounded-full font-nunitoSemi'
                            placeholderTextColor='#6b7280'
                            placeholder='Search here'
                            spinnerVisibility={spinVisibility}
                            onChangeText={handleTextChange}
                        />
                    </View>
                    <View className='bg-slate-100 h-[88%] p-4'>
                {users.length > 0 ? (
                    <FlatList
                        data={users}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item, index }) => (
                            <SearchItem handleSendLink={() => handleSendLink(item)} user={item} key={index} />
                        )}
                    />
                ) : (
                    <Text className='text-center text-xl font-nunitoSemi text-gray-700'>
                        No users with the keyword found!
                    </Text>
                )}
            </View>
                    </BottomSheetView>
                </BottomSheetModal>
                <View className='w-full h-[10%] border-t-[1px] bg-white border-slate-500 justify-around flex flex-row'>
                    <TouchableOpacity
                        onPress={handlePresentModalPress}
                        className='h-[100%] w-[25%] items-center justify-center px-5'
                    >
                        <ChatBubbleLeftRightIcon size={25} color='#334155' />
                        <Text className='text-red-400 font-nunitoBold text-slate-700'>Chat</Text>
                    </TouchableOpacity>
                    {currentParticipant.is_speaker && (
                        <TouchableOpacity
                            onPress={handleToggleSpeaker}
                            className='h-[100%] w-[25%] items-center justify-center px-5'
                        >
                            <FontAwesomeIcon
                                icon={
                                    currentParticipant.is_speaker ? faMicrophoneSlash : faMicrophone
                                }
                                size={25}
                                color='#334155'
                            />
                            <Text className='text-slate-700 font-nunitoBold text-base'>Micro</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={handleToggleSpeaker}
                        className='h-[100%] w-[25%] items-center justify-center px-5'
                    >
                        <FontAwesomeIcon
                            icon={currentParticipant.is_speaker ? faHeadphones : faMicrophone}
                            size={25}
                            color='#334155'
                        />
                        <Text className='text-slate-700 font-nunitoBold text-base'>
                            {currentParticipant.is_speaker ? 'Listen' : 'Speak'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setUserListVisible(true)}
                        className='h-[100%] w-[25%] items-center justify-center px-5'
                    >
                        <UsersIcon size={25} color='#334155' />
                        <Text className='text-slate-700 font-nunitoBold text-base'>Users</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
};

export default RoomDetails;
