import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ShortStoryDto } from '@type/T-type';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface IStory {
    press: () => void;
    longpress?: () => void;
    horizontal?: boolean;
    story: ShortStoryDto;
}

const Story = ({ press, longpress, story, horizontal }: IStory) => {
    const { title, number_of_likes, image } = story;
    return (
        <TouchableOpacity
            className={`flex flex-col space-y-2 mt-4 ${horizontal ? 'w-[170px] mr-5' : 'w-[48%]'}`}
            onPress={press}
            onLongPress={longpress}
        >
            <View className='w-full rounded-xl h-[250px]' style={{ elevation: 10 }}>
                <Image
                    className='w-full h-full rounded-xl'
                    resizeMode='cover'
                    source={{ uri: image }}
                />
                <View className='absolute top-2 right-2 bg-gray-400 flex flex-row items-center justify-center space-x-2 p-2 rounded-full'>
                    <Text className='text-white font-nunitoSemi'>{number_of_likes}</Text>
                    <FontAwesomeIcon icon={faHeart} color='#F06D6D' size={20} />
                </View>
            </View>
            <Text className='text-base text-gray-700 text-center font-nunitoMedium'>{title}</Text>
        </TouchableOpacity>
    );
};

export default Story;
