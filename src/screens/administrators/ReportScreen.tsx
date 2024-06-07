import ReportItem from '@component/ReportItem';
import SearchBar from '@component/SearchBar';
import { ReportApi } from '@root/api/report.api';
import { TReportDto } from '@type/T-type';
import { ReportScreenProps } from '@type/index';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReportScreen = ({ navigation }: ReportScreenProps) => {
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(50);
    const [reports, setReports] = useState<TReportDto[]>([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetch = async () => {
                try {
                    const { status, message, data } = await ReportApi.get(
                        pageNumber,
                        pageSize,
                        'createdDate'
                    );
                    setReports(data.content);
                } catch (error) {
                    console.error(error);
                }
            };
            fetch();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView className='flex flex-col space-y-4 px-2'>
            <Text className='text-center w-full text-2xl font-nunitoSemi text-sky-400'>
                Reports
            </Text>
            <View>
                <SearchBar />
            </View>
            <FlatList
                data={reports}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <ReportItem
                        item={item}
                        key={index}
                        press={() => navigation.push('ReportDetails', { reportId: item.id })}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default ReportScreen;
