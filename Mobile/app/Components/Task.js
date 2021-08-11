import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  CheckBox,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppColors } from "../assets/colors";

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
        color={AppColors.fore}
      />
      <MaterialCommunityIcons
        onPress={onPressDelete}
        name={"trash-can"}
        size={30}
        color={AppColors.fore}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: AppColors.tint,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    marginBottom: 10,
  },
  checkBox: {},
  text: {
    fontSize: 20,
    color: AppColors.fore,
  },
});
export default Task;
