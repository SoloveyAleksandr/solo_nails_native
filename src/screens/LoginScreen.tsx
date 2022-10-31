import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import {
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import {
  useToast,
} from 'native-base';
import {
  FC,
  useState,
  useRef,
  LegacyRef
} from 'react';
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TextInput,
} from 'react-native';
import {
  DrawerLayout,
  GestureHandlerRootView
} from 'react-native-gesture-handler';
import CustomSpinner from '../components/CustomSpinner';
import CustomToast from '../components/CustomToast';
import FormBtn from '../components/FormBtn';
import Logo from '../components/Logo';
import {
  color,
  fonts
} from '../constants';
import {
  app,
  authentification,
  firebaseConfig
} from '../firebase';

const LoginScreen: FC = () => {
  const { width: windowWidth } = useWindowDimensions();
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  const recaptchaVerifier: LegacyRef<FirebaseRecaptchaVerifierModal> | undefined = useRef(null);

  const [verificationId, setVerificationId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [OTP, setOTP] = useState('');

  const renderDrawer = () => {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.wrapper}>
          <Text style={styles.formTitle}>
            код подтверждения
          </Text>
          <View style={styles.formWrapper}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>код:</Text>
              <TextInput
                keyboardType='number-pad'
                placeholder={'123456'}
                onChangeText={setOTP}
                value={OTP}
                style={[styles.formInput, { paddingLeft: 15 }]} />
            </View>
            <View style={styles.formBtn}>
              <FormBtn
                disabled={!verificationId || OTP.trim().length !== 6}
                title={'подтвердить'}
                onPress={confirmCode} />
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
    );
  };

  let drawerRef: DrawerLayout;

  const updateRef = (ref: DrawerLayout) => {
    drawerRef = ref;
  };

  const onChangeHandler = (value: string) => {
    const trimValue = value.split(' ').join('');
    const length = value.length;
    if (trimValue.length > 13) {

    } else if (trimValue.length < 14) {
      setPhoneNumber(`${trimValue.slice(0, 2)} ${trimValue.slice(2, 5)} ${trimValue.slice(5, 7)} ${trimValue.slice(7, length)}`.trim());
      return;
    } else if (trimValue.length < 10) {
      setPhoneNumber(`${trimValue.slice(0, 2)} ${trimValue.slice(2, 5)} ${trimValue.slice(5, 7)} ${trimValue.slice(7, length)}`.trim());
      return;
    } else if (trimValue.length < 6) {
      setPhoneNumber(`${trimValue.slice(0, 4)} ${trimValue.slice(4, 6)} ${trimValue.slice(6, length)}`.trim());
      return;
    }
  }

  const sendCode = async () => {
    try {
      const trimNumber = phoneNumber.split(' ').join('');
      // проверка номера
      if (trimNumber.length < 9) {
        toast.show({
          placement: 'top',
          render: () => <CustomToast
            title='проверьте введенные номер'
            variant='error' />
        });
      }
      // номер прошел проверку
      else {
        setLoading(true);
        if (recaptchaVerifier.current) {
          const ref = drawerRef;
          const phone = '+375' + phoneNumber.split(' ').join('');
          const phoneProvider = new PhoneAuthProvider(authentification);
          const verificationId = await phoneProvider.verifyPhoneNumber(
            phone,
            recaptchaVerifier.current
          );
          setVerificationId(verificationId);
          toast.show({
            placement: 'top',
            render: () => <CustomToast
              title='код был отправлен на ваш номер'
              variant='success' />
          });
          ref.openDrawer();
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const confirmCode = async () => {
    try {
      setLoading(true);
      const credential = PhoneAuthProvider.credential(verificationId, OTP);
      await signInWithCredential(authentification, credential);
      toast.show({
        placement: 'top',
        render: () => <CustomToast
          title='вы вошли'
          variant='success' />
      });
    } catch (err) {
      recaptchaVerifier.current?._reset();
      drawerRef.closeDrawer();
      toast.show({
        placement: 'top',
        render: () => <CustomToast
          title='код не прошел проверку'
          variant='error' />
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />

      <CustomSpinner isActive={loading} />

      <Logo />

      <DrawerLayout
        ref={updateRef}
        drawerWidth={windowWidth}
        drawerPosition={'right'}
        keyboardDismissMode={'none'}
        drawerType={'slide'}
        drawerLockMode={'locked-closed'}
        renderNavigationView={renderDrawer}>

        <View style={styles.wrapper}>
          <Text style={styles.formTitle}>
            вход
          </Text>
          <View style={styles.formWrapper}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>номер телефона:</Text>
              <TextInput
                keyboardType='number-pad'
                placeholder={'29 123 23 23'}
                onChangeText={onChangeHandler}
                value={phoneNumber}
                maxLength={12}
                style={[styles.formInput, { paddingLeft: 50 }]} />
              <Text style={styles.inputTemplate}>
                +375
              </Text>
            </View>
            <View style={styles.formBtn}>
              <FormBtn
                title={'отправить код'}
                onPress={() => sendCode()} />
            </View>
          </View>
        </View>

      </DrawerLayout>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formWrapper: {
    backgroundColor: color.white80,
    padding: 20,
    borderRadius: 10,
    width: 350,
    alignItems: 'center',
    // shadow for android
    elevation: 10,
    // shadow for others
    shadowColor: color.black50,
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowRadius: 4,
  },
  formTitle: {
    fontFamily: fonts.robotoBold,
    fontSize: 24,
    color: color.white,
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'flex-start',
    position: 'relative',
  },
  inputTitle: {
    fontFamily: fonts.robotoBold,
    fontSize: 14,
    color: color.black,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  formInput: {
    width: '100%',
    paddingVertical: 5,
    paddingRight: 15,
    borderColor: color.black,
    borderWidth: 1,
    borderRadius: 4
  },
  inputTemplate: {
    position: 'absolute',
    top: 35,
    left: 15,
  },
  formBtn: {
    marginTop: 25,
  }
});

export default LoginScreen;
