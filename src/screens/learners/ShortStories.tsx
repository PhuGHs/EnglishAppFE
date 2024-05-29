import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ShortStoryApi } from '@root/api/shortstory.api';
import { UserContext } from '@root/context/user-context';
import { ShortStoryDto } from '@type/T-type';
import { ShortStoriesScreenProps } from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FolderPlusIcon } from 'react-native-heroicons/solid';
import Modal from 'react-native-modal/dist/modal';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Story from '@component/Story';

const ShortStories = ({ navigation }: ShortStoriesScreenProps) => {
    const { user } = useContext(UserContext);
    const { role } = user;
    const [visible, setVisible] = useState<boolean>(false);
    const [stories, setStories] = useState<ShortStoryDto[]>([]);
    const [curPage, setCurPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);

    const handleBackButton = () => {
        navigation.pop();
    };

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const { data } = await ShortStoryApi.get(curPage, pageSize, 'createdDate');
                setStories(data.content);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return (
        <SafeAreaView className='flex bg-slate-100 flex-1 mx-4'>
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
                {role.roleName === 'ADMIN' ? (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.push('EditShortStory', {
                                shortStoryId: 1,
                                type: 'insert',
                            })
                        }
                    >
                        <FolderPlusIcon size={30} color='#38bdf8' />
                    </TouchableOpacity>
                ) : (
                    <View className='w-[5%]'></View>
                )}
            </View>
            <FlatList
                data={stories}
                keyExtractor={(item, index) => item.short_story_id.toString()}
                onEndReached={() => setCurPage((prev) => prev + 1)}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => <Text>{loading ? 'Loading' : null}</Text>}
                renderItem={({ item, index }) => (
                    <Story
                        story={item}
                        key={index}
                        horizontal={false}
                        longpress={() => {
                            if (role.roleName === 'ADMIN') {
                                setVisible(true);
                            }
                        }}
                        press={() =>
                            navigation.push('StoryDetails', { shortStoryId: item.short_story_id })
                        }
                    />
                )}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
            <Modal
                isVisible={visible}
                onBackButtonPress={() => setVisible(!visible)}
                onBackdropPress={() => setVisible(!visible)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <View className='flex flex-col space-y-2 bg-white w-[50%] p-4 rounded-2xl'>
                    <TouchableOpacity
                        className='py-4'
                        onPress={() =>
                            navigation.push('EditShortStory', {
                                shortStoryId: 1,
                                type: 'edit',
                            })
                        }
                    >
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
