import Stories from '@component/Stories';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ShortStoriesScreenProps } from '@type/index';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShortStories = ({ navigation }: ShortStoriesScreenProps) => {
    const handleBackButton = () => {
        console.log('back');
        navigation.pop();
    };
    return (
        <SafeAreaView className='flex flex-1 mx-4'>
        <View className='flex flex-row mb-5 items-center mt-4'>
                <TouchableOpacity className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px]' onPress={handleBackButton}>
                    <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                </TouchableOpacity>
                <Text className='text-center w-full -left-[40px] text-sky-600 text-[22px] font-nunitoSemi'>
                    SHORT STORIES
                </Text>
            </View>
        <Stories horizontal={false} press={() => navigation.push('StoryDetails')}/>
    </SafeAreaView>
    );
};

export default ShortStories;
