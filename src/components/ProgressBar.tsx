import React from 'react';
import { View } from 'react-native';

interface IProgressBarProps {
    percentage: string;
}

const ProgressBar = ({ percentage } :IProgressBarProps) => {
    return (
        <View className='bg-white h-3 w-full rounded-full mt-2 flex flex-row items-center justify-start'>
            <View className='bg-sky-400 h-full rounded-full' style={{width: percentage}}>
            </View>
        </View>
    );
};

export default ProgressBar;