import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Dialog from "react-native-dialog";

import Task from "../Components/Task";
import Screen from "../Components/Screen";
import AddButton from "../Components/AddButton";
import AppHeader from "../Components/AppHeader";
import Group from "../Components/Group";
import DialogInput from "react-native-dialog/lib/Input";

let data = [
  {
    id: "1",
    title: "cleaning",
    checked: true,
  },
  {
    id: "2",
    title: "working",
    checked: false,
  },
  {
    id: "3",
    title: "study",
    checked: false,
  },
  {
    id: "4",
    title: "wardrobe",
    checked: false,
  },
];

export default function ToDoScreen(props) {
  const [tasks, setTasks] = useState(data);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [item, setItem] = useState("");

  const ShowDialog = () => {
    setVisible(true);
  };

  function handleDelete(id) {
    setTasks(tasks.filter((m) => m.id != id));
    console.log("deleted item id : " + id);
  }

  const addTask = () => {
    let id = 4;
    id++;
    const newTask = {
      id: id,
      title: title,
      checked: false,
    };
    tasks.push(newTask);
    setVisible(false);
  };

  const handleEdit = () => {
    console.log(item.id);
    const task = tasks.find((t) => t.id === item.id);
    task.title = title;
    console.log("task edited: " + task.title);
    setItem(null);
    setVisible(false);
  };

  function renderDialog() {
    return (
      <View>
        <Dialog.Container visible={visible}>
          {item ? (
            <>
              <Dialog.Title>Edit Task</Dialog.Title>
              <Dialog.Input onChangeText={(value) => setTitle(value)}>
                {item.title}
              </Dialog.Input>
            </>
          ) : (
            <>
              <Dialog.Title>Add Task</Dialog.Title>
              <Dialog.Input
                onChangeText={(value) => setTitle(value)}
                placeholder="Title"
              />
            </>
          )}
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              setVisible(false);
            }}
          />
          <Dialog.Button
            label="Ok"
            onPress={() => {
              item ? handleEdit() : addTask();
            }}
          />
        </Dialog.Container>
      </View>
    );
  }

  return (
    <Screen>
      <AppHeader title="Tasks" />
      <View
        style={{
          padding: 10,
        }}
      >
        <FlatList
          keyExtractor={({ id }) => id.toString()}
          data={tasks}
          renderItem={({ item }) => (
            <Task
              title={item.title}
              onPressDelete={() => {
                handleDelete(item.id);
              }}
              onPressEdit={() => {
                setItem(item);
                console.log(item);
                setVisible(true);
              }}
            />
          )}
        />
        <AddButton onPress={ShowDialog} />
        {renderDialog()}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
