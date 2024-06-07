import { TLeaderboardDto } from '@type/T-type';
import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';

interface ILeaderboardTopUser {
    item: TLeaderboardDto;
    index: number;
}

const LeaderboardTopUser = ({ item, index }: ILeaderboardTopUser) => {
    const handleGetContainerWidth = () => {
        if (index === 1) {
            return 150;
        } else if (index == 2) {
            return 120;
        } else {
            return 100;
        }
    };

    const handleGetImageWidth = () => {
        if (index === 1) {
            return 130;
        } else if (index === 2) {
            return 100;
        }
        return 80;
    };

    return (
        <View className='flex flex-col items-center justify-end space-y-2'>
            <Text className='text-white text-2xl font-nunitoBold'>{index}</Text>
            {index == 1 && (
                <Image source={require('@asset/images/crown.png')} className='w-[70px] h-[50px]' />
            )}
            <View
                className={`w-[${handleGetContainerWidth()}px] h-[${handleGetContainerWidth()}px] border rounded-full bg-[#00FFDD] flex items-center justify-center`}
                style={{
                    elevation: 30,
                    shadowColor: '#00FFDD',
                    shadowOffset: { width: 100, height: 100 },
                    shadowRadius: 30,
                    shadowOpacity: 0.5,
                }}
            >
                <Image
                    source={{ uri: item?.user?.profile_picture }}
                    style={{
                        resizeMode: 'cover',
                        width: handleGetImageWidth(),
                        height: handleGetImageWidth(),
                        borderRadius: handleGetImageWidth() / 2,
                    }}
                />
            </View>
            <Text className='text-white text-lg font-nunitoMedium'>{item?.user?.full_name}</Text>
            <Text className='text-[#00FFDD] font-nunitoBold text-lg'>{item?.score}</Text>
        </View>
    );
};

export default LeaderboardTopUser;
