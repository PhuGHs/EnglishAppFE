import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import User from './User';
import { TNotification } from '@type/T-type';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface INotificationItem {
    notification: TNotification;
}

const NotificationItem = ({ notification }: INotificationItem) => {
    return (
        <TouchableOpacity className='flex w-full flex-row space-x-2 justify-between pt-4'>
            <View className='w-[15%]'>
                <Image
                    source={{ uri: notification.sender.profile_picture }}
                    style={{ resizeMode: 'cover', width: 56, height: 56, borderRadius: 56 / 2 }}
                />
            </View>
            <View className='flex flex-col justify-evenly border-b-[1px] border-gray-400 w-[70%] pb-4'>
                <Text className='text-gray-700 font-nunitoSemi text-base w-[100%]'>
                    {notification.message}
                </Text>
            </View>
            <View className='flex items-center justify-center'>
                {!notification.is_read && (
                    <View
                        className='bg-blue-400'
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: 12 / 2,
                        }}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
};

export default NotificationItem;
