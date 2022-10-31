import { FC } from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";
import {
  color,
  fonts
} from "../constants";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

interface ICustomToast {
  title: string,
  variant: 'success' | 'error' | 'warning',
}

const CustomToast: FC<ICustomToast> = ({
  title,
  variant,
}) => {

  const BGColor = () => {
    if (variant === 'error') {
      return 'rgb(229, 24, 69)';
    } else if (variant === 'success') {
      return 'rgb(4, 179, 49)';
    } else if (variant === 'warning') {
      return 'rgb(212, 134, 40)';
    }
  }

  const icon = () => {
    if (variant === 'error') {
      return <MaterialIcons name="error-outline" size={24} color='rgb(229, 24, 69)' />;
    } else if (variant === 'success') {
      return <FontAwesome5 name="check-circle" size={24} color='rgb(4, 179, 49)' />;
    } else if (variant === 'warning') {
      return <MaterialIcons name="error-outline" size={24} color='rgb(212, 134, 40)' />;
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: BGColor() }]}>
      <View style={styles.icon}>
        {icon()}
      </View>
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'relative',
  },
  title: {
    fontFamily: fonts.robotoMedium,
    fontSize: 14,
    color: color.white,
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    left: -30,
    top: 0,
  }
});

export default CustomToast;
