import React from 'react';
import { Text, View } from 'react-native';
import { BoltIcon, CheckCircleIcon, PowerIcon, TrophyIcon } from 'react-native-heroicons/solid';

export interface IMissionProps {
    missionName: string;
    rewardedPoints: number;
    isDone: boolean;
}

export interface IMissionsProps {
    missions: IMissionProps[];
}

const Mission = ({ missionName, rewardedPoints, isDone }: IMissionProps) => {
    return (
        <View className='flex flex-row mt-2'>
            <Text className={`w-[70%] text-base ${isDone ? 'line-through' : ''}`}>
                {missionName}
            </Text>
            <View className='w-[10%] flex justify-center items-center'>
                {isDone && <CheckCircleIcon color='#00FF1A' size={30} />}
            </View>
            <View className='w-[20%] flex items-center justify-end flex-row'>
                <Text className='text-yellow-400 font-nunitoBold'>{rewardedPoints} </Text>
                <BoltIcon color='#facc15' size={30} />
            </View>
        </View>
    );
};

const DailyMissions = ({ missions }: IMissionsProps) => {
    return (
        <View className='flex flex-col justify-center w-full bg-white mt-2 p-3 rounded-xl'>
            {missions.map((value, index) => (
                <Mission
                    key={index}
                    missionName={value.missionName}
                    rewardedPoints={value.rewardedPoints}
                    isDone={value.isDone}
                />
            ))}
        </View>
    );
};

export default DailyMissions;
