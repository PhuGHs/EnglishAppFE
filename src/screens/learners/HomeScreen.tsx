import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BellBadge from '@root/components/BellBadge';
import EngComRooms from '@component/EngComRooms';
import EngComQAs from '@component/EngComQA';
import EngComUser from '@component/EngComUser';
import CircularProgress from '@component/CircularProgress';
import { TabsScreenProps } from '@type/index';
import { UserContext } from '@root/context/user-context';
import { useToast } from '@root/context/toast-context';
import { MissionApi } from '@root/api/mission.api';
import { DiscussionApi } from '@root/api/discussion.api';
import { NotificationApi } from '@root/api/notification.api';
import { TDiscussionDto, TLearningRoomDto, TNotification } from '@type/T-type';
import { LearningRoomApi } from '@root/api/learningroom.api';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const HomeScreen = ({ navigation }: TabsScreenProps) => {
    const { user } = useContext(UserContext);
    const [isLoaded, setLoaded] = useState<boolean>();
    const { user_id } = user.user;
    const { showToast } = useToast();
    const [percentage, setPercentage] = useState<number>(0);
    const [numberOfNotifications, setNumberOfNotifications] = useState<number>(0);
    const [discussions, setDiscussions] = useState<TDiscussionDto[]>([]);
    const [rooms, setRooms] = useState<TLearningRoomDto[]>([]);
    const [client, setClient] = useState<Client>(null);

    if (!user) {
        showToast({ type: 'danger', description: 'There is something wrong', timeout: 2000 });
    }

    useEffect(() => {
        setLoaded(false);
        const fetch = async () => {
            try {
                const { data, status } = await MissionApi.getPercentage(user_id);
                if (status == 'FAIL') {
                    return;
                }
                const { data: dcs } = await DiscussionApi.getTop5();
                setDiscussions(dcs);
                const { data: rooms } = await LearningRoomApi.getSuggestRooms(user_id);
                setRooms(rooms);
                const { data: notifications } = await NotificationApi.getUnread(user_id);
                setNumberOfNotifications(notifications.length);
                setPercentage(data as number);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
        setLoaded(true);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const client = Stomp.over(function () {
                return new SockJS('https://1a0b-171-250-164-111.ngrok-free.app/ws');
            });
            client.reconnectDelay = 5000;
            client.connectHeaders = {};
            client.heartbeatIncoming = 4000;
            client.heartbeatOutgoing = 4000;
            client.debug = (msg) => console.log('STOMP: ', msg);

            client.connect({}, () => {
                client.subscribe(`/topic/user/ban/${user.user.user_id}`, (message) => {
                    console.log(message.body);
                    navigation.navigate('Ban');
                });
            });

            setClient(client);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView className='flex px-4 bg-slate-100 space-y-3' style={{ marginBottom: 70 }}>
            <View className='flex flex-row justify-between mt-4 items-center'>
                <View className='flex flex-row space-x-2 items-center'>
                    <EngComUser
                        withName={false}
                        isCreator={false}
                        noUser={false}
                        avatar={user.user.profile_picture}
                    />
                    <View className='flex flex-col space-y-2'>
                        <Text className='font-nunitoSemi text-slate-800 text-[16px]'>
                            Hello {user.user.full_name},
                        </Text>
                        <View className='flex flex-row'>
                            <Text className='font-nunitoXBold text-sky-600 text-[18px]'>
                                Ready to{' '}
                            </Text>
                            <Text className='text-[18px] font-nunitoXBold text-yellow-400'>
                                play English?
                            </Text>
                        </View>
                    </View>
                </View>
                <BellBadge
                    numberOfNotifications={numberOfNotifications}
                    press={() => navigation.push('NotificationScreen')}
                />
            </View>
            <ScrollView className='space-y-6'>
                <View className='flex flex-row justify-between items-center'>
                    <View className='flex flex-row space-x-4'>
                        <CircularProgress
                            size={100}
                            fontSize={24}
                            progress={percentage}
                            strokeWidth={10}
                            backgroundColor='#cbd5e1'
                            progressColor='#0891b2'
                            textColor='#0891b2'
                        />
                        <View className='flex flex-col justify-center'>
                            <Text className='font-nunitoBold text-xl text-sky-600'>Missions</Text>
                            <Text className='font-nunitoBold text-xl text-sky-600'>Completed</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        className='px-2 py-3 bg-sky-600 rounded-xl'
                        onPress={() => navigation.push('MissionScreen')}
                    >
                        <Text className='text-white font-nunitoBold text-base'>Details</Text>
                    </TouchableOpacity>
                </View>
                <View className='flex flex-col'>
                    <View className='flex flex-row justify-between items-center'>
                        <Text className='text-xl text-slate-800 font-nunitoXBold'>
                            EngCom Rooms
                        </Text>
                        <TouchableOpacity
                            className=''
                            onPress={() => navigation.push('EngComRooms')}
                        >
                            <Text className='text-sky-600 text-lg font-nunitoBold'>Show all</Text>
                        </TouchableOpacity>
                    </View>
                    <EngComRooms data={rooms} horizontal={true} navigation={navigation} />
                </View>
                <View className='flex flex-col'>
                    <View className='flex flex-row justify-between items-center'>
                        <Text className='text-xl text-slate-800 font-nunitoXBold'>EngCom QAs</Text>
                        <TouchableOpacity
                            className=''
                            onPress={() => navigation.push('EngComAskScreen')}
                        >
                            <Text className='text-sky-600 text-lg font-nunitoBold'>Show all</Text>
                        </TouchableOpacity>
                    </View>
                    <EngComQAs navigation={navigation} data={discussions} horizontal={true} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
