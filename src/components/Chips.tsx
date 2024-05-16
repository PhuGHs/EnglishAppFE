import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface ChipsProps {
    chips: ChipProps[];
    searchOptions: boolean;
    handleChipPress: (index: number) => void;
}

export interface ChipProps {
    id: number;
    isSelected: boolean;
    chipName: string;
    searchOptions?: boolean;
    handleChipPress?: (index: number) => void;
}

const Chip = ({ id, isSelected, chipName, searchOptions, handleChipPress }: ChipProps) => {
    return (
        <View
            className={`${searchOptions ? 'px-2 py-1' : 'p-4'} flex justify-center items-center m-1 rounded-full ${isSelected ? 'bg-sky-300' : 'bg-sky-100'}`}
        >
            <TouchableOpacity onPress={() => handleChipPress?.(id)}>
                <Text
                    className={`text-[#0174BE] text-base ${isSelected ? 'font-nunitoBold text-white' : ''}`}
                >
                    {chipName}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const Chips = ({ chips, searchOptions, handleChipPress }: ChipsProps) => {
    return (
        <View className='flex flex-row flex-wrap gap-1'>
            {chips.map((value, index) => (
                <Chip
                    id={value.id}
                    isSelected={value.isSelected}
                    searchOptions={searchOptions}
                    chipName={value.chipName}
                    handleChipPress={handleChipPress}
                    key={index}
                />
            ))}
        </View>
    );
};

export default Chips;
