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
  Button,
  Dimensions,
  TextInput,
  ListItem,
  Alert,
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

  if (props.name.length > 10) {
    name = props.name.substring(0, 10) + "...";
  } else {
    name = props.name;
  }
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
            source={{ uri: props.image }}
            style={{
              resizeMode: "contain",
              marginLeft: "-18%",
              marginTop: "3.5%",
              marginRight: "-15%",
              width: "80%",
              height: "80%",
            }}
          />
          <Text style={styles.recipeButtonText}>{name}</Text>
        </View>
      </TouchableHighlight>
    );
  } else {
    return (
      <View
        style={[
          styles.recipeButtonOpen,
          {
            justifyContent: "space-between",
            flex: 1,
            flexDirection: "row",
          },
        ]}
      >
        <Image
          source={{ uri: props.image }}
          style={{
            resizeMode: "contain",
            marginTop: "4%",
            marginRight: "-20%",
            marginLeft: "-17.5%",
            width: "75%",
            height: "75%",
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.recipeName}>{props.name}</Text>
          <Text style={styles.recipeDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque bibendum maximus tortor a ornare. Phasellus mattis orci
            eu auctor molestie.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setPressed(!isPressed);
          }}
          style={{
            alignSelf: "flex-start",
            marginRight: "2.5%",
            marginTop: "2.5%",
          }}
        >
          <Icon name={"close"} size={30} color={"black"} />
        </TouchableOpacity>
      </View>
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

  const [error, setError] = useState("");

  const addRecipe = () => {
    setError("");
    const url = "https://pocketpantryapp.herokuapp.com/api/recipe/addRecipe";
    let data = {
      UserId: props.userID,
      RecipeId: props.id,
      Name: props.name,
      Image: props.imageURL,
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
          }
        }
      })
      .catch((error) => {
        setError("Unable to add recipe");
        console.log(userID);
        console.log(token);

        console.log(userID._W);
        console.log(token._W);

        console.log(error);
      });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: "10%",
      }}
    >
      <TouchableHighlight style={styles.fixedSquareRatio} onPress={addRecipe}>
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
      </TouchableHighlight>
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

  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);
  const showAddModal = () => setAddVisible(true);
  const hideAddModal = () => setAddVisible(false);
  const showSearchModal = () => setSearchVisible(true);
  const hideSearchModal = () => setSearchVisible(false);

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
    if (offset >= 5) {
      setOffset(offset + 10);
    } else {
      setOffset(offset + 5);
    }
    setAddLoading(true);

    setAddError("");

    const url =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      SPOONACULAR_KEY +
      "&query=" +
      addSearch +
      "&number=10&offset=" +
      offset;

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
        setAddError(addError);
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
      "&number=5";

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

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          elevation: 4,
          backgroundColor: "#fefae0",
          marginBottom: 4,
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
        {error == "" || error == undefined ? (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <RecipeButton name={item.Name} image={item.Image} />;
            }}
            contentContainerStyle={{ flexGrow: 1 }}
            extraData={[...recipes]}
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
          onPress={() =>
            navigation.navigate("ListScreen", {
              userID: userID,
              token: token,
            })
          }
        >
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.otherScreenText}>List</Text>
          </View>
        </TouchableHighlight>
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
                  style={{ top: "110%", left: "30%" }}
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
                  Alert.alert("Action", "Clear All");
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
                marginTop: Platform.OS === "android" ? "-10%" : 0,
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  recipeButtonClosed: {
    alignSelf: "center",
    borderRadius: 10,
    width: "95%",
    height: "80%",
    backgroundColor: "#FFC08E",
    marginTop: "5%",
    elevation: 4,
    marginBottom: "-60%",
  },
  recipeButtonOpen: {
    alignSelf: "center",
    borderRadius: 10,
    width: "95%",
    height: "80%",
    backgroundColor: "#D0ECC7",
    marginTop: "5%",
    elevation: 4,
    marginBottom: "5%",
  },
  recipeButtonText: {
    fontSize: 30,
    marginRight: "18%",
    marginTop: "12.5%",
    fontFamily: "InriaSans_400Regular",
  },
  recipeName: {
    fontSize: 24,
    fontFamily: "InriaSans_700Bold",
    textDecorationLine: "underline",
    marginLeft: "4%",
    textAlign: "center",
  },
  recipeDescription: {
    fontSize: 15,
    fontFamily: "InriaSans_700Bold",
    marginLeft: "4%",
    marginRight: "4%",
    width: "100%",
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
