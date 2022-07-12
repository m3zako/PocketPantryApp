import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Icon } from "react-native-elements";

function RecipeButton(props) {
  const [isPressed, setPressed] = useState(false);
  if (!isPressed) {
    return (
      <TouchableHighlight
        onPress={() => {
          setPressed(!isPressed);
        }}
        style={styles.recipeButtonClosed}
      >
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../assets/image-6.png")}
            style={{
              resizeMode: "contain",
              marginLeft: "-17.5%",
              marginTop: "2.5%",
              marginRight: "-15%",
              width: "75%",
              height: "85%",
            }}
          />
          <Text style={styles.recipeButtonText}>Recipe</Text>
        </View>
      </TouchableHighlight>
    );
  } else {
    return (
      <View style={styles.recipeButtonOpen}>
        <TouchableOpacity
          onPress={() => {
            setPressed(!isPressed);
          }}
          style={{
            alignSelf: "flex-end",
            marginRight: "2.5%",
            marginTop: "2.5%",
          }}
        >
          <Icon name={"close"} size={30} color={"black"} />
        </TouchableOpacity>
        <Image
          source={require("../assets/image-9.png")}
          style={{
            resizeMode: "contain",
            alignSelf: "center",
            height: "30%",
            marginTop: "-1.5%",
            marginBottom: "-1.5%",
          }}
        />
        <Text style={styles.recipeName}>Recipe Name</Text>
        <Text style={styles.recipeDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum maximus tortor a ornare. Phasellus mattis orci eu auctor
          molestie. In hac habitasse platea dictumst. Aliquam enim ante, egestas
          dapibus sem at, tristique ullamcorper erat. Suspendisse sollicitudin
          eros sit amet nisl consequat, eu vulputate est viverra. Aenean
          pharetra vulputate libero, sit amet vehicula tortor tempus vel. Sed
          tempor, velit dapibus nam.
        </Text>
      </View>
    );
  }
}

const RecipeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          elevation: 4,
          backgroundColor: "#fefae0",
          marginBottom: 4,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 48,
            marginLeft: "5%",
            marginTop: "7.5%",
          }}
        >
          Recipes
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          flex: 4,
        }}
      >
        <RecipeButton />
      </View>

      <View
        style={{
          flex: 1,
          elevation: 4,
          backgroundColor: "#fefae0",
          marginTop: 4,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#92D098",
            height: "45%",
            width: "50%",
            elevation: 4,
            justifyContent: "center",
            borderRadius: 5,
          }}
        >
          <Text style={styles.activeScreenText}>Recipes</Text>
        </View>
        <TouchableHighlight
          style={{
            flexDirection: "row",
            backgroundColor: "#C4EFC8",
            height: "45%",
            width: "50%",
            elevation: 4,
            justifyContent: "center",
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate("ListScreen")}
        >
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.otherScreenText}>List</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  recipeButtonClosed: {
    alignSelf: "center",
    borderRadius: 10,
    width: "95%",
    height: "25%",
    backgroundColor: "#FFC08E",
    marginTop: "5%",
    elevation: 4,
  },
  recipeButtonOpen: {
    alignSelf: "center",
    borderRadius: 10,
    width: "95%",
    height: "85%",
    backgroundColor: "#D0ECC7",
    marginTop: "5%",
    elevation: 4,
  },
  recipeButtonText: { fontSize: 30, marginRight: "30%", marginTop: "10.5%" },
  recipeName: {
    fontSize: 24,
    fontWeight: "700",
    textDecorationLine: "underline",
    marginLeft: "4%",
  },
  recipeDescription: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: "4%",
    marginRight: "4%",
  },
  activeScreenText: {
    fontSize: 30,
    fontWeight: "700",
    alignSelf: "center",
  },
  otherScreenText: { fontSize: 30 },
});

export default RecipeScreen;
