import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import UserProfile from '@component/UserProfile';
import { UserContext } from '@root/context/user-context';
import { UserApi } from '@root/api/user.api';
import { TSearch } from '@type/T-type';
import SearchBar from 'react-native-dynamic-search-bar';

const LevelTab = (navigation) => {
    const { user } = useContext(UserContext);
    const { user_id } = user.user;

    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(20);
    const [userProfiles, setUserProfiles] = useState<TSearch[]>([]);
    const [spinVisibility, setSpinVisibility] = useState<boolean>(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, message, status } = await UserApi.recommendBasedOnLevel(
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
            <View className='my-4'>
                <SearchBar
                    style={{ height: 55, elevation: 10, width: '100%' }}
                    textInputStyle={{ fontSize: 18 }}
                    className='bg-white rounded-2xl font-nunitoSemi'
                    placeholderTextColor='#6b7280'
                    placeholder='Search here ...'
                    returnKeyType='search'
                    spinnerVisibility={spinVisibility}
                    onChangeText={(text) => console.log(text)}
                />
            </View>
            <FlatList
                data={userProfiles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <UserProfile user={item} handlePress={() => {}} />}
            />
        </View>
    );
};

export default LevelTab;
