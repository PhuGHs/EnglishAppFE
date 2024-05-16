import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { AuthApi } from '@root/api/auth.api';
import { useToast } from '@root/context/toast-context';
import { SignInScreenProps } from '@root/types';
import { storeData } from '@root/utils/asyncStorage';
import { Helper } from '@root/utils/helper';
import { AuthResponse } from '@type/T-type';
import React, { useEffect, useRef, useState } from 'react';
import { Text, Image, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const SignIn = ({ navigation }: SignInScreenProps) => {
    const { showToast } = useToast();
    const [hasExecuted, setExecuted] = useState<boolean>(true);
    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        setEnteredValue: setEmailValue,
        hasError: emailHasError
    } = useInput({defaultValue: '', validationFn: Helper.validateEmail});

    const {
        value: passwordValue,
        handleInputBlur: handlePasswordBlur,
        handleInputChange: handlePasswordChange,
        setEnteredValue: setPasswordValue,
        hasError: passwordHasError
    } = useInput({defaultValue: '', validationFn: Helper.validatePassword});

    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const handleLogin = async () => {
        if (emailHasError) {
            showToast({ type: 'danger', description: 'Invalid email', timeout: 3000 });
            return;
        }
        if (passwordHasError) {
            showToast({ type: 'danger', description: 'Password must have more than 6 digits', timeout: 2000 });
            return;
        }

        setExecuted(false);

        try {
            const { data } = await AuthApi.login({ email: emailValue, password: passwordValue });
            const { accessToken, account } = data;

            if (accessToken && account) {
                storeData({ value: accessToken, item: 'token' });
                storeData({ value: account, item: 'user' });
                setEmailValue('');
                setPasswordValue('');
                setExecuted(true);

                if (account.is_active) {
                    navigation.push('Tabs');
                } else {
                    navigation.push('Interest', { userId: account.user.userId });
                }

                showToast({ type: 'success', description: 'Login success', timeout: 2000 });
            } else {
                throw new Error('Invalid response data');
            }
        } catch (error) {
            setExecuted(true);
            showToast({ type: 'danger', description: 'No account found with the username and password provided!', timeout: 3000 });
        }
    };

    return (
        <SafeAreaView className='flex bg-sky-400 flex-1 justify-between'>
            <View className='mx-3 flex flex-col h-[40%]'>
                <View className='flex flex-row'>
                    <TouchableOpacity
                        className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px]'
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='text-center w-full -left-[40px] font-nunitoBold text-white text-2xl'>
                        Sign In
                    </Text>
                </View>
                <View className='flex justify-center items-center'>
                    <Image
                        source={require('@asset/images/SignUp.png')}
                        style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                    />
                </View>
            </View>
            <View className='bg-white h-[55%] rounded-t-3xl p-8 flex flex-col space-y-4'>
                <View className='flex flex-col gap-3'>
                    <Text className='text-gray-700 font-nunitoBold text-lg'>Email Address</Text>
                    <TextInput
                        className='p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg'
                        value={emailValue}
                        ref={emailRef}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        placeholder='Enter your email'
                    />
                </View>
                <View className='flex flex-col gap-3'>
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
                <View className='flex flex-col items-end mt-2'>
                    <TouchableOpacity>
                        <Text className='font-semibold text-md text-gray-700'>
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        className='py-3 bg-yellow-400 rounded-xl'
                        onPress={handleLogin}
                    >
                        <Text className='text-xl font-nunitoBold text-center text-gray-700'>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className='flex flex-row justify-center'>
                    <Text className='text-gray-700 text-base'>Do not have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                        <Text className='text-yellow-400 font-nunitoBold text-base'>
                            Register one
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {!hasExecuted && (
                <View style={styles.overlay}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
            )}
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});

export default SignIn;
