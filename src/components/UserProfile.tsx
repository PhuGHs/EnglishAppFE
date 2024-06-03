import React from 'react';
import { ScrollView, View, Image, Text, FlatList } from 'react-native';
import { StarIcon } from 'react-native-heroicons/solid';
import Chips, { ChipProps } from './Chips';
import { TSearch } from '@type/T-type';
import Interest from './Interest';

const data: ChipProps[] = [
    {
        id: 1,
        isSelected: false,
        chipName: 'Reading',
    },
    {
        id: 2,
        isSelected: false,
        chipName: 'Dancing',
    },
    {
        id: 3,
        isSelected: false,
        chipName: 'IELTS',
    },
    {
        id: 4,
        isSelected: false,
        chipName: 'Playing games',
    },
];

interface IUserProfile {
    user: TSearch;
    handlePress: () => void;
}

const UserProfile = ({ user, handlePress }: IUserProfile) => {
    return (
        <View
            className='flex-row gap-y-4 bg-white p-4 mt-4 rounded-2xl'
            style={{ elevation: 10, shadowColor: '#7dd3fc' }}
        >
            <View className='h-[70px]'>
                <Image
                    source={user ? { uri: user.profilePicture }: require('@asset/images/avatar.jpg')}
                    style={{ resizeMode: 'cover', width: 60, height: 60, borderRadius: 60 / 2 }}
                />
                <View className='flex flex-row items-center absolute left-0 bottom-1 bg-white rounded-2xl'>
                    <Text className='font-nunitoBold text-gray-700'>4.2 </Text>
                    <StarIcon color='#facc15' size={20} />
                </View>
            </View>
            <View className='flex flex-col ml-3'>
                <Text className='text-xl font-nunitoBold ml-1'>{user ? user.fullName: 'xxxxx'}</Text>
                <Text className='text-lg text-[#005DB2] font-nunitoBold ml-1 mb-2'>
                    {user ? user.englishLevel: 'Intermediate'}
                </Text>
                <View className='flex-row flex-wrap'>
                    {
                        user.interests.map((item, index) => <Interest interest={item} key={index} />)
                    }
                </View>
            </View>
        </View>
    );
};

export default UserProfile;
