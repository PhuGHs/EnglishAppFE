import LearnerRating from '@component/LearnerRating';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import {
    LearnerCommentScreenProps,
    ReviewLearnerScreenProps,
    RootStackParamList,
} from '@type/index';
import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';
import Modal from 'react-native-modal/dist/modal';
import { FollowerApi } from '@root/api/follower.api';
import { TReviewPostDto } from '@type/T-type';
import { UserContext } from '@root/context/user-context';
import { useToast } from '@root/context/toast-context';

const ReviewLearner = ({
    route,
    navigation,
}: ReviewLearnerScreenProps & { route: RouteProp<RootStackParamList, 'ReviewLearner'> }) => {
    const { userId: receiverId } = route.params;
    const { user } = useContext(UserContext);
    const { user_id: senderId } = user.user;
    const { showToast } = useToast();

    const [starCount, setStarCount] = useState<number>(0);
    const [confirmedModalVisible, setConfirmedModalVisible] = useState<boolean>(false);

    const handleStarRatingPress = (rating: number) => {
        setStarCount(rating);
    };

    const {
        value: thoughts,
        handleInputChange: handleThoughtsChange,
        handleInputBlur: handleThoughtsBlur,
        setEnteredValue: setThoughtsValue,
        hasError: thoughtsHasError,
        didEdit,
        setDidEdit,
    } = useInput({
        defaultValue: '',
        validationFn: (value) => value.trim().split(/\s+/).length > 6,
    });

    const wordCount = thoughts.trim().split(/\s+/).length;
    const remainingWords = 50 - wordCount;

    const handleGoOut = () => {
        if (didEdit) {
            setConfirmedModalVisible(true);
        } else {
            navigation.pop();
        }
    };

    const handleReview = async () => {
        const postReview: TReviewPostDto = {
            user_who_reviewed_id: senderId,
            user_who_was_reviewed_id: receiverId,
            star: starCount,
            comment: thoughts,
        };
        const { data, message, status } = await FollowerApi.addReview(postReview);
        if (status == 'SUCCESS') {
            showToast({ type: 'success', description: 'Reviewed!', timeout: 3000 });
            navigation.pop();
        } else if (status == 'FAIL') {
            showToast({ type: 'danger', description: message, timeout: 5000 });
        }
    };

    return (
        <SafeAreaView className='flex bg-slate-100 flex-1 space-y-3'>
            <View className='w-full h-[10%] bg-white flex justify-center px-4'>
                <TouchableOpacity onPress={handleGoOut}>
                    <FontAwesomeIcon icon={faXmark} size={25} color='#7F7F81' />
                </TouchableOpacity>
            </View>
            <View className='flex-1 bg-white rounded-2xl flex p-6 flex-col justify-between'>
                <View className='space-y-3'>
                    <Text className='font-nunitoBold text-2xl text-gray-700'>
                        How many stars would you rate this learner?
                    </Text>
                    <StarRating
                        maxStars={5}
                        starSize={40}
                        rating={starCount}
                        onChange={handleStarRatingPress}
                        color='#fbbf24'
                    />
                    <View className='w-full flex-col border-2 border-[#C7C7C7] rounded-lg p-2'>
                        <TextInput
                            className='w-full mb-8 font-nunitoMedium text-[20px] text-gray-700'
                            multiline={true}
                            value={thoughts}
                            onChange={handleThoughtsChange}
                            onBlur={handleThoughtsBlur}
                            placeholder='Share your thoughts up here so people can access to that'
                        />
                        <Text className='text-[#F3641A] text-right font-nunitoMedium'>
                            {remainingWords} words remaining
                        </Text>
                    </View>
                    {didEdit && thoughtsHasError && (
                        <Text className='text-red-400 text-base font-nunitoMedium'>
                            Your thoughts should be more lengthy, minimum of 6 words
                        </Text>
                    )}
                </View>
                <View className='items-center'>
                    <TouchableOpacity
                        className={`${thoughtsHasError || starCount == 0 ? 'bg-yellow-300' : 'bg-yellow-400'} px-4 py-3 rounded-xl`}
                        style={{ elevation: 5 }}
                        disabled={thoughtsHasError}
                        onPress={handleReview}
                    >
                        <Text
                            className={`${thoughtsHasError || starCount == 0 ? 'text-gray-500' : 'text-gray-700'} font-nunitoXBold text-lg`}
                        >
                            Comment
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                isVisible={confirmedModalVisible}
                onBackButtonPress={() => setConfirmedModalVisible(!confirmedModalVisible)}
                onBackdropPress={() => setConfirmedModalVisible(!confirmedModalVisible)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <View className='flex flex-col bg-white rounded-2xl p-4 space-y-4'>
                    <Text className='text-sky-600 text-center text-xl font-nunitoBold'>
                        Confirmation
                    </Text>
                    <Text className='text-base text-gray-700 font-nunitoSemi'>
                        You are being in progress! Do you really want to quit?
                    </Text>
                    <View
                        style={{
                            borderBottomColor: '#d1d5db',
                            borderBottomWidth: 2,
                            marginTop: 10,
                        }}
                    />
                    <View className='flex flex-row justify-evenly'>
                        <TouchableOpacity
                            className='py-4 px-6 rounded-xl bg-red-400'
                            onPress={() => setConfirmedModalVisible(false)}
                        >
                            <Text className='text-white text-lg font-nunitoBold'>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='py-4 px-6 bg-yellow-400 text-gray-700 rounded-xl'
                            onPress={() => navigation.pop()}
                        >
                            <Text className='text-gray-700 text-lg font-nunitoSemi'>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ReviewLearner;
