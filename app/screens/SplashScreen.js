import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as SplashScreens from "expo-splash-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreens.preventAutoHideAsync();

const SplashScreen = ({ navigation }) => {


  useEffect(() => {

    setTimeout(() => {

      AsyncStorage.getItem().then((value) =>
        navigation.replace(value === null ? "LoginScreen" : "RecipeScreen")
      );

    }, 5000);

  }, []);

  return (
    <View
      style= {styles.container}>
      <Image source={require('../assets/splash.png')} />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
