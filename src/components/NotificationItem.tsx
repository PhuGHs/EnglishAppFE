import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import User from './User';

const NotificationItem = () => {
    return (
        <TouchableOpacity className='flex w-full flex-row space-x-2 justify-between pt-4'>
            <View className='w-[15%]'>
                <Image
                    source={require('@asset/images/avatar.jpg')}
                    style={{ resizeMode: 'cover', width: 56, height: 56, borderRadius: 56 / 2 }}
                />
            </View>
            <View className='flex flex-col justify-evenly border-b-[1px] border-gray-400 w-[80%] pb-4'>
                <Text className='text-gray-700 font-nunitoSemi text-base'>PhuGHs has answered in your discussion recently</Text>
            </View>
        </TouchableOpacity>
    );
};

export default NotificationItem;