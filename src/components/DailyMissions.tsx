import React from 'react';
import { ListRenderItem, Text, View } from 'react-native';
import { BoltIcon, CheckCircleIcon, PowerIcon, TrophyIcon } from 'react-native-heroicons/solid';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

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
    const renderItem: ListRenderItem<IMissionProps> = ({ item }) => (
        <Mission
            missionName={item.missionName}
            rewardedPoints={item.rewardedPoints}
            isDone={item.isDone}
        />
    );
    return (
        <FlatList
            horizontal={false}
            data={missions}
            keyExtractor={(item) => item.toString()}
            renderItem={renderItem}
        />
    );
};

export default DailyMissions;
