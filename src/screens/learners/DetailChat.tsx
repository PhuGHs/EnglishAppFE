import Messages from '@component/Messages';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faCameraRetro, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ChatApi } from '@root/api/chat.api';
import { useToast } from '@root/context/toast-context';
import { TMessage, TPostMessage } from '@type/T-type';
import { DetailChatScreenProps, RootStackParamList } from '@type/index';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { PaperAirplaneIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useInput } from '@hook/useInput';
import { UserContext } from '@root/context/user-context';
import { Client, Stomp } from '@stomp/stompjs';
import * as encoding from 'text-encoding';
import SockJS from 'sockjs-client';

const DetailChat = ({
    route,
    navigation,
}: DetailChatScreenProps & { route: RouteProp<RootStackParamList, 'DetailChat'> }) => {
    const { conversation } = route.params;
    const { showToast } = useToast();
    const { user } = useContext(UserContext);
    const { user_id } = user.user;
    const { full_name, profile_picture, roomId, receiver_id } = conversation;

    const [messages, setMessages] = useState<TMessage[]>([]);
    const [hasFetched, setFetched] = useState<boolean>(false);
    const [image, setImage] = useState(null);
    const [imgBase64, setImgBase64] = useState(null);
    const [sendDisabled, setSendDisabled] = useState<boolean>(false);
    const [stompClient, setStompClient] = useState(null);
    const flatlistRef = useRef(null);

    const encoder = new encoding.TextEncoder();

    const {
        value: messageValue,
        handleInputBlur: handleMessageBlur,
        handleInputChange: handleMessageChange,
        setEnteredValue: setMessageValue,
        hasError: messageHasError,
    } = useInput({
        defaultValue: '',
        validationFn: () => {
            return messageValue !== '';
        },
    });

    const handleIncomingMessage = (newMessage) => {
        const message = newMessage.body;
        if (message) {
            const data = JSON.parse(message) as TMessage;
            if (data.sender.user_id === user_id) {
                return;
            }
            setMessages((prev) => [...prev, JSON.parse(message)]);
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setImgBase64('data:image/png;base64,' + result.assets[0].base64);
            }
        } catch (error) {
            showToast({
                type: 'danger',
                description: 'Error lauching image library',
                timeout: 5000,
            });
        }
    };

    const scrollToTop = (isAnimated = false) => {
        if (flatlistRef.current) {
            flatlistRef.current.scrollToOffset({ offset: 0, animated: isAnimated });
        }
    };

    const handleSendMessage = async () => {
        if (messageHasError && image === null) {
            setSendDisabled(true);
            return;
        }
        const messageDto: TPostMessage = {
            message_room_id: roomId,
            sender_id: user_id,
            receiver_id: receiver_id,
            message: messageValue === '' ? 'Sent an image' : messageValue,
            is_read: false,
            image: imgBase64 ? imgBase64 : '',
        };
        try {
            if (image !== null) {
                setFetched(false);
            }
            const { data, message, status } = await ChatApi.sendMessage(messageDto);
            if (status === 'FAIL') {
                showToast({ type: 'danger', description: message, timeout: 5000 });
            }
            const returnedMessage: TMessage = data as TMessage;
            setMessages((old) => [...old, returnedMessage]);
            scrollToTop(true);
            setMessageValue('');
            setImage(null);
            setImgBase64('');
            if (image !== null) {
                setFetched(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const { data, message, status } = await ChatApi.getMessages(roomId);
            setMessages(data as TMessage[]);
            setFetched(true);
            if (status === 'FAIL') {
                showToast({ type: 'danger', description: message, timeout: 5000 });
            }
        };
        fetch();

        const client = Stomp.over(function () {
            return new SockJS('http://10.0.2.2:8080/ws');
        });
        client.reconnectDelay = 5000;
        client.connectHeaders = {};
        client.heartbeatIncoming = 4000;
        client.heartbeatOutgoing = 4000;
        client.debug = (msg) => console.log('STOMP: ', msg);

        client.connect({}, () => {
            client.subscribe(`/topic/chatroom/${roomId}`, (message) => {
                handleIncomingMessage(message);
            });
        });

        setStompClient(client);
        return () => {
            client.disconnect();
        };
    }, [roomId]);
    return (
        <SafeAreaView className='flex flex-1 bg-slate-100'>
            <View className='px-3 h-[10%]'>
                <View className='flex flex-row justify-between items-center'>
                    <TouchableOpacity
                        className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='text-[22px] text-sky-600 font-nunitoSemi'>{full_name}</Text>
                    <TouchableOpacity
                        className='w-fit h-fit flex'
                        onPress={() =>
                            navigation.push('UserProfileScreen', { userId: receiver_id })
                        }
                    >
                        <Image
                            source={
                                profile_picture
                                    ? { uri: profile_picture }
                                    : require('@asset/images/avatar.jpg')
                            }
                            style={{
                                resizeMode: 'cover',
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='px-3 bg-white h-[80%] rounded-t-[40px]'>
                <Messages flatListRef={flatlistRef} messages={messages} navigation={navigation} />
            </View>
            <View className='w-full h-[10%] bg-white flex flex-row justify-between items-center px-3'>
                <View className='flex flex-row space-x-2 items-center w-[85%]'>
                    <TouchableOpacity className='p-2 rounded-xl' onPress={pickImage}>
                        <FontAwesomeIcon icon={faImage} size={25} color='gray' />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Type your messages here'
                        placeholderTextColor='#1D84C6'
                        className='bg-[#E9E9E9] text-lg p-3 rounded-xl'
                        value={messageValue}
                        onBlur={handleMessageBlur}
                        onChange={handleMessageChange}
                        multiline={true}
                    />
                </View>
                <View className='flex items-center justify-center w-[15%]'>
                    <TouchableOpacity
                        className='bg-[#E9E9E9] p-3 rounded-xl'
                        onPress={handleSendMessage}
                        disabled={sendDisabled}
                    >
                        <PaperAirplaneIcon size={30} color={'#1D84C6'} />
                    </TouchableOpacity>
                </View>
            </View>
            {!hasFetched && (
                <View style={styles.overlay}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default DetailChat;
