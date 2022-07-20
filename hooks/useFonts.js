import * as Font from "expo-font";

let customFonts = {
  InriaSans_400Regular: require("./../node_modules/@expo-google-fonts/inria-sans/InriaSans_400Regular.ttf"),
  InriaSans_700Bold: require("./../node_modules/@expo-google-fonts/inria-sans/InriaSans_700Bold.ttf"),
};

export default useFonts = async () => {
   await Font.loadAsync(customFonts);
};