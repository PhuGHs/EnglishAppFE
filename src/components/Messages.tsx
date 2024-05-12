import { TMessage } from '@type/index';
import React, { useState } from 'react';
import { FlatList, FlatListProps, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export interface IMessage {
    isSender: boolean;
    message: TMessage;
}

const Message = ({ isSender, message }: IMessage) => {
    const [isShown, setIsShown] = useState(false);
    const handlePress = () => {
        setIsShown(!isShown);
    };
    return (
        <TouchableOpacity
            className={`flex ${isSender ? 'items-end' : 'items-start'}`}
            onPress={handlePress}
        >
            <View
                className={`mt-4 p-2 rounded-[15px] max-w-[80%] ${isSender ? 'bg-[#1D84C6]' : 'bg-neutral-300'}`}
            >
                <Text className={`text-lg ${isSender ? 'text-white' : 'text-gray-700'}`}>
                    {message.message}
                </Text>
            </View>
            {isShown && <Text>12:03 PM, read</Text>}
        </TouchableOpacity>
    );
};

export interface IMessages {
    messages: TMessage[];
}

const Messages = ({ messages }: IMessages) => {
    return (
        <FlatList
            data={messages}
            renderItem={({ item }) => <Message isSender={1 === item.user.id} message={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 10 }}
        />
    );
};

export default Messages;
