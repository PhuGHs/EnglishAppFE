import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CalendarDaysIcon, CalendarIcon } from 'react-native-heroicons/solid';

const FilterButton = () => {
    return (
        <TouchableOpacity className="flex flex-row justify-between space-x-4 bg-[#D2E9FF] p-3 rounded-xl border-[#A2D2FF] border">
            <Text className="text-[#005DB2] text-base font-bold">3/5/2024</Text>
            <CalendarIcon size={25} color="#005DB2" />
        </TouchableOpacity>
    );
};

export default FilterButton;
