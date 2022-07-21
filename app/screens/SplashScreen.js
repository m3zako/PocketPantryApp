import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from "react-native";
import * as SplashScreens from "expo-splash-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreens.preventAutoHideAsync();

const SplashScreen = ({ navigation }) => {


  useEffect(() => {

    setTimeout(() => {

      AsyncStorage.getItem().then((value) =>
        navigation.navigate(
          value === null ? "LoginScreen" : "RecipeScreen",
          value === null ? false : AsyncStorage.getItem("user_id"),
          value === null ? null : AsyncStorage.getItem("token"),
        )
      );

    }, 5000);

  }, []);

  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo.jpg")} />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 256,
    height: 256,
  },
});

export default SplashScreen;
