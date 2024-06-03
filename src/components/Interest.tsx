import { TInterest } from '@type/T-type';
import React from 'react';
import { View, Text } from 'react-native';

interface IInterest {
    interest: TInterest;
}

const Interest = ({ interest }: IInterest) => {
    return (
        <View className='bg-sky-100 mr-2 mb-2 p-2 rounded-xl'>
            <Text className='text-sky-700 text-base font-nunitoRegular'>{interest.interest_name}</Text>
        </View>
    );
};

export default Interest;