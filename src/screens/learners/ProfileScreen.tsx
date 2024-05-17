import Chips, { ChipProps } from '@component/Chips';
import { faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { UserApi } from '@root/api/user.api';
import { useToast } from '@root/context/toast-context';
import { UserContext } from '@root/context/user-context';
import { TInterest2, TUserProfile } from '@type/T-type';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { ChatBubbleLeftEllipsisIcon, StarIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';

function mapToChips(interests: TInterest2[]): ChipProps[] {
    return interests.map((item) => ({
        id: item.interestId,
        isSelected: false,
        chipName: item.interestName,
    }));
}

const ProfileScreen = () => {
    const { user } = useContext(UserContext);
    const { user_id } = user.user;
    const { showToast } = useToast();

    const [hasFetched, setFetched] = useState<boolean>(false);
    const [info, setInfo] = useState<TUserProfile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { status, message, data } = await UserApi.getUserProfile(user_id);
                if (status === 'SUCCESS') {
                    setInfo(data as TUserProfile);
                } else {
                    showToast({ type: 'danger', description: message, timeout: 2000 });
                }
            } catch (error) {
                showToast({ type: 'danger', description: 'failed to fetch the profile data', timeout: 2000 });
            } finally {
                setFetched(true);
            }
        };

        fetchProfile();
    }, [user_id, showToast]);

    return (
        <>
            <SafeAreaView className='flex flex-1 bg-sky-400'>
                <View className='h-[15%] w-full flex flex-row justify-end p-4'>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faEdit} size={30} color='white' />
                    </TouchableOpacity>
                </View>
                <View className='h-[85%] bg-slate-100 rounded-t-[40px] flex items-center'>
                    <View
                        className='w-[150px] h-[150px] rounded-full absolute top-[-75px] border-4 rounded-full border-white'
                        style={{ elevation: 10 }}
                    >
                        <TouchableOpacity className='flex'>
                            <Image
                                source={info.profile_picture ? {uri: info.profile_picture} : require('@asset/images/avatar.jpg')}
                                style={{
                                    resizeMode: 'cover',
                                    width: 140,
                                    height: 140,
                                    borderRadius: 140 / 2,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    {info ? (
                        <View className='pt-[80px] flex flex-col justify-center w-full'>
                            <Text className='text-slate-800 font-nunitoBold text-2xl text-center'>
                                {info.full_name}
                            </Text>
                            <Text className='text-center text-slate-500 font-nunitoMedium text-base'>
                                @{info.user_id}
                            </Text>
                            <Text className='text-center my-2 font-nunitoBold text-xl text-sky-600'>
                                {info.english_level_name}
                            </Text>
                            <View className='flex flex-row mt-6 items-center justify-center'>
                                <TouchableOpacity className='p-3 bg-slate-200 rounded-full flex items-center justify-center'>
                                    <ChatBubbleLeftEllipsisIcon size={30} color='#0284c7' />
                                </TouchableOpacity>
                                <TouchableOpacity className='py-3 px-10 bg-yellow-400 rounded-full mx-10'>
                                    <Text className='text-gray-700 font-nunitoBold text-lg text-center'>
                                        Follow
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='p-3 bg-slate-200 rounded-full flex items-center justify-center'>
                                    <FontAwesomeIcon icon={faStar} color='#0284c7' size={30} />
                                </TouchableOpacity>
                            </View>
                            <View className='flex flex-row my-6 space-x-4 items-center justify-around'>
                                <TouchableOpacity className='flex flex-col justify-between items-center'>
                                    <Text className='text-sky-600 font-nunitoXBold text-base'>{info.following_count}</Text>
                                    <Text className='text-sky-600 font-nunitoRegular text-base'>
                                        Following
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='flex flex-col justify-between items-center'>
                                    <View className='flex flex-row items-center justify-center space-x-2'>
                                        <Text className='text-sky-600 font-nunitoXBold text-base'>{info.reviews_count}</Text>
                                        <FontAwesomeIcon icon={faStar} size={30} color='#facc15' />
                                    </View>
                                    <Text className='text-sky-600 font-nunitoRegular text-base'>
                                        Reviews
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='flex flex-col justify-between items-center'>
                                    <Text className='text-sky-600 font-nunitoXBold text-base'>{info.followers_count}</Text>
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
                                <Chips chips={mapToChips(info.interests)} handleChipPress={() => {}} searchOptions={false}/>
                            </View>
                        </View>
                    ) : (
                        <ActivityIndicator size='large' color='#0000ff' />
                    )}
                </View>
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

export default ProfileScreen;
