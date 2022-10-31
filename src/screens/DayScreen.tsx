import { FC, useState, useRef } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

interface IDayScreen {
  navigation: any,
}

const DayScreen: FC<IDayScreen> = ({ navigation }) => {
  
  return (
    <SafeAreaView style={styles.wrapper}>

      <Text style={styles.title}>
        Записи
      </Text>



    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Roboto-Black',
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
})

export default DayScreen;
