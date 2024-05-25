import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, SearchScreenScreenProps } from '@type/index';
import React, { useState } from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faArrowLeft, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';


const SearchScreen = ({ route, navigation }: SearchScreenScreenProps & { route: RouteProp<RootStackParamList, 'SearchScreen'> }) => {
    const [spinVisibility, setSpinVisibility] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const handleTextChange = (text) => {
        setText(text);
        setSpinVisibility(true);
    };
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex flex-row space-x-2 items-center h-[12%]'>
                <TouchableOpacity onPress={() => navigation.pop()} className='ml-2'>
                    <FontAwesomeIcon icon={faAngleLeft} size={20}/>
                </TouchableOpacity>
                <SearchBar
                    style={{ height: 55 }}
                    textInputStyle={{ fontSize: 18}}
                    className='bg-gray-200 rounded-full font-nunitoSemi'
                    placeholderTextColor='#6b7280'
                    placeholder='Search here'
                    spinnerVisibility={spinVisibility}
                    onPress={() => alert('onPress')}
                    onChangeText={handleTextChange}
                />
            </View>
            <View className='bg-gray-300 h-[88%]'>

            </View>
        </SafeAreaView>
    );
};

export default SearchScreen;