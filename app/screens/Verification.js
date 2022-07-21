import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import axios from "axios";


const Verification = ({ route, navigation }) => {

  let {userID, email, token} = route.params;

  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState();

  const Verify = () => {
      setError("");

      if (!input) {
        alert("Please enter the code you received");
        return;
      }

      const url = "https://pocketpantryapp.herokuapp.com/api/users/verify";

      let data = { UserId: userID, Token: input };

      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            navigation.navigate("LoginScreen", { veri: true });
          }
        })
        .catch((error) => {
          setError("Incorrect Code");
          console.log(error);
          console.log(data.UserId);
          console.log(data.Token);
        });
  };

const resendVerification = () => {

  const url = "https://pocketpantryapp.herokuapp.com/api/users/resendVerificationEmail";

  let send = {Email: email}

        axios
          .post(url, send, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
};


  return (
    <View style={styles.container}>
      <View style={styles.fixedSquareRatio}>
        <Image style={styles.logo} source={require("../assets/logo.jpg")} />
      </View>
      <Image style={styles.emage} source={require("../assets/email.png")} />

      <Text style={styles.mainText}>
        Please enter the code sent to your email
      </Text>

      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Enter Code"
        onChangeText={(input) => setInput(input)}
      />

      {error != "" && error != undefined ? (
        <Text style={styles.errorTextStyle}>{error}</Text>
      ) : null}

      <TouchableOpacity onPress={Verify} 
        style={styles.Button} >
        <Text style={styles.bottomText} alignText="center">Verify</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText} marginTop="5%">
        Didnt get an email?
      </Text>

      <TouchableOpacity onPress={resendVerification}>
        <Text style={styles.bottomText}>Send Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  emage: {
    width: 128,
    height: 92,
    alignSelf: "center",
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
  mainText: {
    fontFamily: "InriaSans_700Bold",
    fontSize: 30,
    textAlign: "center",
    marginHorizontal: "5%",
  },
  bottomText: {
    fontFamily: "InriaSans_400Regular",
    fontSize: 22,
    textAlign: "center",
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
    alignSelf:"center"
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontFamily: "InriaSans_700Bold",
    fontSize: 22,
  },
});

export default Verification;