import { FC } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Screen } from "../types";
import { Ionicons } from '@expo/vector-icons';
import { color, fonts } from "../constants";

interface IScreenHeader extends Screen {
  title: string,
}

const ScreenHeader: FC<IScreenHeader> = ({
  navigation,
  title,
}) => {

  const { width: windowWidth } = useWindowDimensions();

  return (
    <View>

      <View style={[styles.container, { width: windowWidth }]}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <View style={styles.btn}>
            <Ionicons name="arrow-back" size={28} color={color.white} />
          </View>
        </TouchableOpacity>

        <Image
          style={styles.img}
          source={require('../../assets/icons/logo.png')} />

      </View>

      <View style={[styles.container, { width: windowWidth }]}>
        <Text style={styles.title}>
          {
            title
          }
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: color.white50
  },
  btn: {
    backgroundColor: color.white20,
    borderRadius: 8,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.robotoBold,
    fontSize: 18,
    textTransform: 'uppercase',
    color: color.white,
  },
  img: {
    resizeMode: 'contain',
    height: 50,
    width: 100,
  },
});

export default ScreenHeader;
