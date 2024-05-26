import LearnerRating from '@component/LearnerRating';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { LearnerCommentScreenProps, RootStackParamList } from '@type/index';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LearnerComment = ({
    route,
    navigation,
}: LearnerCommentScreenProps & { route: RouteProp<RootStackParamList, 'LearnerComment'> }) => {
    return (
        <SafeAreaView className='flex flex-1 space-y-3'>
            <View className='w-full h-[10%] bg-white flex items-center px-4 flex-row flex-start space-x-4'>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <FontAwesomeIcon icon={faXmark} size={25} color='#374151' />
                </TouchableOpacity>
                <Text className='text-xl font-nunitoBold text-gray-700'>vpu2.3</Text>
            </View>
            <View className='space-y-3 bg-white p-4 rounded-xl w-full h-full'>
                <Text className='font-nunitoBold text-2xl text-gray-700'>Reviews (4)</Text>
                <View className='py-4 space-y-4'>
                    <LearnerRating />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LearnerComment;
