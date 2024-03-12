import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '@root/types';
import HomeScreen from '@screen/learners/HomeScreen';
import ChatScreen from '@screen/learners/ChatScreen';
import LearnersScreen from '@screen/learners/LearnersScreen';
import ProfileScreen from '@screen/learners/ProfileScreen';
import { ChatBubbleBottomCenterTextIcon, HomeIcon, UserCircleIcon, UsersIcon } from 'react-native-heroicons/solid';
import DoubleTab from './DoubleTab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const Tabs = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false, 
            tabBarStyle: {paddingBottom: insets.bottom, ...styles.tabBar},
        }}
        >
            <Tab.Screen name='Home' component={HomeScreen} options={{tabBarIcon: HomeIcon, tabBarActiveTintColor: '#38bdf8'}}/>
            <Tab.Screen name='Chat' component={ChatScreen} options={{tabBarIcon: ChatBubbleBottomCenterTextIcon, tabBarActiveTintColor: '#38bdf8'}}/>
            <Tab.Screen name='Learners' component={DoubleTab} options={{tabBarIcon: UsersIcon, tabBarActiveTintColor: '#38bdf8'}}/>
            <Tab.Screen name='Profile' component={ProfileScreen} options={{tabBarIcon: UserCircleIcon, tabBarActiveTintColor: '#38bdf8'}}/>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        right: 15,
        borderRadius: 15,
        height: 70,
        backgroundColor: '#FFFFFF', 
        borderTopWidth: 0,
        elevation: 5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    }
});

export default Tabs;