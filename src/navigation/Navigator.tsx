import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnglishTest from '@screen/EnglishTest';
import InterestScreen from '@screen/InterestScreen';
import QuestionsScreen from '@screen/QuestionsScreen';
import SignIn from '@screen/SignIn';
import SignUp from '@screen/SignUp';
import Welcome from '@screen/Welcome';
import AskAQuestion from '@screen/learners/AskAQuestion';
import CreateARoom from '@screen/learners/CreateARoom';
import DetailChat from '@screen/learners/DetailChat';
import EngComAskScreen from '@screen/learners/EngComAskScreen';
import EngComRoomsScreen from '@screen/learners/EngComRoomsScreen';
import LeaderBoard from '@screen/learners/LeaderBoard';
import MissionScreen from '@screen/learners/MissionScreen';
import RoomDetails from '@screen/learners/RoomDetails';
import ShortStories from '@screen/learners/ShortStories';
import StoryDetails from '@screen/learners/StoryDetails';
import TopicDetails from '@screen/learners/TopicDetails';
import Topics from '@screen/learners/Topics';
import { RootStackParamList } from '@type/index';
import React from 'react';
import Tabs from './Tabs';
import LearnerComment from '@screen/learners/LearnerComment';
import ReviewLearner from '@screen/learners/ReviewLearner';
import FollowersScreen from '@screen/learners/FollowersScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='FollowersScreen' screenOptions={{ headerShown: false }}>
              <Stack.Screen name='Welcome' component={Welcome}/>
              <Stack.Screen name='SignIn' component={SignIn}/>
              <Stack.Screen name='SignUp' component={SignUp}/>
              <Stack.Screen name='Interest' component={InterestScreen}/>
              <Stack.Screen name='EnglishTest' component={EnglishTest}/>
              <Stack.Screen name='QuestionsScreen' component={QuestionsScreen}/>
              <Stack.Screen name='EngComAskScreen' component={EngComAskScreen}/>
              <Stack.Screen name='AskAQuestion' component={AskAQuestion}/>
              <Stack.Screen name='DetailChat' component={DetailChat}/>
              <Stack.Screen name='EngComRooms' component={EngComRoomsScreen}/>
              <Stack.Screen name='CreateARoom' component={CreateARoom}/>
              <Stack.Screen name='RoomDetails' component={RoomDetails}/>
              <Stack.Screen name='TopicScreen' component={Topics}/>
              <Stack.Screen name='TopicDetails' component={TopicDetails}/>
              <Stack.Screen name='ShortStories' component={ShortStories}/>
              <Stack.Screen name='StoryDetails' component={StoryDetails}/>
              <Stack.Screen name='LeaderBoard' component={LeaderBoard}/>
              <Stack.Screen name='MissionScreen' component={MissionScreen}/>
              <Stack.Screen name='LearnerComment' component={LearnerComment}/>
              <Stack.Screen name='ReviewLearner' component={ReviewLearner}/>
              <Stack.Screen name='FollowersScreen' component={FollowersScreen}/>
              <Stack.Screen name='Tabs' component={Tabs} />
            </Stack.Navigator>
          </NavigationContainer>
    );
};

export default Navigator;