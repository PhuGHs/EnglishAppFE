import React from 'react';
import { View, Text } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import User from './User';

export interface ILearnerRating {}

const LearnerRating = () => {
    return (
        <View className='p-4 flex w-full h-fit bg-white rounded-2xl' style={{ elevation: 15 }}>
            <StarRatingDisplay rating={4} starSize={25} color='#1e293b' />
            <Text className='p-2 text-base font-nunitoMedium text-gray-700'>
                An absolutely wonderful car to drive. Simply lovely! Sometimes it's almost too easy
                to drive.
            </Text>
            <View className='flex items-center justify-center'>
                <View className='border-[1px] w-[100%] border-gray-300'></View>
            </View>
            <View className='py-2'>
                <User isModerator={false} nameOnRight={true} room={false} />
            </View>
        </View>
    );
};

export default LearnerRating;
