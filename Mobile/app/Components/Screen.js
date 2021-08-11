import React from "react";
import { StyleSheet, Platform, View, Dimensions } from "react-native";
import Constants from "expo-constants";
import { AppColors } from "../assets/colors";

//const height = Dimensions.get("window").height - Constants.statusBarHeight;
function Screen({ children }) {
  return <View style={styles.screen}>{children}</View>;
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.back,
  },
});
export default Screen;
