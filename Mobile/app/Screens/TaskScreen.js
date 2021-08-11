import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import Dialog from "react-native-dialog";

import Task from "../Components/Task";
import Screen from "../Components/Screen";
import AddButton from "../Components/AddButton";
import TaskService from "../Services/task";

const data = {
  data: Array[
    {
      _id: "610ffc990a9651280451478e",
      created_date: "2021-08-08T15:47:37.198Z",
      due_date: "2021-08-07T11:55:53.514Z",
      groupId: "610ffc3c0a96512804514784",
      title: "task - updated",
    }
  ],
  message: "Data retreved",
  success: true,
};

export default function TaskScreen({ route }) {
  const [tasks, setTasks] = useState(data);
  const [visible, setDialogVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [item, setItem] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const groupId = route.params.GroupId;

  useEffect(() => {
    showAll();
  }, [refresh]);

  // Api calls

  const showAll = async () => {
    // console.log(groupId);
    const result = await new TaskService().showAll(groupId);
    // console.log(result);
    if (result.success) {
      setTasks(result.data);
    } else {
      alert("Error: " + result);
    }
    setLoading(false);
    setRefresh(false);
  };

  const create = (data) => {
    const result = new TaskService().create(data, groupId);
    result.then((res) => {
      if (!res) alert("Error inserting data.");
    });
    setRefresh(true);
  };

  const update = () => {
    const url =
      "http://192.168.10.10:3000/groups/" + groupId + "/tasks/" + item._id;

    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title: title }),
    })
      .then(async (response) => {
        const d = await response.json();
        if (!d) {
          alert("Error Updating data");
        } else setItem("");
      })
      .catch((e) => {
        alert("Error: ", e);
      });
    setRefresh(true);
  };

  const deleteData = (id) => {
    const url = "http://192.168.10.10:3000/groups/" + groupId + "/tasks/" + id;
    fetch(url, {
      method: "DELETE",
    })
      .then(async (response) => {
        const d = await response.json();
        if (!d) {
          alert("Error deleting data");
        }
      })
      .catch((error) => {
        alert("Error:", error);
      });
    setRefresh(true);
  };

  // HandlerFunctions

  function showDialog(v = true) {
    setDialogVisible(v);
  }
  const handleAdd = () => {
    //console.log("item pushed");
    const newTask = {
      title: title,
    };
    create(newTask);
    showDialog(false);
  };
  function handleDelete(tid) {
    Alert.alert(
      "Delete",
      "Are you sure want to delete?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteData(tid) },
      ],
      {
        cancelable: true,
      }
    );
  }

  function handleEdit() {
    update();
    showDialog(false);
  }
  // Render functions

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
              showDialog(false);
            }}
          />
          <Dialog.Button
            label="Ok"
            onPress={() => {
              item ? handleEdit() : handleAdd();
            }}
          />
        </Dialog.Container>
      </View>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            style={{
              flex: 0.5,
            }}
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
            keyExtractor={({ _id }) => _id.toString()}
            data={tasks}
            renderItem={({ item }) => (
              <Task
                title={item.title}
                onPressDelete={() => {
                  handleDelete(item._id);
                }}
                onPressEdit={() => {
                  setItem(item);
                  showDialog(true);
                }}
              />
            )}
          />
        )}
      </View>
      {renderDialog()}
      <AddButton onPress={showDialog} />
    </Screen>
  );
}

//styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "95%",
  },
});
