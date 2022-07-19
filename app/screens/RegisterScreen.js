import React, { createRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import axios from "axios";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Dimensions } from "react-native";

const RegisterScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    InriaSans_400Regular: require("./../../node_modules/@expo-google-fonts/inria-sans/InriaSans_400Regular.ttf"),
    InriaSans_700Bold: require("./../../node_modules/@expo-google-fonts/inria-sans/InriaSans_700Bold.ttf"),
  });

  const [First_name, setFirst] = React.useState("");
  const [Last_name, setLast] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailAuth, setEmailAuth] = React.useState("");
  const [passwordAuth, setPasswordAuth] = React.useState("");
  const [pwdError, setPwdError] = React.useState();
  const [emailError, setEmailError] = React.useState();

  const lastInputRef = createRef();
  const emailInputRef = createRef();
  const eAuthInputRef = createRef();
  const passInputRef = createRef();
  const pAuthInputRef = createRef();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleRegister = () => {
    setPwdError("");
    setEmailError("");

    if (!First_name) {
      alert("Please enter your first name");
      return;
    }
    if (!Last_name) {
      alert("Please enter your last name");
      return;
    }
    if (!email) {
      alert("Please enter your email");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }

    if (password !== passwordAuth) {
      setPwdError("Please make sure both passwords match");
      return;
    }

    if (email !== emailAuth) {
      setEmailError("Please make sure both emails match");
      return;
    }

    const url = "https://pocketpantryapp.herokuapp.com/api/users/register";

    var data = {
      First_name: First_name,
      Last_name: Last_name,
      Email: email,
      Password: password,
    };

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);

        if (response.status === 201) {
          navigation.navigate("VerificationScreen");
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, styles.leftAlign]}>Register</Text>

      <KeyboardAvoidingView enabled>
        <TextInput
          style={[styles.regularText, styles.input]}
          fontSize={20}
          placeholder="First Name"
          onChangeText={(First_name) => setFirst(First_name)}
          onSubmitEditing={() =>
            lastInputRef.current && lastInputRef.current.focus()
          }
        />

        <TextInput
          style={[styles.regularText, styles.input]}
          fontSize={20}
          placeholder="Last name"
          onChangeText={(Last_name) => setLast(Last_name)}
          onSubmitEditing={() =>
            emailInputRef.current && emailInputRef.current.focus()
          }
        />

        <TextInput
          style={[styles.regularText, styles.input]}
          fontSize={20}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          onSubmitEditing={() =>
            eAuthInputRef.current && eAuthInputRef.current.focus()
          }
        />

        <TextInput
          style={[styles.regularText, styles.input]}
          fontSize={20}
          placeholder="Confirm Email"
          onChangeText={(emailAuth) => setEmailAuth(emailAuth)}
          onSubmitEditing={() =>
            passInputRef.current && passInputRef.current.focus()
          }
        />

        {emailError != "" && emailError != undefined ? (
          <Text style={styles.errorTextStyle}>{emailError}</Text>
        ) : null}

        <TextInput
          style={[styles.regularText, styles.input]}
          fontSize={20}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          onSubmitEditing={() =>
            pAuthInputRef.current && pAuthInputRef.current.focus()
          }
        />

        <TextInput
          style={[styles.regularText, styles.input]}
          fontSize={20}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(passwordAuth) => setPasswordAuth(passwordAuth)}
        />

        {pwdError != "" && pwdError != undefined ? (
          <Text style={styles.errorTextStyle}>{pwdError}</Text>
        ) : null}

        <View style={styles.centerAlign}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.regularText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

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
  headerText: {
    fontFamily: "InriaSans_700Bold",
    fontSize: 40,
    marginTop: "15%",
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
    height: Dimensions.get("window").height >= 1200 ? 60 : "7.5%",
    width: "90%",
    justifyContent: "flex-start",
    alignSelf: "center",
    margin: 16,
    borderWidth: 0,
    padding: 8,
    backgroundColor: "#D4D4D4",
    borderRadius: 9,
  },
  registerButton: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A5DAAA",
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: "10%",
    borderRadius: 9,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontFamily: "InriaSans_700Bold",
    fontSize: 22,
  },
});

export default RegisterScreen;
