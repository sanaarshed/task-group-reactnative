import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  CheckBox,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Group({ title = "", onPress, onPressDots }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.group}>
        <Text style={styles.text}> {title} </Text>
      </TouchableOpacity>

      <MaterialCommunityIcons
        name={"dots-vertical"}
        size={30}
        onPress={onPressDots}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#e2e2e2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
  },
  checkBox: {},
  text: {
    fontSize: 20,
  },
  group: {
    flex: 1,
  },
});
export default Group;
