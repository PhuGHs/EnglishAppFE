import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@root/types';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Welcome from '@screen/Welcome';
import SignIn from '@screen/SignIn';
import SignUp from '@screen/SignUp';
import InterestScreen from '@screen/InterestScreen';
import EnglishTest from '@screen/EnglishTest';
import QuestionsScreen from '@screen/QuestionsScreen';
import HomeScreen from '@screen/learners/HomeScreen';
import Tabs from '@navigation/Tabs';
import DoubleTab from '@navigation/DoubleTab';
import EngComAskScreen from '@screen/learners/EngComAskScreen';
import AskAQuestion from '@screen/learners/AskAQuestion';
import DetailChat from '@screen/learners/DetailChat';
import EngComRoomsScreen from '@screen/learners/EngComRoomsScreen';
import CreateARoom from '@screen/learners/CreateARoom';
import RoomDetails from '@screen/learners/RoomDetails';
import Topics from '@screen/learners/Topics';
import TopicDetails from '@screen/learners/TopicDetails';
import ShortStories from '@screen/learners/ShortStories';
import StoryDetails from '@screen/learners/StoryDetails';

// const getFonts = async () => {
//   return Font.loadAsync({
//     'nunito-regular': require('./src/assets/fonts/NunitoSans_10pt-Regular.ttf'),
//     'nunito-light': require('./src/assets/fonts/NunitoSans_10pt-Light.ttf'),
//     'nunito-semibold': require('./src/assets/fonts/NunitoSans_10pt-SemiBold.ttf'),
//     'nunito-semibold-italic': require('./src/assets/fonts/NunitoSans_10pt-SemiBoldItalic.ttf'),
//     'nunito-medium': require('./src/assets/fonts/NunitoSans_10pt-Medium.ttf'),
//     'nunito-bold': require('./src/assets/fonts/NunitoSans_10pt-Bold.ttf'),
//   });
// };

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <View style={styles.container} className='bg-[#F0EEEC] font-nunito'>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='ShortStories' screenOptions={{ headerShown: false }}>
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
            <Stack.Screen name='Tabs' component={Tabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
      </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
