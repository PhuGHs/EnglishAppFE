import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SignInScreenProps } from '@root/types';
import React from 'react';
import { Text, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = ({ navigation }: SignInScreenProps) => {
    return (
        <SafeAreaView className="flex bg-sky-400 flex-1 justify-between">
            <View className="mx-3 flex flex-col h-[40%]">
                <View className="flex flex-row">
                    <TouchableOpacity
                        className="bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px]"
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} color="#374151" size={25} />
                    </TouchableOpacity>
                    <Text className="text-center w-full -left-[40px] font-bold text-white text-2xl">
                        Sign In
                    </Text>
                </View>
                <View className="flex justify-center items-center">
                    <Image
                        source={require('@asset/images/SignUp.png')}
                        style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                    />
                </View>
            </View>
            <View className="bg-white h-[55%] rounded-t-3xl p-8 flex flex-col space-y-4">
                <View className="flex flex-col gap-3">
                    <Text className="text-gray-700 font-bold text-lg">Email Address</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg"
                        value="levanphu2003@gmail.com"
                        placeholder="Enter your email"
                    />
                </View>
                <View className="flex flex-col gap-3">
                    <Text className="text-gray-700 font-bold text-lg">Password</Text>
                    <TextInput
                        secureTextEntry
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg"
                        value="vanphudh2003"
                        placeholder="Enter your password"
                    />
                </View>
                <View className="flex flex-col items-end mt-2">
                    <TouchableOpacity>
                        <Text className="font-semibold text-md text-gray-700">
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        className="py-3 bg-yellow-400 rounded-xl"
                        onPress={() => navigation.navigate('Interest')}
                    >
                        <Text className="text-xl font-bold text-center text-gray-700">Login</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row justify-center">
                    <Text className="text-gray-700 text-base">Do not have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text className="text-yellow-400 font-bold text-base">Register one</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignIn;
