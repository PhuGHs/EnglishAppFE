import { useAuth } from '@root/context/auth-context';
import { BanScreenProps } from '@type/index';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BanScreen = ({ navigation }: BanScreenProps) => {
    const { signOut } = useAuth();
    return (
        <SafeAreaView className='flex flex-1 w-full h-full bg-red-800 items-center'>
            <View className='w-[90%] h-full items-center justify-center'>
                <Text className='text-white text-2xl font-nunitoBold'>
                    You are banned due to application violation. If it is not as you think, please
                    contact with us via this email
                </Text>
                <Text
                    className='text-white text-xl'
                    style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}
                >
                    levanphu2003248@gmail.com
                </Text>
                <TouchableOpacity
                    onPress={signOut}
                    className='bg-red-200 rounded-xl px-10 py-2 mt-10'
                >
                    <Text className='text-slate-700 text-lg font-nunitoBold'>OK</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default BanScreen;
