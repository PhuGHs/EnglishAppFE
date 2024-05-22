import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface ChipsProps {
    chips: ChipProps[];
    searchOptions: boolean;
    handleChipPress: (index: number) => void;
    square?: boolean;
    radio?: boolean;
}

export interface ChipProps {
    id: number;
    isSelected: boolean;
    chipName: string;
    searchOptions?: boolean;
    handleChipPress?: (index: number) => void;
    square?: boolean;
    radio?: boolean;
}

const Chip = ({ id, isSelected, radio, square, chipName, searchOptions, handleChipPress }: ChipProps) => {
    const handlePress = () => {
        if (radio) {
            if (!isSelected) {
                handleChipPress(id);
            }
        } else {
            handleChipPress(id);
        }
    };
    return (
        <TouchableOpacity
            onPress={handlePress}
            className={`${searchOptions ? 'px-2 py-1' : 'p-4'} flex justify-center items-center m-1 ${square ? 'px-8 py-3 rounded-xl' : 'rounded-full'} ${isSelected ? 'bg-sky-400' : 'bg-sky-100'}`}
        >
            <View>
                <Text
                    className={`text-[#0174BE] font-nunitoMedium text-base ${isSelected ? 'font-nunitoBold text-white' : ''}`}
                >
                    {chipName}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const Chips = ({ chips, searchOptions, handleChipPress, square, radio }: ChipsProps) => {
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
                    radio={radio}
                    square={square}
                />
            ))}
        </View>
    );
};

export default Chips;
