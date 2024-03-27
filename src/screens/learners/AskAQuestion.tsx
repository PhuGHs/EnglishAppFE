import { faAngleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AskAQuestion = () => {
    return (
        <SafeAreaView className="flex flex-1 space-y-4 bg-white">
            <View className="px-3">
                <View className="flex flex-row mb-5 items-center">
                    <TouchableOpacity className="bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px]">
                        <FontAwesomeIcon icon={faArrowLeft} color="#374151" size={25} />
                    </TouchableOpacity>
                    <Text className="text-center w-full -left-[35px] text-sky-600 text-[22px] font-medium">
                        EngCom QA
                    </Text>
                </View>
            </View>
            <View className="px-3 bg-[#F0EEEC] flex flex-1 space-y-4">
                <Text className="text-xl font-medium text-gray-700 mt-4">
                    This question is about
                </Text>
                <TouchableOpacity className="bg-white py-4 px-2 rounded-xl flex flex-row justify-between items-center">
                    <Text className="text-lg font-medium text-gray-700">Select a field</Text>
                    <FontAwesomeIcon icon={faAngleRight} color="#374151" size={25} />
                </TouchableOpacity>
                <TextInput
                    placeholder="Write a word, phrase or sentence"
                    multiline={true}
                    className="bg-white p-3 rounded-xl text-lg"
                    style={{ height: 200, textAlignVertical: 'top' }}
                />
            </View>
            <View className="absolute bottom-10 flex items-center justify-center w-full">
                <TouchableOpacity
                    className="py-2 bg-yellow-400 rounded-xl"
                    style={{ elevation: 6, shadowColor: '#0f172a' }}
                >
                    <Text className="text-xl font-bold text-center text-gray-700 px-8 py-2">
                        Ask a question
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default AskAQuestion;
