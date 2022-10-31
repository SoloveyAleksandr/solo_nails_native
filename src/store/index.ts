import AsyncStorage from '@react-native-async-storage/async-storage';

type storeKey = 'uid' | 'userInfo' | 'selectedDate';

export const useStorage = () => {
  const storeData = async (key: storeKey, value: any) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key: storeKey) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      // error reading value
    }
  }

  return {
    storeData,
    getData,
  };
};
