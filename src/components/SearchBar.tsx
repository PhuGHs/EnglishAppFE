import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';

interface ISearchBar {
    handleNavigation?: () => void;
}

const SearchBar = ({ handleNavigation }: ISearchBar) => {
    return (
        <View
            className='flex flex-row bg-white p-2 items-center rounded-xl mb-2'
            style={{ elevation: 4 }}
        >
            <View className='mx-1'>
                <MagnifyingGlassIcon color='#6b7280' size={28} />
            </View>
            <TextInput
                placeholder='Search ...'
                placeholderTextColor='#6b7280'
                className='w-full h-full ml-2 py-1 text-xl text-gray-700'
                onFocus={handleNavigation}
            />
        </View>
    );
};

export default SearchBar;
