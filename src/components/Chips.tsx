import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface ChipsProps {
    chips: ChipProps[];
    searchOptions: boolean;
}

export interface ChipProps {
    isSelected: boolean;
    chipName: string;
    searchOptions?: boolean;
}

const Chip = ({ isSelected, chipName, searchOptions }: ChipProps) => {
    return (
        <View
            className={`${searchOptions ? 'px-2 py-1' : 'p-4'} flex justify-center items-center m-1 rounded-full ${isSelected ? 'bg-sky-300' : 'bg-sky-100'}`}
        >
            <TouchableOpacity>
                <Text
                    className={`text-[#0174BE] text-base ${isSelected && 'font-bold text-white'}`}
                >
                    {chipName}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const Chips = ({ chips, searchOptions }: ChipsProps) => {
    return (
        <View className="flex flex-row flex-wrap  gap-1">
            {chips.map((value, index) => (
                <Chip
                    isSelected={value.isSelected}
                    searchOptions={searchOptions}
                    chipName={value.chipName}
                    key={index}
                />
            ))}
        </View>
    );
};

export default Chips;
