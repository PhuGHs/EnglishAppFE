import { UserContext } from '@root/context/user-context';
import { Helper } from '@root/utils/helper';
import { MessageRoomDto, TConversationTransfer, TUserNecessary } from '@type/T-type';
import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

export interface IConversations {
    data: MessageRoomDto[],
    navigation
}

interface IConversation {
    item: MessageRoomDto,
    navigation
}

function getReceiver(user_id: number, conversation: MessageRoomDto): TUserNecessary {
    const { user_id: receiverId } = conversation.last_message.receiver;
    if (receiverId === user_id) {
        return conversation.last_message.sender;
    }
    return conversation.last_message.receiver;
};

const Conversation = ({item, navigation}: IConversation) => {
    const { user } = useContext(UserContext);
    const { user_id } = user.user;
    const { profile_picture, full_name, user_id: receiver_id } = getReceiver(user_id, item);
    const { message, created_at } = item.last_message;
    const { user_id: last_sent_user_id } = item.user;
    const conversation: TConversationTransfer = {
        roomId: item.message_room_id,
        full_name: full_name,
        receiver_id: receiver_id,
        profile_picture: profile_picture,
    };
    
    return (
        <TouchableOpacity
            className='flex flex-row justify-start items-center mb-4 bg-white p-2 rounded-2xl'
            style={{ elevation: 10, shadowColor: '#7dd3fc' }}
            onPress={() => navigation.push('DetailChat', { conversation: conversation } )}
        >
            <Image
                source={item ? { uri: profile_picture } : require('@asset/images/avatar.jpg')}
                style={{ resizeMode: 'cover', width: 70, height: 70, borderRadius: 70 / 2 }}
            />
            <View className='flex flex-col flex-grow ml-3'>
                <Text className='text-gray-700 font-nunitoBold text-xl'>{full_name}</Text>
                <View className='flex flex-row justify-between items-start'>
                    <View className='max-w-[70%]'>
                        <Text className='w-fit text-gray-500 text-base font-nunitoSemi' numberOfLines={1}>
                            {user_id !== last_sent_user_id ? message : 'You: ' + message}
                        </Text>
                    </View>
                    <View className=''>
                        <Text className='w-fit text-gray-500 text-base font-nunitoSemi'>
                            <Text className='text-gray-400 text-base font-nunitoSemi'>{Helper.calculateTimeAgo(created_at)}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const Conversations = ({ data, navigation}: IConversations) => {
    if (data.length === 0) return;
    return (
        <FlatList
            horizontal={false}
            data={data}
            renderItem={({ item }) => <Conversation item={item} navigation={navigation} />}
            keyExtractor={(item) => item.message_room_id.toString()}
        />
    );
};

export default Conversations;