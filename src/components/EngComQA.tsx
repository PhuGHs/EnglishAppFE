import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import User from './User';

const EngComQA = () => {
    return (
        <View className='bg-white w-full rounded-xl p-4 w-[350px] space-y-4 mr-2' style={{elevation: 10, shadowColor: '#7dd3fc'}}>
            <View className='flex flex-row justify-between items-center'>
                <User isModerator={true} nameOnRight={true} room={false} />
                <Text className='text-gray-500 font-bold'>• 41m</Text>
            </View>
            <View className='flex items-center justify-center bg-gray-300 rounded-lg'>
                <Text className='p-2 font-medium text-base'>Other - English</Text>
            </View>
            <Text className='text-base'>It is long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
            <TouchableOpacity>
                <Text className='font-bold text-orange-400 text-base'>10 answers</Text>
            </TouchableOpacity>
        </View>
    );
};

const EngComQAs = () => {
    return (
        <ScrollView horizontal={true} className='flex flex-row w-full mt-4'>
            <EngComQA />
            <EngComQA />
            <EngComQA />
            <EngComQA />
        </ScrollView>
    );
};

export default EngComQAs;