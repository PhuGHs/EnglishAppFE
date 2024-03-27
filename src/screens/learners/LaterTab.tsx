import EngComRooms from '@component/EngComRooms';
import FilterButton from '@component/FilterButton';
import React from 'react';
import { View } from 'react-native';

const LaterTab = () => {
    return (
        <View className="flex m-2 flex-col justify-center">
            <View className="flex flex-row justify-around">
                <FilterButton />
                <FilterButton />
            </View>
            <EngComRooms horizontal={false} />
        </View>
    );
};

export default LaterTab;
