import React from 'react';
import { View, Image, Text } from 'react-native';
import User from './User';
import { TUserNecessary } from '@type/index';

const LearnerProfile = (User: TUserNecessary) => {
    return (
        <View className='flex w-full flex-row space-x-2 justify-between'>
            <View className='w-[15%]'>
                <Image
                    source={require('@asset/images/avatar.jpg')}
                    style={{ resizeMode: 'cover', width: 56, height: 56, borderRadius: 56 / 2 }}
                />
            </View>
            <View className='flex flex-col justify-evenly border-b-[1px] border-gray-400 w-[80%]'>
                <Text className='text-xl font-nunitoBold text-gray-700'>Lê Văn Phú</Text>
                <Text className='text-base font-nunitoMedium text-blue-400'>Intermediate</Text>
            </View>
        </View>
    );
};

export default LearnerProfile;