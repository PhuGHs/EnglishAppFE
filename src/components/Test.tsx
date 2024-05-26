import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Test = () => {
    return (
        <TouchableOpacity className='w-full flex flex-row w-full bg-slate-200 items-center rounded-lg p-4'>
            <Text className='w-[10%] font-nunitoBold text-gray-700 text-lg'>1</Text>
            <Text className='w-[75%] font-nunitoMedium text-gray-700 text-lg'>Exam test 1</Text>
            <View
                style={{ width: 30, height: 30, borderRadius: 30 / 2 }}
                className='bg-[#15F5BA] flex items-center justify-center w-[15%]'
            >
                <FontAwesomeIcon icon={faCheck} size={22} color='#374151' />
            </View>
        </TouchableOpacity>
    );
};

export default Test;
