import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View } from 'react-native';
import { ResultScreenProps, RootStackParamList } from '@type/index';
import { RouteProp } from '@react-navigation/native';

const ResultScreen = ({
    route,
    navigation,
}: ResultScreenProps & { route: RouteProp<RootStackParamList, 'ResultScreen'> }) => {
    const { score, numberOfQuestions, levelName, testId } = route.params;
    return (
        <SafeAreaView className='flex flex-1 bg-sky-400 items-center justify-center'>
            <View className='flex items-center justify-center h-[100%] w-[80%]'>
                <Text className='text-white font-nunitoXBold text-2xl mb-20'>Your score: {score}/{numberOfQuestions}</Text>
                <View>
                    <Text className='text-center text-white font-nunitoXBold text-xl'>{testId !== 1 ? 'Congrats!! You have completed the test, and you successfully reach to next level: ' : 'Congrats!! You have completed the test, but your english level still remains. Lets try again'}</Text>
                    {levelName && <Text className='mt-5 text-center font-nunitoBold text-blue-800 text-lg'>{levelName}</Text>}
                </View>
                <TouchableOpacity 
                    onPress={() => navigation.popToTop()}
                    className='absolute bottom-10 bg-white px-4 py-2 rounded-lg'>
                    <Text className='text-slate-700 font-nunitoBold text-lg'>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ResultScreen;