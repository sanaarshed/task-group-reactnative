import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AddButton({ otherStyle, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, otherStyle]} onPress={onPress}>
      <MaterialCommunityIcons name={"plus"} size={30} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    margin: 20,
  },
});

export default AddButton;
