import React from "react";
import { StyleSheet, Platform, View, Dimensions } from "react-native";
import Constants from "expo-constants";

//const height = Dimensions.get("window").height - Constants.statusBarHeight;
function Screen({ children }) {
  return <View style={styles.screen}>{children}</View>;
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
export default Screen;
