import React from 'react';
import { Text, View } from 'react-native';
import SearchBar from '@component/SearchBar';
import UserProfileSearch from '@component/UserProfileSearch';

const LevelTab = () => {
    return (
        <View className="flex mx-3">
            <View className="mt-4">
                <SearchBar />
            </View>
            <UserProfileSearch />
        </View>
    );
};

export default LevelTab;
