import { React, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  View,
  TouchableHighlight,
  Dimensions,
<<<<<<< HEAD
} from 'react-native';
import { CheckBox } from '@rneui/themed';
=======
} from "react-native";
import { CheckBox } from "@rneui/themed";
import { useFonts } from "expo-font";
>>>>>>> 4cc6761f9008ed4985177d4bd1dee4f1073cc0ca

function ShoppingCheckBoxListEntry(props) {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={{ flexDirection: 'row' }}>
      <CheckBox
        checked={isChecked}
        onPress={() => setChecked(!isChecked)}
        size={Dimensions.get('window').width * 0.1}
      />
      <Text style={styles.ingredientText}>Ingredient</Text>
      <Text style={styles.amountText}>0</Text>
    </View>
  );
}
const ListScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    InriaSans_400Regular: require("./../../node_modules/@expo-google-fonts/inria-sans/InriaSans_400Regular.ttf"),
    InriaSans_700Bold: require("./../../node_modules/@expo-google-fonts/inria-sans/InriaSans_700Bold.ttf"),
  });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          elevation: 4,
          backgroundColor: '#fefae0',
          marginBottom: 4,
        }}
      >
        <Text
          style={{
<<<<<<< HEAD
            fontWeight: '700',
=======
            fontFamily: "InriaSans_700Bold",
>>>>>>> 4cc6761f9008ed4985177d4bd1dee4f1073cc0ca
            fontSize: 48,
            marginLeft: '5%',
            marginTop: '7.5%',
          }}
        >
          Shopping List
        </Text>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          flex: 4,
          marginLeft: '5%',
          marginTop: '5%',
        }}
      >
        <ShoppingCheckBoxListEntry />
      </View>

      <View
        style={{
          flex: 1,
          elevation: 4,
          backgroundColor: '#fefae0',
          marginTop: 4,
          flexDirection: 'row',
        }}
      >
        <TouchableHighlight
          style={{
            flexDirection: 'row',
            backgroundColor: '#C4EFC8',
            height: '45%',
            width: '50%',
            elevation: 4,
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate('RecipeScreen')}
        >
          <View style={{ alignSelf: 'center' }}>
            <Text style={styles.otherScreenText}>Recipes</Text>
          </View>
        </TouchableHighlight>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#92D098',
            height: '45%',
            width: '50%',
            elevation: 4,
            justifyContent: 'center',
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
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  activeScreenText: {
    fontSize: 30,
<<<<<<< HEAD
    fontWeight: '700',
    alignSelf: 'center',
  },
  otherScreenText: { fontSize: 30 },
  ingredientText: { fontSize: 25, marginTop: '4.25%' },
  amountText: { fontSize: 25, marginTop: '4.25%', marginLeft: '25%' },
=======
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
>>>>>>> 4cc6761f9008ed4985177d4bd1dee4f1073cc0ca
});

export default ListScreen;