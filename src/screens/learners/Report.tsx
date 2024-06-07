import { faCloudUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import {
    ReportLearnerScreenProps,
    RootStackParamList,
} from '@type/index';
import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal/dist/modal';
import { UserContext } from '@root/context/user-context';
import { useToast } from '@root/context/toast-context';
import * as ImagePicker from 'expo-image-picker';
import { ReportApi } from '@root/api/report.api';
import { TPostReport } from '@type/T-type';

const ReportLearner = ({
    route,
    navigation,
}: ReportLearnerScreenProps & { route: RouteProp<RootStackParamList, 'ReportLearner'> }) => {
    const { userId: receiverId } = route.params;
    const { user } = useContext(UserContext);
    const { user_id: senderId } = user.user;
    const { showToast } = useToast();

    const [confirmedModalVisible, setConfirmedModalVisible] = useState<boolean>(false);
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const {
        value: thoughts,
        handleInputChange: handleThoughtsChange,
        handleInputBlur: handleThoughtsBlur,
        setEnteredValue: setThoughtsValue,
        hasError: thoughtsHasError,
        didEdit,
        setDidEdit,
    } = useInput({
        defaultValue: '',
        validationFn: (value) => value.trim().split(/\s+/).length > 6,
    });

    const wordCount = thoughts.trim().split(/\s+/).length;
    const remainingWords = 50 - wordCount;

    const handleGoOut = () => {
        if (didEdit) {
            setConfirmedModalVisible(true);
        } else {
            navigation.pop();
        }
    };

    const handleReport = async () => {
        setLoading(true);
        const body: TPostReport = {
            reported_id: receiverId,
            reporter_id: senderId,
            content: thoughts,
            evidence_image: imageBase64
        };
        try {
            const { message, status } = await ReportApi.report(body);
            if (status === 'SUCCESS') {
                showToast({type: 'success', description: 'Thank you for helping us, we will letting you know when your report works', timeout: 10000});
                navigation.pop();
            } else {
                showToast({type: 'danger', description: message, timeout: 5000});
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setImageBase64('data:image/png;base64,' + result.assets[0].base64);
            }
        } catch (error) {
            showToast({
                type: 'danger',
                description: 'Error lauching image library',
                timeout: 5000,
            });
        }
    };

    return (
        <>
            <SafeAreaView className='flex bg-slate-100 flex-1 space-y-3'>
            <View className='w-full h-[10%] bg-white flex justify-center px-4'>
                <TouchableOpacity onPress={handleGoOut}>
                    <FontAwesomeIcon icon={faXmark} size={25} color='#7F7F81' />
                </TouchableOpacity>
            </View>
            <View className='flex-1 bg-white rounded-2xl flex p-6 flex-col justify-between'>
                <View className='space-y-3'>
                    <Text className='font-nunitoBold text-2xl text-gray-700'>
                        Tell us the reason why you want to report this learner? Describe the reason?
                    </Text>
                    {!image ? (
                                    <TouchableOpacity className='w-full' onPress={pickImage}>
                                        <View
                                            className='w-full bg-white rounded-xl px-4 py-8 flex items-center justify-center'
                                            style={{
                                                borderWidth: 2,
                                                borderRadius: 5,
                                                borderStyle: 'dashed',
                                                borderColor: 'grey',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCloudUpload}
                                                size={50}
                                                color='#7F7F81'
                                            />
                                            <Text className='text-lg font-nunitoSemi text-[#7F7F81]'>
                                                Touch here to upload photo!
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <Image
                                        className='w-full h-[200px] rounded-xl'
                                        source={{ uri: image }}
                                    />
                                )}
                    <View className='w-full flex-col border-2 border-[#C7C7C7] rounded-lg p-2'>
                        <TextInput
                            className='w-full mb-8 font-nunitoMedium text-[17px] text-gray-700'
                            multiline={true}
                            value={thoughts}
                            onChange={handleThoughtsChange}
                            onBlur={handleThoughtsBlur}
                            placeholder='Write your reasons here, and explain them.'
                        />
                        <Text className='text-[#F3641A] text-right font-nunitoMedium'>
                            {remainingWords} words remaining
                        </Text>
                    </View>
                    {didEdit && thoughtsHasError && (
                        <Text className='text-red-400 text-base font-nunitoMedium'>
                            Your thoughts should be more lengthy, minimum of 6 words
                        </Text>
                    )}
                </View>
                <View className='items-center'>
                    <TouchableOpacity
                        className={`${thoughtsHasError ? 'bg-yellow-300' : 'bg-yellow-400'} px-4 py-3 rounded-xl`}
                        style={{ elevation: 5 }}
                        disabled={thoughtsHasError}
                        onPress={handleReport}
                    >
                        <Text
                            className={`${thoughtsHasError ? 'text-gray-500' : 'text-gray-700'} font-nunitoXBold text-lg`}
                        >
                            Report
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                isVisible={confirmedModalVisible}
                onBackButtonPress={() => setConfirmedModalVisible(!confirmedModalVisible)}
                onBackdropPress={() => setConfirmedModalVisible(!confirmedModalVisible)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <View className='flex flex-col bg-white rounded-2xl p-4 space-y-4'>
                    <Text className='text-sky-600 text-center text-xl font-nunitoBold'>
                        Confirmation
                    </Text>
                    <Text className='text-base text-gray-700 font-nunitoSemi'>
                        You are being in progress! Do you really want to quit?
                    </Text>
                    <View
                        style={{
                            borderBottomColor: '#d1d5db',
                            borderBottomWidth: 2,
                            marginTop: 10,
                        }}
                    />
                    <View className='flex flex-row justify-evenly'>
                        <TouchableOpacity
                            className='py-4 px-6 rounded-xl bg-red-400'
                            onPress={() => setConfirmedModalVisible(false)}
                        >
                            <Text className='text-white text-lg font-nunitoBold'>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='py-4 px-6 bg-yellow-400 text-gray-700 rounded-xl'
                            onPress={() => navigation.pop()}
                        >
                            <Text className='text-gray-700 text-lg font-nunitoSemi'>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
        {loading && (
            <View style={styles.overlay}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        )}
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

export default ReportLearner;
