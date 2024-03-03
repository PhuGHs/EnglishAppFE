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
      <View style={styles.container} className='bg-neutral-100'>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Welcome' component={Welcome}/>
            <Stack.Screen name='SignIn' component={SignIn}/>
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='Interest' component={InterestScreen}/>
            <Stack.Screen name='EnglishTest' component={EnglishTest}/>
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
