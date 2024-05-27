import Chips, { ChipProps } from '@component/Chips';
import { faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { UserApi } from '@root/api/user.api';
import { useAuth } from '@root/context/auth-context';
import { useToast } from '@root/context/toast-context';
import { UserContext } from '@root/context/user-context';
import { TInterest2, TUserProfile } from '@type/T-type';
import { TabsScreenProps } from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import {
    ArrowLeftStartOnRectangleIcon,
    ChatBubbleLeftEllipsisIcon,
} from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageView from 'react-native-image-viewing';

const sample_image_link =
    'https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg';

function mapToChips(interests: TInterest2[]): ChipProps[] {
    return interests.map((item) => ({
        id: item.interestId,
        isSelected: false,
        chipName: item.interestName,
    }));
}

const ProfileScreen = ({ navigation }: TabsScreenProps) => {
    const { user } = useContext(UserContext);
    const { user_id } = user.user;
    const { showToast } = useToast();
    const { signOut } = useAuth();

    const [hasFetched, setFetched] = useState<boolean>(false);
    const [info, setInfo] = useState<TUserProfile>();
    const [visible, setVisible] = useState<boolean>(false);

    const handleLogout = async () => {
        signOut();
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const { status, data, message } = await UserApi.getUserProfile(user_id);
            setInfo(data as TUserProfile);
        };
        fetchProfile();
        setFetched(true);
    }, []);

    return (
        <SafeAreaView className='flex flex-1 bg-sky-400'>
            <View className='h-[15%] w-full flex flex-row justify-between p-4'>
                <TouchableOpacity onPress={handleLogout}>
                    <ArrowLeftStartOnRectangleIcon size={30} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.push('EditProfile')}>
                    <FontAwesomeIcon icon={faEdit} size={30} color='white' />
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
                    <View className='flex flex-row my-3 space-x-4 items-center justify-around'>
                        <TouchableOpacity
                            className='flex flex-col justify-between items-center'
                            onPress={() => navigation.push('FollowersScreen', {
                                userId: user_id,
                                type: 'following',
                                username: info? info.full_name : 'vpu2.3'
                            })}
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
                            onPress={() => navigation.push('LearnerComment')}
                        >
                            <View className='flex flex-row items-center justify-center space-x-2'>
                                <Text className='text-sky-600 font-nunitoXBold text-base'>
                                    {info ? info.reviews_count : 0}
                                </Text>
                                <FontAwesomeIcon icon={faStar} size={30} color='#facc15' />
                            </View>
                            <Text className='text-sky-600 font-nunitoRegular text-base'>
                                Reviews
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='flex flex-col justify-between items-center'
                            onPress={() => navigation.push('FollowersScreen', {
                                userId: user_id,
                                type: 'followers',
                                username: info ? info.full_name : 'vpu2.3'
                            })}
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
                            marginTop: 10,
                        }}
                    />
                    <View className='my-2 px-4 flex flex-col'>
                        <Text className='text-slate-800 font-nunitoBold text-xl my-2'>Quote</Text>
                        <Text className='font-nunitoMedium text-lg text-gray-700'>
                            Tomorrow would be a good day
                        </Text>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#d1d5db',
                            borderBottomWidth: 10,
                            marginTop: 10,
                        }}
                    />
                    <View className='my-2 px-4 flex flex-col'>
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

export default ProfileScreen;
