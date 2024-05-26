import React, { useContext, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { TMessage } from '@type/T-type';
import { UserContext } from '@root/context/user-context';
import { Helper } from '@root/utils/helper';
import { Image } from 'react-native';
import ImageView from 'react-native-image-viewing';

export interface IMessage {
    message: TMessage;
}

const Message = ({ message }: IMessage) => {
    const [isShown, setIsShown] = useState(false);
    const { user } = useContext(UserContext);
    const { user_id } = user.user;
    const isSender: boolean = user_id === message.sender.user_id;
    const [visible, setVisible] = useState<boolean>(false);
    const handlePress = () => {
        setIsShown(!isShown);
    };
    return (
        <TouchableOpacity
            className={`flex ${isSender ? 'items-end' : 'items-start'}`}
            onPress={handlePress}
        >
            {message.message !== 'Sent an image' && (
                <View
                    className={`mt-4 p-2 rounded-[15px] max-w-[80%] ${isSender ? 'bg-[#1D84C6]' : 'bg-neutral-300'}`}
                >
                    <Text className={`text-lg ${isSender ? 'text-white' : 'text-gray-700'}`}>
                        {message.message}
                    </Text>
                </View>
            )}
            {message.image !== null && (
                <>
                    <TouchableOpacity
                        onPress={() => setVisible(true)}
                        className={'mt-4 p-2 rounded-[15px] max-w-[80%] border-2 border-gray-200'}
                    >
                        <Image
                            source={{ uri: message.image }}
                            resizeMode='cover'
                            className='w-[200px] h-[300px]'
                        />
                    </TouchableOpacity>
                    <ImageView
                        images={[{ uri: message.image }]}
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setVisible(false)}
                    />
                </>
            )}
            {isShown && <Text>{Helper.formatDate(message.created_at)}</Text>}
        </TouchableOpacity>
    );
};

export interface IMessages {
    messages: TMessage[];
    flatListRef;
}

const Messages = ({ flatListRef, messages }: IMessages) => {
    return (
        <FlatList
            ref={flatListRef}
            inverted={true}
            data={messages.reverse()}
            renderItem={({ item }) => <Message message={item} />}
            keyExtractor={(item) => item.message_id.toString()}
            contentContainerStyle={{ padding: 10 }}
        />
    );
};

export default Messages;
