import Checkbox from 'expo-checkbox';
import { EnglishTestScreenProps } from '@root/types';
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';

const EnglishTest = ({ navigation }: EnglishTestScreenProps ) => {
    return (
        <SafeAreaView className='flex-1 bg-neutral-100 px-8 space-y-4 flex justify-between'>
            <View>
                <View className='flex flex-row justify-between mb-5'>
                    <TouchableOpacity className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[35px]' onPress={() => navigation.pop()}>
                        <ChevronLeftIcon color='black' size='20'/>
                    </TouchableOpacity>
                    <Text className='text-sky-600 text-2xl font-medium'>English Assessment Test</Text>
                    <View></View>
                </View>
                <View className='flex flex-col gap-4'>
                    <Text className='text-gray-700 text-lg'>This is a compulsory part of our application, you have to take it seriously so that we can assess your English abilitiy acurately.</Text>
                    <Text className='text-gray-700 text-lg'>In this test, you will have to take 30 minutes to answer 30 multiple choices questions</Text>
                    <View className='flex justify-center w-full'>
                        <Image source={require('@asset/images/Test.png')} style={{resizeMode: 'contain', width: '100%', height: '50%'}}/>
                    </View>
                </View>
            </View>
            <View className='flex flex-col gap-3'>
                <View className='flex flex-row gap-2 items-center'>
                    <Checkbox value={true}/>
                    <Text className='text-base text-gray-500'>Agree to take the test</Text>
                </View>
                <TouchableOpacity className='rounded-2xl bg-yellow-400 p-4 mb-5 flex justify-center items-center'>
                    <Text className='font-bold text-gray-700 text-xl' onPress={() => navigation.navigate('EnglishTest')}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default EnglishTest;