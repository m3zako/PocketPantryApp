import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import axios from "axios";

const ForgotScreen = ({ route, navigation }) => {
  let { bool } = route.params;

  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const [tok, setTok] = React.useState("");
  const [id, setID] = React.useState("");

  const [code, setCode] = React.useState("");
  const [codeError, setCodeError] = React.useState("");

  const [display, setDisplay] = React.useState(false);

  const showEmail = () => {
    setEmailError("");
    if (!email) {
      setEmailError("Please enter your email");
      return;
    }

    const url =
      "https://pocketpantryapp.herokuapp.com/api/users/sendResetPassEmail";

    let data = { Email: email };

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setDisplay(true);
          setID(response.data.UserId);
          setTok(response.data.Token);
        } else {
          setEmailError("Incorrect Email");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changePass = () => {
    setCodeError("");

    if (!code) {
      setCodeError("Please enter the code");
      return;
    }

    const url =
      "https://pocketpantryapp.herokuapp.com/api/users/verifyPassToken";

    let data2 = { UserId: id, Token: code };

    axios
      .post(url, data2, {
        headers: {
          Authorization: `Bearer ${tok}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigation.navigate("ResetPass", {
            userID: id,
            token: tok,
            bool: bool,
          });
        } else {
          setCodeError("Invalid code");
        }
      })
      .catch((error) => {
        console.log(data2);
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text
        style={[styles.exitText, styles.propAlign]}
        onPress={() => navigation.navigate("LoginScreen", { bool: bool })}
      >
        <Icon name={"arrow-back"} />
        Back
      </Text>

      <Text style={styles.header}>Reset Password</Text>

      <Text style={styles.mainText}>Please enter your email</Text>

      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Enter email"
        onChangeText={(email) => setEmail(email)}
      />

      {emailError != "" && emailError != undefined ? (
        <Text style={styles.errorTextStyle}>{emailError}</Text>
      ) : null}

      <TouchableOpacity onPress={showEmail} style={styles.Button}>
        <Text style={styles.bottomText} alignText="center">
          Enter
        </Text>
      </TouchableOpacity>

      {display ? (
        <Text style={styles.mainText}>
          Please enter the code sent to your email
        </Text>
      ) : null}

      {display ? (
        <TextInput
          style={[styles.regularText, styles.input]}
          fontSize={20}
          placeholder="Enter code"
          onChangeText={(code) => setCode(code)}
        />
      ) : null}

      {codeError != "" && codeError != undefined ? (
        <Text style={styles.errorTextStyle}>{codeError}</Text>
      ) : null}

      {display ? (
        <TouchableOpacity onPress={changePass} style={styles.Button}>
          <Text style={styles.bottomText} alignText="center">
            Enter
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  exitText: {
    fontFamily: "InriaSans_700Bold",
    fontSize: 24,
  },
  mainText: {
    fontFamily: "InriaSans_700Bold",
    fontSize: 30,
    textAlign: "center",
    marginHorizontal: "5%",
    marginTop: "5%",
  },
  propAlign: {
    marginLeft: "5%",
    marginTop: "15%",
  },
  header: {
    fontFamily: "InriaSans_700Bold",
    fontSize: 40,
    marginLeft: "5%",
  },
  bottomText: {
    fontFamily: "InriaSans_400Regular",
    fontSize: 22,
    textAlign: "center",
  },
  regularText: {
    fontFamily: "InriaSans_400Regular",
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
  Button: {
    width: 100,
    height: 50,
    backgroundColor: "#A5DAAA",
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: "7%",
    borderRadius: 9,
    justifyContent: "center",
    alignSelf: "center",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontFamily: "InriaSans_700Bold",
    fontSize: 22,
  },
});
