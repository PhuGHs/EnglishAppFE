import Story from '@component/Story';
import { faArrowLeft, faHeart, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { MissionApi } from '@root/api/mission.api';
import { ShortStoryApi } from '@root/api/shortstory.api';
import { useToast } from '@root/context/toast-context';
import { UserContext } from '@root/context/user-context';
import { ShortStoryDto } from '@type/T-type';
import { RootStackParamList, StoryDetailsScreenProps } from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const getParagraph = (paragraph: string): string[] => {
    const arr: string[] = paragraph.split(' // ');
    return arr;
};

const StoryDetails = ({
    route,
    navigation,
}: StoryDetailsScreenProps & { route: RouteProp<RootStackParamList, 'StoryDetails'> }) => {
    const { shortStoryId } = route.params;
    const { user } = useContext(UserContext);
    const { showToast } = useToast();

    const [story, setStory] = useState<ShortStoryDto>(null);
    const [randomStories, setRandomStories] = useState<ShortStoryDto[]>(null);
    const [hasExecuted, setExecuted] = useState<boolean>(false);
    const [paragraph, setParagraph] = useState<string[]>([]);

    useEffect(() => {
        const fetch = async () => {
            setExecuted(false);
            await MissionApi.doMission(1, user.user.user_id);
            const { data, message, status } = await ShortStoryApi.getOne(shortStoryId);
            const { data: random, status: randomStatus } =
                await ShortStoryApi.getRandom5(shortStoryId);
            if (status === 'SUCCESS') {
                setStory(data);
                setParagraph(getParagraph(data.paragraph));
            } else {
                showToast({ type: 'danger', description: message, timeout: 3000 });
                setExecuted(true);
            }
            if (randomStatus === 'SUCCESS') {
                setExecuted(true);
                setRandomStories(random);
            }
        };
        fetch();
    }, []);

    const renderParagraphItem = ({ item }) => (
        <Text className='text-gray-700 text-base font-nunitoMedium py-2'>{item}</Text>
    );

    const renderRandomStoryItem = ({ item }) => (
        <Story
            horizontal={true}
            story={item}
            press={() => navigation.push('StoryDetails', { shortStoryId: item.short_story_id })}
        />
    );

    const ListHeaderComponent = () => (
        <>
            <View className='flex flex-row justify-between items-center mt-3'>
                <TouchableOpacity
                    className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                    onPress={() => navigation.pop()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                </TouchableOpacity>
                <Text className='text-[22px] text-sky-600 font-nunitoSemi'>
                    {hasExecuted && story.title}
                </Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faLanguage} color='#0ea5e9' size={40} />
                </TouchableOpacity>
            </View>
            <View className='mt-8'>
                {hasExecuted && (
                    <Image
                        className='w-full h-[250px] rounded-xl'
                        resizeMode='cover'
                        source={{ uri: story.image }}
                    />
                )}
            </View>
            <TouchableOpacity className='flex flex-row rounded-full items-center justify-center mt-4 space-x-2 border border-zinc-500 p-2'>
                <Text className='font-nunitoSemi text-gray-700'>
                    {hasExecuted && story.number_of_likes}
                </Text>
                <FontAwesomeIcon icon={faHeart} color='#F06D6D' size={20} />
            </TouchableOpacity>
        </>
    );

    const ListFooterComponent = () => (
        <>
            <View className='border border-gray-300 my-4' />
            <Text className='text-xl text-gray-700 font-nunitoSemi mb-4'>You might like</Text>
            <FlatList
                horizontal
                data={randomStories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRandomStoryItem}
            />
        </>
    );

    return (
        <>
            <SafeAreaView className='flex flex-1 mx-4'>
                <FlatList
                    data={paragraph}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderParagraphItem}
                    ListHeaderComponent={ListHeaderComponent}
                    ListFooterComponent={ListFooterComponent}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
            {!hasExecuted && (
                <View style={styles.overlay}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default StoryDetails;
