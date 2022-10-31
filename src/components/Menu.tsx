import { FC } from 'react';
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import { color } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

interface IMenu {
  children: React.ReactNode,
}

const Menu: FC<IMenu> = ({
  children,
}) => {

  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.wrapper]}>

      <LinearGradient colors={[color.backgroundDark, color.backgroundLight]} style={{ flex: 1 }}>
        <Image style={[styles.logo, {
          left: width * 0.2
        }]} resizeMode='contain' source={require('../../assets/icons/logo.png')} />
        <View style={styles.conteiner}>
          {children}
        </View>
      </LinearGradient>

    </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
  },
  conteiner: {
    paddingTop: 100,
    paddingLeft: 30,
    paddingRight: 30,
  },
  logo: {
    position: 'absolute',
    bottom: 30,
    width: '50%',
    height: 100,
  }
});

export default Menu;
