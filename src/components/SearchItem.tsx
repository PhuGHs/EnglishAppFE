import { ChatApi } from '@root/api/chat.api';
import { UserContext } from '@root/context/user-context';
import { MessageRoomDto, TConversationTransfer, TSearch, TUserNecessary } from '@type/T-type';
import React, { useContext, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

interface ISearchItem {
    user?: TSearch;
    userNec?: TUserNecessary;
    handleSendLink?: () => void;
    navigation?;
}

const SearchItem = ({ user, userNec, navigation, handleSendLink }: ISearchItem) => {
    const { user: sender } = useContext(UserContext);
    const { user_id } = sender.user;
    const [loaded, setLoaded] = useState<boolean>(false);

    const handleCreateRoom = async () => {
        const roomDto = {
            sender_id: user_id,
            receiver_id: user.id,
        };
        const data: TConversationTransfer = {
            roomId: 3,
            full_name: user.fullName,
            profile_picture: user.profilePicture,
            receiver_id: user.id,
        };
        try {
            const {
                data: conversation,
                status,
                message,
            } = await ChatApi.checkIfExist(roomDto.sender_id, roomDto.receiver_id);
            setLoaded(true);
            if (loaded) {
                data.roomId = (conversation as MessageRoomDto).message_room_id;
                navigation.push('DetailChat', { conversation: data });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePress = () => {
        if (user && navigation) {
            handleCreateRoom();
        } else if (handleSendLink) {
            handleSendLink();
        }
    };

    return (
        <TouchableOpacity className='w-full py-2 flex flex-row space-x-2' onPress={handlePress}>
            <Image
                source={user ? { uri: user.profilePicture } : { uri: userNec.profile_picture }}
                resizeMode='cover'
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60 / 2,
                }}
            />
            <View className='flex flex-col justify-around'>
                <Text className='text-lg font-nunitoSemi text-gray-700'>
                    {user ? user.fullName : userNec.full_name}
                </Text>
                <Text className='text-base font-nunitoMedium text-sky-600'>
                    {user ? user.englishLevel : userNec.english_level.levelName}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default SearchItem;
