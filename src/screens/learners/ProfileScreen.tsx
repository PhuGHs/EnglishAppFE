import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
    return (
        <SafeAreaView className='flex mx-3'>
            <Text>This is ProfileScreen Page</Text>
        </SafeAreaView>
    );
};

export default ProfileScreen;