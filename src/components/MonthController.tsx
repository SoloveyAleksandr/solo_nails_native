import { FC } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, ImageBackground, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { color, fonts, shadow } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';

interface IMonthController {
  month: number,
  year: number,
  nextMonth: () => void,
  prevMonth: () => void,
  style?: StyleProp<ViewStyle>
}

const MonthController: FC<IMonthController> = ({
  month,
  year,
  nextMonth,
  prevMonth,
  style,
}) => {
  const monthsList = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  return (
    <View style={[
      styles.wrapper,
      style,
    ]}>
      <TouchableOpacity
        style={styles.button}
        onPress={prevMonth}>
        <MaterialIcons name="keyboard-arrow-left" size={30} color={color.white} />
      </TouchableOpacity>

      <View style={[
        styles.month,
      ]}>
        <View style={[styles.yearBox]}>
          <Text style={styles.year}>{year}</Text>
        </View>
        <Text style={styles.text}>
          {monthsList[month]}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={nextMonth}>
        <MaterialIcons name="keyboard-arrow-right" size={30} color={color.white} />
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  month: {
    width: 160,
    height: 50,
    backgroundColor: color.white20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    color: color.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: fonts.robotoBlack,
  },
  button: {
    backgroundColor: color.white20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearBox: {
    position: 'absolute',
    width: 50,
    top: -25,
    right: 55,
  },
  year: {
    textAlign: 'center',
    color: color.white,
    fontSize: 16,
    fontFamily: fonts.robotoMedium
  }
})

export default MonthController;
