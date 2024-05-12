import { ChatApi } from '@root/api/chat.api';
import { TConversation } from '@type/index';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

interface IConversation {
    conversation: TConversation;
    onPress: (roomId) => void;
}

const Conversation = ({ conversation, onPress }: IConversation) => {
    return (
        <TouchableOpacity
            className='flex flex-row justify-start items-center mb-4 bg-white p-2 rounded-2xl'
            style={{ elevation: 10, shadowColor: '#7dd3fc' }}
            onPress={onPress}
        >
            <Image
                source={require('@asset/images/avatar.jpg')}
                style={{ resizeMode: 'cover', width: 70, height: 70, borderRadius: 70 / 2 }}
            />
            <View className='flex flex-col gap-y-2 ml-3'>
                <Text className='text-gray-700 font-nunitoBold text-xl'>
                    {conversation.lastSentUser.fullName}
                </Text>
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        width: '100%',
                    }}
                >
                    <Text className='w-fit text-gray-500 text-base font-nunitoSemi'>
                        {conversation.lastMessage}
                    </Text>
                    <Text className='text-gray-400 text-base font-nunitoSemi'>11/20/2022</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

interface IConversationsProps {
    navigateToDetails: (roomId) => void;
}

const Conversations = ({ navigateToDetails }: IConversationsProps) => {
    const [conversations, setConversations] = useState<TConversation[]>();
    useEffect(() => {
        const fetch = async () => {
            const data = await ChatApi.getConversations(1);
            setConversations(data);
            console.log(data);
        };
        fetch();
    }, []);
    return (
        <FlatList
            data={conversations}
            renderItem={({ item }) => (
                <Conversation onPress={() => navigateToDetails(item.id)} conversation={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default Conversations;
