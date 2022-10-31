import { FC } from "react";
import { Image, StyleSheet, View } from "react-native";

const Logo: FC = () => {
  return (
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={require('../../assets/icons/logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  logo: {
    height: 80,
    width: 120,
    resizeMode: 'contain',
  }
});

export default Logo;
