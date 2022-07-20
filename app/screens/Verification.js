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


const Verification = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.fixedSquareRatio}>
        <Image style={styles.logo} source={require("../assets/logo.jpg")} />
      </View>
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
  emage: {
    width: 128,
    height: 92,
    alignSelf: "center",
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
});

export default Verification;