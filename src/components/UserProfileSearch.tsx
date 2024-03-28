import React from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { StarIcon } from 'react-native-heroicons/solid';
import Chips, { ChipProps } from './Chips';

const data: ChipProps[] = [
    {
        isSelected: false,
        chipName: 'Reading',
    },
    {
        isSelected: false,
        chipName: 'Dancing',
    },
    {
        isSelected: false,
        chipName: 'IELTS',
    },
    {
        isSelected: false,
        chipName: 'Playing games',
    },
];

const UserProfile = () => {
    return (
        <View
            className='flex-row gap-y-4 bg-white p-4 mt-4 rounded-2xl'
            style={{ elevation: 10, shadowColor: '#7dd3fc' }}
        >
            <View className='h-[70px]'>
                <Image
                    source={require('@asset/images/avatar.jpg')}
                    style={{ resizeMode: 'cover', width: 70, height: 70, borderRadius: 70 / 2 }}
                />
                <View className='flex flex-row items-center absolute left-0 bottom-1 bg-white rounded-2xl'>
                    <Text className='font-nunitoBold text-gray-700'>4.2 </Text>
                    <StarIcon color='#facc15' size={20} />
                </View>
            </View>
            <View className='flex flex-col ml-3'>
                <Text className='text-xl font-nunitoBold ml-1'>Lê Văn Phú, 21</Text>
                <Text className='text-lg text-[#005DB2] font-nunitoBold ml-1 mb-2'>
                    Intermediate
                </Text>
                <Chips chips={data} searchOptions={true} />
            </View>
        </View>
    );
};

const UserProfileSearch = () => {
    return (
        <ScrollView horizontal={false} className='flex flex-col gap-y-2 mb-[70px]'>
            <UserProfile />
            <UserProfile />
            <UserProfile />
            <UserProfile />
        </ScrollView>
    );
};

export default UserProfileSearch;
