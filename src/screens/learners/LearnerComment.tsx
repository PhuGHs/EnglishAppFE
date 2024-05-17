import LearnerRating from '@component/LearnerRating';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { LearnerCommentScreenProps, RootStackParamList } from '@type/index';
import React from 'react';
import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native';

const LearnerComment = ({ route, navigation }: LearnerCommentScreenProps & { route: RouteProp<RootStackParamList, 'LearnerComment'> }) => {
    return (
        <SafeAreaView className='flex px-4 space-y-3'>
            <View className='my-6'>
                <View className='flex flex-row mb-5 items-center justify-between'>
                    <TouchableOpacity className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px]' onPress={() => navigation.pop()}>
                        <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='text-center text-sky-600 text-[22px] font-nunitoSemi'>
                        Reviews / Comments
                    </Text>
                    <View>
                    </View>
                </View>
            </View>
            <View>
                <LearnerRating />
            </View>
        </SafeAreaView>
    );
};

export default LearnerComment;