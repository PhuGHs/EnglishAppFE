import { Helper } from '@root/utils/helper';
import { TAnswer } from '@type/T-type';
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

interface IAnswer {
    answer: TAnswer;
}

const Answer = ({ answer }: IAnswer) => {
    return (
        <View className='flex flex-row py-4 border-b-[1px] border-gray-400'>
            <TouchableOpacity className='w-[17%] flex items-center justify-start'>
                <Image
                    source={{ uri: answer.user.profile_picture }}
                    style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 50 / 2 }}
                />
            </TouchableOpacity>
            <View className='w-[83%] flex flex-col justify-center items-start'>
                <TouchableOpacity className='flex flex-row space-x-2 items-center'>
                    <Text className='text-lg font-nunitoBold text-gray-700'>
                        {answer.user.full_name}
                    </Text>
                    <Text className='text-base font-nunitoSemi text-gray-400'>
                        {Helper.calculateTimeAgo(answer.created_date)}
                    </Text>
                </TouchableOpacity>
                <View>
                    <Text className='text-lg font-nunitoMedium text-gray-700'>
                        {answer.answer_text}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Answer;
