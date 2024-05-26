import ReportItem from '@component/ReportItem';
import SearchBar from '@component/SearchBar';
import { ReportScreenProps } from '@type/index';
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReportScreen = ({ navigation }: ReportScreenProps) => {
    return (
        <SafeAreaView className='flex flex-col space-y-4 px-2'>
            <Text className='text-center w-full text-2xl font-nunitoSemi text-sky-400'>
                Reports
            </Text>
            <View>
                <SearchBar />
            </View>
            <ReportItem press={() => navigation.push('ReportDetails', { reportId: 1 })} />
        </SafeAreaView>
    );
};

export default ReportScreen;
