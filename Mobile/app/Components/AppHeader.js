import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppHeader({ back, title, dots }) {
  return (
    <View style={styles.screen}>
      {back && (
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={30}
          color={"white"}
        />
      )}
      <Text
        style={{
          color: "white",
          fontWeight: "200",
          fontSize: 20,
        }}
      >
        {title}
      </Text>
      {dots && (
        <MaterialCommunityIcons name="dots-vertical" color="white" size={30} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 10,
    height: 70,
    width: "100%",
    backgroundColor: "skyblue",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
export default AppHeader;
