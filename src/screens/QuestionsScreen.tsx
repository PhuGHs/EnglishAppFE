import ProgressBar from '@root/components/ProgressBar';
import Questions, { IQuestionProps } from '@root/components/Question';
import { QuestionsScreenProps } from '@root/types';
import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButtonProps } from 'react-native-radio-buttons-group';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faMapLocation } from '@fortawesome/free-solid-svg-icons';

const arr: IQuestionProps[] = [
    {
        question: 'Do you feel comfortable asking for help when youre stuck?',
        answers: [
            {
                id: '1',
                name: 'Yes, I feel very much comfortable asking for help. Thats how you learn!',
            },
            {
                id: '2',
                name: 'No, Im scared people might judge me',
            },
            {
                id: '3',
                name: 'I fully and wholeheartedly do!',
            },
            {
                id: '4',
                name: 'No, Im afraid we dont have that kind of dynamic yet.',
            },
        ],
        correctAnswerId: '1',
    },
    {
        question: 'Do you feel comfortable asking for help when youre stuck?',
        answers: [
            {
                id: '1',
                name: 'Yes, I feel very much comfortable asking for help. Thats how you learn!',
            },
            {
                id: '2',
                name: 'No, Im scared people might judge me',
            },
            {
                id: '3',
                name: 'I fully and wholeheartedly do!',
            },
            {
                id: '4',
                name: 'No, Im afraid we dont have that kind of dynamic yet.',
            },
        ],
        correctAnswerId: '1',
    },
    {
        question: 'Do you feel comfortable asking for help when youre stuck?',
        answers: [
            {
                id: '1',
                name: 'Yes, I feel very much comfortable asking for help. Thats how you learn!',
            },
            {
                id: '2',
                name: 'No, Im scared people might judge me',
            },
            {
                id: '3',
                name: 'I fully and wholeheartedly do!',
            },
            {
                id: '4',
                name: 'No, Im afraid we dont have that kind of dynamic yet.',
            },
        ],
        correctAnswerId: '1',
    },
    {
        question: 'Do you feel comfortable asking for help when youre stuck?',
        answers: [
            {
                id: '1',
                name: 'Yes, I feel very much comfortable asking for help. Thats how you learn!',
            },
            {
                id: '2',
                name: 'No, Im scared people might judge me',
            },
            {
                id: '3',
                name: 'I fully and wholeheartedly do!',
            },
            {
                id: '4',
                name: 'No, Im afraid we dont have that kind of dynamic yet.',
            },
        ],
        correctAnswerId: '1',
    },
];

const QuestionsScreen = ({ navigation }: QuestionsScreenProps) => {
    const radGroup: RadioButtonProps[] = useMemo(
        () => [
            {
                id: '1',
                label: 'Yes, I feel very much comfortable asking for help. Thats how you learn!',
            },
            {
                id: '2',
                label: 'Yes, I feel very much comfortable asking for help. Thats how you learn!',
            },
            {
                id: '3',
                label: 'Yes, I feel very much comfortable asking for help. Thats how you learn!',
            },
            {
                id: '4',
                label: 'Yes, I feel very much comfortable asking for help. Thats how you learn!',
            },
        ],
        []
    );

    const [selectedId, setSelectedId] = useState<string>();
    return (
        <SafeAreaView className='mx-3 space-y-4 flex flex-col justify-between h-full'>
            <View>
                <Text className='w-full text-center text-2xl text-sky-500 font-semibold my-2'>
                    Assessment Test
                </Text>
                <View className='flex flex-row justify-between items-center'>
                    <Text className='text-lg text-gray-700 font-nunitoBold'>6/10</Text>
                    <View className='flex flex-row justify-between items-center bg-orange-100 p-2 rounded-full'>
                        <FontAwesomeIcon icon={faClock} color='#fb923c' size={20} />
                        <Text className='text-lg text-orange-400 font-semibold'> 3min 55s</Text>
                    </View>
                </View>
                <ProgressBar percentage={`${Math.round((6 / 10) * 100)}%`} />

                <View className='flex flex-col gap-y-4 mt-4'>
                    <Text className='text-2xl text-gray-700'>
                        1. Do you feel comfortable asking for help when youre stuck?
                    </Text>
                    {/* <View className='border border-gray-300 h-auto rounded-2xl'>
                        <View className='flex flex-col p-4'>
                            {radGroup.map((value, index) => <RadioButton id={value.id} labelStyle={styles.label} label={value.label} color='#4ade80' selected={value.id === selectedId} onPress={(id) => setSelectedId(id)}/>)}
                        </View>
                    </View> */}
                    <View>
                        {radGroup.map((value, index) => (
                            <TouchableOpacity
                                onPress={() => setSelectedId(value.id)}
                                className='flex justify-center items-start w-full'
                            >
                                <Text
                                    className={`p-3 w-full ${selectedId === value.id ? 'bg-sky-400 font-semibold text-white' : 'bg-sky-200'} text-base my-2 rounded-2xl`}
                                >
                                    {value.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
            <View className='flex flex-row justify-between'>
                <TouchableOpacity
                    className='rounded-2xl bg-yellow-400 p-4 mb-5 flex justify-center items-center w-[30%]'
                    onPress={() => navigation.navigate('QuestionsScreen')}
                >
                    <Text className='font-semibold text-gray-700 text-base'>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity className='p-2 flex justify-center items-center bg-sky-100 mb-5 rounded-2xl'>
                    <FontAwesomeIcon icon={faMapLocation} size={40} color='#38bdf8' />
                </TouchableOpacity>
                <TouchableOpacity
                    className='rounded-2xl bg-yellow-400 p-4 mb-5 flex justify-center items-center w-[30%]'
                    onPress={() => navigation.navigate('QuestionsScreen')}
                >
                    <Text className='font-semibold text-gray-700 text-base'>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    radio: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
    },
});

export default QuestionsScreen;
