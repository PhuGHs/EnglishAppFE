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
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { EllipsisVerticalIcon } from 'react-native-heroicons/solid';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { AnswerApi } from '@root/api/answer.api';
import { DiscussionApi } from '@root/api/discussion.api';
import { UserContext } from '@root/context/user-context';
import { TAnswer, TAnswerPost, TDiscussionDto } from '@type/T-type';
import { DiscussionDetailsScreenProps, RootStackParamList } from '@type/index';
import User from '@component/User';
import Answer from '@component/Answer';
import { useToast } from '@root/context/toast-context';
import { Helper } from '@root/utils/helper';

const DiscussionDetails = ({
    route,
    navigation,
}: DiscussionDetailsScreenProps & {
    route: RouteProp<RootStackParamList, 'DiscussionDetails'>;
}) => {
    const { discussionId } = route.params;
    const { user } = useContext(UserContext);
    const { user_id, profile_picture } = user.user;
    const { showToast } = useToast();

    const [discussion, setDiscussion] = useState<TDiscussionDto>(null);
    const [answers, setAnswers] = useState<TAnswer[]>([]);
    const [hasExecuted, setExecuted] = useState<boolean>(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(0);

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
            try {
                setExecuted(false);
                const { data, status } = await DiscussionApi.getOne(discussionId);
                const { content } = await AnswerApi.getAnswers(
                    discussionId,
                    pageNumber,
                    pageSize,
                    'createdAt'
                );
                if (status === 'SUCCESS') {
                    setDiscussion(data);
                }
                setAnswers(content);
                setExecuted(true);
            } catch (error) {
                console.log(error);
                showToast({ type: 'danger', description: 'Error fetching data', timeout: 5000 });
                setExecuted(true);
            }
        };
        fetch();
    }, [discussionId, pageNumber, pageSize]);

    const {
        value: content,
        handleInputChange: handleContentChange,
        handleInputBlur: handleContentBlur,
        setEnteredValue: setContent,
        hasError: contentHasError,
        didEdit: contentDidEdit,
    } = useInput({ defaultValue: '', validationFn: (value) => value !== '' });

    const handleAnswer = async () => {
        const body: TAnswerPost = {
            discussion_id: discussionId,
            user_id: user_id,
            answer_text: content,
        };
        try {
            const { data, message, status } = await AnswerApi.create(body);
            if (status === 'SUCCESS') {
                setAnswers((old) => [data, ...old]);
                setContent('');
                showToast({ type: 'success', description: 'Answered', timeout: 2000 });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderHeader = () => (
        <View className='space-y-3 bg-white p-4 rounded-xl w-full mt-3'>
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
                    <Text className='font-nunitoBold text-base text-gray-700'>
                        {Helper.calculateTimeAgo(discussion.created_date)}
                    </Text>
                </View>
                <TouchableOpacity className='flex items-center justify-center bg-gray-300 p-3 rounded-xl'>
                    <Text className='text-base font-nunitoBold text-gray-700'>
                        {discussion.topic.name}
                    </Text>
                </TouchableOpacity>
                <Text className='text-gray-700 text-lg font-nunitoMedium'>{discussion.title}</Text>
            </View>
            <Text className='font-nunitoBold text-orange-400 text-base'>
                {discussion.number_of_answers}{' '}
                {discussion.number_of_answers > 1 ? 'answers' : 'answer'}
            </Text>
        </View>
    );

    return (
        <>
            {hasExecuted ? (
                <SafeAreaView className='flex bg-slate-100 flex-1'>
                    <View className='w-full h-[10%] bg-white flex justify-between items-center px-4 flex-row space-x-4'>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <FontAwesomeIcon icon={faXmark} size={25} color='#374151' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <EllipsisVerticalIcon size={30} color='#374151' />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={answers}
                        keyExtractor={(item, index) => item.answer_id.toString()}
                        renderItem={({ item, index }) => <Answer answer={item} key={index} />}
                        ListHeaderComponent={renderHeader}
                        contentContainerStyle={{
                            padding: 4,
                            paddingBottom: isKeyboardVisible ? 60 : 20,
                        }}
                    />
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
                            value={content}
                            multiline={true}
                            onChange={handleContentChange}
                            onBlur={handleContentBlur}
                            placeholder='Place your answer here ...'
                            className={`px-4 text-gray-700 text-lg rounded-3xl h-[80%] font-nunitoSemi text-base bg-gray-300 ${contentHasError ? 'w-[85%]' : 'w-[75%]'}`}
                        />
                        {!contentHasError && (
                            <TouchableOpacity
                                disabled={contentHasError}
                                onPress={handleAnswer}
                                className='w-[10%] items-center justify-center'
                            >
                                <FontAwesomeIcon icon={faPaperPlane} size={25} color='#0ea5e9' />
                            </TouchableOpacity>
                        )}
                    </View>
                </SafeAreaView>
            ) : (
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
