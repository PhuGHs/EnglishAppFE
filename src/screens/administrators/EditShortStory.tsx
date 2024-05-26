import { faArrowLeft, faCircleInfo, faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { EditShortStoryScreenProps, RootStackParamList } from '@type/index';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { PhotoIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditShortStory = ({
    route,
    navigation,
}: EditShortStoryScreenProps & { route: RouteProp<RootStackParamList, 'EditShortStory'> }) => {
    return (
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
            <View className='flex flex-col justify-between h-[95%]'>
                <View className='flex flex-col space-y-4 h-[80%]'>
                    <TouchableOpacity className='w-full'>
                        <View
                            className='w-full bg-white rounded-xl px-4 py-8 flex items-center justify-center'
                            style={{
                                borderWidth: 2,
                                borderRadius: 5,
                                borderStyle: 'dashed',
                                borderColor: 'grey',
                            }}
                        >
                            <FontAwesomeIcon icon={faCloudUpload} size={50} color='#7F7F81' />
                            <Text className='text-lg font-nunitoSemi text-[#7F7F81]'>
                                Touch here to upload photo!
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 font-nunitoBold text-xl'>Header</Text>
                        <TextInput
                            className='w-full bg-white rounded-xl px-2 py-3 border-[1px] border-gray-700 text-gray-700 text-lg font-nunitoMedium'
                            placeholder='Enter the header'
                        />
                    </View>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 font-nunitoBold text-xl'>Content</Text>
                        <TextInput
                            className='w-full bg-white rounded-xl px-2 py-3 border-[1px] border-gray-700 text-gray-700 text-lg font-nunitoMedium'
                            placeholder='Enter the content'
                            multiline={true}
                        />
                    </View>
                </View>
                <View className='h-[20%] flex items-center justify-start'>
                    <TouchableOpacity className='bg-yellow-400 rounded-xl'>
                        <Text className='text-gray-700 font-nunitoXBold text-lg px-8 py-4 rounded-xl'>
                            Add / Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default EditShortStory;
