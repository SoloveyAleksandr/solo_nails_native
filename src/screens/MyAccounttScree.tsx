import { useToast } from "native-base";
import { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CustomToast from "../components/CustomToast";
import ScreenHeader from "../components/ScreenHeader";
import { color, fonts } from "../constants";
import useAuth from "../firebase/controllers/userController";
import { setLoading } from "../store";
import {
  useAppDispatch,
  useAppSelector
} from "../store/hooks";
import { IUser, Screen } from "../types";
import { FontAwesome5 } from '@expo/vector-icons';

interface IMyAccounttScree extends Screen {

}

const MyAccounttScree: FC<IMyAccounttScree> = ({
  navigation,
}) => {
  const appState = useAppSelector(store => store.AppStore);
  const reduxDispatch = useAppDispatch();
  const toast = useToast();
  const { getUserInfo } = useAuth();

  const [user, setUser] = useState<IUser | null>(null);

  const getUser = async () => {
    try {
      const user = await getUserInfo(appState.currentUserUID);
      user &&
        setUser(user);
    } catch (e) {
      navigation.goBack();
      toast.show({
        placement: 'top',
        render: () => <CustomToast
          title='попробуйте позже'
          variant='error' />
      });
    }
  }

  useEffect(() => {
    (async () => {
      try {
        reduxDispatch(setLoading(true));
        await getUser();
      } catch (e) {
        navigation.goBack();
        toast.show({
          placement: 'top',
          render: () => <CustomToast
            title='попробуйте позже'
            variant='error' />
        });
      } finally {
        reduxDispatch(setLoading(false));
      }
    })()
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader
        navigation={navigation}
        title={'мой аккаунт'} />
      <View style={styles.container}>

        <View>
          <View style={styles.infoItem}>
            <View style={styles.infoBox}>
              <Text style={[styles.infoTitle, styles.text]}>имя:</Text>
              <Text style={[styles.infoText]}>
                {
                  user?.name || 'имя не указано'
                }
              </Text>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <FontAwesome5 name="pen" size={18} color={color.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.infoItem}>
            <View style={styles.infoBox}>
              <Text style={[styles.infoTitle, styles.text]}>instagram:</Text>
            </View>
            <View style={styles.btnContainer}>

              <TouchableOpacity style={styles.editBtn}>
                <FontAwesome5 name="instagram" size={18} color={color.white} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.editBtn}>
                <FontAwesome5 name="pen" size={18} color={color.white} />
              </TouchableOpacity>

            </View>
          </View>
        </View>

        <View>
          <View style={styles.infoItem}>
            <View style={styles.infoBox}>
              <Text style={[styles.infoTitle, styles.text]}>телефон:</Text>
              <Text style={[styles.infoText]}>
                {
                  user?.phone || 'имя не указано'
                }
              </Text>
            </View>
          </View>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: color.white,
    fontFamily: fonts.robotoBold,
  },
  container: {
    paddingHorizontal: 15,
  },
  infoItem: {
    borderBottomWidth: 1,
    borderBottomColor: color.white20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoBox: {
    flexDirection: 'row',
  },
  infoTitle: {
    textTransform: 'uppercase',
    fontSize: 18,
    marginRight: 15,
  },
  infoText: {
    fontSize: 18,
    color: color.white,
    fontFamily: fonts.robotoLight
  },
  btnContainer: {
    flexDirection: 'row',
  },
  editBtn: {
    marginLeft: 15,
    width: 40,
    height: 40,
    backgroundColor: color.white20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default MyAccounttScree;
