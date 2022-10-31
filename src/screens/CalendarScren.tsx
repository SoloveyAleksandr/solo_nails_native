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
} from 'react-native';
import {
  GestureHandlerRootView,
  DrawerLayout,
} from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { color, fonts } from '../constants';
import MonthController from '../components/MonthController';
import Calendar from '../components/Calendar';
import Menu from '../components/Menu';
import Logo from '../components/Logo';
import { signOut } from 'firebase/auth';
import { authentification } from '../firebase';
import {
  useToast,
  Spinner,
} from 'native-base';
import CustomToast from '../components/CustomToast';
import CustomSpinner from '../components/CustomSpinner';
import { Screen } from '../types';


interface ICalendarScreen extends Screen {

}

const CalendarScreen: FC<ICalendarScreen> = ({ navigation }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const toast = useToast();
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const date = moment();
    setMonth(date.month());
    setYear(date.year());
  }, []);

  const setPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      return;
    }
    setMonth(prev => prev - 1);
  };

  const setNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      return;
    }
    setMonth(prev => prev + 1);
  };

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
      setLoading(true);
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
      setLoading(false);
    }
  }

  const navigateTo = (to: string) => {
    drawerRef.closeDrawer();
    navigation.navigate(to);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <CustomSpinner isActive={loading} />

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
            month={month}
            year={year}
            prevMonth={setPrevMonth}
            nextMonth={setNextMonth} />
          <Calendar
            selMonth={month}
            selYear={year} />
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
