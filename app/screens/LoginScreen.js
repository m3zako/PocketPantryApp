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
  }

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
        value={email}
      />

      <TextInput
        style={[styles.regularText, styles.input]}
        fontSize={20}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        value={password}
      />

      <TouchableOpacity onPress={() => console.log("Forgot Password Pressed")}>
        <Text style={[styles.regularText, styles.leftAlign]} fontSize={16}>
          Forgot password?
        </Text>
      </TouchableOpacity>

      <View style={styles.centerAlign}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("RecipeScreen")}
        >
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
    margin: 16,
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
    marginTop: "15%",
    marginBottom: "15%",
    borderRadius: 9,
  },
});

export default LoginScreen;
