import LearnerRating from '@component/LearnerRating';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { LearnerCommentScreenProps, ReviewLearnerScreenProps, RootStackParamList } from '@type/index';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';

const ReviewLearner = ({ route, navigation }: ReviewLearnerScreenProps & { route: RouteProp<RootStackParamList, 'ReviewLearner'> }) => {
    const [starCount, setStarCount] = useState<number>(0);
    const handleStarRatingPress = (rating: number) => {
        setStarCount(rating);
    };

    const {
        value: thoughts,
        handleInputChange: handleThoughtsChange,
        handleInputBlur: handleThoughtsBlur,
        setEnteredValue: setThoughtsValue,
        hasError: thoughtsHasError
    } = useInput({defaultValue: '', validationFn: () => true});

    const wordCount = thoughts.trim().split(/\s+/).length;
    const remainingWords = 100 - wordCount;

    return (
        <SafeAreaView className='flex flex-1 space-y-3'>
            <View className='w-full h-[10%] bg-white flex justify-center px-4'>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faXmark} size={25} color='#7F7F81'/>
                </TouchableOpacity>
            </View>
            <View className='flex-1 bg-white rounded-2xl flex p-6 flex-col justify-between'>
                <View className='space-y-3'>
                    <Text className='font-nunitoBold text-2xl text-gray-700'>How many stars would you rate this learner?</Text>
                    <StarRating maxStars={5} starSize={40} rating={starCount} onChange={handleStarRatingPress} color='#fbbf24'/>
                    <View className='w-full flex-col border-2 border-[#C7C7C7] rounded-lg p-2'>
                        <TextInput
                            className='w-full mb-8 font-nunitoMedium text-[20px] text-gray-700'
                            multiline={true}
                            value={thoughts}
                            onChange={handleThoughtsChange}
                            onBlur={handleThoughtsBlur}
                            placeholder='Share your thoughts up here so people can access to that'

                        />
                        <Text className='text-[#F3641A] text-right font-nunitoMedium'>{remainingWords} words remaining</Text>
                    </View>
                </View>
                <View className='items-center'>
                    <TouchableOpacity className='bg-yellow-400 px-4 py-3 rounded-xl' style={{elevation: 5}}>
                        <Text className='font-nunitoXBold text-white text-lg'>Comment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ReviewLearner;