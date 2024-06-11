import React, { useContext, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import UserProfile from '@component/UserProfile';
import { useState } from 'react';
import { TSearch } from '@type/T-type';
import { UserApi } from '@root/api/user.api';
import { UserContext } from '@root/context/user-context';
import { useNavigation } from '@react-navigation/native';
import SearchBar from 'react-native-dynamic-search-bar';

const RecommendationTab = () => {
    const { user } = useContext(UserContext);
    const { user_id } = user.user;

    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(20);
    const [userProfiles, setUserProfiles] = useState<TSearch[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, message, status } = await UserApi.recommendBasedOnCommonInterests(
                    user_id,
                    pageNumber,
                    pageSize
                );
                if (status === 'SUCCESS') {
                    setUserProfiles(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);
    return (
        <View className='flex bg-slate-100 px-3'>
            <View className='mt-4'>
                <SearchBar
                    style={{ height: 55 }}
                    textInputStyle={{ fontSize: 18 }}
                    className='bg-white-200 rounded-xl w-full font-nunitoSemi'
                    placeholderTextColor='#6b7280'
                    placeholder='Search here'
                    onPress={() => navigation.navigate('SearchScreen', { isProfileSearch: true })}
                />
            </View>
            <FlatList
                data={userProfiles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <UserProfile user={item} handlePress={() => navigation.navigate('UserProfileScreen', { userId: item.id } as { userId: number } )} />}
            />
        </View>
    );
};

export default RecommendationTab;
