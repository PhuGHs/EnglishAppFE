import Stories from '@component/Stories';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShortStories = () => (
    <SafeAreaView className='flex flex-1 mx-4'>
        <View className='mt-4'>
            <View className='flex flex-row mb-5 items-center'>
                <TouchableOpacity className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px]'>
                    <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                </TouchableOpacity>
                <Text className='text-center w-full -left-[40px] text-sky-600 text-[22px] font-nunitoSemi'>
                    SHORT STORIES
                </Text>
            </View>
        </View>
        <Stories horizontal={false} />
    </SafeAreaView>
);

export default ShortStories;
