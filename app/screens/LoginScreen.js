<<<<<<< HEAD
import React, { createRef } from 'react';
import { StatusBar } from 'expo-status-bar';
=======
import React from "react";
import { StatusBar } from "expo-status-bar";
>>>>>>> 4cc6761f9008ed4985177d4bd1dee4f1073cc0ca
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
<<<<<<< HEAD
  Keyboard,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const LoginScreen = ({ navigation }) => {
  
  let [fontsLoaded] = useFonts({
    InriaSans_400Regular: require('./../../node_modules/@expo-google-fonts/inria-sans/InriaSans_400Regular.ttf'),
    InriaSans_700Bold: require('./../../node_modules/@expo-google-fonts/inria-sans/InriaSans_700Bold.ttf'),
  });

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState();

  const passwordInput = createRef();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleLogin= () =>{

    setError('');

    if(!email){
      alert('Please enter your email');
      return;
    }
    if(!password){
      alert('Please enter your password');
      return;
    }

    const url = 'https://pocketpantryapp.herokuapp.com/api/users/login';
    
    let data = {Email: email, Password: password};

    axios.post(url, data)
         .then((response) => {
          console.log(response);

          if(response.status === 200){
            AsyncStorage.setItem('user_id', response.data.email);
            console.log(response.data.email);
            navigation.navigate('RecipeScreen');
          }
          else{
            setError(response.status);
            console.log('Incorrect Email/Password Combination');
          }
         })
         .catch((error) => {
          console.log(error);
         })

=======
  Dimensions,
} from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

const LoginScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    InriaSans_400Regular: require("./../../node_modules/@expo-google-fonts/inria-sans/InriaSans_400Regular.ttf"),
    InriaSans_700Bold: require("./../../node_modules/@expo-google-fonts/inria-sans/InriaSans_700Bold.ttf"),
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (!fontsLoaded) {
    return <AppLoading />;
>>>>>>> 4cc6761f9008ed4985177d4bd1dee4f1073cc0ca
  }

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Image style={styles.logo} source={require("../assets/logo.jpg")} />
=======
      <View style={styles.fixedSquareRatio}>
        <Image style={styles.logo} source={require("../assets/logo.jpg")} />
      </View>
>>>>>>> 4cc6761f9008ed4985177d4bd1dee4f1073cc0ca

      <Text style={[styles.headerText, styles.leftAlign]}>Login</Text>

      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
<<<<<<< HEAD
        onSubmitEditing={() =>
          passwordInput.current && passwordInput.current.focus()
        }
=======
        value={email}
>>>>>>> 4cc6761f9008ed4985177d4bd1dee4f1073cc0ca
      />

      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Password"
        ref={passwordInput}
        secureTextEntry={true}
        onSubmitEditing={Keyboard.dismiss}
        onChangeText={(password) => setPassword(password)}
<<<<<<< HEAD
=======
        value={password}
>>>>>>> 4cc6761f9008ed4985177d4bd1dee4f1073cc0ca
      />

      <TouchableOpacity onPress={() => console.log("Forgot Password Pressed")}>
        <Text style={[styles.regularText, styles.leftAlign]} fontSize={16}>
          Forgot password?
        </Text>
      </TouchableOpacity>

<<<<<<< HEAD
      {error != "" ? <Text style={styles.errorTextStyle}>{error}</Text> : null}

      <View style={styles.centerAlign}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.regularText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.regularText}>Don't have an account?</Text>

=======
      <View style={styles.centerAlign}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("RecipeScreen")}
        >
          <Text style={styles.regularText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.regularText}>Don't have an account?</Text>

>>>>>>> 4cc6761f9008ed4985177d4bd1dee4f1073cc0ca
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.regularText}>Register</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
<<<<<<< HEAD
  logo: {
    width: 256,
    height: 256,
    alignSelf: "center",
    marginTop: "10%",
  },
=======
  fixedSquareRatio: {
    aspectRatio: 1,
    width: Dimensions.get("window").width >= 512 ? 256 : "50%",
    alignSelf: "center",
    marginTop: "10%",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
>>>>>>> 4cc6761f9008ed4985177d4bd1dee4f1073cc0ca
  headerText: {
    fontFamily: "InriaSans_700Bold",
    fontSize: 40,
  },
  regularText: {
    fontFamily: "InriaSans_400Regular",
  },
  leftAlign: {
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  centerAlign: {
    alignItems: "center",
  },
  input: {
    height: 60,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    margin: 12,
    borderWidth: 0,
    padding: 8,
    backgroundColor: "#D4D4D4",
    borderRadius: 9,
  },
  loginButton: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A5DAAA",
    borderWidth: 1,
    borderColor: "#000000",
<<<<<<< HEAD
    marginTop: "10%",
    marginBottom: "10%",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 22,
=======
    marginTop: "15%",
    marginBottom: "15%",
    borderRadius: 9,
>>>>>>> 4cc6761f9008ed4985177d4bd1dee4f1073cc0ca
  },
});

export default LoginScreen;
