import React from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';

const Conversation = () => {
    return (
        <TouchableOpacity
            className='flex flex-row justify-start items-center mb-4 bg-white p-2 rounded-2xl'
            style={{ elevation: 10, shadowColor: '#7dd3fc' }}
        >
            <Image
                source={require('@asset/images/avatar.jpg')}
                style={{ resizeMode: 'cover', width: 70, height: 70, borderRadius: 70 / 2 }}
            />
            <View className='flex flex-col gap-y-2 ml-3'>
                <Text className='text-gray-700 font-nunitoBold text-xl'>Phu Le</Text>
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        width: '100%',
                    }}
                >
                    <Text className='w-fit text-gray-500 text-base font-nunitoSemi'>
                        Is it fine?
                    </Text>
                    <Text className='text-gray-400 text-base font-nunitoSemi'>11/20/2022</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const Conversations = () => {
    return (
        <ScrollView className='mb-[120px]'>
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
        </ScrollView>
    );
};

export default Conversations;
