import 'react-native-gesture-handler';

import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
} from 'react-native';
import { color } from './src/constants';
import AppNavigation from './AppNavigation';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import store from './src/store';
import {
  NativeBaseProvider,
} from 'native-base';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Quantico-Bold': require('./assets/fonts/Quantico-Bold.ttf'),
    'Quantico-Regular': require('./assets/fonts/Quantico-Regular.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      (async () => await SplashScreen.hideAsync())();
    } else {
      (async () => await SplashScreen.preventAutoHideAsync())();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <View style={{ flex: 1 }}>

          <StatusBar
            hidden={true} />

          <LinearGradient
            style={styles.calendarWrapper}
            colors={[color.backgroundLight, color.backgroundDark]}>

            <AppNavigation />

          </LinearGradient>

        </View>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  calendarWrapper: {
    flex: 1,
  }
});
