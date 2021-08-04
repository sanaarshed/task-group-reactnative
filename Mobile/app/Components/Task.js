import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  CheckBox,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Task({ title = "Title", onPressDelete, onPressEdit }) {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.container}>
      <CheckBox style={styles.checkBox} onValueChange={setSelection} />
      <Text style={styles.text}> {title} </Text>
      <MaterialCommunityIcons
        onPress={onPressEdit}
        style={{ marginLeft: 100 }}
        name={"pencil"}
        size={30}
      />
      <MaterialCommunityIcons
        onPress={onPressDelete}
        name={"trash-can"}
        size={30}
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

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    marginBottom: 10,
  },
  checkBox: {},
  text: {
    fontSize: 20,
  },
});
export default Task;
