import LearnerProfile from '@component/LearnerProfile';
import LearnerRating from '@component/LearnerRating';
import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { FollowersScreenProps, LearnerCommentScreenProps, ReviewLearnerScreenProps, RootStackParamList } from '@type/index';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';

const EditProfile = ({ route, navigation }: FollowersScreenProps & { route: RouteProp<RootStackParamList, 'FollowersScreen'> }) => {
    return (
        <SafeAreaView className='flex flex-1 space-y-3'>
            <View className='w-full h-[10%] bg-white flex items-center px-4 flex-row flex-start space-x-4'>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <FontAwesomeIcon icon={faXmark} size={25} color='#374151'/>
                </TouchableOpacity>
                <Text className='text-xl font-nunitoBold text-gray-700'>Edit profile</Text>
            </View>
            <View className='space-y-3 p-4 rounded-xl w-full h-[90%] justify-between'>
                <View className='flex items-center justify-center'>
                    <TouchableOpacity className='flex items-center'>
                        <Image
                            source={require('@asset/images/avatar.jpg')}
                            style={{
                                resizeMode: 'cover',
                                width: 120,
                                height: 120,
                                borderRadius: 120 / 2,
                            }}
                        />
                        <View className='bg-white flex items-center justify-center absolute bottom-0 right-0' 
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30/2
                            }}
                        >
                            <FontAwesomeIcon icon={faCamera} color='#858585' size={20}/>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <View className='flex flex-col space-y-4'>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 font-nunitoBold text-xl'>Name</Text>
                        <TextInput
                            className='w-full bg-white px-3 text-gray-700 py-4 rounded-xl text-lg font-nuntitoSemi'
                            value='Le Van Phu'
                        />
                    </View>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 font-nunitoBold text-xl'>Email</Text>
                        <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            className='w-full bg-white px-3 text-gray-700 py-4 rounded-xl text-lg font-nuntitoSemi'
                            value='levanphu2003248@gmail.com'
                        />
                    </View>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 font-nunitoBold text-xl'>Location</Text>
                        <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            className='w-full bg-white px-3 text-gray-700 py-4 rounded-xl text-lg font-nuntitoSemi'
                            value='Ho Chi Minh City'
                        />
                    </View>
                </View>
                <View className='flex flex-row justify-between mb-4'>
                    <TouchableOpacity className='bg-yellow-400 w-[40%] items-center rounded-xl justify-center'>
                        <Text className='text-gray-700 font-nunitoXBold text-lg py-4'>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-yellow-400 w-[40%] items-center rounded-xl justify-center'>
                        <Text className='text-gray-700 font-nunitoXBold text-lg py-4'>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default EditProfile;