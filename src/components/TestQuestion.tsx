import { TQuestionDto, TUserAnswerDto } from '@type/T-type';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ITestQuestion {
    item: TQuestionDto,
    index: number,
    onSelectOption: (question_id: number, selected_option_id: number) => void,
    answers: TUserAnswerDto[]
}

const TestQuestion = ({ item, index, onSelectOption, answers }: ITestQuestion) => {
    const selectedOption = answers.find(ans => ans.question_id === item.question_id)?.selected_option_id;
    return (
        <View className='flex flex-col space-y-3 mb-5'>
            <View className='flex flex-row space-x-2'>
                <Text className='text-slate-700 font-nunitoBold text-lg'>{index + 1}.</Text>
                <Text className='text-slate-700 font-nunitoBold text-lg'>{item.question_name}</Text>
            </View>
            <View className='flex flex-col space-y-2'>
                {item.options.map(option => (
                    <TouchableOpacity
                        key={option.option_id}
                        onPress={() => onSelectOption(item.question_id, option.option_id)}
                        className={`p-3 rounded-xl ${
                            selectedOption === option.option_id ? 'bg-sky-400' : 'bg-gray-200'
                        }`}
                    >   
                        <Text className={`text-base font-nunitoSemi ${selectedOption === option.option_id ? 'text-white' : 'text-slate-700'}`}>{option.option_name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default TestQuestion;