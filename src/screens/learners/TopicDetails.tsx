import Accordion from '@component/Accordion';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TopicDetailsScreenProps } from '@type/index';
import React from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopicDetails = ({ navigation }: TopicDetailsScreenProps) => {
    return (
        <SafeAreaView className='flex flex-1 mx-4 mb-4'>
            <View className='mt-4'>
                <View className='flex flex-row mb-5 items-center'>
                    <TouchableOpacity className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px]' onPress={() => navigation.pop()}>
                        <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='font-nunitoBold text-center w-full -left-[40px] text-sky-600 text-[22px] font-nunitoSemi'>
                        Life experience
                    </Text>
                </View>
            </View>
            <View className='w-full h-[200px] bg-gray-400 rounded-xl'></View>
            <Text className='text-xl font-nunitoBold text-gray-700 my-2'>
                There are 8 sample questions
            </Text>
            <ScrollView horizontal={false}>
                <Accordion
                    header='Do you prefer to have a lot of friends or just a few close friends?'
                    content='I am more inclined to have a lot of friends'
                />
                <Accordion
                    header='Do you prefer to have a lot of friends or just a few close friends?'
                    content='I am more inclined to have a lot of friends'
                />
                <Accordion
                    header='Do you prefer to have a lot of friends or just a few close friends?'
                    content='I am more inclined to have a lot of friends'
                />
                <Accordion
                    header='Do you prefer to have a lot of friends or just a few close friends?'
                    content='I am more inclined to have a lot of friends'
                />
                <Accordion
                    header='Do you prefer to have a lot of friends or just a few close friends?'
                    content='I am more inclined to have a lot of friends'
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default TopicDetails;
