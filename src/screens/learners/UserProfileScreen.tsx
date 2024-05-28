import Chips, { ChipProps } from '@component/Chips';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { UserApi } from '@root/api/user.api';
import { useAuth } from '@root/context/auth-context';
import { useToast } from '@root/context/toast-context';
import { UserContext } from '@root/context/user-context';
import { MessageRoomDto, TConversationTransfer, TInterest2, TUserProfile } from '@type/T-type';
import { RootStackParamList, TabsScreenProps, UserProfileScreenProps } from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { ChatBubbleLeftEllipsisIcon, FlagIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageView from 'react-native-image-viewing';
import { RouteProp } from '@react-navigation/native';
import { ChatApi } from '@root/api/chat.api';
import { FollowerApi } from '@root/api/follower.api';

function mapToChips(interests: TInterest2[]): ChipProps[] {
    return interests.map((item) => ({
        id: item.interestId,
        isSelected: false,
        chipName: item.interestName,
    }));
}

const UserProfileScreen = ({
    route,
    navigation,
}: UserProfileScreenProps & { route: RouteProp<RootStackParamList, 'UserProfileScreen'> }) => {
    const { user } = useContext(UserContext);
    const { user_id, full_name } = user.user;
    const { userId: receiver_id } = route.params;
    const { showToast } = useToast();

    const [hasFetched, setFetched] = useState<boolean>(false);
    const [info, setInfo] = useState<TUserProfile>();
    const [visible, setVisible] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [followed, setFollowed] = useState<boolean>(false);

    const handleCreateRoom = async () => {
        const data: TConversationTransfer = {
            roomId: 3,
            full_name: info.full_name,
            profile_picture: info.profile_picture,
            receiver_id: receiver_id,
        };
        try {
            const {
                data: conversation,
                status,
                message,
            } = await ChatApi.checkIfExist(user_id, receiver_id);
            setLoaded(true);
            if (loaded) {
                data.roomId = (conversation as MessageRoomDto).message_room_id;
                navigation.push('DetailChat', { conversation: data });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const follow = async () => {
        try {
            setFollowed(true);
            const { data, status, message } = await FollowerApi.follow(user_id, receiver_id);
            if (status === 'SUCCESS') {
                showToast({ type: 'success', description: 'Followed!', timeout: 3000 });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const { status, data, message } = await UserApi.getUserProfile(receiver_id);
            const { data: isFollowed } = await FollowerApi.checkIfExist(user_id, receiver_id);
            setInfo(data as TUserProfile);
            setFollowed(isFollowed as boolean);
        };
        fetchProfile();
        setFetched(true);
    }, []);

    return (
        <SafeAreaView className='flex flex-1 bg-sky-400'>
            <View className='h-[15%] w-full flex flex-row justify-end p-4'>
                <TouchableOpacity>
                    <FlagIcon size={25} color='#f97316' />
                </TouchableOpacity>
            </View>
            <View className='h-[85%] bg-slate-100 rounded-t-[40px] flex items-center'>
                <View
                    className='w-[150px] h-[150px] rounded-full absolute top-[-75px] border-4 rounded-full border-white'
                    style={{ elevation: 10 }}
                >
                    <TouchableOpacity className='flex' onPress={() => setVisible(true)}>
                        <Image
                            source={
                                info
                                    ? { uri: info.profile_picture }
                                    : require('@asset/images/avatar.jpg')
                            }
                            style={{
                                resizeMode: 'cover',
                                width: 140,
                                height: 140,
                                borderRadius: 140 / 2,
                            }}
                        />
                    </TouchableOpacity>
                    {info && (
                        <ImageView
                            images={[{ uri: info.profile_picture }]}
                            imageIndex={0}
                            visible={visible}
                            onRequestClose={() => setVisible(false)}
                        />
                    )}
                </View>
                <View className='pt-[80px] flex flex-col justify-center w-full'>
                    <Text className='text-slate-800 font-nunitoBold text-2xl text-center'>
                        {info ? info.full_name : 'name'}
                    </Text>
                    <Text className='text-center text-slate-500 font-nunitoMedium text-base'>
                        @{info ? info.user_id : '11111111'}
                    </Text>
                    <Text className='text-center my-2 font-nunitoBold text-xl text-sky-600'>
                        {info ? info.english_level_name : 'Intermediate'}
                    </Text>
                    <View className='flex flex-row mt-6 items-center justify-center'>
                        <TouchableOpacity
                            className='p-3 bg-slate-200 rounded-full flex items-center justify-center'
                            onPress={handleCreateRoom}
                        >
                            <ChatBubbleLeftEllipsisIcon size={30} color='#0284c7' />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='py-3 px-10 bg-yellow-400 rounded-full mx-10'
                            onPress={follow}
                        >
                            <Text className='text-gray-700 font-nunitoBold text-lg text-center'>
                                {followed ? 'Unfollow' : 'Follow'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='p-3 bg-slate-200 rounded-full flex items-center justify-center'
                            onPress={() =>
                                navigation.push('ReviewLearner', { userId: receiver_id })
                            }
                        >
                            <FontAwesomeIcon icon={faStar} color='#0284c7' size={30} />
                        </TouchableOpacity>
                    </View>
                    <View className='flex flex-row my-6 space-x-4 items-center justify-around'>
                        <TouchableOpacity
                            className='flex flex-col justify-between items-center'
                            onPress={() =>
                                navigation.push('FollowersScreen', {
                                    userId: receiver_id,
                                    type: 'following',
                                    username: info ? info.full_name : 'vpu2.3',
                                })
                            }
                        >
                            <Text className='text-sky-600 font-nunitoXBold text-base'>
                                {info ? info.following_count : 0}
                            </Text>
                            <Text className='text-sky-600 font-nunitoRegular text-base'>
                                Following
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='flex flex-col justify-between items-center'
                            onPress={() =>
                                navigation.push('LearnerComment', {
                                    userId: receiver_id,
                                    username: info.full_name,
                                })
                            }
                        >
                            <View className='flex flex-row items-center justify-center space-x-2'>
                                <Text className='text-sky-600 font-nunitoXBold text-base'>
                                    {info ? info.star : 0}
                                </Text>
                                <FontAwesomeIcon icon={faStar} size={30} color='#facc15' />
                            </View>
                            <Text className='text-sky-600 font-nunitoRegular text-base'>
                                Reviews
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='flex flex-col justify-between items-center'
                            onPress={() =>
                                navigation.push('FollowersScreen', {
                                    userId: receiver_id,
                                    type: 'followers',
                                    username: info ? info.full_name : 'vpu2.3',
                                })
                            }
                        >
                            <Text className='text-sky-600 font-nunitoXBold text-base'>
                                {info ? info.followers_count : 0}
                            </Text>
                            <Text className='text-sky-600 font-nunitoRegular text-base'>
                                Followers
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#d1d5db',
                            borderBottomWidth: 10,
                            marginTop: 20,
                        }}
                    />
                    <View className='my-4 px-4 flex flex-col'>
                        <Text className='text-slate-800 font-nunitoBold text-xl my-2'>
                            My interests
                        </Text>
                        <Chips
                            chips={mapToChips(info ? info.interests : [])}
                            handleChipPress={() => {}}
                            searchOptions={false}
                        />
                    </View>
                </View>
            </View>
            {!hasFetched && (
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

export default UserProfileScreen;
