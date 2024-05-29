import React from 'react';
import { Text, View } from 'react-native';
import SearchBar from '@component/SearchBar';
import UserProfileSearch from '@component/UserProfileSearch';

const LevelTab = () => {
    return (
        <View className='flex bg-slate-100 px-3'>
            <View className='my-4'>
                <SearchBar />
            </View>
            <UserProfileSearch />
        </View>
    );
};

export default LevelTab;
