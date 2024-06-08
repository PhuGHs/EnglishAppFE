import Test from '@component/Test';
import TestQuestion from '@component/TestQuestion';
import { faArrowLeft, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { EnglishTestApi } from '@root/api/englishtest.api';
import { UserContext } from '@root/context/user-context';
import { Helper } from '@root/utils/helper';
import { TQuestionDto, TResultDto, TSubmitTestDto, TUserAnswerDto } from '@type/T-type';
import { RootStackParamList, TestScreenProps } from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TestScreen = ({
    route,
    navigation,
}: TestScreenProps & { route: RouteProp<RootStackParamList, 'Test'> }) => {
    const { testId } = route.params;
    const { user, setUser } = useContext(UserContext);
    const { user_id } = user.user;

    const [questions, setQuestions] = useState<TQuestionDto[]>([]);
    const [answers, setAnswers] = useState<TUserAnswerDto[]>([]);
    const [results, setResults] = useState<TResultDto[]>([]);

    const handleSelectOption = (question_id: number, selected_option_id: number) => {
        const updatedAnswers = answers.filter(ans => ans.question_id !== question_id);
        setAnswers([...updatedAnswers, { question_id, selected_option_id }]);
    };

    const handleSubmit = async () => {
        const dt = Helper.evaluateTest(questions, answers);
        setResults(results);
        const score = dt.reduce((count, result) => count = count + (result.correct ? 1 : 0), 0);
        const body: TSubmitTestDto = {
            english_test_id: testId,
            score: score,
            user_id: user_id,
            is_entry_level_test: testId === 1 ? true : false
        };
        try {
            const {data, message, status } = await EnglishTestApi.takeTest(body);
            if (status === 'SUCCESS') {
                navigation.push('ResultScreen', {
                    score: score,
                    numberOfQuestions: questions.length,
                    levelName: data.english_level.level_name,
                    testId: testId
                });
                user.user = {
                    user_id: data.user_id,
                    full_name: data.full_name,
                    profile_picture: data.profile_picture,
                    english_level: {
                        levelId: data.english_level.english_level_id,
                        levelName: data.english_level.level_name,
                        description: data.english_level.description
                    }
                };
                setUser(user);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, message, status } = await EnglishTestApi.getQuestions(testId);
                if (status === 'SUCCESS') {
                    setQuestions(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, []);
    return (
        <SafeAreaView className='flex flex-1 bg-slate-100 mx-4 space-y-4'>
            <View className='flex flex-row justify-between items-center mt-3'>
                <TouchableOpacity
                    className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                    onPress={() => navigation.pop()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                </TouchableOpacity>
                <Text className='text-[22px] text-sky-600 font-nunitoSemi'>Taking test</Text>
                <TouchableOpacity 
                    onPress={handleSubmit}
                    className='bg-sky-500 p-2 rounded-lg'>
                    <Text className='text-white text-base font-nunitoBold'>Submit</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={questions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => <TestQuestion item={item} index={index} key={index} onSelectOption={handleSelectOption} answers={answers}/>}
            />
        </SafeAreaView>
    );
};

export default TestScreen;