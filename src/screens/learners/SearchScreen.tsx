import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, SearchScreenScreenProps } from '@type/index';
import React, { useContext, useState } from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
import { FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faArrowLeft, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import SearchItem from '@component/SearchItem';
import { TSearch } from '@type/T-type';
import { UserApi } from '@root/api/user.api';
import { UserContext } from '@root/context/user-context';

const SearchScreen = ({
    route,
    navigation,
}: SearchScreenScreenProps & { route: RouteProp<RootStackParamList, 'SearchScreen'> }) => {
    const [spinVisibility, setSpinVisibility] = useState<boolean>(false);
    const [users, setUsers] = useState<TSearch[]>([]);
    const [text, setText] = useState<string>('');
    const { user } = useContext(UserContext);
    const { user_id } = user.user;

    const handleSearch = async (text) => {
        try {
            const data: TSearch[] = await UserApi.searchUsers(text, user_id);
            if (data) {
                setUsers(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleTextChange = (text) => {
        setText(text);
        setSpinVisibility(true);
        handleSearch(text);
    };
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex flex-row space-x-2 items-center h-[12%]'>
                <TouchableOpacity onPress={() => navigation.pop()} className='ml-2'>
                    <FontAwesomeIcon icon={faAngleLeft} size={20} />
                </TouchableOpacity>
                <SearchBar
                    style={{ height: 55 }}
                    textInputStyle={{ fontSize: 18 }}
                    className='bg-gray-200 rounded-full font-nunitoSemi'
                    placeholderTextColor='#6b7280'
                    placeholder='Search here'
                    spinnerVisibility={spinVisibility}
                    onChangeText={handleTextChange}
                />
            </View>
            <View className='bg-slate-100 h-[88%] p-4'>
                {users.length > 0 ? (
                    <FlatList
                        data={users}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item, index }) => (
                            <SearchItem navigation={navigation} user={item} key={index} />
                        )}
                    />
                ) : (
                    <Text className='text-center text-xl font-nunitoSemi text-gray-700'>
                        No users with the keyword found!
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default SearchScreen;
