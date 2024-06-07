import ImageView from 'react-native-image-viewing';
import { faArrowLeft, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RouteProp } from '@react-navigation/native';
import { ReportDetailsScreenProps, RootStackParamList } from '@type/index';
import React, { useEffect, useRef, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TReportDto } from '@type/T-type';
import { ReportApi } from '@root/api/report.api';
import { Helper } from '@root/utils/helper';
import { useToast } from '@root/context/toast-context';

const ReportDetails = ({
    route,
    navigation,
}: ReportDetailsScreenProps & { route: RouteProp<RootStackParamList, 'ReportDetails'> }) => {
    const { reportId } = route.params;
    const [visible, setVisible] = useState<boolean>(false);
    const [report, setReport] = useState<TReportDto>();
    const [loading, setLoading] = useState<boolean>(true);
    const { showToast } = useToast();

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, status } = await ReportApi.getDetails(reportId);
                if (status === 'SUCCESS') {
                    setReport(data);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetch();
    }, [reportId]);

    const markAsResolved = async () => {
        try {
            const { data, message, status } = await ReportApi.markAsSolved(reportId);
            if (status === 'SUCCESS') {
                showToast({ type: 'success', description: 'Resolved', timeout: 3000 });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const ban = async () => {
        try {
            const { data, message, status } = await ReportApi.ban(
                reportId,
                report.reported.user_id
            );
            if (status === 'SUCCESS') {
                showToast({ type: 'success', description: 'Banned user', timeout: 3000 });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
            )}
            <SafeAreaView className='flex flex-1 mx-4'>
                <ScrollView className='flex flex-col space-y-8'>
                    <View className='flex flex-row justify-between items-center mt-3'>
                        <TouchableOpacity
                            className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                            onPress={() => navigation.pop()}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                        </TouchableOpacity>
                        <Text className='text-[22px] text-sky-600 font-nunitoSemi'>Details</Text>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faCircleInfo} color='#0ea5e9' size={30} />
                        </TouchableOpacity>
                    </View>
                    <View className='flex flex-col space-y-4'>
                        <View className='w-full bg-white p-4 rounded-xl'>
                            <Text className='text-sky-400 text-lg font-nunitoBold'>
                                REPORT #{report?.id}
                            </Text>
                            <Text className='text-red-400 text-lg font-nunitoSemi'>
                                {report?.is_solved ? 'Solved' : 'Not yet'}
                            </Text>
                            <Text className='text-gray-700 text-lg font-nunitoSemi'>
                                Date: {Helper.formatReportDate(report?.created_date)}
                            </Text>
                        </View>
                        <View className='flex flex-row justify-between'>
                            <View className='flex flex-col space-y-2 w-[45%]'>
                                <Text className='text-gray-700 text-lg font-nunitoBold text-sky-400'>
                                    REPORTER ID
                                </Text>
                                <View className='w-full bg-white rounded-xl p-4'>
                                    <Text className='text-lg text-gray-600 font-nunitoSemi'>
                                        {report?.reporter.user_id}
                                    </Text>
                                </View>
                            </View>
                            <View className='flex flex-col space-y-2 w-[45%]'>
                                <Text className='text-gray-700 text-lg font-nunitoBold text-sky-400'>
                                    VIOLATOR ID
                                </Text>
                                <View className='w-full bg-white rounded-xl p-4'>
                                    <Text className='text-lg text-gray-600 font-nunitoSemi'>
                                        {report?.reported?.user_id}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className='flex flex-col space-y-2'>
                            <Text className='text-gray-700 text-lg font-nunitoBold text-sky-400'>
                                REASON
                            </Text>
                            <View className='w-full bg-white rounded-xl p-4'>
                                <Text className='text-lg text-gray-600 font-nunitoSemi'>
                                    {report?.reason}
                                </Text>
                            </View>
                        </View>
                        <View className='flex flex-col space-y-2'>
                            <Text className='text-gray-700 text-lg font-nunitoBold text-sky-400'>
                                ADDITIONAL INFORMATION
                            </Text>
                            <View className='w-full bg-white rounded-xl p-4'>
                                <Text className='text-lg text-gray-600 font-nunitoSemi'>
                                    {report?.content}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <Image
                                source={{
                                    uri: report?.evidence_image,
                                }}
                                resizeMode='cover'
                                className='w-full h-[200px] rounded-xl'
                            />
                        </TouchableOpacity>
                        <ImageView
                            images={[{ uri: report?.evidence_image }]}
                            imageIndex={0}
                            visible={visible}
                            onRequestClose={() => setVisible(false)}
                        />
                    </View>
                    <View className='flex flex-row justify-between mb-4'>
                        <TouchableOpacity
                            onPress={() => markAsResolved()}
                            disabled={report?.is_solved}
                            className={`w-[50%] p-4 items-center rounded-lg ${report?.is_solved ? 'bg-yellow-100' : 'bg-yellow-400'}`}
                        >
                            <Text
                                className={`text-lg font-nunitoBold ${report?.is_solved ? 'text-gray-400' : 'text-gray-700'}`}
                            >
                                Mark as resolved
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => ban()}
                            disabled={report?.is_solved}
                            className={`w-[40%] p-4 items-center rounded-lg ${report?.is_solved ? 'bg-yellow-100' : 'bg-yellow-400'}`}
                        >
                            <Text
                                className={`text-lg font-nunitoBold ${report?.is_solved ? 'text-gray-400' : 'text-gray-700'}`}
                            >
                                Ban
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default ReportDetails;
