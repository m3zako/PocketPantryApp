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
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import axios from "axios";
import { Menu, Provider, Portal, Modal } from "react-native-paper";
import { Icon } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ShoppingCheckBoxListEntry(props) {
  const [isChecked, setChecked] = useState(props.checked);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [changeToggle, setChangeToggle] = useState(false);
  const [changeAmount, setChangeAmount] = useState("");
  let testString = "Ingredient";
  let i = 0;
  let fillerString = "";
  let ingName = props.name;
  let fillerAmount = testString.length - props.name.length;
  let unitName = props.unit;
  let amountName = props.amount;

  for (i = 0; i < fillerAmount; i++) {
    fillerString = fillerString + "  ";
  }

  ingName = ingName + fillerString;

  if (props.name.length > testString.length) {
    ingName = ingName.substring(0, "Ingredient".length) + "...";
  }

  if (unitName.length > 10) {
    unitName = unitName.substring(0, 7) + "...";
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

  const deleteItem = () => {
    let changeAmount = props.amount;
    setMessage("");
    let fullAmount = parseFloat(changeAmount);
    const url =
      "https://pocketpantryapp.herokuapp.com/api/list/removeIngredient";
    let data = {
      UserId: props.uID,
      IngredientId: props.ingID,
      Amount: fullAmount,
      Unit: props.unit,
    };

    console.log(fullAmount);
    console.log(props.uID);
    console.log(props.ingID);
    console.log(props.unit);
    console.log(props.token);

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
            setMessage("Item Successfully Deleted!");
          }
        }
      })
      .catch((error) => {
        setMessage("Unable to delete item");
        console.log(error);
      });
  };

  const deleteItemSetAmount = () => {
    setMessage("");

    let amountRemoved = parseFloat(changeAmount);

    const url =
      "https://pocketpantryapp.herokuapp.com/api/list/removeIngredient";
    let data = {
      UserId: props.uID,
      IngredientId: props.ingID,
      Amount: amountRemoved,
      Unit: props.unit,
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
            setMessage("Item Successfully Deleted!");
          }
        }
      })
      .catch((error) => {
        setMessage("Unable to delete item");
        console.log(error);
      });
  };

  const closeChange = () => {
    setChangeToggle(false);
    setChangeAmount("");
  };

  if (!changeToggle) {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            checked={isChecked}
            onPress={toggleCheck}
            size={Dimensions.get("window").width * 0.067}
          />
          <Text style={styles.ingredientText}>{ingName}</Text>
          <Text style={styles.amountText}>
            {amountName} {unitName}
          </Text>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: "30%",
              left: "82.5%",
            }}
            onPress={() => setChangeToggle(true)}
          >
            <Icon
              name={"plus-minus"}
              size={20}
              color={"black"}
              type={"material-community"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: "absolute", top: "30%", left: "90%" }}
            onPress={() =>
              Alert.alert(
                `Remove ${props.name}`,
                `Are you sure you want to remove ${props.name} from your shopping list?`,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: deleteItem,
                  },
                ]
              )
            }
          >
            <Icon name={"delete"} size={20} color={"black"} />
          </TouchableOpacity>
        </View>
        {message == "" || message == undefined ? null : (
          <Text style={styles.errorTextStyle}>{message}</Text>
        )}
      </View>
    );
  } else {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={[styles.regularText, styles.searchChangeInput]}
            fontSize={20}
            placeholder="How many units?"
            onChangeText={(changeAmount) => setChangeAmount(changeAmount)}
            keyboardType="number-pad"
          />
          <TouchableOpacity style={{ marginTop: "6%", marginLeft: "2%" }}>
            <Icon name={"add"} size={30} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: "6%", marginLeft: "2%" }}
            onPress={() =>
              Alert.alert(
                `Remove ${props.name}`,
                `Are you sure you want to remove ${changeAmount} ${props.unit} of ${props.name} from your shopping list?`,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: deleteItemSetAmount,
                  },
                ]
              )
            }
          >
            <Icon name={"remove"} size={30} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: "6%", marginLeft: "2%" }}
            onPress={closeChange}
          >
            <Icon name={"close"} size={30} color={"black"} />
          </TouchableOpacity>
        </View>
        {message == "" || message == undefined ? null : (
          <Text style={styles.errorTextStyle}>{message}</Text>
        )}
      </View>
    );
  }
}
const ListScreen = ({ route, navigation }) => {
  let { userID, token } = route.params;

  const [shopList, setShopList] = useState([]);
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");
  const [search, setSearch] = useState("");
  const [addSearch, setAddSearch] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);
  const showAddModal = () => setAddVisible(true);
  const hideAddModal = () => setAddVisible(false);
  const showSearchModal = () => setSearchVisible(true);
  const hideSearchModal = () => setSearchVisible(false);

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

  const searchIngredients = () => {
    setError("");

    const url =
      "https://pocketpantryapp.herokuapp.com/api/list/searchIngredientByName";

    let data = { UserId: userID, Name: search };

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
            response.data.SearchResults &&
            response.data.SearchResults[0]
          ) {
            console.log(response.data.SearchResults);
            setShopList(response.data.SearchResults);
          } else {
            setError("No Results Found");
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
  };

  const logOut = () => {
    AsyncStorage.removeItem("user_id");
    AsyncStorage.removeItem("token");
    navigation.navigate("LoginScreen", {
      veri: false,
    });
  };

  const clearAllIngredients = () => {
    setError("");

    const url = "https://pocketpantryapp.herokuapp.com/api/list/clearList";

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
          if (response && response.data) {
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fefae0" />
      <View
        style={{
          elevation: 4,
          backgroundColor: "#fefae0",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "InriaSans_700Bold",
            fontSize: 40,
            marginLeft: "5%",
            marginTop: "10%",
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
          elevation: 4,
          backgroundColor: "#fefae0",
          flexDirection: "row",
          flex: 1,
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
        <TouchableOpacity
          style={{ position: "absolute", top: "60%", left: "45%" }}
          onPress={loadShoppingList}
        >
          <Icon name={"refresh"} size={30} color={"black"} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          height:
            Platform.OS === "android"
              ? Dimensions.get("window").height + StatusBar.currentHeight
              : "100%",
          width: "100%",
        }}
      >
        <Provider>
          <View>
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity
                  onPress={openMenu}
                  style={{ top: "65%", left: "30%" }}
                >
                  <Icon name={"menu"} size={50} color={"black"} />
                </TouchableOpacity>
              }
              style={{
                position: "absolute",
                left: "47.5%",
                top: "12.5%",
              }}
            >
              <Menu.Item
                onPress={showAddModal}
                title="Add"
                icon="plus"
                titleStyle={{ fontFamily: "InriaSans_400Regular" }}
              />
              <Menu.Item
                onPress={showSearchModal}
                title="Search"
                icon="magnify"
                titleStyle={{ fontFamily: "InriaSans_400Regular" }}
              />
              <Menu.Item
                onPress={() => {
                  Alert.alert(
                    "Clear All",
                    "Are you sure you want to clear your shopping list?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: clearAllIngredients,
                      },
                    ]
                  );
                }}
                title="Clear All"
                icon="delete"
                titleStyle={{ fontFamily: "InriaSans_400Regular" }}
              />
              <Menu.Item
                onPress={() => {
                  Alert.alert("Log Out", "Are you sure you want to log out?", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: logOut,
                    },
                  ]);
                }}
                title="Log Out"
                icon="logout"
                titleStyle={{ fontFamily: "InriaSans_400Regular" }}
              />
            </Menu>
          </View>
        </Provider>
        <Provider>
          <Portal>
            <Modal
              visible={addVisible}
              onDismiss={hideAddModal}
              contentContainerStyle={{
                backgroundColor: "white",
                width: "85%",
                height: "90%",
                alignSelf: "center",
                borderRadius: 10,
                marginTop: Platform.OS === "android" ? "-20%" : 0,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                }}
              >
                <TextInput
                  style={[styles.regularText, styles.searchAddInput]}
                  fontSize={20}
                  placeholder="Search..."
                  onChangeText={(addSearch) => setAddSearch(addSearch)}
                />
                <Icon
                  name={"search"}
                  size={50}
                  color={"black"}
                  style={{ marginTop: "30%" }}
                />
              </View>
              <View style={{ flex: 5 }}></View>
            </Modal>
          </Portal>
        </Provider>
        <Provider>
          <Portal>
            <Modal
              visible={searchVisible}
              onDismiss={hideSearchModal}
              contentContainerStyle={{
                backgroundColor: "#D4D4D4",
                alignSelf: "center",
                borderRadius: 10,
                marginTop: Platform.OS === "android" ? "-20%" : 0,
                height: 60,
                width: Dimensions.get("window").width * 0.9,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={[styles.regularText, styles.searchInput]}
                  fontSize={20}
                  placeholder="Search..."
                  onChangeText={(search) => setSearch(search)}
                />
                <TouchableOpacity onPress={searchIngredients}>
                  <Icon
                    name={"search"}
                    size={50}
                    color={"black"}
                    style={{ marginLeft: "5%", marginTop: "5%" }}
                  />
                </TouchableOpacity>
              </View>
            </Modal>
          </Portal>
        </Provider>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  activeScreenText: {
    fontSize: 30,
    fontFamily: "InriaSans_700Bold",
    alignSelf: "center",
  },
  otherScreenText: { fontSize: 30, fontFamily: "InriaSans_400Regular" },
  ingredientText: {
    fontSize: 20,
    marginTop: "4.25%",
    fontFamily: "InriaSans_400Regular",
  },
  amountText: {
    fontSize: 20,
    marginTop: "4.25%",
    marginLeft: "4%",
    fontFamily: "InriaSans_400Regular",
  },
  errorTextStyle: {
    color: "black",
    textAlign: "center",
    fontFamily: "InriaSans_700Bold",
    fontSize: 22,
  },
  searchAddInput: {
    height: 60,
    width: "70%",
    alignSelf: "center",
    margin: 12,
    borderWidth: 0,
    padding: 8,
    backgroundColor: "#D4D4D4",
    borderRadius: 9,
  },
  searchInput: {
    height: 60,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 0,
    padding: 8,
    backgroundColor: "#D4D4D4",
    borderRadius: 9,
  },
  searchChangeInput: {
    height: Dimensions.get("window").width * 0.125,
    width: "60%",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 0,
    padding: 8,
    backgroundColor: "#D4D4D4",
    borderRadius: 9,
    marginTop: "4.5%",
    marginLeft: "4%",
  },
  regularText: {
    fontFamily: "InriaSans_400Regular",
  },
});

export default ListScreen;
