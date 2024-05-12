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
import Tabs from '@navigation/Tabs';
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
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import LeaderBoard from '@screen/learners/LeaderBoard';
import MissionScreen from '@screen/learners/MissionScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  SplashScreen.preventAutoHideAsync();

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <>
      <View style={styles.container} className='bg-slate-100 font-nunito'>
        <StatusBar style="auto" />
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Tabs' screenOptions={{ headerShown: false }}>
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
