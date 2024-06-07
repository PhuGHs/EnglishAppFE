import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ILeaderboardTabs {
    selectedType: string;
    handlePress: (type: string) => void;
}

const LeaderboardTabs = ({ selectedType, handlePress }: ILeaderboardTabs) => {
    // const [selectedType, setSelectedType] = useState('Today');
    return (
        <View className='flex flex-row w-full justify-around my-4 px-3'>
            <TouchableOpacity
                onPress={() => handlePress('Today')}
                className={`py-2 px-4  rounded-full items-center justify-center ${selectedType === 'Today' && 'bg-white/[.3]'}`}
            >
                <Text className='text-white text-[19px] font-nunitoMedium'>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handlePress('Week')}
                className={`py-2 px-4 rounded-full items-center justify-center ${selectedType === 'Week' && 'bg-white/[.3]'}`}
            >
                <Text className='text-white text-[19px] font-nunitoMedium'>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handlePress('Month')}
                className={`py-2 px-4 rounded-full items-center justify-center ${selectedType === 'Month' && 'bg-white/[.3]'}`}
            >
                <Text className='text-white text-[19px] font-nunitoMedium'>Year</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LeaderboardTabs;
