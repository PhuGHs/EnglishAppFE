import Conversations from '@component/Conversations';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@component/SearchBar';

const ChatScreen = () => {
    return (
        <SafeAreaView className='flex mx-3'>
            <View className='flex flex-col justify-between mb-4'>
                <Text className='text-center w-full text-sky-500 font-semibold text-3xl my-2'>Chat</Text>
                <SearchBar />
            </View>
            <Conversations />
        </SafeAreaView>
    );
};

export default ChatScreen;