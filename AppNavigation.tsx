import {
  NavigationContainer,
  DefaultTheme
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import CalendarScreen from './src/screens/CalendarScren';
import DayScreen from './src/screens/DayScreen';
import LoginScreen from './src/screens/LoginScreen';
import {
  useEffect,
  useState,
} from 'react';
import { authentification } from './src/firebase';
import MyAccounttScree from './src/screens/MyAccounttScree';
import { useAppDispatch } from './src/store/hooks';
import { setCurrentUserUID } from './src/store';
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const reduxDispatch = useAppDispatch();
  const [isLogged, setIsLogged] = useState(false);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    },
  };

  useEffect(() => {
    onAuthStateChanged(authentification, (user) => {
      if (user) {
        setIsLogged(true);
        reduxDispatch(setCurrentUserUID(user.uid));
      } else {
        setIsLogged(false);
      }
    });
  }, [])

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        {
          isLogged ?
            <>
              <Stack.Screen
                name="calendar"
                component={CalendarScreen}
              />
              <Stack.Screen
                name="my-account"
                component={MyAccounttScree}
              />
              <Stack.Screen
                name="day"
                component={DayScreen}
              />
            </>
            :
            <Stack.Screen
              name="login"
              component={LoginScreen}
            />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
