import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';

const SearchBar = () => {
    return (
        <View
            className="flex flex-row bg-white p-2 items-center rounded-xl mb-2"
            style={{ elevation: 10, shadowColor: '#7dd3fc' }}
        >
            <MagnifyingGlassIcon color="#d4d4d4" size={30} />
            <TextInput
                placeholder="Find who you want ..."
                className="w-full h-full ml-2 text-xl text-gray-300"
            />
        </View>
    );
};

export default SearchBar;
