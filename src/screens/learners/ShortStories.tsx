import Stories from '@component/Stories';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ShortStoriesScreenProps } from '@type/index';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FolderPlusIcon } from 'react-native-heroicons/solid';
import Modal from 'react-native-modal/dist/modal';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShortStories = ({ navigation }: ShortStoriesScreenProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const handleBackButton = () => {
        navigation.pop();
    };
    return (
        <SafeAreaView className='flex flex-1 mx-4'>
            <View className='flex flex-row mb-5 items-center mt-4 justify-between'>
                <TouchableOpacity
                    className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px]'
                    onPress={handleBackButton}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                </TouchableOpacity>
                <Text className='text-center text-sky-600 text-[22px] font-nunitoSemi'>
                    SHORT STORIES
                </Text>
                <TouchableOpacity onPress={() => navigation.push('EditShortStory')}>
                    <FolderPlusIcon size={30} color='#38bdf8' />
                </TouchableOpacity>
            </View>
            <Stories horizontal={false} longpress={() => setVisible(true)} press={() => navigation.push('StoryDetails')} />
            <Modal
                isVisible={visible}
                onBackButtonPress={() => setVisible(!visible)}
                onBackdropPress={() => setVisible(!visible)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <View className='flex flex-col space-y-2 bg-white w-[50%] p-4 rounded-2xl'>
                    <TouchableOpacity className='py-4' onPress={() => navigation.push('EditShortStory')}>
                        <Text className='text-gray-700 text-lg font-nunitoSemi'>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='py-4'>
                        <Text className='text-red-400 text-lg font-nunitoSemi'>Delete</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ShortStories;
