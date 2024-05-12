import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import BellBadge from '@root/components/BellBadge';
import DailyMissions, { IMissionProps } from '@root/components/DailyMissions';
import EngComRooms from '@component/EngComRooms';
import EngComQAs from '@component/EngComQA';
import EngComUser from '@component/EngComUser';
import CircularProgress from '@component/CircularProgress';
import { TabsScreenProps } from '@type/index';

const missions: IMissionProps[] = [
    {
        missionName: 'Watch a blog post',
        rewardedPoints: 3,
        isDone: false,
    },
    {
        missionName: 'Join a speaking room',
        rewardedPoints: 5,
        isDone: true,
    },
    {
        missionName: 'Create a speaking room',
        rewardedPoints: 5,
        isDone: true,
    },
    {
        missionName: 'Ask a question',
        rewardedPoints: 5,
        isDone: true,
    },
];

const HomeScreen = ({ navigation }: TabsScreenProps) => {
    return (
        <SafeAreaView className='flex px-4 bg-slate-100 space-y-3' style={{ marginBottom: 70 }}>
            <View className='flex flex-row justify-between mt-4 items-center'>
                <View className='flex flex-row space-x-2 items-center'>
                    <EngComUser withName={false} isCreator={false} noUser={false} />
                    <View className='flex flex-col space-y-2'>
                        <Text className='font-nunitoSemi text-slate-800 text-[16px]'>
                            Hello Rachel,
                        </Text>
                        <View className='flex flex-row'>
                            <Text className='font-nunitoXBold text-sky-600 text-[18px]'>
                                Ready to{' '}
                            </Text>
                            <Text className='text-[18px] font-nunitoXBold text-yellow-400'>
                                play English?
                            </Text>
                        </View>
                    </View>
                </View>
                <BellBadge numberOfNotifications={2} />
            </View>
            <ScrollView className='space-y-6'>
                <View className='flex flex-row justify-between items-center'>
                    <View className='flex flex-row space-x-4'>
                        <CircularProgress
                            size={100}
                            fontSize={24}
                            progress={40}
                            strokeWidth={10}
                            backgroundColor='#cbd5e1'
                            progressColor='#0891b2'
                            textColor='#0891b2'
                        />
                        <View className='flex flex-col justify-center'>
                            <Text className='font-nunitoBold text-xl text-sky-600'>Missions</Text>
                            <Text className='font-nunitoBold text-xl text-sky-600'>Completed</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        className='px-2 py-3 bg-sky-600 rounded-xl'
                        onPress={() => navigation.push('MissionScreen')}
                    >
                        <Text className='text-white font-nunitoBold text-base'>Details</Text>
                    </TouchableOpacity>
                </View>
                <View className='flex flex-col'>
                    <View className='flex flex-row justify-between items-center'>
                        <Text className='text-xl text-slate-800 font-nunitoXBold'>
                            EngCom Rooms
                        </Text>
                        <TouchableOpacity
                            className=''
                            onPress={() => navigation.push('EngComRooms')}
                        >
                            <Text className='text-sky-600 text-lg font-nunitoBold'>Show all</Text>
                        </TouchableOpacity>
                    </View>
                    <EngComRooms horizontal={true} navigation={navigation} />
                </View>
                <View className='flex flex-col'>
                    <View className='flex flex-row justify-between items-center'>
                        <Text className='text-xl text-slate-800 font-nunitoXBold'>EngCom QAs</Text>
                        <TouchableOpacity
                            className=''
                            onPress={() => navigation.push('EngComAskScreen')}
                        >
                            <Text className='text-sky-600 text-lg font-nunitoBold'>Show all</Text>
                        </TouchableOpacity>
                    </View>
                    <EngComQAs horizontal={true} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
