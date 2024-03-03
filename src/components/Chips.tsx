import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export interface ChipsProps {
    chips: ChipProps[]
}

export interface ChipProps {
    isSelected: boolean;
    chipName: string;
}

const Chip = ({ isSelected, chipName } : ChipProps) => {
    return (
        <View className={`p-4 flex justify-center items-center m-1 rounded-full ${isSelected ? 'bg-sky-300': 'bg-sky-100'}`}>
            <TouchableOpacity>
                <Text className={`text-blue-600 text-base ${isSelected && 'font-bold'}`}>{chipName}</Text>
            </TouchableOpacity>
        </View>
    );
};

const Chips = ({ chips } : ChipsProps) => {
    return (
        <View className='flex flex-row flex-wrap mt-6'>
            {chips.map((value, index) => <Chip isSelected={value.isSelected} chipName={value.chipName} key={index} />)}
        </View>
    );
};


export default Chips;