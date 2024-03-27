import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export interface IMessage {
    isSender: boolean;
}

const Message = ({ isSender }: IMessage) => {
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
                    It is a long established fact that a reader will be distracted by the readable
                    content of a page when looking at its layout.
                </Text>
            </View>
            {isShown && <Text>12:03 PM, read</Text>}
        </TouchableOpacity>
    );
};

const Messages = () => {
    return (
        <ScrollView className="flex flex-col p-4">
            <Message isSender={true} />
            <Message isSender={false} />
            <Message isSender={false} />
            <Message isSender={true} />
            <Message isSender={true} />
            <Message isSender={true} />
        </ScrollView>
    );
};

export default Messages;
