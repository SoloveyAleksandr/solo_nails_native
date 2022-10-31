import moment from 'moment';
import {
  FC,
  useEffect,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import {
  RectButton,
  GestureHandlerRootView,
  DrawerLayout,
} from 'react-native-gesture-handler';
import { setLoading, setMonth, setNextMonth, setPrevMonth, setYear } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { color, fonts } from '../constants';
import MonthController from '../components/MonthController';
import Calendar from '../components/Calendar';
import Menu from '../components/Menu';
import Logo from '../components/Logo';
import FormBtn from '../components/FormBtn';
import { signOut } from 'firebase/auth';
import { authentification } from '../firebase';
import {
  useToast,
  Spinner,
} from 'native-base';
import CustomToast from '../components/CustomToast';
import CustomSpinner from '../components/CustomSpinner';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { Screen } from '../types';


interface ICalendarScreen extends Screen {

}

const CalendarScreen: FC<ICalendarScreen> = ({ navigation }) => {
  const appState = useAppSelector(store => store.AppStore);
  const reduxDispatch = useAppDispatch();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const toast = useToast();

  useEffect(() => {
    const date = moment();
    reduxDispatch(setMonth(date.month()));
    reduxDispatch(setYear(date.year()));
  }, []);

  const renderMenu = () => {
    return (
      <GestureHandlerRootView>
        <Menu>
          {/* <View style={styles.menuItem}>
            <TouchableOpacity style={styles.menuBtn}>
              <Text style={styles.menuText}>
                свободные даты
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* <View style={styles.menuItem}>
            <TouchableOpacity style={styles.menuBtn}>
              <Text style={styles.menuText}>
                мой запросы
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.menuItem}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => navigateTo('my-account')}>
              <Text style={styles.menuText}>
                мой аккаунт
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.menuItem}>
            <TouchableOpacity style={styles.menuBtn}>
              <Text style={styles.menuText}>
                прайс
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={{ marginTop: 50, flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={signOutHandler}>
              <Text style={styles.menuText}>
                выход
              </Text>
            </TouchableOpacity>
          </View>
        </Menu>
      </GestureHandlerRootView>
    )
  }

  let drawerRef: DrawerLayout;

  const updateRef = (ref: DrawerLayout) => {
    drawerRef = ref;
  };

  const openMenu = () => {
    if (menuIsOpen) {
      drawerRef.closeDrawer();
    } else {
      drawerRef.openDrawer();
    }
    setMenuIsOpen(!menuIsOpen);
  };

  const signOutHandler = async () => {
    try {
      reduxDispatch(setLoading(true));
      await signOut(authentification);
      toast.show({
        placement: 'top',
        render: () => <CustomToast
          title='выход'
          variant='success' />
      })
    } catch (e) {
      toast.show({
        placement: 'top',
        render: () => <CustomToast
          title='попробуйте позже'
          variant='error' />
      })
    } finally {
      reduxDispatch(setLoading(false));
    }
  }

  const navigateTo = (to: string) => {
    drawerRef.closeDrawer();
    navigation.navigate(to);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <CustomSpinner />

      <Logo />

      <TouchableOpacity style={styles.btnContainer} onPress={openMenu}>
        <View style={styles.btn}>
          {
            menuIsOpen ?
              <Ionicons name="close" size={28} color={color.white} /> :
              <Ionicons name="menu" size={28} color={color.white} />
          }
        </View>
      </TouchableOpacity>

      <DrawerLayout
        ref={updateRef}
        drawerWidth={windowWidth * 0.8}
        keyboardDismissMode="on-drag"
        drawerPosition={'left'}
        drawerType={'front'}
        overlayColor={'rgba(83, 63, 64, 0.5)'}
        onDrawerClose={() => setMenuIsOpen(false)}
        renderNavigationView={renderMenu}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <MonthController
            month={appState.month}
            year={appState.year}
            prevMonth={() => reduxDispatch(setPrevMonth())}
            nextMonth={() => reduxDispatch(setNextMonth())} />
          <Calendar
            selMonth={appState.month}
            selYear={appState.year} />
        </View>

      </DrawerLayout>
    </GestureHandlerRootView >
  )
};

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 100,
  },
  btn: {
    backgroundColor: color.white20,
    borderRadius: 8,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    marginVertical: 10,
    flexDirection: 'row'
  },
  menuBtn: {
    height: 30,
    justifyContent: 'center',
  },
  menuText: {
    fontFamily: fonts.robotoBold,
    fontSize: 16,
    textTransform: 'uppercase',
    color: color.white
  },
});

export default CalendarScreen;
