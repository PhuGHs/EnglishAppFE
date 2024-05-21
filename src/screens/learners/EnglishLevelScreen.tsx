import EnglishLevel from '@component/EnglishLevel';
import Stories from '@component/Stories';
import { faArrowLeft, faCircleInfo, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TEnglishLevel } from '@type/T-type';
import { StoryDetailsScreenProps } from '@type/index';
import React from 'react';
import { TouchableOpacity, View, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const test: TEnglishLevel[] = [
    {
        levelId: 1,
        levelName: 'A1 Elementary',
        description: ''
    },
    {
        levelId: 2,
        levelName: 'A2 Pre Intermediate',
        description: ''
    },
    {
        levelId: 3,
        levelName: 'B1 Intermediate',
        description: ''
    },
    {
        levelId: 4,
        levelName: 'B2 Upper Intermediate',
        description: ''
    },
    {
        levelId: 5,
        levelName: 'C1 Advanced',
        description: ''
    },
    {
        levelId: 6,
        levelName: 'C2 Proficient',
        description: ''
    }
];

const EnglishLevelScreen = ({ navigation }: StoryDetailsScreenProps) => {
    const renderItem = ({ item }: { item: TEnglishLevel }) => (
        <EnglishLevel level={item} />
    );
    return (
        <SafeAreaView className='flex flex-1 mx-4'>
            <View className='flex flex-row justify-between items-center mt-3'>
                <TouchableOpacity
                    className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                    onPress={() => navigation.pop()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                </TouchableOpacity>
                <Text className='text-[22px] text-sky-600 font-nunitoSemi'>English Levels</Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faCircleInfo} color='#0ea5e9' size={30} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={test}
                keyExtractor={(item, index) => item.levelId.toString()}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{}}
                columnWrapperStyle={{ justifyContent: 'space-between'}}
            />
        </SafeAreaView>
    );
};

export default EnglishLevelScreen;
