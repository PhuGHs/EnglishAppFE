import React, { useState } from 'react';
import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import LiveTab from './LiveTab';
import LaterTab from './LaterTab';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { EngComRoomsScreenProps } from '@type/index';

const EngComRoomsScreen = ({ navigation }: EngComRoomsScreenProps) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        {
            key: 'first',
            title: 'Live',
        },
        {
            key: 'second',
            title: 'Later',
        },
    ]);
    return (
        <SafeAreaView className='flex flex-1 bg-white'>
            <View className='flex flex-1 bg-white'>
                <View className='px-3'>
                    <View className='flex flex-row mb-5 items-center'>
                        <TouchableOpacity className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px]'>
                            <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                        </TouchableOpacity>
                        <Text className='text-center w-full -left-[40px] text-sky-600 text-[22px] font-nunitoSemi'>
                            EngCom Rooms
                        </Text>
                    </View>
                </View>
                <TabView
                    renderTabBar={(props) => (
                        <TabBar
                            {...props}
                            labelStyle={{
                                textTransform: 'capitalize',
                                fontSize: 18,
                                fontWeight: '600',
                                color: '#7dd3fc',
                            }}
                            indicatorContainerStyle={{ backgroundColor: '#fff' }}
                            indicatorStyle={{ backgroundColor: '#0284c7' }}
                            activeColor='#0284c7'
                        />
                    )}
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderScene={SceneMap({
                        first: () => <LiveTab navigation={navigation} />,
                        second: () => <LaterTab navigation={navigation} />,
                    })}
                />
                <View className='absolute bottom-10 flex items-center justify-center w-full'>
                    <TouchableOpacity
                        className='py-3 bg-yellow-400 rounded-xl'
                        style={{ elevation: 10, shadowColor: '#0f172a' }}
                    >
                        <Text className='text-xl font-nunitoBold text-center text-gray-700 px-10 py-1'>
                            Ask a question
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default EngComRoomsScreen;
