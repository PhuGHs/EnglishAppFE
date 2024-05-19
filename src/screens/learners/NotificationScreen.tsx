import { faArrowLeft, faCheckDouble, faFilter, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NotificationScreenProps } from '@type/index';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AdjustmentsVerticalIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Chips, { ChipProps } from '@component/Chips';
import LearnerProfile from '@component/LearnerProfile';
import NotificationItem from '@component/NotificationItem';

const chips: ChipProps[] = [
    {
        id: 1,
        chipName: 'All',
        isSelected: true
    },
    {
        id: 2,
        chipName: 'Unread',
        isSelected: false
    }
];

const NotificationScreen = ({ navigation }: NotificationScreenProps) => {
    const [hasFetched, setFetched] = useState<boolean>(true);
    const [types, setTypes] = useState<ChipProps[]>(chips);
    const handleChipPress = (id: number) => {
        const updatedTypes = types.map((type) => type.id === id ? { ...type, isSelected: !type.isSelected } : {...type, isSelected: !type.isSelected});
        setTypes(updatedTypes);
    };
    return (
        <>
                <SafeAreaView className='flex flex-1 p-4 bg-[#F0EEEC] h-full w-full space-y-4'>
                    <View className='flex flex-row justify-between items-center'>
                        <TouchableOpacity
                            className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                        >
                            <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                        </TouchableOpacity>
                        <Text className='text-[22px] text-sky-600 font-nunitoBold'>Notifications (5)</Text>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faCheckDouble} size={25} color='#0284c7' />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Chips square={true} chips={types} searchOptions={false} handleChipPress={handleChipPress} radio={true}/>   
                    </View>
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                </SafeAreaView>
                {!hasFetched && (
                    <View style={styles.overlay}>
                        <ActivityIndicator size='large' color='#0000ff' />
                    </View>
                )}
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});


export default NotificationScreen;