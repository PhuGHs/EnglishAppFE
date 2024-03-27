import React from 'react';
import { Image, View, Text } from 'react-native';
import { StarIcon } from 'react-native-heroicons/solid';

interface IUserProps {
    room: boolean;
    isModerator: boolean;
    nameOnRight: boolean;
}

const User = ({ isModerator, nameOnRight = false, room }: IUserProps) => {
    return (
        <View
            className={`w-fit h-fit flex mr-2 mt-2 justify-center ${nameOnRight ? 'flex-row' : 'flex-col'}`}
        >
            <View className="w-fit h-fit flex">
                {isModerator && room ? (
                    <Image
                        source={require('@asset/images/avatar.jpg')}
                        style={{ resizeMode: 'cover', width: 90, height: 90, borderRadius: 90 / 2 }}
                    />
                ) : (
                    <Image
                        source={require('@asset/images/avatar.jpg')}
                        style={{ resizeMode: 'cover', width: 60, height: 60, borderRadius: 60 / 2 }}
                    />
                )}
                {isModerator && (
                    <View className="flex flex-row items-center absolute left-0 bottom-1 bg-white rounded-2xl">
                        <Text className="font-bold text-gray-700">4.2 </Text>
                        <StarIcon color="#facc15" size={20} />
                    </View>
                )}
            </View>
            <View
                className={`flex flex-col ${nameOnRight ? 'items-start' : 'items-center'} justify-evenly ml-2`}
            >
                <Text
                    className={`text-center font-bold text-gray-700 ${nameOnRight ? 'text-xl' : ''}`}
                >
                    PhuGHs
                </Text>
                {nameOnRight && (
                    <Text className="text-[#005DB2] text-base font-medium">Intermediate</Text>
                )}
            </View>
        </View>
    );
};

export default User;
