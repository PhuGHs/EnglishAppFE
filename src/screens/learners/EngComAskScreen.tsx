import MyQuestionsTab from '@screen/learners/MyQuestionsTab';
import QuestionsTab from '@screen/learners/QuestionsTab';
import React, { useState } from 'react';
import { TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { EngComAskScreenProps, TabsScreenProps } from '@type/index';

const renderTabBar = (props) => (
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
);

const EngComAskScreen = ({ navigation }: EngComAskScreenProps) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        {
            key: 'first',
            title: 'Questions',
        },
        {
            key: 'second',
            title: 'My Questions',
        },
    ]);
    return (
        <SafeAreaView className='flex flex-1 bg-white'>
            <View className='flex flex-1 bg-white'>
                <View className='px-3'>
                    <View className='flex flex-row mb-5 items-center justify-between'>
                        <TouchableOpacity
                            className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px]'
                            onPress={() => navigation.pop()}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                        </TouchableOpacity>
                        <Text className='text-sky-600 text-[22px] font-nunitoSemi'>
                            Discussions
                        </Text>
                        <View className='w-[4%]'></View>
                    </View>
                </View>
                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderScene={SceneMap({
                        first: () => <QuestionsTab navigation={navigation} />,
                        second: () => <MyQuestionsTab navigation={navigation} />,
                    })}
                />
            </View>
        </SafeAreaView>
    );
};

export default EngComAskScreen;
