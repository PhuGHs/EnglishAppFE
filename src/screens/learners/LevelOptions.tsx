import EnglishLevel from '@component/EnglishLevel';
import LevelOption from '@component/LevelOption';
import Stories from '@component/Stories';
import { faArrowLeft, faCircleInfo, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { UserContext } from '@root/context/user-context';
import { TEnglishLevel } from '@type/T-type';
import {
    EnglishLevelScreenProps,
    LevelOptionsScreenProps,
    RootStackParamList,
    StoryDetailsScreenProps,
} from '@type/index';
import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const options: string[] = ['Topic', 'Test'];

const LevelOptionScreen = ({
    route,
    navigation,
}: LevelOptionsScreenProps & { route: RouteProp<RootStackParamList, 'LevelOptions'> }) => {
    const { levelId } = route.params;
    const handlePress = (item: string) => {
        if (item === 'Topic') {
            navigation.push('TopicScreen', { levelId: levelId });
        } else {
            navigation.push('EnglishTestListScreen', { levelId: levelId });
        }
    };
    const renderItem = ({ item }: { item: string }) => (
        <LevelOption name={item} onPress={() => handlePress(item)} />
    );
    return (
        <SafeAreaView className='flex flex-1 mx-4 space-y-8'>
            <View className='flex flex-row justify-between items-center mt-3'>
                <TouchableOpacity
                    className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                    onPress={() => navigation.pop()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                </TouchableOpacity>
                <Text className='text-[22px] text-sky-600 font-nunitoSemi'>Options</Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faCircleInfo} color='#0ea5e9' size={30} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
        </SafeAreaView>
    );
};

export default LevelOptionScreen;
