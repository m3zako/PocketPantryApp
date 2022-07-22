import React from "react";
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
import { Dimensions } from "react-native";

const RegisterScreen = ({ navigation }) => {


  const [First_name, setFirst] = React.useState("");
  const [Last_name, setLast] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailAuth, setEmailAuth] = React.useState("");
  const [passwordAuth, setPasswordAuth] = React.useState("");
  const [pwdError, setPwdError] = React.useState();
  const [emailError, setEmailError] = React.useState();
  const [error, setError] = React.useState("");



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

    let data = {
      First_name: First_name,
      Last_name: Last_name,
      Email: email,
      Password: password,
    };

    axios
      .post(url, data)
      .then((response) => {
        if (response.status === 201) {
          navigation.navigate("VerificationScreen", {
            userID: response.data._id,
            email: email,
            token:response.data.token,
          });
        } else {
          setError("That user already exists!");
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
        />

        <TextInput
          style={[styles.regularText, styles.input]}
          fontSize={20}
          placeholder="Last name"
          onChangeText={(Last_name) => setLast(Last_name)}
        />

        <TextInput
          style={[styles.regularText, styles.input]}
          fontSize={20}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          style={[styles.regularText, styles.input]}
          fontSize={20}
          placeholder="Confirm Email"
          onChangeText={(emailAuth) => setEmailAuth(emailAuth)}
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

        {error != "" && error != undefined ? (
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
    height: Dimensions.get("window").height >= 800 ? 60 : "7.5%",
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
