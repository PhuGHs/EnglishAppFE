import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import User from './User';
import { MicrophoneIcon, SpeakerWaveIcon } from 'react-native-heroicons/solid';


export interface IEngComRoomProps {
    levelName: string;
    topicName: string;
    topicSection: string;
};

const EngComRoom = () => {
    return (
        <View className='p-4 rounded-2xl bg-white border-4 border-sky-500 mt-4 mr-4'>
            <View className='bg-[#78FFB6] rounded-xl w-fit'>
                <Text className='text-base font-medium p-2'>Intermediate</Text>
            </View>
            <View>
                <Text className='text-lg font-semibold text-gray-500'>LIFE</Text>
                <Text className='text-lg font-bold'>Why do/do not you enjoy excercising?</Text>
            </View>
            <View className='mt-2 flex flex-row'>
                <User isModerator={true} nameOnRight={false} room={true}/>
                <User isModerator={false} nameOnRight={false} room={false}/>
                <User isModerator={false} nameOnRight={false} room={false}/>
                <User isModerator={false} nameOnRight={false} room={false}/>
            </View>
            <View className='border border-sky-500 mt-4'></View>
            <View className='flex flex-row justify-between items-center mt-4'>
                <View className='flex flex-row gap-x-2 items-center'>
                    <View className='flex flex-row gap-x-2 items-center'>
                        <Text className='text-lg text-orange-400 font-bold'>4</Text>
                        <MicrophoneIcon color='#fb923c' size={30}/>
                    </View>
                    <Text>|</Text>
                    <View className='flex flex-row gap-x-2 items-center'>
                        <Text className='text-lg text-orange-400 font-bold'>5</Text>
                        <SpeakerWaveIcon color='#fb923c' size={30}/>
                    </View>
                </View>
                <TouchableOpacity className='bg-yellow-400 rounded-xl flex'>
                    <Text className='p-2 text-lg font-bold text-white'>Join</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const EngComRooms = () => {
    return (
        <ScrollView horizontal={true}>
            <EngComRoom />
            <EngComRoom />
            <EngComRoom />
            <EngComRoom />
        </ScrollView>
    );
};

export default EngComRooms;