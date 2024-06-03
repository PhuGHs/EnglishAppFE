import EngComQAs from '@component/EngComQA';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { UserContext } from '@root/context/user-context';
import { TDiscussionDto, TFilter } from '@type/T-type';
import { DiscussionApi } from '@root/api/discussion.api';
import { AdjustmentsVerticalIcon } from 'react-native-heroicons/solid';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Filter from '@component/Filter';
import { text } from '@fortawesome/fontawesome-svg-core';

const filterOptions: TFilter[] = [
    {
        filterName: 'Grammar',
        isSelected: false,
    },
    {
        filterName: 'Vocabulary',
        isSelected: false,
    },
    {
        filterName: 'Pronunciation',
        isSelected: false,
    },
    {
        filterName: 'Translation',
        isSelected: false,
    },
    {
        filterName: 'Friends',
        isSelected: false,
    },
    {
        filterName: 'Other',
        isSelected: false,
    }
];

const QuestionsTab = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const { user_id } = user.user;
    const [discussions, setDiscussions] = useState<TDiscussionDto[]>([]);
    const [spinVisibility, setSpinVisibility] = useState<boolean>(false);
    const [buttonShow, setButtonShow] = useState<boolean>(true);
    const [options, setOptions] = useState<TFilter[]>(filterOptions);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [searchTerms, setSearchTerms] = useState<string>('');

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        if (index === 1) {
            setButtonShow(false);
        } else {
            setButtonShow(true);
        }
    }, []);

    const handleFilter = async (text?: string) => {
        try {
            console.log(text);
            const arr: string[] = options.filter((item) => { if (item.isSelected) return item; }).map((item) => item.filterName);
            const { data, message, status } = await DiscussionApi.filterDiscussions(pageSize, pageNumber, arr, text === '' ? null : text);
            if (status === 'SUCCESS') {
                setDiscussions(data);
                setSearchTerms('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectFilter = (selectedFilter: TFilter) => {
        setOptions(prevOptions => prevOptions.map(filter => filter.filterName === selectedFilter.filterName ? { ...filter, isSelected: !filter.isSelected } : filter));
    };
    useEffect(() => {
        const fetch = async () => {
            try {
                handleFilter();
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);

    return (
        <BottomSheetModalProvider>
            <View className='flex bg-slate-100 flex-1 p-3'>
                <View className='flex flex-row space-x-2'>
                    <SearchBar
                        style={{ height: 55, width: '85%', elevation: 5 }}
                        textInputStyle={{ fontSize: 18 }}
                        className='bg-white rounded-xl font-nunitoSemi'
                        placeholderTextColor='#6b7280'
                        placeholder='Search here ...'
                        returnKeyType='search'
                        onSubmitEditing={() => handleFilter(searchTerms)}
                        spinnerVisibility={spinVisibility}
                        onClearPress={() => handleFilter(searchTerms)}
                        onChangeText={(text) => setSearchTerms(text)}
                    />
                    <View className='w-[15%] items-center justify-center'>
                        <TouchableOpacity
                            style={{ elevation: 5 }}
                            className='p-3 bg-white rounded-xl items-center justify-center'
                            onPress={handlePresentModalPress}
                        >
                            <AdjustmentsVerticalIcon size={25} color='#64748b' />
                        </TouchableOpacity>
                    </View>
                </View>
                <EngComQAs data={discussions} horizontal={false} navigation={navigation} />
                {buttonShow &&
                
                <View className='absolute bottom-6 right-6 flex'>
                    <TouchableOpacity
                        className='p-4 bg-yellow-400 rounded-xl'
                        style={{ elevation: 10, shadowColor: '#0f172a' }}
                        onPress={() => navigation.push('AskAQuestion')}
                    >
                        <FontAwesomeIcon icon={faPlus} size={25} color='' />
                    </TouchableOpacity>
                </View>}
                <BottomSheetModal
                    backdropComponent={props => <BottomSheetBackdrop {...props} opacity={0.7} />}
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={styles.contentContainer}>
                    <Text className='text-cyan-600 font-nunitoBold text-xl h-[10%]'>Filter discussions</Text>
                        <View className='flex flex-col justify-between h-[85%]'>
                            <View className='flex flex-row flex-wrap mt-4'>
                                {options.map((item, index) => <Filter handleSelectFilter={() => handleSelectFilter(item)} key={index} filter={item}/>)}
                            </View>
                            <View className='h-[20%] flex items-center justify-center'>
                                <TouchableOpacity 
                                    onPress={() => handleFilter(searchTerms)}
                                    className='flex h-full bg-yellow-400 px-4 py-2 rounded-lg'>
                                    <Text className='text-lg text-gray-700 font-nunitoBold'>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#64748b',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default QuestionsTab;
