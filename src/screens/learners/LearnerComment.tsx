import LearnerRating from '@component/LearnerRating';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { FollowerApi } from '@root/api/follower.api';
import { TReview } from '@type/T-type';
import { LearnerCommentScreenProps, RootStackParamList } from '@type/index';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const LearnerComment = ({
    route,
    navigation,
}: LearnerCommentScreenProps & { route: RouteProp<RootStackParamList, 'LearnerComment'> }) => {
    const { userId, username } = route.params;

    const [reviews, setReviews] = useState<TReview[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const { data, message, status } = await FollowerApi.getReviews(userId);
            if (status === 'SUCCESS') {
                setReviews(data);
            }
        };
        fetch();
    }, [userId]);
    return (
        <SafeAreaView className='flex bg-slate-100 flex-1 space-y-3'>
            <View className='w-full h-[10%] bg-white flex items-center px-4 flex-row flex-start space-x-4'>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <FontAwesomeIcon icon={faXmark} size={25} color='#374151' />
                </TouchableOpacity>
                <Text className='text-xl font-nunitoBold text-gray-700'>{username}</Text>
            </View>
            <View className='space-y-3 bg-white p-4 rounded-xl w-full h-full'>
                <Text className='font-nunitoBold text-2xl text-gray-700'>
                    Reviews ({reviews.length})
                </Text>
                <View className='py-4 space-y-4'>
                    {reviews.length > 0 ? (
                        <FlatList
                            data={reviews}
                            keyExtractor={(item, index) => item.review_id.toString()}
                            renderItem={({ item, index }) => (
                                <LearnerRating key={index} rating={item} />
                            )}
                        />
                    ) : (
                        <Text className='text-gray-700 text-xl font-nunitoSemi'>
                            There is no reviews
                        </Text>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LearnerComment;
