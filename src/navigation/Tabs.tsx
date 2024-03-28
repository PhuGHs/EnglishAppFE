import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '@root/types';
import HomeScreen from '@screen/learners/HomeScreen';
import ChatScreen from '@screen/learners/ChatScreen';
import LearnersScreen from '@screen/learners/LearnersScreen';
import ProfileScreen from '@screen/learners/ProfileScreen';
import {
    AcademicCapIcon,
    ChatBubbleBottomCenterTextIcon,
    HomeIcon,
    UserCircleIcon,
    UsersIcon,
} from 'react-native-heroicons/solid';
import DoubleTab from './DoubleTab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Skills from '@screen/learners/Skills';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const Tabs = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { paddingBottom: insets.bottom, ...styles.tabBar },
            }}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{ tabBarIcon: HomeIcon, tabBarActiveTintColor: '#0284c7' }}
            />
            <Tab.Screen
                name='Chat'
                component={ChatScreen}
                options={{
                    tabBarIcon: ChatBubbleBottomCenterTextIcon,
                    tabBarActiveTintColor: '#0284c7',
                }}
            />
            <Tab.Screen
                name='Learners'
                component={DoubleTab}
                options={{ tabBarIcon: UsersIcon, tabBarActiveTintColor: '#0284c7' }}
            />
            <Tab.Screen
                name='Skills'
                component={Skills}
                options={{ tabBarIcon: AcademicCapIcon, tabBarActiveTintColor: '#0284c7' }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{ tabBarIcon: UserCircleIcon, tabBarActiveTintColor: '#0284c7' }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        backgroundColor: '#FFFFFF',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
});

export default Tabs;
