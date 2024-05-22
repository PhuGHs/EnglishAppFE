import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface IReportItem {
    press: () => void;
}

const ReportItem = ({ press }: IReportItem) => {
    return (
        <TouchableOpacity 
            className='w-full flex flex-row space-y-2 items-center bg-white rounded-xl p-4 my-4'
            onPress={press}    
        >
            <View className='w-[70%]'>
                <Text className='text-lg text-gray-700 font-nunitoBold text-sky-400'>REPORT #1</Text>
                <Text className='text-lg text-gray-700 font-nunitoSemi'>Reporter: Le Van Phu</Text>
                <Text className='text-lg text-red-400'>Not yet</Text>
            </View>
            <Text className='w-[30%] text-lg text-gray-700'>22/05/2024</Text>
        </TouchableOpacity>
    );
};

export default ReportItem;