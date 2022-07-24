import React, { useState, useEffect } from "react";
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
  FlatList,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Icon } from "@rneui/themed";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Menu,
  Provider,
  Portal,
  Modal,
  ActivityIndicator,
} from "react-native-paper";
import { SPOONACULAR_KEY } from "@env";

function RecipeButton(props) {
  let name = "";
  let longName = "";

  if (props.name.length > 10) {
    name = props.name.substring(0, 10) + "...";
  } else {
    name = props.name;
  }

  if (props.name.length > 30) {
    longName = props.name.substring(0, 25) + "...";
  } else {
    longName = props.name;
  }
  const [isPressed, setPressed] = useState(false);
  const [message, setMessage] = useState("");

  const deleteRecipe = () => {
    setMessage("");
    const url =
      "https://pocketpantryapp.herokuapp.com/api/recipe/removeRecipeById";
    let data = {
      UserId: props.userID,
      RecipeId: props.RecipeId,
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
            setMessage("Recipe Successfully Deleted!");
          }
        }
      })
      .catch((error) => {
        setMessage("Unable to delete recipe");
        console.log(error);
      });
  };

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
          <View
            style={[
              styles.fixedSquareRatio,
              { marginLeft: "5%", marginTop: "2.5%" },
            ]}
          >
            <Image
              source={{ uri: props.image }}
              style={{
                resizeMode: "contain",
                width: "125%",
                height: "125%",
              }}
            />
          </View>
          <Text style={styles.recipeButtonText}>{name}</Text>
        </View>
      </TouchableHighlight>
    );
  } else {
    return (
      <ScrollView
        style={styles.recipeButtonOpen}
        contentContainerStyle={{
          flexGrow: 1,
          //paddingBottom: props.desc.length / 50,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                `Delete ${props.name}`,
                `Are you sure you want to clear the ${props.name} recipe?`,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: deleteRecipe,
                  },
                ]
              )
            }
            style={{
              alignSelf: "flex-end",
              marginLeft: "80%",
              marginTop: "2.5%",
            }}
          >
            <Icon name={"delete"} size={30} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPressed(!isPressed);
            }}
            style={{
              alignSelf: "flex-end",
              marginLeft: "0%",
              marginTop: "2.5%",
            }}
          >
            <Icon name={"close"} size={30} color={"black"} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: Dimensions.get("window").height / 10,
            width: "90%",
            marginLeft: "5%",
          }}
        >
          <Image
            source={{ uri: props.image }}
            style={{
              resizeMode: "cover",
              alignSelf: "center",
              height: "100%",
              width: "100%",
              borderRadius: 10,
            }}
          />
        </View>
        <Text style={styles.recipeName}>{longName}</Text>
        <Text style={styles.recipeDescription}>
          {message == "" || message == undefined ? props.desc : message}
        </Text>
      </ScrollView>
    );
  }
}

function RecipeSearchResult(props) {
  let name = "";
  if (props.name.length > 15) {
    name = props.name.substring(0, 15) + "...";
  } else {
    name = props.name;
  }

  const [message, setMessage] = useState("");

  const addRecipe = () => {
    setMessage("");
    const url = "https://pocketpantryapp.herokuapp.com/api/recipe/addRecipe";
    let data = {
      UserId: props.userID,
      RecipeId: props.id,
      Name: props.name,
      Image: props.imageURL,
      RecipeDesc: props.desc,
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
            setMessage("Recipe Successfully Added!");
          }
        }
      })
      .catch((error) => {
        setMessage("Unable to add recipe");
        console.log(error);
      });
  };

  return (
    <View style={{ marginBottom: "10%" }}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity style={styles.fixedSquareRatio} onPress={addRecipe}>
          <View>
            <Image
              source={{ uri: props.imageURL }}
              style={{
                width: "100%",
                height: "100%",
                marginLeft: "20%",
                borderRadius: 100,
              }}
            />
            <View style={{ position: "absolute", top: 20, left: 37.5 }}>
              <Icon
                name={"add"}
                size={50}
                color={"black"}
                backgroundColor={"rgba(255, 255, 255, 0.75)"}
                style={{ borderRadius: 100 }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "InriaSans_700Bold",
            fontSize: 25,
            marginLeft: "10%",
            alignSelf: "center",
          }}
        >
          {name}
        </Text>
      </View>
      {message == "" || message == undefined ? null : (
        <Text style={styles.errorTextStyle}>{message}</Text>
      )}
    </View>
  );
}

