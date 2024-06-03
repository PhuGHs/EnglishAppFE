import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import User from './User';
import { MicrophoneIcon, SpeakerWaveIcon } from 'react-native-heroicons/solid';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faHeadphones,
    faHeadphonesAlt,
    faHeadphonesSimple,
    faMicrophone,
} from '@fortawesome/free-solid-svg-icons';
import { TLearningRoomDto } from '@type/T-type';
import { FlatList } from 'react-native-gesture-handler';

export interface IEngComRoomProps {
    horizontal: boolean;
    navigation;
    room: TLearningRoomDto;
}

export interface IEngComRoomsProps {
    horizontal: boolean;
    navigation;
    data: TLearningRoomDto[]
}

const EngComRoom = ({ horizontal, navigation, room }: IEngComRoomProps) => {
    return (
        <View
            className={`p-4 rounded-2xl bg-white border-4 border-sky-500 mt-4 ${horizontal ? 'mr-4' : 'w-full'}`}
        >
            <View className='bg-[#78FFB6] rounded-xl w-fit'>
                <Text className='text-base font-nunitoSemi p-2'>Intermediate</Text>
            </View>
            <View>
                <Text className='text-lg font-semibold text-gray-500'>LIFE</Text>
                <Text className='text-lg font-nunitoBold'>
                    Why do/do not you enjoy excercising?
                </Text>
            </View>
            <View className='mt-2 flex flex-row'>
                <User isModerator={true} nameOnRight={false} room={true} />
                <User isModerator={false} nameOnRight={false} room={false} />
                <User isModerator={false} nameOnRight={false} room={false} />
                <User isModerator={false} nameOnRight={false} room={false} />
            </View>
            <View className='border border-sky-500 mt-4'></View>
            <View className='flex flex-row justify-between items-center mt-4'>
                <View className='flex flex-row gap-x-2 items-center'>
                    <View className='flex flex-row gap-x-2 items-center'>
                        <Text className='text-2xl text-orange-400 font-nunitoBold'>4</Text>
                        <FontAwesomeIcon icon={faMicrophone} color='#fb923c' size={25} />
                    </View>
                    <Text>|</Text>
                    <View className='flex flex-row gap-x-2 items-center'>
                        <Text className='text-2xl text-orange-400 font-nunitoBold'>5</Text>
                        <FontAwesomeIcon icon={faHeadphones} color='#fb923c' size={25} />
                    </View>
                </View>
                <TouchableOpacity
                    className='bg-yellow-400 rounded-xl flex'
                    onPress={() => navigation.push('RoomDetails')}
                >
                    <Text className='p-2 text-lg font-nunitoBold text-gray-700 px-5'>Join</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const EngComRooms = ({ horizontal, navigation, data }: IEngComRoomsProps) => {
    return (
        <FlatList
            horizontal={horizontal}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => <EngComRoom horizontal={horizontal} navigation={navigation} room={item} key={index}/>}
        />
    );
};

export default EngComRooms;
