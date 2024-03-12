import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import BellBadge from '@root/components/BellBadge';
import DailyMissions, { IMissionProps } from '@root/components/DailyMissions';
import EngComRooms from '@component/EngComRooms';
import EngComQAs from '@component/EngComQA';

const missions: IMissionProps[] = [
    {
        missionName: 'Watch a blog post',
        rewardedPoints: 3,
        isDone: false
    },
    {
        missionName: 'Join a speaking room',
        rewardedPoints: 5,
        isDone: true
    },
    {
        missionName: 'Create a speaking room',
        rewardedPoints: 5,
        isDone: true
    },
    {
        missionName: 'Ask a question',
        rewardedPoints: 5,
        isDone: true
    },
];

const HomeScreen = () => {
    return (
        <SafeAreaView className='flex mx-3' style={{marginBottom: 160}}>
            <View className='flex flex-row justify-between mb-4 mt-2'>
                <View className='flex flex-row items-center'>
                    <Text className='text-base font-bold text-3xl text-[#005DB2]'>Eng</Text>
                    <Text className='text-base font-bold text-3xl text-[#4C337E]'>Com</Text>
                </View>
                <BellBadge numberOfNotifications={2} />
            </View>
            <ScrollView className='space-y-4'>
                <View className='flex flex-col gap-y-2'>
                    <Text className='text-gray-700 text-xl font-medium'>Daily Missions</Text>
                    <DailyMissions missions={missions}/>
                </View>
                <View className='flex flex-col'>
                    <View className='flex flex-row justify-between items-center'>
                        <Text className='text-gray-700 text-xl font-medium'>EngCom Rooms</Text>
                        <TouchableOpacity className=''>
                            <Text className='text-[#005DB2] text-lg font-medium'>Show all</Text>
                        </TouchableOpacity>
                    </View>
                    <EngComRooms />
                </View>
                <View className='flex flex-col'>
                    <View className='flex flex-row justify-between items-center'>
                        <Text className='text-gray-700 text-xl font-medium'>EngCom QAs</Text>
                        <TouchableOpacity className=''>
                            <Text className='text-[#005DB2] text-lg font-medium'>Show all</Text>
                        </TouchableOpacity>
                    </View>
                    <EngComQAs />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;