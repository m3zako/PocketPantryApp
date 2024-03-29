import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ route, navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState();

  let { bool, veri } = route.params;

  const handleLogin = () => {
    setError("");
    veri = null;
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    const url = "https://pocketpantryapp.herokuapp.com/api/users/login";

    let data = { Email: email, Password: password };

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          if (
            response.data.Verified &&
            response.data._id &&
            response.data.token
          ) {
            AsyncStorage.setItem("user_id", response.data._id);
            AsyncStorage.setItem("token", response.data.token);

            navigation.navigate("RecipeScreen", {
              userID: response.data._id,
              token: response.data.token,
              bool: bool,
            });
          } else {
            navigation.navigate("VerificationScreen", {
              userID: response.data._id,
              token: response.data.token,
              bool: bool,
            });
          }
        }
      })
      .catch((error) => {
        setError("Incorrect Email/Password Combination");
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedSquareRatio}>
        <Image style={styles.logo} source={require("../assets/logo.jpg")} />
      </View>
      <Text style={[styles.headerText, styles.leftAlign]}>Login</Text>

      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("ForgotScreen", { bool: bool })}
      >
        <Text
          style={[styles.regularText, styles.leftAlign, styles.line]}
          fontSize={16}
        >
          Forgot password?
        </Text>
      </TouchableOpacity>

      {error != "" && error != undefined ? (
        <Text style={styles.errorTextStyle}>{error}</Text>
      ) : null}

      {veri ? <Text style={styles.veriText}>Account Verified</Text> : null}

      <View style={styles.centerAlign}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.regularText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.regularText}>Don't have an account?</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen", { bool: bool })}
        >
          <Text style={[styles.regularText, styles.line]}>Register</Text>
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
    marginTop: "10%",
    marginBottom: "10%",
    borderRadius: 9,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontFamily: "InriaSans_700Bold",
    fontSize: 22,
  },
  veriText: {
    color: "green",
    textAlign: "center",
    fontFamily: "InriaSana_700Bold",
    fontSize: 22,
  },
  line: {
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
