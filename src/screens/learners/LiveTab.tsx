import EngComRooms from '@component/EngComRooms';
import React from 'react';
import { Text, View } from 'react-native';

const LiveTab = () => {
    return (
        <View className="flex flex-col mx-2">
            <EngComRooms horizontal={false} />
        </View>
    );
};

export default LiveTab;
