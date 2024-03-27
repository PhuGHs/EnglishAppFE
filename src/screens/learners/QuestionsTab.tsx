import EngComQAs from '@component/EngComQA';
import React from 'react';
import { Text, View } from 'react-native';
import SearchBar from '@component/SearchBar';

const QuestionsTab = () => {
    return (
        <View className="flex bg-neutral-100 flex-1 p-3">
            <SearchBar />
            <EngComQAs horizontal={false} />
        </View>
    );
};

export default QuestionsTab;
