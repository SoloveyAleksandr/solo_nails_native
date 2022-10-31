import { FC } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { color, fonts } from '../constants';

interface IFormBtn {
  title: string,
  disabled?: boolean,
  onPress: () => void,
}

const FormBtn: FC<IFormBtn> = ({
  title,
  disabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        disabled && {
          opacity: 0.5
        }
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: color.black,
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  title: {
    textTransform: 'uppercase',
    color: color.white,
    fontFamily: fonts.robotoBold,
    fontSize: 14,
  }
});

export default FormBtn;
