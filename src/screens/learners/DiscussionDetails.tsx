import Answer from '@component/Answer';
import LearnerProfile from '@component/LearnerProfile';
import LearnerRating from '@component/LearnerRating';
import User from '@component/User';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { DiscussionDetailsScreenProps, FollowersScreenProps, LearnerCommentScreenProps, ReviewLearnerScreenProps, RootStackParamList } from '@type/index';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';

const DiscussionDetails = ({ route, navigation }: DiscussionDetailsScreenProps & { route: RouteProp<RootStackParamList, 'DiscussionDetails'> }) => {
    return (
        <SafeAreaView className='flex flex-1 space-y-3'>
            <View className='w-full h-[10%] bg-white flex items-center px-4 flex-row flex-start space-x-4'>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faXmark} size={25} color='#374151'/>
                </TouchableOpacity>
            </View>
            <ScrollView className='space-y-3 bg-white p-4 rounded-xl w-full h-full'>
                <View className='space-y-3 border-b-[1px] border-gray-300 pb-4'>
                    <View className='flex flex-row justify-between items-center'>
                        <User nameOnRight={true} isModerator={false} room={false} />
                        <Text className='font-nunitoBold text-base text-gray-700'>21h</Text>
                    </View>
                    <TouchableOpacity className='flex items-center justify-center bg-gray-300 p-3 rounded-xl'>
                        <Text className='text-base font-nunitoBold text-gray-700'>Daily Life</Text>
                    </TouchableOpacity>
                    <Text className='text-gray-700 text-lg font-nunitoMedium'>It's pretty hard today but I think that I can handle it by myself. Some people think that I am useless but I will show them in the future.</Text>
                </View>
                <View className=''>
                    <Text className='text-orange-600 text-base font-nunitoBold'>30 answers</Text>
                    <Answer />
                    <Answer />
                    <Answer />
                    <Answer />
                    <Answer />
                    <Answer />
                    <Answer />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DiscussionDetails;