import LearnerProfile from '@component/LearnerProfile';
import LearnerRating from '@component/LearnerRating';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { FollowersScreenProps, LearnerCommentScreenProps, ReviewLearnerScreenProps, RootStackParamList } from '@type/index';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';

const FollowersScreen = ({ route, navigation }: FollowersScreenProps & { route: RouteProp<RootStackParamList, 'FollowersScreen'> }) => {
    return (
        <SafeAreaView className='flex flex-1 space-y-3'>
            <View className='w-full h-[10%] bg-white flex items-center px-4 flex-row flex-start space-x-4'>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faXmark} size={25} color='#374151'/>
                </TouchableOpacity>
                <Text className='text-xl font-nunitoBold text-gray-700'>vpu2.3</Text>
            </View>
            <View className='space-y-3 bg-white p-4 rounded-xl w-full h-full'>
                <Text className='font-nunitoBold text-2xl text-gray-700'>Followers (4)</Text>
            </View>
        </SafeAreaView>
    );
};

export default FollowersScreen;