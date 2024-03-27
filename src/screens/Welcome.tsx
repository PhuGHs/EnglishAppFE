import { WelcomeScreenProps } from '@root/types';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = ({ navigation }: WelcomeScreenProps) => {
    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <View className="flex-1 flex justify-around my-4">
                <View className="flex-row justify-center">
                    <Image
                        source={require('@asset/images/logo.png')}
                        style={{ resizeMode: 'contain', width: '85%' }}
                    />
                </View>
                <View className="space-y-4">
                    <TouchableOpacity
                        className="py-3 bg-yellow-400 mx-7 rounded-xl"
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text className="text-xl font-bold text-center text-gray-700">Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Text className="text-gray-700 font-semibold">Already have an account? </Text>
                    <TouchableOpacity>
                        <Text
                            className="font-semibold text-yellow-400"
                            onPress={() => navigation.navigate('SignIn')}
                        >
                            Log In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Welcome;
