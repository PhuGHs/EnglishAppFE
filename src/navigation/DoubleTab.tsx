import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LevelTab from '@screen/learners/LevelTab';
import RecommendationTab from '@screen/learners/RecommendationTab';
import { LearnersTopTabParamList } from '@type/index';
import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator<LearnersTopTabParamList>();

const DoubleTab = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator screenOptions={
            {
                tabBarStyle: {paddingTop: insets.top, paddingBottom: insets.bottom},
                tabBarActiveTintColor: '#38bdf8',
                tabBarIndicatorStyle: {backgroundColor: '#38bdf8'},
                tabBarLabelStyle: {textTransform: 'capitalize', fontSize: 18, fontWeight: '600'},
            }
        }>
            <Tab.Screen name='Recommendations' component={RecommendationTab} />
            <Tab.Screen name='Level' component={LevelTab} />
        </Tab.Navigator>
    );
};

export default DoubleTab;