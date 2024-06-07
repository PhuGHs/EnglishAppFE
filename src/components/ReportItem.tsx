import { Helper } from '@root/utils/helper';
import { TReportDto } from '@type/T-type';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface IReportItem {
    press: () => void;
    item: TReportDto;
}

const ReportItem = ({ press, item }: IReportItem) => {
    return (
        <TouchableOpacity
            className='w-full flex flex-row space-y-2 items-center bg-white rounded-xl p-4 my-2'
            onPress={press}
        >
            <View className='w-[70%]'>
                <Text className='text-lg text-gray-700 font-nunitoBold text-sky-400'>
                    REPORT #{item.id}
                </Text>
                <Text className='text-lg text-gray-700 font-nunitoSemi'>
                    Reporter: {item.reporter.full_name}
                </Text>
                <Text className='text-lg text-red-400'>
                    {item.is_solved ? 'Solved' : 'Not yet'}
                </Text>
            </View>
            <Text className='w-[30%] text-lg text-gray-700'>
                {Helper.formatReportDate(item.created_date)}
            </Text>
        </TouchableOpacity>
    );
};

export default ReportItem;
