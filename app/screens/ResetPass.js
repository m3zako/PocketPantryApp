import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import axios from "axios";

const ResetPass = ({route, navigation}) => {

    let {userID, token} = route.params;

    const [newPassword, setNewPassword] = React.useState("");
    const [passwordAuth, setPasswordAuth] = React.useState("");
    const [error, setError] = React.useState("");

    const setPass = () => {

        setError("");
        if (!newPassword) {
          setError("Please enter your new password");
          return;
        }

        if (newPassword !== passwordAuth) {
            setError("Please make sure both passwords match");
            return;
        }

        const url = "https://pocketpantryapp.herokuapp.com/api/users/resetPass";

        let data = {UserId: userID, Password:newPassword};

        axios
          .post(url, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              navigation.navigate("LoginScreen");
            } else {
              setError("Invalid");
            }
          })
          .catch((error) => {
            console.log(error);
          });

    }

    return (
      <View style={styles.container}>
        <Text
          style={[styles.exitText, styles.propAlign]}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Icon name={"arrow-back"} />
          Back
        </Text>

        <Text style={styles.header}>Reset Password</Text>

        <Text style={styles.mainText}>Please enter your new password</Text>

        <TextInput
          style={[styles.regularText, styles.input]}
          fontSize={20}
          placeholder="Enter new password"
          onChangeText={(password) => setNewPassword(password)}
        />
 
        <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Confirm new password"
        onChangeText={(passwordAuth) => setPasswordAuth(passwordAuth)}
        />

        {error != "" && error != undefined ? (
          <Text style={styles.errorTextStyle}>{error}</Text>
        ) : null}

          <TouchableOpacity onPress={setPass} style={styles.Button}>
            <Text style={styles.bottomText} alignText="center">
              Enter
            </Text>
          </TouchableOpacity>
      </View>
    );
};

export default ResetPass;

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
    marginTop: "5%"
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
  },  regularText: {
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