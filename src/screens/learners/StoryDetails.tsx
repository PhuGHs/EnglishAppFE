import Stories from '@component/Stories';
import { faArrowLeft, faHeart, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StoryDetails = () => {
    return (
        <SafeAreaView className="flex flex-1 mx-4">
            <View className="flex flex-row justify-between items-center mt-3">
                <TouchableOpacity className="bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center">
                    <FontAwesomeIcon icon={faArrowLeft} color="#374151" size={25} />
                </TouchableOpacity>
                <Text className="text-[22px] text-sky-600 font-medium">Là ai</Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faLanguage} color="#0ea5e9" size={40} />
                </TouchableOpacity>
            </View>
            <ScrollView className='mt-8 space-y-4'>
                <View className='w-full h-[200px] bg-zinc-300 rounded-xl'>
                </View>
                <TouchableOpacity className='flex flex-row rounded-full items-center justify-center mt-4 space-x-2 border border-zinc-500 p-2'>
                    <Text className='font-medium text-gray-700'>7572</Text>
                    <FontAwesomeIcon icon={faHeart} color="#F06D6D" size={20} />
                </TouchableOpacity>
                <Text className='text-gray-700 text-base'>
                    The guard sees Juan climbing on the apple tree. He said:
                    You over there! Come down immediately or else I’ll call your dad.
                    Oh please! - Juan laughs - My dad is on the other tree right there
                    The guard sees Juan climbing on the apple tree. He said:
                    You over there! Come down immediately or else I’ll call your dad.
                    Oh please! - Juan laughs - My dad is on the other tree right there
                    The guard sees Juan climbing on the apple tree. He said:
                    You over there! Come down immediately or else I’ll call your dad.
                    Oh please! - Juan laughs - My dad is on the other tree right there
                </Text>
                <View className='border border-gray-300'/>
                <Text className='text-xl text-gray-700 font-medium'>You might like</Text>
                <Stories horizontal={true} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default StoryDetails;
