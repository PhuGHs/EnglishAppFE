import EngComRooms from '@component/EngComRooms';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';

const LiveTab = ({ navigation }) => {
    return (
        <View className='flex flex-col mx-2'>
            <EngComRooms horizontal={false} navigation={navigation} />
        </View>
    );
};

export default LiveTab;
