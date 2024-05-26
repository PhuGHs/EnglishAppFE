import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

const Answer = () => {
    return (
        <View className='flex flex-row py-4 border-b-[1px] border-gray-400'>
            <TouchableOpacity className='w-[17%] flex items-center justify-start'>
                <Image
                    source={require('@asset/images/avatar.jpg')}
                    style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }}
                />
            </TouchableOpacity>
            <View className='w-[83%] flex flex-col justify-center items-start'>
                <TouchableOpacity className='flex flex-row space-x-2 items-center'>
                    <Text className='text-xl font-nunitoBold text-gray-700'>ddoaivv</Text>
                    <Text className='text-base font-nunitoSemi text-gray-400'>21h</Text>
                </TouchableOpacity>
                <View>
                    <Text className='text-lg font-nunitoMedium text-gray-700'>
                        Hello there, actually hes the GOAT, messi, nobody can can be compared to him
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Answer;
