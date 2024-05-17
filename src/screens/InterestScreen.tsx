import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InterestApi } from '@root/api/interest.api';
import Chips, { ChipProps } from '@root/components/Chips';
import { useToast } from '@root/context/toast-context';
import { InterestScreenProps, RootStackParamList } from '@root/types';
import { TInterestPutDto } from '@type/T-type';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialInterests: ChipProps[] = [
    { id: 1, isSelected: false, chipName: 'Reading novels' },
    { id: 2, isSelected: false, chipName: 'Music' },
    { id: 3, isSelected: false, chipName: 'IELTS' },
    { id: 4, isSelected: false, chipName: 'Playing games' },
    { id: 5, isSelected: false, chipName: 'Coding' },
    { id: 6, isSelected: false, chipName: 'Dancing' },
    { id: 7, isSelected: false, chipName: 'Technology' },
    { id: 8, isSelected: false, chipName: 'Study' },
    { id: 9, isSelected: false, chipName: 'Painting' },
    { id: 10, isSelected: false, chipName: 'Photography' },
    { id: 11, isSelected: false, chipName: 'Writing' },
    { id: 12, isSelected: false, chipName: 'Bread-making' },
    { id: 13, isSelected: false, chipName: 'Board games' },
    { id: 14, isSelected: false, chipName: 'Card games' },
];

function mapToChipProps(interestDto): ChipProps {
    return {
        id: parseInt(interestDto.interest_id),
        isSelected: false,
        chipName: interestDto.interest_name
    };
}

const InterestScreen = ({ route, navigation }: InterestScreenProps & { route: RouteProp<RootStackParamList, 'Interest'> }) => {
    const [interests, setInterests] = useState<ChipProps[]>([]);
    const { userId } = route.params;
    const { showToast } = useToast();

    useEffect(() => {
        const fetch = async () => {
            const { data } = await InterestApi.getInterests();
            const arr: ChipProps[] = data.map(mapToChipProps);
            setInterests(arr);
        };
        fetch();
    }, []);

    const handleChipPress = (id: number) => {
        const updatedInterests = interests.map((interest) =>
            interest.id === id ? { ...interest, isSelected: !interest.isSelected } : interest
        );
        setInterests(updatedInterests);
    };

    const handleSelectInterests = async () => {
        const ids: Array<number> = interests.filter(interest => interest.isSelected).map(interest => interest.id);
        const reqBody: TInterestPutDto = {
            user_id: userId,
            interests: ids,
        };

        if (ids.length < 3) {
            showToast({ type: 'warning', description: 'Please choose at least 3 items', timeout: 3000 });
            return;
        }
        const data = await InterestApi.selectInterests(reqBody);
    };

    return (
        <SafeAreaView className='flex-1 bg-neutral-100 px-4 space-y-4 justify-between'>
            <View>
                <View className='flex flex-col gap-2 mt-2'>
                    <Text className='text-3xl text-[#3085C3] font-nunitoSemi'>Choose your</Text>
                    <Text className='text-6xl font-nunitoBold text-[#3085C3]'>Interests</Text>
                    <Text className='text-lg text-[#3085C3]'>
                        Get better friends recommendation
                    </Text>
                </View>
                <Chips chips={interests} searchOptions={false} handleChipPress={handleChipPress} />
            </View>
            <TouchableOpacity
                className='rounded-2xl bg-yellow-400 p-4 mb-5 flex justify-center items-center'
                onPress={handleSelectInterests}
            >
                <Text className='font-nunitoBold text-gray-700 text-xl'>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default InterestScreen;