const RecipeScreen = ({ route, navigation }) => {
  let { userID, token } = route.params;

  const [recipes, setRecipes] = useState([]);
  const [addRecipes, setAddRecipes] = useState([]);
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");
  const [search, setSearch] = useState("");
  const [addSearch, setAddSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [resultAmount, setResultAmount] = useState(0);

  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);
  const showAddModal = () => {
    setAddVisible(true);
    setMenuVisible(false);
  };
  const hideAddModal = () => {
    setAddVisible(false);
    setAddSearch("");
    setAddRecipes([]);
  };
  const showSearchModal = () => {
    setSearchVisible(true);
    setMenuVisible(false);
  };
  const hideSearchModal = () => {
    setSearchVisible(false);
    setSearch("");
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  function loadRecipes() {
    setError("");

    const url = "https://pocketpantryapp.herokuapp.com/api/recipe/getRecipes";

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
            response.data.Saved_recipes &&
            response.data.Saved_recipes[0]
          ) {
            console.log(response.data.Saved_recipes);
            setRecipes(response.data.Saved_recipes);
            console.log(recipes[0]);
          } else {
            setError("No Recipes Found");
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

  const updateAddRecipes = () => {
    if (offset >= 5 && offset < resultAmount) {
      setOffset(offset + 10);
    } else if (offset < resultAmount) {
      setOffset(offset + 5);
    } else {
      return;
    }
    setAddLoading(true);

    setAddError("");

    const url =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      SPOONACULAR_KEY +
      "&query=" +
      addSearch +
      "&number=10&offset=" +
      offset +
      "&addRecipeInformation=true";

    axios
      .get(url)
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          if (
            response &&
            response.data &&
            response.data.results &&
            response.data.results[0]
          ) {
            console.log(response.data.results);
            setAddRecipes([...addRecipes, ...response.data.results]);
            setAddLoading(false);
          }
          setAddLoading(false);
        }
      })
      .catch((addError) => {
        setAddError("");
        console.log(addError);
        setAddLoading(false);
      });
  };

  function onlySpaces(str) {
    return str.trim().length === 0;
  }

  const searchAddRecipes = () => {
    setAddError("");
    setOffset(0);
    setAddRecipes([]);

    if (onlySpaces(addSearch)) {
      setAddError("Please Enter A Valid Search Query");
      console.log(addError);
      return;
    }

    let query = addSearch.trim();

    const url =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      SPOONACULAR_KEY +
      "&query=" +
      query +
      "&number=5&addRecipeInformation=true";

    console.log(url);

    axios
      .get(url)
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          if (
            response &&
            response.data &&
            response.data.results &&
            response.data.results[0]
          ) {
            console.log(response.data.results);
            setAddRecipes(response.data.results);
            setResultAmount(response.data.totalResults);
            console.log(addRecipes);
          } else {
            setAddError("No Results");
            console.log(addError);
          }
        }
      })
      .catch((addError) => {
        setAddError(addError);
        console.log(addError);
      });
  };

  const searchRecipes = () => {
    setError("");

    const url =
      "https://pocketpantryapp.herokuapp.com/api/recipe/searchRecipeByName";

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
            setRecipes(response.data.SearchResults);
            hideSearchModal();
          } else {
            setError("No Recipes Found");
            console.log(error);
            hideSearchModal();
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
        hideSearchModal();
      });
  };

  const logOut = () => {
    AsyncStorage.removeItem("user_id");
    AsyncStorage.removeItem("token");
    navigation.navigate("LoginScreen", {
      veri: false,
    });
  };

  const renderLoader = () => {
    return addLoading ? (
      <View style={{ marginVertical: 16, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const clearAllRecipes = () => {
    setError("");

    const url = "https://pocketpantryapp.herokuapp.com/api/recipe/clearRecipes";

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
            setError("No Recipes Found");
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
          flexDirection: "row",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "InriaSans_700Bold",
            fontSize: 48,
            marginLeft: "5%",
            marginTop: "8.5%",
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
        <View style={{ flexGrow: 1 }}>
          {error == "" || error == undefined ? (
            <FlatList
              data={recipes}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return (
                  <RecipeButton
                    name={item.Name}
                    image={item.Image}
                    desc={item.RecipeDesc}
                    RecipeId={item.RecipeId}
                    userID={userID}
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
      </View>

      <View
        style={{
          elevation: 4,
          backgroundColor: "#fefae0",
          flexDirection: "row",
          flex: 1,
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
        <View>
          <TouchableHighlight
            style={{
              flexDirection: "row",
              backgroundColor: "#C4EFC8",
              height: "45%",
              width: "100%",
              elevation: 4,
              justifyContent: "center",
              borderRadius: 5,
            }}
            onPress={() =>
              navigation.navigate("ListScreen", {
                userID: userID,
                token: token,
              })
            }
          >
            <View style={{ alignSelf: "center", marginLeft: "-5%" }}>
              <Text style={styles.otherScreenText}>List</Text>
            </View>
          </TouchableHighlight>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", top: "60%", left: "45%" }}
          onPress={loadRecipes}
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
                    "Are you sure you want to clear all of the recipes?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: clearAllRecipes,
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
                backgroundColor: "#FFC08E",
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
                <TouchableOpacity onPress={searchAddRecipes}>
                  <Icon
                    name={"search"}
                    size={50}
                    color={"black"}
                    style={{ marginTop: "50%" }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 5 }}>
                {addError == "" || addError == undefined ? (
                  <FlatList
                    data={addRecipes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <RecipeSearchResult
                        name={item.title}
                        imageURL={item.image}
                        id={item.id}
                        userID={userID}
                        token={token}
                        desc={item.summary}
                      />
                    )}
                    ListFooterComponent={renderLoader}
                    onEndReached={updateAddRecipes}
                    onEndReachedThreshold={0.8}
                  />
                ) : (
                  <Text style={styles.errorTextStyle}>{addError}</Text>
                )}
              </View>
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
                <TouchableOpacity onPress={searchRecipes}>
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
  recipeButtonClosed: {
    alignSelf: "center",
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "#FFC08E",
    marginTop: "5%",
    elevation: 4,
    marginBottom: "5%",
  },
  recipeButtonOpen: {
    alignSelf: "center",
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.5,
    backgroundColor: "#D0ECC7",
    marginTop: "5%",
    elevation: 4,
    marginBottom: "5%",
  },
  recipeButtonText: {
    fontSize: 30,
    marginLeft: "10%",
    marginRight: "18%",
    marginTop: "15%",
    fontFamily: "InriaSans_400Regular",
  },
  recipeName: {
    fontSize: 24,
    fontFamily: "InriaSans_700Bold",
    textDecorationLine: "underline",
    marginLeft: "0%",
    textAlign: "center",
  },
  recipeDescription: {
    fontSize: 15,
    fontFamily: "InriaSans_700Bold",
    marginLeft: "5%",
    marginTop: "2.5%",
    width: "90%",
    textAlign: "center",
  },
  activeScreenText: {
    fontSize: 30,
    fontFamily: "InriaSans_700Bold",
    alignSelf: "center",
  },
  otherScreenText: { fontSize: 30, fontFamily: "InriaSans_400Regular" },
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
  regularText: {
    fontFamily: "InriaSans_400Regular",
  },
  fixedSquareRatio: {
    aspectRatio: 1,
    width: "30%",
  },
});

export default RecipeScreen;
