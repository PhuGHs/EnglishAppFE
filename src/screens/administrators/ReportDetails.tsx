import ImageView from 'react-native-image-viewing';
import { faArrowLeft, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { ReportDetailsScreenProps, RootStackParamList } from '@type/index';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Text, Image, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReportDetails = ({
    route,
    navigation,
}: ReportDetailsScreenProps & { route: RouteProp<RootStackParamList, 'ReportDetails'> }) => {
    const { reportId } = route.params;
    const [visible, setVisible] = useState<boolean>(false);

    const images = [
        {
            uri: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/top-20-small-dog-breeds.jpeg.jpg',
        },
    ];

    return (
        <SafeAreaView className='flex flex-1 mx-4'>
            <ScrollView className='flex flex-col space-y-8'>
                <View className='flex flex-row justify-between items-center mt-3'>
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
                <View className='flex flex-col space-y-4'>
                    <View className='w-full bg-white p-4 rounded-xl'>
                        <Text className='text-sky-400 text-lg font-nunitoBold'>REPORT #1</Text>
                        <Text className='text-red-400 text-lg font-nunitoSemi'>Not yet</Text>
                        <Text className='text-gray-700 text-lg font-nunitoSemi'>
                            Date: 24/05/2024
                        </Text>
                    </View>
                    <View className='flex flex-row justify-between'>
                        <View className='flex flex-col space-y-2 w-[45%]'>
                            <Text className='text-gray-700 text-lg font-nunitoBold text-sky-400'>
                                REPORTER ID
                            </Text>
                            <View className='w-full bg-white rounded-xl p-4'>
                                <Text className='text-lg text-gray-600 font-nunitoSemi'>1234</Text>
                            </View>
                        </View>
                        <View className='flex flex-col space-y-2 w-[45%]'>
                            <Text className='text-gray-700 text-lg font-nunitoBold text-sky-400'>
                                VIOLATOR ID
                            </Text>
                            <View className='w-full bg-white rounded-xl p-4'>
                                <Text className='text-lg text-gray-600 font-nunitoSemi'>1234</Text>
                            </View>
                        </View>
                    </View>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 text-lg font-nunitoBold text-sky-400'>
                            REASON
                        </Text>
                        <View className='w-full bg-white rounded-xl p-4'>
                            <Text className='text-lg text-gray-600 font-nunitoSemi'>
                                Political problems
                            </Text>
                        </View>
                    </View>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 text-lg font-nunitoBold text-sky-400'>
                            ADDITIONAL INFORMATION
                        </Text>
                        <View className='w-full bg-white rounded-xl p-4'>
                            <Text className='text-lg text-gray-600 font-nunitoSemi'>
                                He blamed me on irrigating the room owners and other people in the
                                room
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Image
                            source={{
                                uri: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/top-20-small-dog-breeds.jpeg.jpg',
                            }}
                            resizeMode='cover'
                            className='w-full h-[200px] rounded-xl'
                        />
                    </TouchableOpacity>
                    <ImageView
                        images={images}
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setVisible(false)}
                    />
                </View>
                <View className='flex flex-row justify-between mb-4'>
                    <TouchableOpacity className='w-[50%] bg-yellow-400 p-4 items-center rounded-lg'>
                        <Text className='text-lg font-nunitoBold text-gray-700'>
                            Mark as resolved
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='w-[45%] bg-yellow-400 p-4 items-center rounded-lg'>
                        <Text className='text-lg font-nunitoBold text-gray-700'>Ban</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReportDetails;
