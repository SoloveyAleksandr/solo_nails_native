import { StyleSheet } from "react-native";

export const color = {
  white: '#fff',
  white10: 'rgba(255, 255, 255, 0.1)',
  white20: 'rgba(255, 255, 255, 0.2)',
  white50: 'rgba(255, 255, 255, 0.5)',
  white80: 'rgba(255, 255, 255, 0.8)',
  greenMark: 'rgb(0, 255, 115)',
  black: 'rgb(15, 15, 15)',
  black80: 'rgba(15, 15, 15, 0.8)',
  black50: 'rgba(15, 15, 15, 0.5)',
  black20: 'rgba(15, 15, 15, 0.2)',
  blackHover: 'rgba(15, 15, 15, 0.8)',
  backgroundDark: 'rgb(83, 63, 64)',
  backgroundLight: 'rgba(122, 105, 108, 0.7)',
};

export const shadow = StyleSheet.create({
  static: {
    elevation: 10,
    shadowColor: color.black,
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4
  },
  active: {
    elevation: 5,
    shadowColor: color.black,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
});

export const fonts = {
  quanticoBolt: 'Quantico-Bold',
  quanticoRegular: 'Quantico-Regular',
  robotoBlack: 'Roboto-Black',
  robotoBold: 'Roboto-Bold',
  robotoMedium: 'Roboto-Medium',
  robotoRegular: 'Roboto-Regular',
  robotoLight: 'Roboto-Light',
  robotoThin: 'Roboto-Thin',
}
