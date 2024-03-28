import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';

const LeaderboardTopUser = ({top, points}) => {
    const handleGetContainerWidth = () => {
        if (top === 1) {
            return 150;
        } else if (top == 2) {
            return 120;
        } else {
            return 100;
        }
    };

    const handleGetImageWidth = () => {
        if (top === 1) {
            return 130;
        } else if (top === 2) {
            return 100;
        }
        return 80;
    };

    return (
        <View className='flex flex-col items-center justify-end space-y-2'>
            <Text className='text-white text-2xl font-nunitoBold'>{top}</Text>
            {top == 1 && <Image source={require('@asset/images/crown.png')} className='w-[70px] h-[50px]'/>}
            <View className={`w-[${handleGetContainerWidth()}px] h-[${handleGetContainerWidth()}px] border rounded-full bg-[#00FFDD] flex items-center justify-center`} style={{elevation: 30, shadowColor: '#00FFDD', shadowOffset: {width: 100, height: 100}, shadowRadius: 30, shadowOpacity: 0.5}}>
                <Image
                    source={require('@asset/images/avatar.jpg')}
                    style={{
                        resizeMode: 'cover',
                        width: handleGetImageWidth(),
                        height: handleGetImageWidth(),
                        borderRadius: handleGetImageWidth() / 2,
                    }}
                />
                </View>
            <Text className='text-white text-lg font-nunitoMedium'>Calphil</Text>
            <Text className='text-[#00FFDD] font-nunitoBold text-lg'>{points}</Text>
        </View>
    );
};

export default LeaderboardTopUser;