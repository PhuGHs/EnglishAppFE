import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TUser, TUserMission } from '@type/index';
import React from 'react';
import { View, Text, FlatList } from 'react-native';

interface IMission {
    mission: TUserMission;
}

interface IMissions {
    missions: TUserMission[];
}

const Mission = ({ mission }: IMission) => {
    return (
        <View className='flex h-fit w-full bg-white rounded-xl flex-row justify-between items-center'>
            <View className='flex max-w-[85%] w-full p-4 flex-row bg-[#CED1D5] rounded-xl justify-between items-center'>
                <Text className='text-[#374151] text-lg max-w-[90%] font-nunitoBold'>
                    {mission.mission.missionName}
                </Text>
                <View
                    style={{ width: 30, height: 30, borderRadius: 30 / 2 }}
                    className='bg-[#15F5BA] flex items-center justify-center'
                >
                    {mission.isCompleted && (
                        <FontAwesomeIcon icon={faCheck} size={22} color='#374151' />
                    )}
                </View>
            </View>
            <View className='flex flex-row space-x-1 items-center justify-center w-[15%]'>
                <Text className='text-lg font-nunitoBold text-[#374151]'>
                    {mission.mission.pointsAwarded}
                </Text>
                <FontAwesomeIcon icon={faStar} color='#374151' size={20} />
            </View>
        </View>
    );
};

const Missions = ({ missions }: IMissions) => {
    return (
        <FlatList
            data={missions}
            horizontal={false}
            renderItem={({ item }) => <Mission mission={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ rowGap: 10 }}
        />
    );
};

export default Missions;
