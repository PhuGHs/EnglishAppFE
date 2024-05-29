import Accordion from '@component/Accordion';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { TopicApi } from '@root/api/topic.api';
import { UserContext } from '@root/context/user-context';
import { TEnglishTopicQuestionDto } from '@type/T-type';
import { RootStackParamList, TopicDetailsScreenProps } from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FolderPlusIcon, InformationCircleIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopicDetails = ({
    route,
    navigation,
}: TopicDetailsScreenProps & { route: RouteProp<RootStackParamList, 'TopicDetails'> }) => {
    const { topicId, topicName } = route.params;
    const { user } = useContext(UserContext);
    const { roleName } = user.role;

    const [questions, setQuestions] = useState<TEnglishTopicQuestionDto[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const { data, message, status } = await TopicApi.getAllQuestions(topicId);
            if (status === 'SUCCESS') {
                setQuestions(data);
            }
        };
        fetch();
    }, [topicId]);

    return (
        <SafeAreaView className='flex bg-slate-100 flex-1 mx-4 mb-4'>
            <View className='mt-4'>
                <View className='flex flex-row mb-5 justify-between items-center'>
                    <TouchableOpacity
                        className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px]'
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='font-nunitoBold text-sky-600 text-[22px] font-nunitoSemi'>
                        {topicName}
                    </Text>
                    {roleName === 'ADMIN' ? (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.push('EditTopic', {
                                    topicId: topicId,
                                    type: 'insert',
                                    screenType: 'question',
                                })
                            }
                        >
                            <FolderPlusIcon size={30} color='#38bdf8' />
                        </TouchableOpacity>
                    ) : (
                        <View className='w-[5%]'></View>
                    )}
                </View>
            </View>
            <View className='p-3 bg-cyan-100 rounded-xl border-[1px] border-cyan-400 flex-col space-x-2 items-start'>
                <Text className='text-base font-nunitoRegular'>
                    There are some topics which currently do not have any questions or they just
                    have a few questions. Do not worry! We will update more topics in the future!
                </Text>
            </View>
            <Text className='text-xl font-nunitoBold text-gray-700 my-2'>
                There are {questions.length} sample questions
            </Text>
            <FlatList
                data={questions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Accordion key={index} header={item.question} content={item.sample_answer} />
                )}
            />
        </SafeAreaView>
    );
};

export default TopicDetails;
