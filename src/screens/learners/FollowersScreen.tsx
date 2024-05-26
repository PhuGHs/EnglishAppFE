import LearnerProfile from '@component/LearnerProfile';
import LearnerRating from '@component/LearnerRating';
import SearchItem from '@component/SearchItem';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useInput } from '@hook/useInput';
import { RouteProp } from '@react-navigation/native';
import { FollowerApi } from '@root/api/follower.api';
import { TUserNecessary } from '@type/T-type';
import { FollowersScreenProps, RootStackParamList } from '@type/index';
import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const FollowersScreen = ({
    route,
    navigation,
}: FollowersScreenProps & { route: RouteProp<RootStackParamList, 'FollowersScreen'> }) => {
    const { userId, type, username } = route.params;

    const [data, setData] = useState<TUserNecessary[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const x =
                type === 'followers'
                    ? await FollowerApi.getFollowers(userId, 0, 10, 'fullName')
                    : await FollowerApi.getFollowing(userId, 0, 10, 'fullName');

            setData(x.data.content as TUserNecessary[]);
            setLoaded(true);
        };
        fetch();
    }, [type]);
    return (
        <SafeAreaView className='flex flex-1 space-y-3'>
            <View className='w-full h-[10%] bg-white flex items-center px-4 flex-row flex-start space-x-4'>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <FontAwesomeIcon icon={faXmark} size={25} color='#374151' />
                </TouchableOpacity>
                <Text className='text-xl font-nunitoBold text-gray-700'>{username}</Text>
            </View>
            <View className='space-y-3 bg-white p-4 rounded-xl w-full h-full'>
                <Text className='font-nunitoBold text-2xl text-gray-700'>
                    {type === 'followers'
                        ? `Followers (${data.length})`
                        : `Following (${data.length})`}
                </Text>
                {data.length > 0 ? (
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => item.user_id.toString()}
                        renderItem={({ item, index }) => (
                            <SearchItem
                                navigation={navigation}
                                user={null}
                                userNec={item}
                                key={index}
                            />
                        )}
                    />
                ) : (
                    <Text className='text-lg font-nunitoSemi text-center text-gray-700'>
                        There is no {type === 'followers' ? 'followers list' : 'following list'}!
                    </Text>
                )}
            </View>
            {!loaded && (
                <View style={styles.overlay}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
            )}
        </SafeAreaView>
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

export default FollowersScreen;
