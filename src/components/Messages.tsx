import React, { useContext, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { TJoinLearningRoom, TMessage } from '@type/T-type';
import { UserContext } from '@root/context/user-context';
import { Helper } from '@root/utils/helper';
import { Image } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { UserPlusIcon } from 'react-native-heroicons/solid';
import { LearningRoomApi } from '@root/api/learningroom.api';
import { useToast } from '@root/context/toast-context';
import { useNavigation } from '@react-navigation/native';

export interface IMessage {
    message: TMessage;
    navigation
}

const Message = ({ message, navigation }: IMessage) => {
    const [isShown, setIsShown] = useState(false);
    const { user } = useContext(UserContext);
    const { showToast } = useToast();
    const { user_id } = user.user;
    const isSender: boolean = user_id === message.sender.user_id;
    const [visible, setVisible] = useState<boolean>(false);
    const handlePress = () => {
        setIsShown(!isShown);
    };

    const handleJoin = async () => {
        const arr: string[] = message.invitation.split('/');
        const roomId: number = arr[0] as unknown as number;
        const password: string = arr[1];


        const body: TJoinLearningRoom = {
            user_id: user_id,
            room_id: roomId,
            password: password
        };
        try {
            const {data, message, status} = await LearningRoomApi.join(body);
            if (status === 'SUCCESS') {
                navigation.push('RoomDetails', { room: data });
            } else {
                showToast({type: 'danger', description: message, timeout: 4000});
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TouchableOpacity
            className={`flex ${isSender ? 'items-end' : 'items-start'}`}
            onPress={handlePress}
        >
            {message.message !== 'Sent an image' && message.message !== 'Sent you an invitation to a learning room' && (
                <View
                    className={`mt-4 p-2 rounded-[15px] max-w-[80%] ${isSender ? 'bg-[#1D84C6]' : 'bg-neutral-300'}`}
                >
                    <Text className={`text-lg font-nunitoSemi text-lg ${isSender ? 'text-white' : 'text-gray-700'}`}>
                        {message.message}
                    </Text>
                </View>
            )}
            {message.invitation !== null && message.invitation && 
                <View className='bg-gray-300 rounded-[15px] max-w-[80%] p-4 mt-4'>
                    <View className='flex flex-row'>
                        <View className='w-[20%] justify-center'>
                            <View
                                className='items-center justify-center bg-slate-400'
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40/2
                                }}
                            >
                                <UserPlusIcon size={25} color='white'/>
                            </View>
                        </View>
                        <View className='w-[80%]'>
                            <Text className='text-slate-700 font-nunitoSemi text-lg'>You are invited to a learning room! Touch the button to join in!</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={handleJoin} 
                        className='bg-gray-100 items-center justify-center px-4 py-2 rounded-lg my-2'>
                        <Text className='text-slate-700 font-nunitoBold text-lg'>Join</Text>
                    </TouchableOpacity>
                </View>
            }
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
    flatListRef: React.RefObject<FlatList>,
    navigation
}

const Messages = ({ flatListRef, messages, navigation }: IMessages) => {
    return (
        <FlatList
            ref={flatListRef}
            inverted={true}
            data={messages.slice().reverse()}
            renderItem={({ item }) => <Message message={item} navigation={navigation}/>}
            keyExtractor={(item) => item.message_id.toString()}
            contentContainerStyle={{ padding: 10 }}
        />
    );
};

export default Messages;
