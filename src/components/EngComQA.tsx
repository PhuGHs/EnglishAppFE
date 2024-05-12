import React from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import User from './User';
import { TEngcomAsk } from '@type/index';

export interface IEngComQAs {
    horizontal: boolean;
}

const data: TEngcomAsk[] = [
    {
        id: 1,
        user: {
            userId: 1,
            fullName: 'Le Van Phu',
            profilePicture: '',
            englishLevel: {
                levelId: 1,
                levelName: 'Intermediate',
                description: '',
            },
        },
        title: 'It is long established face that a reader will be distracted by the readable content of a page when looking at its layout',
        topic: {
            topicId: 1,
            header: 'Daily routines',
            content: '',
            englishLevelId: 1,
        },
        numberOfAnswers: 3,
        createdAt: '2024-05-08 16:09:32.714176',
        updatedAt: '2024-05-08 16:09:32.714176',
    },
    {
        id: 2,
        user: {
            userId: 1,
            fullName: 'Le Van Phu',
            profilePicture: '',
            englishLevel: {
                levelId: 1,
                levelName: 'Intermediate',
                description: '',
            },
        },
        title: 'It is long established face that a reader will be distracted by the readable content of a page when looking at its layout',
        topic: {
            topicId: 1,
            header: 'Daily routines',
            content: '',
            englishLevelId: 1,
        },
        numberOfAnswers: 3,
        createdAt: '2024-05-08 16:09:32.714176',
        updatedAt: '2024-05-08 16:09:32.714176',
    },
    {
        id: 3,
        user: {
            userId: 1,
            fullName: 'Le Van Phu',
            profilePicture: '',
            englishLevel: {
                levelId: 1,
                levelName: 'Intermediate',
                description: '',
            },
        },
        title: 'It is long established face that a reader will be distracted by the readable content of a page when looking at its layout',
        topic: {
            topicId: 1,
            header: 'Daily routines',
            content: '',
            englishLevelId: 1,
        },
        numberOfAnswers: 3,
        createdAt: '2024-05-08 16:09:32.714176',
        updatedAt: '2024-05-08 16:09:32.714176',
    },
];

const EngComQA = () => {
    return (
        <View
            className='bg-white w-[360px] rounded-xl p-4 space-y-4 mr-2 my-2'
            style={{ elevation: 10, shadowColor: '#7dd3fc' }}
        >
            <View className='flex flex-row justify-between items-center'>
                <User isModerator={true} nameOnRight={true} room={false} />
                <Text className='text-gray-500 font-nunitoBold'>• 41m</Text>
            </View>
            <View className='flex items-center justify-center bg-gray-300 rounded-lg'>
                <Text className='p-2 font-nunitoSemi text-base'>Other - English</Text>
            </View>
            <Text className='text-base'>
                It is long established fact that a reader will be distracted by the readable content
                of a page when looking at its layout.
            </Text>
            <TouchableOpacity>
                <Text className='font-nunitoBold text-orange-400 text-base'>10 answers</Text>
            </TouchableOpacity>
        </View>
    );
};

const EngComQAs = ({ horizontal }: IEngComQAs) => {
    return (
        <FlatList
            horizontal={horizontal}
            data={data}
            renderItem={({ item }) => <EngComQA />}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default EngComQAs;
