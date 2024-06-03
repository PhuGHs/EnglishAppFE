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
import RecommendationTab from './RecommendationTab';
import LevelTab from './LevelTab';

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

const UserRecommendation = ({ navigation }: EngComAskScreenProps) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        {
            key: 'first',
            title: 'Interests',
        },
        {
            key: 'second',
            title: 'English Level',
        },
    ]);
    return (
        <SafeAreaView className='flex flex-1 bg-white'>
            <View className='flex flex-1 bg-white'>
                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderScene={SceneMap({
                        first: () => <RecommendationTab navigation={navigation} />,
                        second: () => <LevelTab navigation={navigation} />,
                    })}
                />
            </View>
        </SafeAreaView>
    );
};

export default UserRecommendation;
