import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';

interface IStory {
    id?: number;
    image?: string;
    like: number;
    title: string;
    horizontal?: boolean;
}

interface IStories {
    horizontal: boolean
}

const sample: IStory[] = [
    {
        id: 1,
        like: 4000,
        title: 'Là ai',
    },
    {
        id: 2,
        like: 3400,
        title: 'Ai khổ hơn',
    },
    {
        id: 3,
        like: 4700,
        title: 'Căn bệnh hiểm nghèo',
    },
    {
        id: 4,
        like: 9000,
        title: 'Không cần mất công',
    },
    {
        id: 5,
        like: 9000,
        title: 'Không cần mất công',
    },
    {
        id: 6,
        like: 9000,
        title: 'Không cần mất công',
    },
];

const Story = ({ image, like, title, horizontal }: IStory) => {
    return (
        <TouchableOpacity className={`flex flex-col space-y-2 mt-4 ${horizontal && 'mr-3'}`}>
            <View className="w-[180px] rounded-xl h-[250px] bg-zinc-300">
                <View className="absolute top-2 right-2 bg-gray-400 flex flex-row items-center justify-center space-x-2 p-2 rounded-full">
                    <Text className="text-white font-medium">{like}</Text>
                    <FontAwesomeIcon icon={faHeart} color="#F06D6D" size={20} />
                </View>
            </View>
            <Text className="text-base text-gray-700 text-center">{title}</Text>
        </TouchableOpacity>
    );
};

const Stories = ({horizontal}: IStories) => {
    if(horizontal) {
        return (
            <FlatList
                horizontal={horizontal}
                data={sample}
                renderItem={({ item }) => <Story like={item.like} title={item.title} horizontal={true} />}
                keyExtractor={(item) => `id-${item.id}`}
            />
        );
    }        
    return (
        <FlatList
            data={sample}
            numColumns={2}
            renderItem={({ item }) => <Story like={item.like} title={item.title} />}
            keyExtractor={(item) => `id-${item.id}`}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
    );
};

export default Stories;
