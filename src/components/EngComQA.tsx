import React from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import User from './User';
import { TDiscussionDto } from '@type/T-type';
import { Helper } from '@root/utils/helper';

export interface IEngComQAs {
    horizontal: boolean;
    data: TDiscussionDto[];
    navigation;
}

interface IEngComQA {
    horizontal: boolean;
    item: TDiscussionDto;
    navigation;
}

const EngComQA = ({ horizontal, item, navigation }: IEngComQA) => {
    return (
        <View
            className={`bg-white ${horizontal ? 'w-[360px]' : 'w-full'} rounded-xl p-4 space-y-4 mr-2 my-2`}
            style={{ elevation: 10, shadowColor: '#7dd3fc' }}
        >
            <View className='flex flex-row justify-between items-center'>
                <User user={item.user} isModerator={true} nameOnRight={true} room={false} />
                <Text className='text-gray-500 font-nunitoBold'>
                    • {Helper.calculateTimeAgo(item.created_date)}
                </Text>
            </View>
            <View className='flex items-center justify-center bg-gray-300 rounded-lg'>
                <Text className='p-2 font-nunitoSemi text-base'>{item.topic.name}</Text>
            </View>
            <Text className='text-base'>{item.title}</Text>
            <TouchableOpacity
                onPress={() => navigation.push('DiscussionDetails', { discussionId: item.id })}
            >
                <Text className='font-nunitoBold text-orange-400 text-base'>
                    {item.number_of_answers} {item.number_of_answers > 1 ? 'answers' : 'answer'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const EngComQAs = ({ horizontal, data, navigation }: IEngComQAs) => {
    return (
        <FlatList
            horizontal={horizontal}
            data={data}
            renderItem={({ item }) => (
                <EngComQA navigation={navigation} horizontal={horizontal} item={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default EngComQAs;
