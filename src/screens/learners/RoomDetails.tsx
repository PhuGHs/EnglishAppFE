import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faArrowLeft,
    faHeadphones,
    faMicrophone,
    faMicrophoneSlash,
    faUserMinus,
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
import { TEnglishTopicQuestionDto, TParticipantDto } from '@type/T-type';
import { TopicApi } from '@root/api/topic.api';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useToast } from '@root/context/toast-context';
import { err } from 'react-native-svg';
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
    const { user_id } = user.user;
    const { room } = route.params;
    const { participants, id } = room;

    const [questions, setQuestions] = useState<TEnglishTopicQuestionDto[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [userListVisible, setUserListVisible] = useState(false);
    const [people, setPeople] = useState<TParticipantDto[]>(participants);
    const [currentParticipant, setCurrentParticipant] = useState<TParticipantDto>(
        getParticpantId(people, user_id)
    );
    const [stompClient, setStompClient] = useState(null);
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['50%', '90%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

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
        const fetch = async () => {
            const { data, message, status } = await TopicApi.getAllQuestions(room.topic.topic_id);
            if (status === 'SUCCESS') {
                setQuestions(data);
            }
        };
        fetch();
    }, []);

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
                    <TouchableOpacity>
                        <UserPlusIcon size={30} color='#0284c7' />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='flex flex-row justify-between mb-4'>
                <Text className='p-3 bg-[#ACE5FF] text-[#005DB2] text-base w-[45%] rounded-lg text-center font-nunitoBold'>
                    {room.topic.english_level_id}
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
                        <Text></Text>
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
