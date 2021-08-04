import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
  Alert,
} from "react-native";

function OptionsModal({ visible, onPressRename, onPressDelete }) {
  //   const [_visible, setVisible] = useState(false);
  //   setVisible(visible);
  let _visible = visible;
  console.log(visible);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={_visible}
      //hard back key press controll
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          visible = false;
        }}
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            margin: 0,
            justifyContent: "flex-end",
            backgroundColor: "#00000060",
          }}
        >
          <View
            style={{
              height: 120,
              margin: 5,
              padding: 10,
              justifyContent: "space-evenly",
              alignItems: "stretch",
              backgroundColor: "white",
              alignSelf: "stretch",
            }}
          >
            <Button title={"Rename"} onPress={onPressRename} />
            <Button
              title={"Delete"}
              onPress={() =>
                // onPressDelete
                Alert.alert("List is deleted")
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default OptionsModal;
