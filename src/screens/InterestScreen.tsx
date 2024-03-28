import Chips, { ChipProps, ChipsProps } from '@root/components/Chips';
import { InterestScreenProps } from '@root/types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const arr: ChipProps[] = [
    { isSelected: true, chipName: 'Reading novels' },
    { isSelected: false, chipName: 'Music' },
    { isSelected: false, chipName: 'IELTS' },
    { isSelected: false, chipName: 'Playing games' },
    { isSelected: false, chipName: 'Coding' },
    { isSelected: true, chipName: 'Dancing' },
    { isSelected: false, chipName: 'Technology' },
    { isSelected: false, chipName: 'Study' },
    { isSelected: false, chipName: 'Painting' },
    { isSelected: false, chipName: 'Photography' },
    { isSelected: false, chipName: 'Writing' },
    { isSelected: true, chipName: 'Bread-making' },
    { isSelected: false, chipName: 'Board games' },
    { isSelected: true, chipName: 'Card games' },
];

const InterestScreen = ({ navigation }: InterestScreenProps) => {
    return (
        <SafeAreaView className='flex-1 bg-neutral-100 px-4 space-y-4 justify-between'>
            <View>
                <View className='flex flex-col gap-2 mt-2'>
                    <Text className='text-3xl text-[#3085C3] font-nunitoSemi'>Choose your</Text>
                    <Text className='text-6xl font-nunitoBold text-[#3085C3]'>Interests</Text>
                    <Text className='text-lg text-[#3085C3]'>
                        Get better friends recommendation
                    </Text>
                </View>
                <Chips chips={arr} searchOptions={false} />
            </View>
            <TouchableOpacity
                className='rounded-2xl bg-yellow-400 p-4 mb-5 flex justify-center items-center'
                onPress={() => navigation.navigate('EnglishTest')}
            >
                <Text className='font-nunitoBold text-gray-700 text-xl'>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default InterestScreen;
