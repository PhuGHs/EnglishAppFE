import VocabSection from '@component/VocabSection';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, TopicDetailsScreenProps, TopicScreenProps } from '@type/index';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Topics = ({ route, navigation }: TopicScreenProps & { route: RouteProp<RootStackParamList, 'TopicScreen'> }) => {
    return (
        <SafeAreaView className='flex flex-1 mx-2'>
            <View className='mt-4'>
                <View className='flex flex-row mb-5 items-center justify-between'>
                    <TouchableOpacity
                        className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px]'
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='text-sky-600 text-[22px] font-nunitoSemi'>
                        TOPICS
                    </Text>
                    <View className='w-[10%]'></View>
                </View>
                <ScrollView horizontal={false}>
                    <VocabSection
                        header='Life experience'
                        subtitle='What you gonna do'
                        press={() => navigation.push('TopicDetails')}
                    />
                    <VocabSection
                        header='Life experience'
                        subtitle='What you gonna do'
                        press={() => navigation.push('TopicDetails')}
                    />
                    <VocabSection
                        header='Life experience'
                        subtitle='What you gonna do'
                        press={() => navigation.push('TopicDetails')}
                    />
                    <VocabSection
                        header='Life experience'
                        subtitle='What you gonna do'
                        press={() => navigation.push('TopicDetails')}
                    />
                    <VocabSection
                        header='Life experience'
                        subtitle='What you gonna do'
                        press={() => navigation.push('TopicDetails')}
                    />
                    <VocabSection
                        header='Life experience'
                        subtitle='What you gonna do'
                        press={() => navigation.push('TopicDetails')}
                    />
                    <VocabSection
                        header='Life experience'
                        subtitle='What you gonna do'
                        press={() => navigation.push('TopicDetails')}
                    />
                    <VocabSection
                        header='Life experience'
                        subtitle='What you gonna do'
                        press={() => navigation.push('TopicDetails')}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Topics;
