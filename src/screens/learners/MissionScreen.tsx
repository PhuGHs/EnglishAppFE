import CircularProgress from '@component/CircularProgress';
import Missions from '@component/Missions';
import { faArrowLeft, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { MissionScreenProps, TUserMission } from '@type/index';
import React from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView } from 'react-native';

const data: TUserMission[] = [
    {
        id: 1,
        user: {
            userId: 1,
            fullName: 'Le Van Phu',
            profilePicture: '',
            englishLevel: {
                levelId: 1,
                levelName: 'Intermediate',
                description: ''
            }
        },
        mission: {
            missionId: 1,
            missionName: 'Read a short story',
            pointsAwarded: 5,
            maxCompletionCount: 1
        },
        isCompleted: true,
        completionCount: 1,
    },
    {
        id: 2,
        user: {
            userId: 1,
            fullName: 'Le Van Phu',
            profilePicture: '',
            englishLevel: {
                levelId: 1,
                levelName: 'Intermediate',
                description: ''
            }
        },
        mission: {
            missionId: 2,
            missionName: 'Ask a question to the community',
            pointsAwarded: 5,
            maxCompletionCount: 5
        },
        isCompleted: true,
        completionCount: 5,
    },
    {
        id: 3,
        user: {
            userId: 1,
            fullName: 'Le Van Phu',
            profilePicture: '',
            englishLevel: {
                levelId: 1,
                levelName: 'Intermediate',
                description: ''
            }
        },
        mission: {
            missionId: 3,
            missionName: 'Ask a question to the community',
            pointsAwarded: 5,
            maxCompletionCount: 5
        },
        isCompleted: true,
        completionCount: 5,
    },
    {
        id: 4,
        user: {
            userId: 1,
            fullName: 'Le Van Phu',
            profilePicture: '',
            englishLevel: {
                levelId: 1,
                levelName: 'Intermediate',
                description: ''
            }
        },
        mission: {
            missionId: 4,
            missionName: 'Ask a question to the community',
            pointsAwarded: 5,
            maxCompletionCount: 5
        },
        isCompleted: true,
        completionCount: 5,
    }
];

const MissionScreen = ({navigation}: MissionScreenProps) => {
    return (
        <SafeAreaView className='flex flex-1 m-4 bg-[#F0EEEC]'>
            <View className='flex flex-row justify-between items-center mt-3'>
                <TouchableOpacity className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center' onPress={() => navigation.pop()}>
                    <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                </TouchableOpacity>
                <Text className='text-[22px] text-sky-600 font-nunitoBold'>Daily Missions</Text>
                <TouchableOpacity onPress={() => navigation.push('LeaderBoard')}>
                    <FontAwesomeIcon icon={faRankingStar} color='#0ea5e9' size={40} />
                </TouchableOpacity>
            </View>
            <View className='mt-8 space-y-6'>
                <Text className='text-[#374151] font-nunitoBold text-4xl mt-5'>New exciting tasks waiting you</Text>
                    <View className='w-full flex p-4 flex-row bg-[#1679AB] rounded-3xl justify-evenly space-x-4'>
                        <CircularProgress
                                size={100}
                                fontSize={24}
                                progress={100}
                                strokeWidth={10}
                                backgroundColor='white'
                                progressColor='#5AB2FF'
                                textColor='white'
                            />
                        <View className='flex flex-col justify-evenly items-start w-[60%]'>
                            <Text className='text-2xl font-nunitoXBold text-white'>You've done all the tasks</Text>
                            <Text className='text-white'>4 out of 4 tasks completed</Text>
                        </View>
                    </View>
                    <Text className='text-2xl font-nunitoBold text-[#1679AB] mb-4'>Today Tasks</Text>
                    <Missions missions={data}/>
                </View>
        </SafeAreaView>
    );
};

export default MissionScreen;