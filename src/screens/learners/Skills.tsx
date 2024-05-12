import VocabSection from '@component/VocabSection';
import { faBook, faClone } from '@fortawesome/free-solid-svg-icons';
import { TabsScreenProps } from '@type/index';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Skills = ({ navigation }: TabsScreenProps) => {
    const handlePress = () => {
        navigation.navigate('ShortStories');
    };
    const handlePress1 = () => {
        navigation.navigate('TopicScreen');
    };
    return (
        <SafeAreaView className='flex flex-1 px-4 bg-slate-100'>
            <Text className='text-sky-600 w-full text-center font-nunitoBold text-2xl my-4'>
                Vocabularies
            </Text>
            <View className='flex flex-col'>
                <VocabSection
                    header='SHORT STORIES'
                    icon={faBook}
                    press={handlePress}
                    subtitle='Improve your vocabulary'
                />
                <VocabSection
                    header='TOPICS'
                    icon={faClone}
                    press={handlePress1}
                    subtitle='Explore new knowledge, accumulation'
                />
            </View>
        </SafeAreaView>
    );
};

export default Skills;
