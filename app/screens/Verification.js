import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Verification = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    InriaSans_400Regular: require('./../../node_modules/@expo-google-fonts/inria-sans/InriaSans_400Regular.ttf'),
    InriaSans_700Bold: require('./../../node_modules/@expo-google-fonts/inria-sans/InriaSans_700Bold.ttf'),
  });

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.jpg")} />

      <Image style={styles.emage} source={require("../assets/email.png")} />

      <Text style={styles.mainText}>Please verify the email address for</Text>

      <Text style={styles.bottomText}
        marginTop='5%'>
        Didnt get an email?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.bottomText}>Send Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 256,
    height: 256,
    alignSelf: 'center',
    marginTop: '10%',
  },
  emage: {
    width: 128,
    height: 92,
    alignSelf: 'center',
  },
  mainText: {
    fontFamily: 'InriaSans_700Bold',
    fontSize: 30,
    textAlign: 'center',
    marginHorizontal: '5%'
  },
  bottomText: {
    fontFamily: 'InriaSans_400Regular',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default Verification;