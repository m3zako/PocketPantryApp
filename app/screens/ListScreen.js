import { React, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  View,
  TouchableHighlight,
  Dimensions,
  FlatList,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import axios from "axios";

function ShoppingCheckBoxListEntry(props) {
  const [isChecked, setChecked] = useState(props.checked);
  const [error, setError] = useState("");
  let fillerAmount = "Ingredient".length - props.name.length;
  let i = 0;
  let fillerString = "";

  for (i = 0; i < fillerAmount; i++) {
    fillerString = fillerString + " ";
  }

  const toggleCheck = () => {
    setError("");

    const url =
      "https://pocketpantryapp.herokuapp.com/api/list/checkItemFromList";

    let data = {
      UserId: props.uID,
      IngredientId: props.ingID,
      Checked: !isChecked,
    };

    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          if (response && response.data) {
            console.log(response.data);
            setChecked(!isChecked);
            console.log(isChecked);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <CheckBox
        checked={isChecked}
        onPress={toggleCheck}
        size={Dimensions.get("window").width * 0.1}
      />
      <Text style={styles.ingredientText}>
        {props.name}
        {fillerString}
      </Text>
      <Text style={styles.amountText}>
        {props.amount} {props.unit}
      </Text>
    </View>
  );
}
const ListScreen = ({ route, navigation }) => {
  let { userID, token } = route.params;

  const [shopList, setShopList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadShoppingList();
  }, []);

  function loadShoppingList() {
    setError("");

    const url = "https://pocketpantryapp.herokuapp.com/api/list/getList";

    let data = { UserId: userID };

    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          if (
            response &&
            response.data &&
            response.data.Shopping_list &&
            response.data.Shopping_list[0]
          ) {
            console.log(response.data.Shopping_list);
            setShopList(response.data.Shopping_list);
            console.log(shopList[0]);
          } else {
            console.log(response.data);
            setError("Shopping List Is Empty");
            console.log(error);
          }
        }
      })
      .catch((error) => {
        setError("Unable to find user by ID " + userID);
        console.log(userID);
        console.log(token);

        console.log(userID._W);
        console.log(token._W);

        console.log(error);
      });
  }

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
            fontFamily: "InriaSans_700Bold",
            fontSize: 48,
            marginLeft: "5%",
            marginTop: "7.5%",
          }}
        >
          Shopping List
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          flex: 4,
        }}
      >
        {error == "" || error == undefined ? (
          <FlatList
            data={shopList}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <ShoppingCheckBoxListEntry
                  name={item.Name}
                  amount={item.Amount}
                  unit={item.Unit}
                  checked={item.Checked}
                  ingID={item.IngredientId}
                  uID={userID}
                  token={token}
                />
              );
            }}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        ) : (
          <Text style={styles.errorTextStyle}>{error}</Text>
        )}
      </View>

      <View
        style={{
          flex: 1,
          elevation: 4,
          backgroundColor: "#fefae0",
          flexDirection: "row",
        }}
      >
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
          onPress={() =>
            navigation.navigate("RecipeScreen", {
              userID: userID,
              token: token,
            })
          }
        >
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.otherScreenText}>Recipes</Text>
          </View>
        </TouchableHighlight>
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
          <Text style={styles.activeScreenText}>List</Text>
        </View>
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
  activeScreenText: {
    fontSize: 30,
    fontFamily: "InriaSans_700Bold",
    alignSelf: "center",
  },
  otherScreenText: { fontSize: 30, fontFamily: "InriaSans_400Regular" },
  ingredientText: {
    fontSize: 25,
    marginTop: "4.25%",
    fontFamily: "InriaSans_400Regular",
  },
  amountText: {
    fontSize: 25,
    marginTop: "4.25%",
    marginLeft: "25%",
    fontFamily: "InriaSans_400Regular",
  },
  errorTextStyle: {
    color: "black",
    textAlign: "center",
    fontFamily: "InriaSans_700Bold",
    fontSize: 22,
  },
});

export default ListScreen;
