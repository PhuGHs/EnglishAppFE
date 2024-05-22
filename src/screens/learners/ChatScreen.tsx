import Conversations from '@component/Conversations';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@component/SearchBar';
import { TabsScreenProps } from '@type/index';
import { MessageRoomDto } from '@type/T-type';
import { UserContext } from '@root/context/user-context';
import { ChatApi } from '@root/api/chat.api';
import { useToast } from '@root/context/toast-context';

const ChatScreen = ({navigation}: TabsScreenProps) => {
    const [conversations, setConversations] = useState<MessageRoomDto>();
    const [hasExecuted, setExecuted] = useState<boolean>(true);
    const { user } = useContext(UserContext);
    const { showToast } = useToast();
    const { user_id } = user.user;
    useEffect(() => {
        const fetchChat = async () => {
            const { data, message, status } = await ChatApi.getConversations(user_id);
            if (status === 'FAIL') {
                showToast({ type: 'danger', description: message, timeout: 2000 });
            }
            console.log(data);
        };
        fetchChat();
    }, [user_id]);

    return (
        <SafeAreaView className='flex px-4 bg-slate-100'>
            <View className='flex flex-col justify-between mb-4'>
                <Text className='text-center w-full text-sky-600 font-semibold text-2xl my-4'>
                    Chats
                </Text>
                <SearchBar />
            </View>
            <Conversations navigation={navigation}/>
        </SafeAreaView>
    );
};

export default ChatScreen;