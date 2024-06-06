import { TFilter } from '@type/T-type';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface IFilter {
    filter: TFilter;
    handleSelectFilter: () => void;
}

const Filter = ({ filter, handleSelectFilter }: IFilter) => {
    const { filterName, isSelected } = filter;
    return (
        <TouchableOpacity
            onPress={handleSelectFilter}
            className={`${isSelected ? 'bg-sky-400' : 'bg-sky-100'} px-4 py-2 rounded-lg m-2`}
        >
            <Text
                className={`${isSelected ? 'text-white' : 'text-sky-400'} text-base font-nunitoMedium`}
            >
                {filterName}
            </Text>
        </TouchableOpacity>
    );
};

export default Filter;
