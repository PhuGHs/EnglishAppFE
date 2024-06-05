import EngComRooms from '@component/EngComRooms';
import { LearningRoomApi } from '@root/api/learningroom.api';
import { TLearningRoom, TLearningRoomDto } from '@type/T-type';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

const LaterTab = ({ navigation }) => {
    const [rooms, setRooms] = useState<TLearningRoomDto[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const { data, message, status } = await LearningRoomApi.getLearningRooms(false);
            if (status === 'SUCCESS') {
                setRooms(data);
            }
        };
        fetch();
    }, []);
    return (
        <View className='flex bg-slate-100 flex-col justify-center mx-4'>
            <EngComRooms data={rooms} horizontal={false} navigation={navigation} />
        </View>
    );
};

export default LaterTab;
