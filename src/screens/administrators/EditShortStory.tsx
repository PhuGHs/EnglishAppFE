import { faArrowLeft, faCircleInfo, faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { ShortStoryApi } from '@root/api/shortstory.api';
import { useToast } from '@root/context/toast-context';
import { ShortStoryDto, TShortStoryPost } from '@type/T-type';
import { EditShortStoryScreenProps, RootStackParamList } from '@type/index';
import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    Keyboard,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { PhotoIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const EditShortStory = ({
    route,
    navigation,
}: EditShortStoryScreenProps & { route: RouteProp<RootStackParamList, 'EditShortStory'> }) => {
    const { type, shortStoryId } = route.params;
    const { showToast } = useToast();

    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState<string>(null);
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [story, setStory] = useState<ShortStoryDto>();
    const [hasExecuted, setExecuted] = useState<boolean>(true);

    const {
        value: headerValue,
        handleInputChange: handleHeaderChange,
        handleInputBlur: handleHeaderBlur,
        setEnteredValue: setHeaderValue,
        hasError: headerHasError,
    } = useInput({ defaultValue: '', validationFn: (value) => value !== '' });
    const {
        value: content,
        handleInputChange: handleContentChange,
        handleInputBlur: handleContentBlur,
        setEnteredValue: setContent,
        hasError: contentHasError,
    } = useInput({ defaultValue: '', validationFn: (value) => value !== '' });

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const { data, message, status } = await ShortStoryApi.getOne(shortStoryId);
            if (status === 'SUCCESS') {
                setStory(data);
            }
        };
        if (type === 'edit') {
            fetch();
        }
    }, []);

    const handleEditOrSave = async () => {
        setExecuted(false);
        const body: TShortStoryPost = {
            title: headerValue,
            paragraph: content,
            image: imageBase64 ? imageBase64 : '',
        };
        if (type === 'edit') {
            const { data, message, status } = await ShortStoryApi.update(shortStoryId, body);
            if (status === 'SUCCESS') {
                setExecuted(true);
                setStory(data);
                showToast({ type: 'success', description: 'created', timeout: 2000 });
            }
        } else {
            const { data, message, status } = await ShortStoryApi.create(body);

            if (status === 'SUCCESS') {
                setExecuted(true);
                showToast({ type: 'success', description: 'created', timeout: 2000 });
                navigation.pop();
            }
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setImageBase64('data:image/png;base64,' + result.assets[0].base64);
            }
        } catch (error) {
            showToast({
                type: 'danger',
                description: 'Error lauching image library',
                timeout: 5000,
            });
        }
    };

    return (
        <>
            <SafeAreaView className='flex flex-1 mx-4 space-y-8 h-full'>
            <View className='flex flex-row justify-between items-start mt-3 h-[5%]'>
                <TouchableOpacity
                    className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                    onPress={() => navigation.pop()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                </TouchableOpacity>
                <Text className='text-[22px] text-sky-600 font-nunitoSemi'>Details</Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faCircleInfo} color='#0ea5e9' size={30} />
                </TouchableOpacity>
            </View>
            <ScrollView className='flex flex-col h-[95%]'>
                <View className='flex flex-col space-y-4 h-[100%]'>
                    {!isKeyboardVisible && (
                        <View>
                            {type === 'insert' && !image ? (
                                <TouchableOpacity className='w-full' onPress={pickImage}>
                                    <View
                                        className='w-full bg-white rounded-xl px-4 py-8 flex items-center justify-center'
                                        style={{
                                            borderWidth: 2,
                                            borderRadius: 5,
                                            borderStyle: 'dashed',
                                            borderColor: 'grey',
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCloudUpload}
                                            size={50}
                                            color='#7F7F81'
                                        />
                                        <Text className='text-lg font-nunitoSemi text-[#7F7F81]'>
                                            Touch here to upload photo!
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <Image
                                    className='w-full h-[200px] rounded-xl'
                                    source={{ uri: type === 'edit' ? story.image : image }}
                                />
                            )}
                        </View>
                    )}
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 font-nunitoBold text-xl'>Header</Text>
                        <TextInput
                            className='w-full bg-white rounded-xl px-2 py-3 border-[1px] border-gray-400 text-gray-700 text-lg font-nunitoMedium'
                            placeholder='Enter the header'
                            value={headerValue}
                            onChange={handleHeaderChange}
                            onBlur={handleHeaderBlur}
                        />
                    </View>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 font-nunitoBold text-xl'>Content</Text>
                        <TextInput
                            className='w-full min-h-[100px] bg-white rounded-xl px-2 py-3 border-[1px] border-gray-400 text-gray-700 text-lg font-nunitoMedium'
                            multiline={true}
                            value={content}
                            onChange={handleContentChange}
                            onBlur={handleContentBlur}
                        />
                    </View>
                    {!isKeyboardVisible &&
                        <View className='flex items-center justify-center'>
                        <TouchableOpacity
                            className='bg-yellow-400 rounded-xl'
                            onPress={handleEditOrSave}
                        >
                            <Text className='text-gray-700 font-nunitoXBold text-lg px-8 py-4 rounded-xl'>
                                Add / Save
                            </Text>
                        </TouchableOpacity>
                        </View>
                    }
                </View>
                {/* {!isKeyboardVisible && (
                    <View className='h-[20%] flex items-center justify-center'>
                        <TouchableOpacity
                            className='bg-yellow-400 rounded-xl'
                            onPress={handleEditOrSave}
                        >
                            <Text className='text-gray-700 font-nunitoXBold text-lg px-8 py-4 rounded-xl'>
                                Add / Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                )} */}
            </ScrollView>
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

export default EditShortStory;
