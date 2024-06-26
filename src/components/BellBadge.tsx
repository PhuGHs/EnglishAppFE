import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BellIcon } from 'react-native-heroicons/solid';

interface IBellBadgeProps {
    numberOfNotifications: number;
    press: () => void;
}

const BellBadge = ({ numberOfNotifications, press }: IBellBadgeProps) => {
    return (
        <View className='flex flex-row justify-center items-center bg-gray-300 rounded-full'>
            <TouchableOpacity onPress={press}>
                <View className='p-2'>
                    <BellIcon color='black' size={30} />
                </View>
                {numberOfNotifications > 0 && (
                    <View className='absolute top-0 right-0 flex flex-row items-center justify-center bg-red-500 rounded-full w-5 h-5'>
                        <Text className='absolute text-center p-1 text-xs font-nunitoBold text-white'>
                            {numberOfNotifications > 9 ? '9+' : numberOfNotifications}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default BellBadge;
