import {
    faArrowLeft,
    faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NotificationScreenProps } from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chips, { ChipProps } from '@component/Chips';
import NotificationItem from '@component/NotificationItem';
import { NotificationApi } from '@root/api/notification.api';
import { UserContext } from '@root/context/user-context';
import { TNotification } from '@type/T-type';
import { FlatList } from 'react-native-gesture-handler';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import { useToast } from '@root/context/toast-context';

const chips: ChipProps[] = [
    {
        id: 1,
        chipName: 'All',
        isSelected: true,
    },
    {
        id: 2,
        chipName: 'Unread',
        isSelected: false,
    },
];

const NotificationScreen = ({ navigation }: NotificationScreenProps) => {
    const { user } = useContext(UserContext);
    const { showToast } = useToast();
    const { user_id } = user.user;

    const [types, setTypes] = useState<ChipProps[]>(chips);
    const [hasFetched, setFetched] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<TNotification[]>([]);
    const [stompClient, setStompClient] = useState<Client>(null);

    const handleChipPress = (id: number) => {
        const updatedTypes = types.map((type) =>
            type.id === id
                ? { ...type, isSelected: !type.isSelected }
                : { ...type, isSelected: !type.isSelected }
        );
        setTypes(updatedTypes);
    };

    const handleSetMessage = (message) => {
        const notification: TNotification = message.body as TNotification;
        setNotifications(old => [notification, ...old]);
    };

    const handleMarkAllAsRead = async () => {
        const { data, message, status } = await NotificationApi.markAllAsRead(user_id);
        if (status == 'SUCCESS') {
            setNotifications(data as TNotification[]);
            showToast({ type: 'success', description: 'Marked all as read', timeout: 2000 });
        }
    };

    useEffect(() => {
        const client = Stomp.over(function () {
            return new SockJS('http://10.0.2.2:8080/ws');
        });
        client.reconnectDelay = 5000;
        client.connectHeaders = {};
        client.heartbeatIncoming = 4000;
        client.heartbeatOutgoing = 4000;
        client.debug = (msg) => console.log('STOMP: ', msg);

        client.connect({}, () => {
            client.subscribe(`topic/user/notification/${user_id}`, (message) => {
                handleSetMessage(message);
            });
        });

        setStompClient(client);

        return () => {
            client.disconnect();
        };
    }, []);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { status, message, data } = 
                    types[0].isSelected 
                    ?  await NotificationApi.getAll(user_id)
                    : await NotificationApi.getUnread(user_id);
                if (status === 'SUCCESS') {
                    setNotifications(data as TNotification[]);
                    setFetched(true);
                }
            } catch (error) {
                console.error(error);
                setFetched(true);
            }
        };
        fetch();
    }, [types]);
    return (
        <>
            <SafeAreaView className='flex flex-1 p-4 bg-gray-100 h-full w-full space-y-4'>
                <View className='flex flex-row justify-between items-center'>
                    <TouchableOpacity
                        className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='text-[22px] text-sky-600 font-nunitoBold'>
                        Notifications
                    </Text>
                    <TouchableOpacity
                        onPress={handleMarkAllAsRead}
                    >
                        <FontAwesomeIcon icon={faCheckDouble} size={25} color='#0284c7' />
                    </TouchableOpacity>
                </View>
                <View>
                    <Chips
                        square={true}
                        chips={types}
                        searchOptions={false}
                        handleChipPress={handleChipPress}
                        radio={true}
                    />
                </View>
                {notifications.length > 0
                    ? <FlatList
                        data={notifications}
                        keyExtractor={(item, index) => item.notification_id.toString()}
                        renderItem={({item, index}) => <NotificationItem notification={item} key={index} />}
                    />
                    :
                    <Text className='text-xl font-nunitoMedium text-gray-700'>There is no notification</Text>
                }
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default NotificationScreen;
