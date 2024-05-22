import Test from '@component/Test';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faCircleInfo, faHeart, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { EnglishTestListScreenProps, RootStackParamList } from '@type/index';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EnglishTestScreen = ({ route, navigation }: EnglishTestListScreenProps & { route: RouteProp<RootStackParamList, 'EnglishTestListScreen'> }) => {
    const { levelId } = route.params;
    console.log(levelId);
    return (
        <SafeAreaView className='flex flex-1 mx-4 space-y-8'>
            <View className='flex flex-row justify-between items-center mt-3'>
                <TouchableOpacity
                    className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                    onPress={() => navigation.pop()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                </TouchableOpacity>
                <Text className='text-[22px] text-sky-600 font-nunitoSemi'>Tests</Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faCircleInfo} color='#0ea5e9' size={30} />
                </TouchableOpacity>
            </View>
            <View className='flex flex-col space-y-4'>
                <View className='w-full rounded-xl bg-white p-4 space-y-4' style={{elevation: 5}}>
                    <View className='flex flex-row items-center space-x-4'>
                        <FontAwesomeIcon icon={faInfoCircle} size={24} color='#38bdf8' />
                        <Text className='text-gray-700 font-nunitoBold text-lg'>Notes </Text>
                    </View>
                    <Text className='text-gray-600 font-nunitoMedium text-lg'>You have to pass all the tests mentioned below to reach to next english level.</Text>
                </View>
                <Text className='text-right w-full text-xl font-nunitoBold text-gray-700 mb-4'>Tests: 1/1</Text>
                <Test />
            </View>
        </SafeAreaView>
    );
};

export default EnglishTestScreen;
