import React, { useState } from "react";

import {
  Alert,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Dialog from "react-native-dialog";

// import NavigationContainer from "react-navigation/native";
// import { createNavigationStack } from "react-navigation/stack";

import Screen from "../Components/Screen";
import AddButton from "../Components/AddButton";
import AppHeader from "../Components/AppHeader";
import Group from "../Components/Group";

const data = [
  {
    id: "1",
    title: "List 1",
    task: [
      {
        id: 5,
        title: "task 1",
      },
      {
        id: 6,
        title: "task 2",
      },
      {
        id: 7,
        title: "task 3",
      },
    ],
  },
  {
    id: "2",
    title: "List 2",
    task: [
      {
        id: 1,
        title: "task 1",
      },
      {
        id: 2,
        title: "task 2",
      },
      {
        id: 3,
        title: "task 3",
      },
    ],
  },
];

export default function MainScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [groups, setGroup] = useState(data);

  const [title, setTitle] = useState("title 1");
  const [item, setItem] = useState("");

  function showDialog(v = true) {
    setDialogVisible(v);
  }
  function showModal(v = true) {
    setModalVisible(v);
  }
  function handleDelete() {
    setGroup(groups.filter((m) => m.id != item.id));
    setItem("");
    Alert.alert("List: '" + item.title + "' is deleted");
    setModalVisible(false);
  }
  function handleRename() {
    //console.log("rename");
    console.log("item to rename : " + item.id);
    const group = groups.find((m) => m.id === item.id);
    group.title = title;
    //groups.push(group);
    showDialog(false);
    setModalVisible(false);
  }

  const add = () => {
    //console.log("item pushed");
    const newGroup = {
      id: "9",
      title: title,
      task: [{}],
    };
    groups.push(newGroup);
    setGroup(groups);
    //console.log("item pushed");
    setDialogVisible(false);
  };

  function renderDialog() {
    return (
      <View>
        <Dialog.Container visible={dialogVisible}>
          {item ? (
            <>
              <Dialog.Title>Rename the List</Dialog.Title>
              <Dialog.Input
                onChangeText={(value) => setTitle(value)}
                placeholder={item.title}
              />
            </>
          ) : (
            <>
              <Dialog.Title>Add the List</Dialog.Title>
              <Dialog.Input
                onChangeText={(value) => setTitle(value)}
                placeholder="Title"
              />
            </>
          )}
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              setDialogVisible(false);
            }}
          />
          <Dialog.Button
            label="Ok"
            onPress={() => {
              item.id ? handleRename() : add();
            }}
          />
        </Dialog.Container>
      </View>
    );
  }
  function renderModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        //hard back key press controll
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modelButtons}>
              <Button title={"Rename"} onPress={showDialog} />
              <Button title={"Delete"} onPress={() => handleDelete()} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
  return (
    <Screen>
      <AppHeader title="TODO APP" />
      <View
        style={{
          padding: 10,
        }}
      >
        <FlatList
          // keyExtractor={({ id }) => id.toString()}
          data={groups}
          renderItem={({ item }) => (
            <Group
              onPress={() => {
                Alert.alert(item.title);
                // setItem(item);
                // console.log(item);
              }}
              onPressDots={() => {
                setModalVisible(true), setItem(item);
              }}
              title={item.title}
            />
          )}
          refreshing={refresh}
          onRefresh={() => groups}
        />

        {/* {groups.map((item) => (
          <Group title={item.title} onPressDots={setModalVisible(true)} />
        ))} */}
        <AddButton
          onPress={showDialog}
          //otherStyle={{ position: "absolute" }}
        />
        {renderDialog()}
        {renderModal()}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    height: "100%",
    margin: 0,
    justifyContent: "flex-end",
    backgroundColor: "#00000060",
  },
  modelButtons: {
    height: 120,
    margin: 5,
    padding: 10,
    justifyContent: "space-evenly",
    alignItems: "stretch",
    backgroundColor: "white",
    alignSelf: "stretch",
  },
});
