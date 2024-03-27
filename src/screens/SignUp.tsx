import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SignInScreenProps, SignUpScreenProps } from '@root/types';
import React from 'react';
import { Text, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = ({ navigation }: SignUpScreenProps) => {
    return (
        <SafeAreaView className="flex bg-sky-400 flex-1 justify-between">
            <View className="mx-3 flex flex-col h-[25%]">
                <View className="flex flex-row w-full">
                    <TouchableOpacity
                        className="bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[35px]"
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesomeIcon icon={'arrow-left'} color="black" size={25} />
                    </TouchableOpacity>
                    <Text className="w-full text-center font-bold text-white text-2xl -left-[35px]">
                        Register
                    </Text>
                </View>
                <View className="flex justify-center items-center">
                    <Image
                        source={require('@asset/images/SignUp.png')}
                        style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                    />
                </View>
            </View>
            <View className="bg-white h-[70%] rounded-t-3xl p-5 flex flex-col space-y-1">
                <View className="flex flex-row space-x-3">
                    <View className="flex flex-col gap-2 w-[48%]">
                        <Text className="text-gray-700 font-bold text-lg">First Name</Text>
                        <TextInput
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg"
                            value="Lê Văn"
                        />
                    </View>
                    <View className="flex flex-col gap-2 w-[48%]">
                        <Text className="text-gray-700 font-bold text-lg">Last Name</Text>
                        <TextInput
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg"
                            value="Phú"
                        />
                    </View>
                </View>
                <View className="flex flex-col gap-2 w-full">
                    <Text className="text-gray-700 font-bold text-lg">Email Address</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg"
                        value="levanphu2003@gmail.com"
                        placeholder="Enter your email"
                    />
                </View>
                <View className="flex flex-col gap-2 w-full">
                    <Text className="text-gray-700 font-bold text-lg">Password</Text>
                    <TextInput
                        secureTextEntry
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg"
                        value="vanphudh2003"
                        placeholder="Enter your password"
                    />
                </View>
                <View className="flex flex-col gap-2 w-full">
                    <Text className="text-gray-700 font-bold text-lg">Confirmed password</Text>
                    <TextInput
                        secureTextEntry
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl text-lg"
                        value="vanphudh2003"
                        placeholder="Confirm your password"
                    />
                </View>
                <View>
                    <TouchableOpacity className="mt-3 py-3 bg-yellow-400 rounded-xl">
                        <Text className="text-xl font-bold text-center text-gray-700">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;
