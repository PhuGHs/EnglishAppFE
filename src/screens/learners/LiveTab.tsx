import EngComRooms from '@component/EngComRooms';
import { useNavigation } from '@react-navigation/native';
import { LearningRoomApi } from '@root/api/learningroom.api';
import { TLearningRoomDto } from '@type/T-type';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const LiveTab = ({ navigation }) => {
    const [rooms, setRooms] = useState<TLearningRoomDto[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const { data, message, status } = await LearningRoomApi.getLearningRooms(true);
            if (status === 'SUCCESS') {
                setRooms(data);
            }
        };
        fetch();
    }, []);
    return (
        <View className='flex bg-slate-100 flex-col mx-2'>
            <EngComRooms data={rooms} horizontal={false} navigation={navigation} />
        </View>
    );
};

export default LiveTab;
