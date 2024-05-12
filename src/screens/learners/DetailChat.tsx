import Messages from '@component/Messages';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRoute } from '@react-navigation/native';
import { ChatApi } from '@root/api/chat.api';
import { DetailChatScreenProps } from '@type/index';
import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PaperAirplaneIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';

type Params = {
    roomId: number;
};

const DetailChat = ({ navigation }: DetailChatScreenProps) => {
    const roomId: Params = useRoute().params as Params;
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const data = await ChatApi.getMessages(roomId.roomId);
            setMessages(data);
            console.log(data);
        };
        fetch();
    }, []);
    return (
        <SafeAreaView className='flex flex-1 bg-[#F0EEEC]'>
            <View className='px-3 h-[10%]'>
                <View className='flex flex-row justify-between items-center'>
                    <TouchableOpacity
                        className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='text-[26px] text-sky-600 font-nunitoSemi'>Phu Le</Text>
                    <TouchableOpacity className='w-fit h-fit flex'>
                        <Image
                            source={require('@asset/images/avatar.jpg')}
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
                <Messages messages={messages} />
            </View>
            <View className='w-full h-[10%] bg-white flex flex-row justify-between items-center px-3'>
                <TextInput
                    placeholder='Type your messages here'
                    placeholderTextColor='#1D84C6'
                    className='bg-[#E9E9E9] w-[80%] text-lg p-3 rounded-xl'
                    multiline={true}
                />
                <TouchableOpacity className='bg-[#E9E9E9] p-3 rounded-xl'>
                    <PaperAirplaneIcon size={30} color={'#1D84C6'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default DetailChat;
