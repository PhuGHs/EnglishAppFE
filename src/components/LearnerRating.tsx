import { TReview } from '@type/T-type';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

export interface ILearnerRating {
    rating: TReview;
}

const LearnerRating = ({ rating }: ILearnerRating) => {
    const { full_name, profile_picture, english_level } = rating.user_who_reviewed;
    const { comment } = rating;
    return (
        <View className='m-2'>
            <View className='p-4 flex w-full h-fit bg-white rounded-2xl' style={{ elevation: 15 }}>
                <StarRatingDisplay rating={4} starSize={25} color='#1e293b' />
                <Text className='p-2 text-base font-nunitoMedium text-gray-700'>{comment}</Text>
                <View className='flex items-center justify-center'>
                    <View className='border-[1px] w-[100%] border-gray-300'></View>
                </View>
                <View className='pt-2 flex flex-row space-x-2'>
                    <Image
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 60 / 2,
                        }}
                        source={{ uri: profile_picture }}
                    />
                    <View className='flex-col justify-evenly'>
                        <Text className='text-gray-700 font-nunitoBold text-lg'>{full_name}</Text>
                        <Text className='text-sky-600 font-nunitoSemi text-base'>
                            {english_level.levelName}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default LearnerRating;
