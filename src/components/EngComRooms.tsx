import React, { useCallback, useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import User from './User';
import { ClockIcon, MicrophoneIcon, SpeakerWaveIcon } from 'react-native-heroicons/solid';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faClockFour,
    faHeadphones,
    faHeadphonesAlt,
    faHeadphonesSimple,
    faMicrophone,
} from '@fortawesome/free-solid-svg-icons';
import { TLearningRoomDto, TParticipantDto } from '@type/T-type';
import { FlatList } from 'react-native-gesture-handler';
import EngComUser from './EngComUser';
import { Helper } from '@root/utils/helper';
import { LearningRoomApi } from '@root/api/learningroom.api';
import { UserContext } from '@root/context/user-context';
import { useToast } from '@root/context/toast-context';

export interface IEngComRoomProps {
    horizontal: boolean;
    navigation;
    room: TLearningRoomDto;
}

export interface IEngComRoomsProps {
    horizontal: boolean;
    navigation;
    data: TLearningRoomDto[];
}

const getNumberOfParticipant = (
    participants: TParticipantDto[]
): { listeners: number; speakers: number } => {
    let listeners: number = 0;
    let speakers: number = 0;
    participants.forEach((item, index) => {
        if (!item.is_speaker) {
            listeners++;
        } else {
            speakers++;
        }
    });
    return { listeners, speakers };
};

const EngComRoom = ({ horizontal, navigation, room }: IEngComRoomProps) => {
    const {
        room_name,
        created_at,
        scheduled_to,
        is_live,
        is_private,
        topic,
        participants,
        owner,
        id,
    } = room;
    const { listeners, speakers } = getNumberOfParticipant(participants);

    const { user } = useContext(UserContext);
    const { showToast } = useToast();
    const { user_id } = user.user;

    const handleJoin = async () => {
        try {
            if (is_private) {
                const { data, message, status } = await LearningRoomApi.join({
                    user_id: user_id,
                    room_id: id,
                    password: '',
                });
                if (status === 'SUCCESS') {
                    navigation.push('RoomDetails', { room: data });
                } else {
                    showToast({ type: 'danger', description: message, timeout: 5000 });
                }
            } else {
                const { data, message, status } = await LearningRoomApi.join({
                    user_id: user_id,
                    room_id: id,
                });
                if (status === 'SUCCESS') {
                    navigation.push('RoomDetails', { room: data });
                } else {
                    showToast({ type: 'danger', description: message, timeout: 5000 });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View
            className={`p-4 rounded-2xl space-y-2 bg-white border-4 border-sky-500 mt-4 ${horizontal ? 'mr-4 w-[370px]' : 'w-full'}`}
        >
            <View className='flex flex-row justify-between'>
                <Text className='p-3 bg-[#F2DDCC] text-[#FF6B00] text-base w-[45%] rounded-lg text-center font-nunitoBold'>
                    {topic.header}
                </Text>
                <Text className='p-3 bg-[#ACE5FF] text-[#005DB2] text-base w-[45%] rounded-lg text-center font-nunitoBold'>
                    {topic.english_level_id}
                </Text>
            </View>
            <Text className='mt-2 p-3 bg-amber-100 text-amber-600 text-base w-[45%] rounded-lg text-center font-nunitoBold'>
                {is_private ? 'Tutor room' : 'Practice room'}
            </Text>
            <View>
                <Text className='text-lg font-nunitoBold'>{room_name}</Text>
            </View>
            <View className='mt-2 flex flex-row'>
                {participants.length === 0 && (
                    <View className='flex flex-col space-y-2'>
                        <EngComUser
                            withName={false}
                            noUser={false}
                            isCreator={false}
                            avatar={owner.profile_picture}
                        />
                        <View className='flex flex-row'>
                            <Text className='text-base font-nunitoBold text-gray-700'>
                                {owner.full_name}
                            </Text>
                            <Text className='text-base font-nunitoRegular text-gray-700'>
                                {' '}
                                will host this room
                            </Text>
                        </View>
                    </View>
                )}
                {participants.length > 0 && (
                    <FlatList
                        horizontal={true}
                        data={participants}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if (item.is_speaker) {
                                return (
                                    <EngComUser
                                        name={item.user.full_name}
                                        isCreator={item.is_owner}
                                        avatar={item.user.profile_picture}
                                        withName={true}
                                        noUser={false}
                                    />
                                );
                            }
                        }}
                    />
                )}
            </View>
            <View className='border border-sky-500 mt-4'></View>
            <View>
                {participants.length === 0 && (
                    <View className='flex flex-row space-x-2 items-center'>
                        <ClockIcon size={30} color='#374151' />
                        <Text className='font-nunitoXBold text-gray-700 text-base'>
                            {Helper.formatDate(scheduled_to)}
                        </Text>
                    </View>
                )}
                {participants.length > 0 && (
                    <View className='flex flex-row justify-between items-center mt-4'>
                        <View className='flex flex-row gap-x-2 items-center'>
                            <View className='flex flex-row gap-x-2 items-center'>
                                <Text className='text-2xl text-orange-400 font-nunitoBold'>
                                    {speakers}
                                </Text>
                                <FontAwesomeIcon icon={faMicrophone} color='#fb923c' size={25} />
                            </View>
                            <Text>|</Text>
                            <View className='flex flex-row gap-x-2 items-center'>
                                <Text className='text-2xl text-orange-400 font-nunitoBold'>
                                    {listeners}
                                </Text>
                                <FontAwesomeIcon icon={faHeadphones} color='#fb923c' size={25} />
                            </View>
                        </View>
                        <TouchableOpacity
                            className='bg-yellow-400 rounded-xl flex'
                            onPress={handleJoin}
                        >
                            <Text className='p-2 text-lg font-nunitoBold text-gray-700 px-5'>
                                Join
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
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
            renderItem={({ item, index }) => (
                <EngComRoom
                    horizontal={horizontal}
                    navigation={navigation}
                    room={item}
                    key={index}
                />
            )}
        />
    );
};

export default EngComRooms;
