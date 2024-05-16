import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import Navigator from '@navigation/Navigator';
import { UserProvider } from '@root/context/user-context';
import { ToastProvider } from '@root/context/toast-context';

if (__DEV__) {
  require('./ReactotronConfig');
}

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
              <ToastProvider>
                <UserProvider>
                  <Navigator />
                </UserProvider>
              </ToastProvider>
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
