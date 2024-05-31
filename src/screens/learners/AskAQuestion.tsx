import VocabSection from '@component/VocabSection';
import { faAngleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { DiscussionApi } from '@root/api/discussion.api';
import { TopicApi } from '@root/api/topic.api';
import { useToast } from '@root/context/toast-context';
import { UserContext } from '@root/context/user-context';
import { TDiscussionPost, TDiscussionTopicDto, TEnglishTopicDto } from '@type/T-type';
import { AskAQuestionScreenProps, RootStackParamList } from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import { SafeAreaView } from 'react-native-safe-area-context';

const AskAQuestion = ({
    route,
    navigation,
}: AskAQuestionScreenProps & { route: RouteProp<RootStackParamList, 'AskAQuestion'> }) => {
    const { user } = useContext(UserContext);
    const { user_id } = user.user;
    const { showToast } = useToast();

    const [confirmedModalVisible, setConfirmedModalVisible] = useState<boolean>(false);
    const [selectedTopic, setSelectedTopic] = useState<TDiscussionTopicDto>(null);
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [topics, setTopics] = useState<TDiscussionTopicDto[]>([]);

    const {
        value: content,
        handleInputChange: handleContentChange,
        handleInputBlur: handleContentBlur,
        setEnteredValue: setContent,
        hasError: contentHasError,
        didEdit: contentDidEdit,
    } = useInput({ defaultValue: '', validationFn: (value) => value !== '' });

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
            const { data, message, status } = await DiscussionApi.getAllTopics();
            if (status === 'SUCCESS') {
                setTopics(data);
            }
        };

        fetch();
    }, []);

    const handleAsk = async () => {
        const body: TDiscussionPost = {
            discussion_topic_id: selectedTopic.id,
            title: content,
            user_id: user_id,
        };
        const { message, status } = await DiscussionApi.create(body);
        if (status === 'SUCCESS') {
            showToast({ type: 'success', description: message, timeout: 3000 });
            navigation.pop();
        }
    };

    return (
        <SafeAreaView className='flex flex-1 space-y-4 bg-white'>
            <View className='px-3'>
                <View className='flex flex-row mb-5 items-center'>
                    <TouchableOpacity className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px]'>
                        <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='text-center w-full -left-[35px] text-sky-600 text-[22px] font-nunitoSemi'>
                        Discussion
                    </Text>
                </View>
            </View>
            <View className='px-3 bg-slate-100 flex flex-1 space-y-4'>
                <Text className='text-xl font-nunitoSemi text-gray-700 mt-4'>
                    This question is about
                </Text>
                <TouchableOpacity
                    className='bg-white py-4 px-2 rounded-xl flex flex-row justify-between items-center'
                    onPress={() => setConfirmedModalVisible(true)}
                >
                    <Text className='text-lg font-nunitoSemi text-gray-700'>
                        {selectedTopic == null ? 'Select a topic' : selectedTopic.name}
                    </Text>
                    <FontAwesomeIcon icon={faAngleRight} color='#374151' size={25} />
                </TouchableOpacity>
                <TextInput
                    placeholder='Write a word, phrase or sentence'
                    multiline={true}
                    value={content}
                    onChange={handleContentChange}
                    onBlur={handleContentBlur}
                    className='bg-white p-3 rounded-xl text-lg font-nunitoMedium text-gray-700'
                    style={{ height: 200, textAlignVertical: 'top' }}
                />
                {contentHasError && contentDidEdit && (
                    <Text className='text-red-400 text-base font-nunitoMedium'>
                        This field is required!
                    </Text>
                )}
            </View>
            {!isKeyboardVisible && (
                <View className='absolute bottom-10 flex items-center justify-center w-full'>
                    <TouchableOpacity
                        disabled={selectedTopic == null || contentHasError}
                        className='py-2 bg-yellow-400 rounded-xl'
                        style={{ elevation: 6, shadowColor: '#0f172a' }}
                        onPress={handleAsk}
                    >
                        <Text className='text-xl font-nunitoBold text-center text-gray-700 px-8 py-2'>
                            Ask a question
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <Modal
                isVisible={confirmedModalVisible}
                onBackButtonPress={() => setConfirmedModalVisible(!confirmedModalVisible)}
                onBackdropPress={() => setConfirmedModalVisible(!confirmedModalVisible)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <View className='flex flex-col bg-slate-100 rounded-2xl p-4 space-y-4 w-[100%] min-h-[70%]'>
                    <Text className='text-sky-600 text-center text-xl font-nunitoBold'>
                        Choose a topic
                    </Text>
                    <View
                        style={{
                            borderBottomColor: '#d1d5db',
                            borderBottomWidth: 2,
                            marginTop: 10,
                        }}
                    />
                    <FlatList
                        data={topics}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <VocabSection
                                press={() => {
                                    setSelectedTopic(item);
                                    setConfirmedModalVisible(false);
                                }}
                                topic={true}
                                header={item.name}
                                key={index}
                            />
                        )}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default AskAQuestion;
