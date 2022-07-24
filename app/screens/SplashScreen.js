import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as SplashScreens from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreens.preventAutoHideAsync();

let id, tok;

getAsyncs = async () => {
  try {
    id = await AsyncStorage.getItem("user_id");
    tok = await AsyncStorage.getItem("token");
  } catch (e) {
    id = null;
    tok = null;
  }
};

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    getAsyncs();

    setTimeout(() => {
      if (id && tok) {
        navigation.navigate("RecipeScreen", { userID: id, token: tok });
      } else {
        navigation.navigate("LoginScreen", { veri: false });
      }
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
    width: 192,
    height: 192,
  },
});

export default SplashScreen;
