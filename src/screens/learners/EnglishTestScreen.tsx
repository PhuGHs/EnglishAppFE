import Test from '@component/Test';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import {
    faArrowLeft,
    faCircleInfo,
    faHeart,
    faInfo,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { EnglishTestApi } from '@root/api/englishtest.api';
import { UserContext } from '@root/context/user-context';
import { TUserTestDto } from '@type/T-type';
import { EnglishTestListScreenProps, RootStackParamList } from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EnglishTestScreen = ({
    route,
    navigation,
}: EnglishTestListScreenProps & {
    route: RouteProp<RootStackParamList, 'EnglishTestListScreen'>;
}) => {
    const { user } = useContext(UserContext);
    const { user_id } = user.user;
    const { levelId } = route.params;
    
    const [tests, setTests] = useState<TUserTestDto[]>([]);
    const [doneCount, setDoneCount] = useState<number>(0);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, message, status } = await EnglishTestApi.getUserTests(user_id, levelId);
                if (status === 'SUCCESS') {
                    setTests(data);
                    const doneCount = data.reduce((count, test) => count + (test.is_passed ? 1 : 0), 0);
                    setDoneCount(doneCount);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, [levelId, user_id]);

    const handleNavigate = async (testId: number) => {
        navigation.push('Test', {testId: testId });
    };

    return (
        <SafeAreaView className='flex bg-slate-100 flex-1 mx-4 space-y-8'>
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
                <View className='w-full rounded-xl bg-white p-4 space-y-4' style={{ elevation: 5 }}>
                    <View className='flex flex-row items-center space-x-4'>
                        <FontAwesomeIcon icon={faInfoCircle} size={24} color='#38bdf8' />
                        <Text className='text-gray-700 font-nunitoBold text-lg'>Notes </Text>
                    </View>
                    <Text className='text-gray-600 font-nunitoMedium text-lg'>
                        You have to pass all the tests mentioned below to reach to next english
                        level.
                    </Text>
                </View>
                <Text className='text-right w-full text-xl font-nunitoBold text-gray-700 mb-4'>
                    Tests: {doneCount}/{tests?.length}
                </Text>
                <FlatList
                    data={tests}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index}) => <Test handleNavigate={() => handleNavigate(item.english_test.english_test_id)} test={item} key={index} index={index + 1}/>}
                />
            </View>
        </SafeAreaView>
    );
};

export default EnglishTestScreen;
