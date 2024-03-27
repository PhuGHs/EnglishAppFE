import VocabSection from '@component/VocabSection';
import { faBook, faClone } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Skills = () => {
    return (
        <SafeAreaView className="flex flex-1 mx-2">
            <Text className="text-sky-500 w-full text-center font-bold text-2xl mt-2">
                VOCABULARY
            </Text>
            <View className="flex flex-col mt-6">
                <VocabSection
                    header="SHORT STORIES"
                    icon={faBook}
                    subtitle="Improve your vocabulary"
                />
                <VocabSection
                    header="TOPICS"
                    icon={faClone}
                    subtitle="Explore new knowledge, accumulation"
                />
            </View>
        </SafeAreaView>
    );
};

export default Skills;
