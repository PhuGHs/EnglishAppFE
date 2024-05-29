import Answer from '@component/Answer';
import LearnerProfile from '@component/LearnerProfile';
import LearnerRating from '@component/LearnerRating';
import User from '@component/User';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { DiscussionApi } from '@root/api/discussion.api';
import { UserContext } from '@root/context/user-context';
import { TDiscussionDto } from '@type/T-type';
import {
    DiscussionDetailsScreenProps,
    FollowersScreenProps,
    LearnerCommentScreenProps,
    ReviewLearnerScreenProps,
    RootStackParamList,
} from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    Keyboard,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { EllipsisVerticalIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';

const DiscussionDetails = ({
    route,
    navigation,
}: DiscussionDetailsScreenProps & {
    route: RouteProp<RootStackParamList, 'DiscussionDetails'>;
}) => {
    const { discussionId } = route.params;
    const { user } = useContext(UserContext);
    const { user_id, profile_picture } = user.user;

    const [discussion, setDiscussion] = useState<TDiscussionDto>(null);
    const [hasExecuted, setExecuted] = useState<boolean>(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

    const handleAnswer = async () => {};

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        const fetch = async () => {
            setExecuted(false);
            const { data, message, status } = await DiscussionApi.getOne(discussionId);
            if (status === 'SUCCESS') {
                setDiscussion(data);
                setExecuted(true);
            } else {
                console.log('not found');
            }
        };
        fetch();
    }, [discussionId]);

    return (
        <>
            {hasExecuted && (
                <SafeAreaView className='flex bg-slate-100 flex-1'>
                    <View className='w-full h-[10%] bg-white flex justify-between items-center px-4 flex-row flex-start space-x-4'>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <FontAwesomeIcon icon={faXmark} size={25} color='#374151' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <EllipsisVerticalIcon size={30} color='#374151' />
                        </TouchableOpacity>
                    </View>
                    <ScrollView className='space-y-3 bg-white p-4 rounded-xl w-full h-full mt-3'>
                        <View className='space-y-3 border-b-[1px] border-gray-300 pb-4'>
                            <View className='flex flex-row justify-between items-center'>
                                <User
                                    press={() =>
                                        navigation.push('UserProfileScreen', {
                                            userId: discussion.user.user_id,
                                        })
                                    }
                                    user={discussion.user}
                                    nameOnRight={true}
                                    isModerator={true}
                                    room={false}
                                />
                                <Text className='font-nunitoBold text-base text-gray-700'>21h</Text>
                            </View>
                            <TouchableOpacity className='flex items-center justify-center bg-gray-300 p-3 rounded-xl'>
                                <Text className='text-base font-nunitoBold text-gray-700'>
                                    {discussion.topic.name}
                                </Text>
                            </TouchableOpacity>
                            <Text className='text-gray-700 text-lg font-nunitoMedium'>
                                {discussion.title}
                            </Text>
                        </View>
                        <View className=''>
                            <Text className='font-nunitoBold text-orange-400 text-base'>
                                {discussion.number_of_answers}{' '}
                                {discussion.number_of_answers > 1 ? 'answers' : 'answer'}
                            </Text>
                            <Answer />
                            <Answer />
                            <Answer />
                            <Answer />
                            <Answer />
                            <Answer />
                            <Answer />
                        </View>
                    </ScrollView>
                    <View
                        className={`w-full justify-between bg-white ${isKeyboardVisible ? 'h-[15%]' : 'h-[10%]'} border-t-[1px] flex-row border-gray-500 items-center px-2`}
                    >
                        <Image
                            className='w-[7%] border-[1px]'
                            source={{ uri: profile_picture }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                                borderWidth: 1,
                            }}
                        />
                        <TextInput
                            placeholder='Place your answer here ...'
                            className='w-[75%] px-4 text-gray-700 rounded-3xl h-[80%] font-nunitoSemi text-base bg-gray-300'
                        />
                        <TouchableOpacity className='w-[10%] items-center justify-center'>
                            <FontAwesomeIcon icon={faPaperPlane} size={25} color='#0ea5e9' />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )}
            {!hasExecuted && (
                <View style={styles.overlay}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default DiscussionDetails;
