import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { AuthApi } from '@root/api/auth.api';
import { SignUpScreenProps } from '@root/types';
import { RegisterDto } from '@type/T-type';
import React, { useState } from 'react';
import {
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = ({ navigation }: SignUpScreenProps) => {
    const [hasExecuted, setExecuted] = useState<boolean>(true);
    const {
        value: firstNameValue,
        handleInputChange: handleFirstNameChange,
        handleInputBlur: handleFirstNameBlur,
        setEnteredValue: setFirstNameValue,
        hasError: firstNameHasError,
    } = useInput({ defaultValue: '', validationFn: () => true });

    const {
        value: lastNameValue,
        handleInputBlur: handleLastNameBlur,
        handleInputChange: handleLastNameChange,
        setEnteredValue: setLastNameValue,
        hasError: lastNameHasError,
    } = useInput({ defaultValue: '', validationFn: () => true });

    const {
        value: emailValue,
        handleInputBlur: handleEmailBlur,
        handleInputChange: handleEmailChange,
        setEnteredValue: setEmailValue,
        hasError: emailHasError,
    } = useInput({ defaultValue: '', validationFn: () => true });

    const {
        value: passwordValue,
        handleInputBlur: handlePasswordBlur,
        handleInputChange: handlePasswordChange,
        setEnteredValue: setPasswordValue,
        hasError: passwordHasError,
    } = useInput({ defaultValue: '', validationFn: () => true });

    const {
        value: confirmedPasswordValue,
        handleInputBlur: handleConfirmedPasswordBlur,
        handleInputChange: handleConfirmedPasswordChange,
        setEnteredValue: setConfirmedPasswordValue,
        hasError: confirmedPasswordHasError,
    } = useInput({ defaultValue: '', validationFn: () => true });

    const handleRegister = async () => {
        if (passwordValue !== confirmedPasswordValue) {
            console.log('passwords not match');
            return;
        }
        const registerDto: RegisterDto = {
            fullName: firstNameValue + ' ' + lastNameValue,
            email: emailValue,
            password: passwordValue,
            confirmedPassword: confirmedPasswordValue,
            isMale: true,
        };
        setExecuted(false);
        const data = await AuthApi.register(registerDto);
        console.log(data);
        const { status, message, data: account } = data;
        const userId: number = account.user.user_id;
        if (data) {
            setExecuted(true);
            setEmailValue('');
            setFirstNameValue('');
            setLastNameValue('');
            setPasswordValue('');
            setConfirmedPasswordValue('');
            navigation.push('Interest', { userId });
        }
    };

    if (!hasExecuted) {
        return (
            <SafeAreaView className='flex-1'>
                <View className='flex justify-center items-center w-full h-full'>
                    <ActivityIndicator size={'large'} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className='flex bg-sky-400 flex-1 justify-between'>
            {!hasExecuted && (
                <View style={styles.overlay}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
            )}
            <View className='mx-3 flex flex-col h-[25%]'>
                <View className='flex flex-row w-full'>
                    <TouchableOpacity
                        className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px]'
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='w-full text-center font-nunitoBold text-white text-2xl -left-[35px]'>
                        Register
                    </Text>
                </View>
                <View className='flex justify-center items-center'>
                    <Image
                        source={require('@asset/images/SignUp.png')}
                        style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                    />
                </View>
            </View>
            <View className='bg-white h-[70%] rounded-t-3xl p-5 flex flex-col space-y-1'>
                <View className='flex flex-row space-x-3'>
                    <View className='flex flex-col gap-2 w-[48%]'>
                        <Text className='text-gray-700 font-nunitoBold text-lg'>First Name</Text>
                        <TextInput
                            className='p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg'
                            value={firstNameValue}
                            onChange={handleFirstNameChange}
                            onBlur={handleFirstNameBlur}
                            placeholder='First name'
                        />
                    </View>
                    <View className='flex flex-col gap-2 w-[48%]'>
                        <Text className='text-gray-700 font-nunitoBold text-lg'>Last Name</Text>
                        <TextInput
                            className='p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg'
                            value={lastNameValue}
                            onChange={handleLastNameChange}
                            onBlur={handleLastNameBlur}
                            placeholder='Last name'
                        />
                    </View>
                </View>
                <View className='flex flex-col gap-2 w-full'>
                    <Text className='text-gray-700 font-nunitoBold text-lg'>Email Address</Text>
                    <TextInput
                        className='p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg'
                        value={emailValue}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        placeholder='Enter your email'
                    />
                </View>
                <View className='flex flex-col gap-2 w-full'>
                    <Text className='text-gray-700 font-nunitoBold text-lg'>Password</Text>
                    <TextInput
                        secureTextEntry
                        className='p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg'
                        value={passwordValue}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                        placeholder='Enter your password'
                    />
                </View>
                <View className='flex flex-col gap-2 w-full'>
                    <Text className='text-gray-700 font-nunitoBold text-lg'>
                        Confirmed password
                    </Text>
                    <TextInput
                        secureTextEntry
                        className='p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg'
                        value={confirmedPasswordValue}
                        onChange={handleConfirmedPasswordChange}
                        onBlur={handleConfirmedPasswordBlur}
                        placeholder='Confirm your password'
                    />
                </View>
                <View>
                    <TouchableOpacity
                        className='mt-3 py-3 bg-yellow-400 rounded-xl'
                        onPress={handleRegister}
                    >
                        <Text className='text-xl font-nunitoBold text-center text-gray-700'>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
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

export default SignUp;
