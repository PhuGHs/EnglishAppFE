import EnglishLevel from '@component/EnglishLevel';
import { faArrowLeft, faCircleInfo, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { UserContext } from '@root/context/user-context';
import { TEnglishLevel } from '@type/T-type';
import { EnglishLevelScreenProps, StoryDetailsScreenProps } from '@type/index';
import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const test: TEnglishLevel[] = [
    {
        levelId: 1,
        levelName: 'A1 Elementary',
        description:
            'Can understand and use very common expressions and simple phrases for immediate needs.',
    },
    {
        levelId: 2,
        levelName: 'A2 Pre Intermediate',
        description:
            'can understand sentences and frequently used expresssions related to areas of most intermediate relevance',
    },
    {
        levelId: 3,
        levelName: 'B1 Intermediate',
        description:
            'Can understand the main points of clear standard input on familliar matters regularly encountered in work',
    },
    {
        levelId: 4,
        levelName: 'B2 Upper Intermediate',
        description:
            'Can understand the main ideas of complex text on both concrete and abstract points',
    },
    {
        levelId: 5,
        levelName: 'C1 Advanced',
        description:
            'Can understand a wide range of demanding, longer texts, and recognise implicit meaning. Can express themself fluently',
    },
    {
        levelId: 6,
        levelName: 'C2 Proficient',
        description:
            'Can understand with ease virtually everything heard or read. Can summarise information from different spoken and written sources',
    },
];

const EnglishLevelScreen = ({ navigation }: EnglishLevelScreenProps) => {
    const { user } = useContext(UserContext);
    const renderItem = ({ item }: { item: TEnglishLevel }) => (
        <EnglishLevel
            level={item}
            onPress={() => navigation.push('LevelOptions', { levelId: item.levelId })}
        />
    );
    return (
        <SafeAreaView className='flex bg-slate-100 flex-1 mx-4 space-y-8'>
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
            <View className='flex flex-col space-y-2'>
                <Text className='text-sky-600 text-xl font-nunitoBold'>Your current level</Text>
                <View className='flex flex-col space-y-2 rounded-xl p-2 border-[1px] border-gray-400'>
                    <Text className='text-lg font-nunitoBold text-gray-800'>
                        {test[user.user.english_level.levelId - 1].levelName}
                    </Text>
                    <Text className='text-base font-nunitoMedium text-gray-700'>
                        {test[user.user.english_level.levelId - 1].description}
                    </Text>
                </View>
            </View>
            <FlatList
                data={test}
                keyExtractor={(item, index) => item.levelId.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
        </SafeAreaView>
    );
};

export default EnglishLevelScreen;
