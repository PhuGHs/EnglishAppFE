import { TLeaderboardDto } from '@type/T-type';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface ILeaderboardUser {
    item: TLeaderboardDto;
    index: number;
}

const LeaderboardUser = ({ item, index }: ILeaderboardUser) => {
    return (
        <View className='flex flex-row justify-between items-center w-full my-2'>
            <Text className='font-nunitoBold text-white text-base w-[5%]'>{index}</Text>
            <View className='flex flex-row rounded-[30px] w-[85%] bg-white/[.3] items-center justify-between pr-5'>
                <View className='flex flex-row items-center space-x-6 '>
                    <Image
                        source={{ uri: item?.user?.profile_picture }}
                        style={{
                            resizeMode: 'cover',
                            width: 60,
                            height: 60,
                            borderRadius: 60 / 2,
                        }}
                    />
                    <Text className='text-white font-nunitoMedium text-[19px]'>
                        {item?.user?.full_name}
                    </Text>
                </View>
                <Text className='text-[#00FFDD] font-nunitoBold text-[19px]'>{item?.score}</Text>
            </View>
        </View>
    );
};

export default LeaderboardUser;
