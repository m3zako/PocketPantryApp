import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font';



export default function App() {

let [fontsLoaded] = useFonts({
  "InriaSans_400Regular": require("./node_modules/@expo-google-fonts/inria-sans/InriaSans_400Regular.ttf"),
  "InriaSans_700Bold": require("./node_modules/@expo-google-fonts/inria-sans/InriaSans_700Bold.ttf"),
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailAuth, setEmailAuth] = React.useState("");
  const [passwordAuth, setPasswordAuth] = React.useState("");

if (!fontsLoaded) {
    return <AppLoading/>;
  }

  return (

<View style={styles.container}>

      <Text
        style={[styles.headerText, styles.leftAlign]}>
        Register
      </Text>


      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
        value={email}/>

      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Confirm Email"
        onChangeText={(emailAuth) => setEmailAuth(emailAuth)}
        value={emailAuth}/>

      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        value={password}/>

      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={(passwordAuth) => setPasswordAuth(passwordAuth)}
        value={passwordAuth}/>


      <View
        style={styles.centerAlign}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => console.log("Register Pressed")}>
            <Text 
              style={styles.regularText}>
                Register
              </Text>
          </TouchableOpacity>

      </View>

      <StatusBar style="auto"/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  headerText:{
    fontFamily: "InriaSans_700Bold",
    fontSize: 40,
    marginTop: "15%"
  },
  regularText:{
    fontFamily: "InriaSans_400Regular",
  },
  leftAlign:{
    alignSelf: "flex-start",
    marginLeft: "5%"
  },
  centerAlign:{
    alignItems: "center"
  },
  input: {
    height: 60,
    width: "90%",
    justifyContent: "flex-start",
    alignSelf: "center",
    margin: 16,
    borderWidth: 0,
    padding: 8,
    backgroundColor: "#D4D4D4",
  },
  registerButton:{
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A5DAAA",
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: "10%",
  },
});




