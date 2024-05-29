import VocabSection from '@component/VocabSection';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { TopicApi } from '@root/api/topic.api';
import { UserContext } from '@root/context/user-context';
import { TEnglishTopicDto } from '@type/T-type';
import { RootStackParamList, TopicDetailsScreenProps, TopicScreenProps } from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { FolderPlusIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';

const Topics = ({
    route,
    navigation,
}: TopicScreenProps & { route: RouteProp<RootStackParamList, 'TopicScreen'> }) => {
    const { user } = useContext(UserContext);
    const { roleName } = user.role;
    const { levelId } = route.params;

    const [topics, setTopics] = useState<TEnglishTopicDto[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const { data, message, status } = await TopicApi.getAllTopics(levelId);
            if (status === 'SUCCESS') {
                setTopics(data);
            }
        };
        fetch();
    }, [levelId]);

    return (
        <SafeAreaView className='flex bg-slate-100 flex-1 mx-2'>
            <View className='flex flex-row mb-5 items-center justify-between'>
                <TouchableOpacity
                    className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px]'
                    onPress={() => navigation.pop()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                </TouchableOpacity>
                <Text className='text-sky-600 text-[22px] font-nunitoSemi'>TOPICS</Text>
                {roleName === 'ADMIN' ? (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.push('EditTopic', {
                                levelId: levelId,
                                type: 'insert',
                                screenType: 'topic',
                            })
                        }
                    >
                        <FolderPlusIcon size={30} color='#38bdf8' />
                    </TouchableOpacity>
                ) : (
                    <View className='w-[5%]'></View>
                )}
            </View>
            <FlatList
                data={topics}
                keyExtractor={(item, index) => item.topic_id.toString()}
                renderItem={({ item, index }) => (
                    <VocabSection
                        key={index}
                        header={item.header}
                        subtitle={item.content}
                        press={() =>
                            navigation.push('TopicDetails', {
                                topicId: item.topic_id,
                                topicName: item.header,
                            })
                        }
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Topics;
