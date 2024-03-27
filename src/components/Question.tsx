import Checkbox from 'expo-checkbox';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

type TAnswer = {
    id?: string;
    name: string;
};

interface IQuestionsProps {
    questions: IQuestionProps[];
}

export interface IQuestionProps {
    seqNum?: number;
    question: string;
    answers: TAnswer[];
    correctAnswerId?: string;
}

const Answer = ({ id, name }: TAnswer) => {
    return (
        <View className="flex flex-row gap-2">
            <Checkbox value={false} />
            <Text className="text-base text-gray-700">{name}</Text>
        </View>
    );
};

const Question = ({ question, answers, seqNum }: IQuestionProps) => {
    return (
        <View className="flex flex-col gap-y-4 px-4">
            <Text className="text-gray-700 text-xl">{seqNum && `${seqNum}. ${question}`}</Text>
            <View className="flex flex-col my-5">
                {answers.map((value, index) => (
                    <Answer key={index} name={value.name} />
                ))}
            </View>
        </View>
    );
};

export default Question;
