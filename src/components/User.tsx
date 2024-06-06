import { TUserNecessary } from '@type/T-type';
import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { StarIcon } from 'react-native-heroicons/solid';

interface IUserProps {
    room: boolean;
    isModerator: boolean;
    nameOnRight: boolean;
    user?: TUserNecessary;
    press?: () => void;
}

const User = ({ press, isModerator, nameOnRight = false, room, user }: IUserProps) => {
    return (
        <TouchableOpacity
            onPress={press}
            className={`w-fit h-fit flex mr-2 mt-2 ${nameOnRight ? 'flex-row' : 'flex-col'}`}
        >
            <View className='w-fit h-fit flex'>
                {isModerator && room ? (
                    <Image
                        source={
                            user
                                ? { uri: user.profile_picture }
                                : require('@asset/images/avatar.jpg')
                        }
                        style={{ resizeMode: 'cover', width: 80, height: 80, borderRadius: 80 / 2 }}
                    />
                ) : (
                    <Image
                        source={
                            user
                                ? { uri: user.profile_picture }
                                : require('@asset/images/avatar.jpg')
                        }
                        style={{ resizeMode: 'cover', width: 60, height: 60, borderRadius: 60 / 2 }}
                    />
                )}
                {isModerator && (
                    <View className='flex flex-row items-center absolute left-0 bottom-1 bg-white rounded-2xl'>
                        <Text className='font-nunitoBold text-gray-700'>{4.2} </Text>
                        <StarIcon color='#facc15' size={20} />
                    </View>
                )}
            </View>
            <View
                className={`flex flex-col ${nameOnRight ? 'items-start' : 'items-center'} justify-evenly ml-2`}
            >
                <Text
                    className={`text-center font-nunitoBold text-gray-700 ${nameOnRight ? 'text-lg' : ''}`}
                >
                    {user ? user.full_name : 'PhuGHs'}
                </Text>
                {nameOnRight && (
                    <Text className='text-[#005DB2] text-base font-nunitoSemi'>
                        {user.english_level_name
                            ? user.english_level_name
                            : user.english_level.levelName}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default User;
