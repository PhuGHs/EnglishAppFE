import DoubleTab from '@navigation/DoubleTab';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LearnersScreen = () => {
    return (
        <SafeAreaView>
            <Text className="text-center w-full text-sky-500 font-semibold text-3xl my-2">
                Learners
            </Text>
            <DoubleTab />
        </SafeAreaView>
    );
};

export default LearnersScreen;
