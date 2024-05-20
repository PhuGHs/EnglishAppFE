import { faAngleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CalendarDaysIcon, ClockIcon } from 'react-native-heroicons/solid';
import { RadioButtonProps } from 'react-native-radio-buttons-group';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateARoom = () => {
    const [selectedId, setSelectedId] = useState('');
    const radGroup: RadioButtonProps[] = useMemo(
        () => [
            {
                id: '1',
                label: 'A1 - Beginner',
            },
            {
                id: '2',
                label: 'A2 - Elementary',
            },
            {
                id: '3',
                label: 'B1 - Intermediate',
            },
            {
                id: '4',
                label: 'B2 - Upper intermediate',
            },
            {
                id: '5',
                label: 'C1 - Advanced',
            },
            {
                id: '6',
                label: 'C2 - Proficiency',
            },
        ],
        []
    );

    return (
        <SafeAreaView className='flex flex-1 bg-white'>
            <View className='flex flex-1'>
                <View className='px-3 mt-4'>
                    <View className='flex flex-row mb-5 items-center'>
                        <TouchableOpacity className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px]'>
                            <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                        </TouchableOpacity>
                        <Text className='text-center w-full -left-[35px] text-sky-600 text-[22px] font-nunitoSemi'>
                            Create A Room
                        </Text>
                    </View>
                </View>
                <ScrollView horizontal={false} className='flex flex-1 space-y-4 bg-[#F0EEEC]'>
                    <View className='px-3 flex flex-1 space-y-4'>
                        <Text className='text-xl font-nunitoSemi text-gray-700 mt-4'>
                            Select your language level for this room
                        </Text>
                        {radGroup.map((value, index) => (
                            <TouchableOpacity
                                key={value.id}
                                onPress={() => setSelectedId(value.id)}
                                className='flex justify-center items-start w-full'
                            >
                                <Text
                                    className={`p-3 w-full ${selectedId === value.id ? 'bg-sky-400 font-semibold text-white' : 'bg-white text-gray-800'} text-lg font-nunitoBold rounded-xl`}
                                >
                                    {value.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className='px-3 flex flex-1 space-y-4'>
                        <Text className='text-xl font-nunitoSemi text-gray-700 mt-4'>
                            Room Topic
                        </Text>
                        <TouchableOpacity className='bg-white py-4 px-2 rounded-xl flex flex-row justify-between items-center'>
                            <Text className='text-lg font-nunitoSemi text-gray-700'>
                                Select a topic
                            </Text>
                            <FontAwesomeIcon icon={faAngleRight} size={25} color='#374151' />
                        </TouchableOpacity>
                    </View>
                    <View className='px-3 flex flex-1 space-y-4'>
                        <Text className='text-xl font-nunitoSemi text-gray-700 mt-4'>
                            Start Date
                        </Text>
                        <TouchableOpacity className='bg-white py-4 px-2 rounded-xl flex flex-row justify-between items-center'>
                            <Text className='text-lg font-nunitoSemi text-gray-700'>Today</Text>
                            <CalendarDaysIcon size={25} color='#374151' />
                        </TouchableOpacity>
                    </View>
                    <View className='px-3 flex flex-1 space-y-4'>
                        <Text className='text-xl font-nunitoSemi text-gray-700 mt-4'>
                            Start Hour
                        </Text>
                        <TouchableOpacity className='bg-white py-4 px-2 rounded-xl flex flex-row justify-between items-center'>
                            <Text className='text-lg font-nunitoSemi text-gray-700'>10:32</Text>
                            <ClockIcon size={25} color='#374151' />
                        </TouchableOpacity>
                    </View>
                    <View className='flex items-center justify-center my-4'>
                        <TouchableOpacity
                            className='py-2 bg-yellow-400 rounded-xl'
                            style={{ elevation: 6, shadowColor: '#0f172a' }}
                        >
                            <Text className='text-xl font-nunitoBold text-center text-gray-700 px-8 py-2'>
                                Create a room
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default CreateARoom;
