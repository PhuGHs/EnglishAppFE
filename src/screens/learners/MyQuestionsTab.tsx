import EngComQAs from '@component/EngComQA';
import SearchBar from '@component/SearchBar';
import React from 'react';
import { Text, View } from 'react-native';

const MyQuestionsTab = () => {
    return (
        <View className='flex bg-neutral-100 flex-1 p-3'>
            <SearchBar />
            <EngComQAs horizontal={false} />
        </View>
    );
};

export default MyQuestionsTab;
