import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ChatBubbleLeftEllipsisIcon, StarIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
    return (
        <SafeAreaView className='flex flex-1 bg-sky-400'>
            <View className='h-[15%]'></View>
            <View className='h-[85%] bg-slate-100 rounded-t-[40px] flex items-center'>
                <View
                    className='w-[150px] h-[150px] rounded-full absolute top-[-75px] border-4 rounded-full border-white'
                    style={{ elevation: 10 }}
                >
                    <TouchableOpacity className='flex'>
                        <Image
                            source={require('@asset/images/avatar.jpg')}
                            style={{
                                resizeMode: 'cover',
                                width: 140,
                                height: 140,
                                borderRadius: 140 / 2,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View className='pt-[80px] flex flex-col justify-center w-full'>
                    <Text className='text-slate-800 font-nunitoBold text-2xl text-center'>
                        Calphil Henderson
                    </Text>
                    <Text className='text-center text-slate-500 font-nunitoMedium text-base'>
                        @200324821111
                    </Text>
                    <View className='flex flex-row items-center justify-center mt-3 space-x-2'>
                        <FontAwesomeIcon icon={faLocationDot} color='#475569' size={20} />
                        <Text className='text-slate-600 text-base font-nunitoBold'>
                            Ho Chi Minh City
                        </Text>
                    </View>
                    <Text className='text-center my-2 font-nunitoBold text-xl text-sky-600'>
                        UPPER-INTERMEDIATE
                    </Text>
                    <View className='flex flex-row mt-6 items-center justify-center'>
                        <TouchableOpacity className='p-3 bg-slate-200 rounded-full flex items-center justify-center'>
                            <ChatBubbleLeftEllipsisIcon size={30} color='#0284c7' />
                        </TouchableOpacity>
                        <TouchableOpacity className='py-3 px-10 bg-yellow-400 rounded-full mx-10'>
                            <Text className='text-gray-700 font-nunitoBold text-lg text-center'>
                                Follow
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='p-3 bg-slate-200 rounded-full flex items-center justify-center'>
                            <StarIcon size={30} color='#0284c7' />
                        </TouchableOpacity>
                    </View>
                    <View className='flex flex-row my-6 space-x-4 items-center justify-around'>
                        <View className='flex flex-col justify-between items-center'>
                            <Text className='text-sky-600 font-nunitoXBold text-base'>99</Text>
                            <Text className='text-sky-600 font-nunitoRegular text-base'>
                                Following
                            </Text>
                        </View>
                        <View className='flex flex-col justify-between items-center'>
                            <Text className='text-sky-600 font-nunitoXBold text-base'>50.5K</Text>
                            <Text className='text-sky-600 font-nunitoRegular text-base'>
                                Followers
                            </Text>
                        </View>
                        <View className='flex flex-col justify-between items-center'>
                            <Text className='text-sky-600 font-nunitoXBold text-base'>99</Text>
                            <Text className='text-sky-600 font-nunitoRegular text-base'>
                                Following
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#d1d5db',
                            borderBottomWidth: 10,
                            marginTop: 20,
                        }}
                    />
                    <View className='my-4 px-4 flex flex-col'>
                        <Text className='text-slate-800 font-nunitoBold text-xl my-2'>
                            About me
                        </Text>
                        <Text className='text-lg font-nunitoRegular text-slate-800'>
                            It is a long established fact that a reader will be distracted by the
                            readable content of a page when looking at its layout.
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
