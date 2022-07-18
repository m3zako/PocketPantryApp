import React, { createRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
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

  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.jpg")} />

      <Text style={[styles.headerText, styles.leftAlign]}>Login</Text>

      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
        onSubmitEditing={() =>
          passwordInput.current && passwordInput.current.focus()
        }
      />

      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Password"
        ref={passwordInput}
        secureTextEntry={true}
        onSubmitEditing={Keyboard.dismiss}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity onPress={() => console.log("Forgot Password Pressed")}>
        <Text style={[styles.regularText, styles.leftAlign]} fontSize={16}>
          Forgot password?
        </Text>
      </TouchableOpacity>

      {error != "" ? <Text style={styles.errorTextStyle}>{error}</Text> : null}

      <View style={styles.centerAlign}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.regularText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.regularText}>Don't have an account?</Text>

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
  logo: {
    width: 256,
    height: 256,
    alignSelf: "center",
    marginTop: "10%",
  },
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
  },
  loginButton: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A5DAAA",
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: "10%",
    marginBottom: "10%",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 22,
  },
});

export default LoginScreen;
