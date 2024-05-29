import Conversations from '@component/Conversations';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabsScreenProps } from '@type/index';
import { MessageRoomDto } from '@type/T-type';
import { UserContext } from '@root/context/user-context';
import { ChatApi } from '@root/api/chat.api';
import { useToast } from '@root/context/toast-context';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import SearchBar from '@component/SearchBar';

const ChatScreen = ({ navigation }: TabsScreenProps) => {
    const [conversations, setConversations] = useState<MessageRoomDto[]>([]);
    const { user } = useContext(UserContext);
    const { showToast } = useToast();
    const { user_id } = user.user;

    const [hasExecuted, setExecuted] = useState<boolean>(false);
    const [stompClient, setStompClient] = useState<Client>(null);

    const handleMessage = (newConversation) => {
        let conversation = null;
        try {
            conversation = JSON.parse(newConversation.body);
        } catch (error) {
            console.error('Failed to parse incoming message:', error);
            return;
        }

        if (!conversation || !conversation.message_room_id) {
            console.warn('Received invalid message:', newConversation.body);
            return;
        }
        setConversations((prevConversations) => {
            const index = prevConversations.findIndex(
                (conv) => conv.message_room_id === conversation.message_room_id
            );
            const updatedConversations = [...prevConversations];
            if (index !== -1) {
                updatedConversations.splice(index, 1);
            }
            updatedConversations.unshift(conversation);
            return updatedConversations;
        });
    };

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const { data, message, status } = await ChatApi.getConversations(user_id);
                if (status === 'FAIL') {
                    showToast({ type: 'danger', description: message, timeout: 2000 });
                } else {
                    setConversations(data as MessageRoomDto[]);
                    setExecuted(true);
                }
            } catch (error) {
                console.error('Error fetching chat:', error);
            }
        };
        fetchChat();

        const client = Stomp.over(function () {
            return new SockJS('http://10.0.2.2:8080/ws');
        });
        client.reconnectDelay = 5000;
        client.connectHeaders = {};
        client.heartbeatIncoming = 4000;
        client.heartbeatOutgoing = 4000;
        client.debug = (msg) => console.log('STOMP: ', msg);

        client.connect({}, () => {
            client.subscribe(`/topic/chatroom-out/${user_id}`, (message) => {
                handleMessage(message);
            });
        });

        setStompClient(client);
    }, []);

    return (
        <SafeAreaView className='flex bg-slate-100 px-4 bg-slate-100'>
            <View className='flex flex-col justify-between mb-4'>
                <Text className='text-center w-full text-sky-600 font-semibold text-2xl my-4'>
                    Chats
                </Text>
                <SearchBar handleNavigation={() => navigation.push('SearchScreen')} />
            </View>
            <Conversations data={conversations} navigation={navigation} />
            {!hasExecuted && (
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

export default ChatScreen;
