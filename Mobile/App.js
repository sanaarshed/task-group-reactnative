import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MainScreen from "./app/Screens/MainScreen";

import ToDoScreen from "./app/Screens/ToDoScreen";

export default function App() {
  return <ToDoScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
