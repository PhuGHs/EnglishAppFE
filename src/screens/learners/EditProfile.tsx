import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { UserContext } from '@root/context/user-context';
import { FollowersScreenProps, RootStackParamList } from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageView from 'react-native-image-viewing';
import * as ImagePicker from 'expo-image-picker';
import { useToast } from '@root/context/toast-context';
import Modal from 'react-native-modal/dist/modal';
import { TUserNecessary, TUserProfile } from '@type/T-type';
import { UserApi } from '@root/api/user.api';
import { storeData } from '@root/utils/asyncStorage';

const EditProfile = ({
    route,
    navigation,
}: FollowersScreenProps & { route: RouteProp<RootStackParamList, 'FollowersScreen'> }) => {
    const { user, setUser } = useContext(UserContext);
    const { showToast } = useToast();
    const { full_name, profile_picture, user_id, english_level } = user.user;
    const { email } = user;

    const [visible, setVisible] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [confirmedModalVisible, setConfirmedModalVisible] = useState<boolean>(false);
    const [imgBase64, setImgBase64] = useState<string>();
    const [avatar, setAvatar] = useState(profile_picture);

    const {
        value: name,
        handleInputBlur: handleNameBlur,
        handleInputChange: handleNameChange,
        setEnteredValue: setNameValue,
        hasError: nameHasError,
        didEdit,
        setDidEdit,
    } = useInput({ defaultValue: full_name, validationFn: (value) => value.length > 6 });

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
                setImgBase64('data:image/png;base64,' + result.assets[0].base64);
                setAvatar(result.assets[0].uri);
            }
        } catch (error) {
            showToast({
                type: 'danger',
                description: 'Error lauching image library',
                timeout: 5000,
            });
        }
    };

    const handleSave = async () => {
        if (nameHasError) {
            showToast({
                type: 'danger',
                description: 'There is error on full name',
                timeout: 5000,
            });
            return;
        }
        try {
            const { data, message, status } = await UserApi.changeInfo(user_id, imgBase64, name);
            if (status === 'FAIL') {
                showToast({ type: 'danger', description: message, timeout: 5000 });
            }
            user.user = data as TUserNecessary;
            await storeData({ value: user, item: 'user' });
            setUser(user);
            setDidEdit(false);
            showToast({ type: 'success', description: 'Saved your changes', timeout: 3000 });
        } catch (error) {
            showToast({ type: 'danger', description: 'error when saving', timeout: 5000 });
        }
    };

    const handleQuit = () => {
        if (didEdit) {
            setConfirmedModalVisible(true);
        } else {
            navigation.pop();
        }
    };

    return (
        <SafeAreaView className='flex flex-1 bg-slate-100 space-y-3'>
            <View className='w-full h-[10%] bg-white flex items-center px-4 flex-row flex-start space-x-4'>
                <TouchableOpacity onPress={handleQuit}>
                    <FontAwesomeIcon icon={faXmark} size={25} color='#374151' />
                </TouchableOpacity>
                <Text className='text-xl font-nunitoBold text-gray-700'>Edit profile</Text>
            </View>
            <View className='space-y-3 p-4 rounded-xl w-full h-[90%] justify-between'>
                <View className='flex items-center justify-center'>
                    <TouchableOpacity
                        className='flex items-center'
                        onPress={() => setModalVisible(true)}
                    >
                        <Image
                            source={
                                profile_picture
                                    ? { uri: avatar }
                                    : require('@asset/images/avatar.jpg')
                            }
                            style={{
                                resizeMode: 'cover',
                                width: 120,
                                height: 120,
                                borderRadius: 120 / 2,
                            }}
                        />
                        <View
                            className='bg-white flex items-center justify-center absolute bottom-0 right-0'
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30 / 2,
                            }}
                        >
                            <FontAwesomeIcon icon={faCamera} color='#858585' size={20} />
                        </View>
                    </TouchableOpacity>
                    <ImageView
                        images={[{ uri: avatar }]}
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setVisible(false)}
                    />
                </View>

                <View className='flex flex-col space-y-4'>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 font-nunitoBold text-xl'>Full name</Text>
                        <View>
                            <TextInput
                                className='w-full bg-white px-3 text-gray-700 py-4 rounded-xl text-lg font-nuntitoSemi'
                                value={name}
                                onBlur={handleNameBlur}
                                onChange={handleNameChange}
                            />
                            {nameHasError && (
                                <Text className='text-red-400 pt-1 font-nunitoMedium text-base'>
                                    Full name should have length not less than 7
                                </Text>
                            )}
                        </View>
                    </View>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 font-nunitoBold text-xl'>Email</Text>
                        <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            className='w-full bg-white px-3 text-gray-700 py-4 rounded-xl text-lg font-nuntitoSemi'
                            value={email}
                        />
                    </View>
                    <View className='flex flex-col space-y-2'>
                        <Text className='text-gray-700 font-nunitoBold text-xl'>English</Text>
                        <TextInput
                            value={english_level.levelName}
                            editable={false}
                            className='w-full bg-white px-3 text-gray-700 py-4 rounded-xl text-lg font-nuntitoSemi'
                            selectTextOnFocus={false}
                        />
                    </View>
                </View>
                <View className='flex flex-row items-center justify-center mb-4'>
                    <TouchableOpacity
                        className='bg-yellow-400 w-[40%] items-center rounded-xl justify-center'
                        onPress={handleSave}
                    >
                        <Text className='text-gray-700 font-nunitoXBold text-lg py-4'>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                isVisible={modalVisible}
                onBackButtonPress={() => setModalVisible(!modalVisible)}
                onBackdropPress={() => setModalVisible(!modalVisible)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <View className='flex flex-col bg-white rounded-2xl p-4 space-y-4'>
                    <Text className='text-sky-600 text-center text-xl font-nunitoBold'>
                        Choose your options
                    </Text>
                    <View
                        style={{
                            borderBottomColor: '#d1d5db',
                            borderBottomWidth: 2,
                            marginTop: 10,
                        }}
                    />
                    <View className='flex flex-col space-y-2'>
                        <TouchableOpacity className='py-4' onPress={() => setVisible(true)}>
                            <Text className='text-gray-700 text-base font-nunitoSemi'>
                                See profile picture
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='py-4' onPress={pickImage}>
                            <Text className='text-gray-700 text-base font-nunitoSemi'>
                                Update profile picture
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
                        You have not saved your changes yet. Do you want to save them?
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
                            onPress={() => navigation.pop()}
                        >
                            <Text className='text-white text-lg font-nunitoBold'>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='py-4 px-6 bg-yellow-400 text-gray-700 rounded-xl'
                            onPress={handleSave}
                        >
                            <Text className='text-gray-700 text-lg font-nunitoSemi'>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default EditProfile;
