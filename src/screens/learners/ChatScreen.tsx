import Conversations from '@component/Conversations';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@component/SearchBar';
import { TabsScreenProps } from '@type/index';

const ChatScreen = ({ navigation }: TabsScreenProps) => {
    const handlePress = (roomId) => {
        if (!roomId) {
            return;
        }
        navigation.navigate('DetailChat', { roomId: roomId });
    };
    return (
        <SafeAreaView className='flex px-4 bg-slate-100'>
            <View className='flex flex-col justify-between mb-4'>
                <Text className='text-center w-full text-sky-600 font-semibold text-2xl my-4'>
                    Chats
                </Text>
                <SearchBar />
            </View>
            <Conversations navigateToDetails={handlePress}/>
        </SafeAreaView>
    );
};

export default ChatScreen;
