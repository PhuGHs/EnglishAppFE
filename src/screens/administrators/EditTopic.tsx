import { faArrowLeft, faCircleInfo, faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { TopicApi } from '@root/api/topic.api';
import { useToast } from '@root/context/toast-context';
import { TEnglishTopicPostDto, TEnglishTopicQuestionPostDto } from '@type/T-type';
import { EditShortStoryScreenProps, EditTopicScreenProps, RootStackParamList } from '@type/index';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { PhotoIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditTopic = ({
    route,
    navigation,
}: EditTopicScreenProps & { route: RouteProp<RootStackParamList, 'EditTopic'> }) => {
    const { levelId, topicId, type, screenType } = route.params;
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const { showToast } = useToast();

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

    const handleSave = async () => {
        if (screenType === 'topic') {
            const topic: TEnglishTopicPostDto = {
                english_level_id: levelId,
                header: headerValue,
                content: content,
            };
            const { data, message, status } = await TopicApi.insertNewTopic(topic);
            if (status === 'SUCCESS') {
                showToast({ type: 'success', description: message, timeout: 3000 });
                navigation.pop();
            }
        } else if (screenType === 'question') {
            console.log(topicId);
            const question: TEnglishTopicQuestionPostDto = {
                topic_id: topicId,
                question: headerValue,
                sample_answer: content,
            };
            const { data, message, status } = await TopicApi.insertNewQuestion(question);
            if (status === 'SUCCESS') {
                showToast({ type: 'success', description: message, timeout: 3000 });
                navigation.pop();
            }
        }
    };

    const {
        value: headerValue,
        handleInputChange: handleHeaderChange,
        handleInputBlur: handleHeaderBlur,
        setEnteredValue: setHeaderValue,
        hasError: headerHasError,
        didEdit: headerDidEdit,
    } = useInput({ defaultValue: '', validationFn: (value) => value !== '' });
    const {
        value: content,
        handleInputChange: handleContentChange,
        handleInputBlur: handleContentBlur,
        setEnteredValue: setContent,
        hasError: contentHasError,
        didEdit: contentDidEdit,
    } = useInput({ defaultValue: '', validationFn: (value) => value !== '' });

    return (
        <SafeAreaView className='flex flex-1 bg-slate-100 mx-4 space-y-8 h-full'>
            <View className='flex flex-row justify-between items-start mt-3 h-[5%]'>
                <TouchableOpacity
                    className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                    onPress={() => navigation.pop()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                </TouchableOpacity>
                <Text className='text-[22px] text-sky-600 font-nunitoSemi'>
                    {screenType === 'topic' ? 'INSERT TOPIC' : 'INSERT QUESTION'}
                </Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faCircleInfo} color='#0ea5e9' size={30} />
                </TouchableOpacity>
            </View>
            <View className='flex flex-col justify-between h-[95%]'>
                <View className='flex flex-col space-y-4 h-[80%]'>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 font-nunitoBold text-xl'>
                            {screenType === 'topic' ? 'Header' : 'Question'}
                        </Text>
                        <TextInput
                            className='w-full bg-white rounded-xl px-2 py-3 border-[1px] border-gray-400 text-gray-700 text-lg font-nunitoMedium'
                            placeholder='Enter the header'
                            value={headerValue}
                            onChange={handleHeaderChange}
                            onBlur={handleHeaderBlur}
                        />
                        {headerDidEdit && headerHasError && (
                            <Text className='text-red-400 font-nunitoMedium'>
                                This field is required!
                            </Text>
                        )}
                    </View>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 font-nunitoBold text-xl'>
                            {screenType === 'topic' ? 'Content' : 'Sample answer'}
                        </Text>
                        <TextInput
                            className='w-full h-[150px] bg-white rounded-xl px-2 py-3 border-[1px] border-gray-400 text-gray-700 text-lg font-nunitoMedium'
                            value={content}
                            onChange={handleContentChange}
                            onBlur={handleContentBlur}
                            multiline={true}
                        />
                        {contentDidEdit && contentHasError && (
                            <Text className='text-red-400 font-nunitoMedium'>
                                This field is required!
                            </Text>
                        )}
                    </View>
                </View>
                {!isKeyboardVisible && (
                    <View className='h-[20%] flex items-center justify-start'>
                        <TouchableOpacity
                            className='bg-yellow-400 rounded-xl'
                            onPress={handleSave}
                            disabled={contentHasError || headerHasError}
                        >
                            <Text className='text-gray-700 font-nunitoXBold text-lg px-8 py-4 rounded-xl'>
                                Add / Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default EditTopic;
