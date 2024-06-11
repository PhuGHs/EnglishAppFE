import Checkbox from 'expo-checkbox';
import { EnglishTestScreenProps, RootStackParamList } from '@root/types';
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { RouteProp } from '@react-navigation/native';

const EnglishTest = ({
    route,
    navigation,
}: EnglishTestScreenProps & { route: RouteProp<RootStackParamList, 'EnglishTest'> }) => {
    return (
        <SafeAreaView className='flex-1 bg-neutral-100 px-4 space-y-4 flex justify-between'>
            <View>
                <View className='flex flex-row mb-5 items-center'>
                    <TouchableOpacity
                        className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px]'
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='text-center w-full -left-[35px] text-sky-600 text-2xl font-nunitoSemi'>
                        Assessment Test
                    </Text>
                </View>
                <View className='flex flex-col gap-4'>
                    <Text className='text-gray-700 text-lg'>
                        This is a compulsory part of our application, you have to take it seriously
                        so that we can assess your English abilitiy acurately.
                    </Text>
                    <Text className='text-gray-700 text-lg'>
                        In this test, you will have to take 20 minutes to answer 20 multiple choices
                        questions
                    </Text>
                    <View className='flex w-full relative'>
                        <Image
                            className='absolute top-0 left-0'
                            source={require('@asset/images/Test.png')}
                            style={{ resizeMode: 'contain', width: '100%' }}
                        />
                    </View>
                </View>
            </View>
            <View className='flex flex-col gap-3'>
                <View className='flex flex-row gap-2 items-center'>
                    <Checkbox value={true} />
                    <Text className='text-base text-gray-500'>Agree to take the test</Text>
                </View>
                <View className='flex flex-row justify-evenly'>
                    <TouchableOpacity
                    className='rounded-2xl bg-yellow-400 px-8 py-4 mb-5 flex justify-center items-center'
                    onPress={() => navigation.navigate('Tabs')}
                >
                    <Text className='font-nunitoBold text-gray-700 text-xl'>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        className='rounded-2xl bg-yellow-400 px-8 py-2 mb-5 flex justify-center items-center'
                        onPress={() => navigation.navigate('Test', { testId: 1})}
                    >
                        <Text className='font-nunitoBold text-gray-700 text-xl'>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default EnglishTest;
