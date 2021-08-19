import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  Paragraph,
} from "react-native";
import Dialog from "react-native-dialog";
import DateTimePicker from "@react-native-community/datetimepicker";

import Task from "../Components/Task";
import Screen from "../Components/Screen";
import AddButton from "../Components/AddButton";
import TaskService from "../Services/task";
import { AppColors } from "../assets/colors";

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
  const [visible, setDialogVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);

  const [date, setDate] = useState(null);
  const [tasks, setTasks] = useState(data);

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
      "https://sana-todo-api.herokuapp.com/groups/" +
      groupId +
      "/tasks/" +
      item._id;
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title: title, due_date: date }),
    })
      .then(async (response) => {
        const d = await response.json();
        if (!d) {
          alert("Error Updating data");
        } else setItem(null);
      })
      .catch((e) => {
        alert("Error: ", e);
      });
    setDate(null);
    setRefresh(true);
  };

  const deleteData = (id) => {
    const url =
      "https://sana-todo-api.herokuapp.com/groups/" + groupId + "/tasks/" + id;
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
        alert("Exception:" + error);
      });
    setRefresh(true);
  };

  function dateFormat(date) {
    date = new Date(date);
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    setDate(`${y}-${m}-${d}`);
  }

  // HandlerFunctions

  function showDialog(v = true) {
    setDialogVisible(v);
  }
  function showCallender(v = true) {
    setDateVisible(v);
  }
  const handleAdd = () => {
    const newTask = {
      title: title,
      due_date: date,
    };
    create(newTask);
    showDialog(false);
  };
  function handleDelete(tId) {
    Alert.alert(
      "Delete",
      "Are you sure want to delete?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteData(tId) },
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

  function renderCallender() {
    return (
      <>
        {dateVisible && (
          <DateTimePicker
            value={new Date()}
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              console.log(typeof selectedDate);
              // dateFormat(selectedDate);
              showCallender(false);
            }}
          />
        )}
      </>
    );
  }

  function renderDialog() {
    return (
      <View>
        <Dialog.Container
          visible={visible}
          onBackdropPress={() => {
            showDialog(false);
            setItem(null);
          }}
        >
          {item ? (
            <>
              <Dialog.Title>Edit Task</Dialog.Title>
              <Dialog.Input onChangeText={(value) => setTitle(value)}>
                {item.title}
              </Dialog.Input>

              <Dialog.Description>Due Date : yy,mm,dd</Dialog.Description>
              <Dialog.Description>{date}</Dialog.Description>
            </>
          ) : (
            <>
              <Dialog.Title>Add Task</Dialog.Title>
              <Dialog.Input
                onChangeText={(value) => setTitle(value)}
                placeholder="Title"
              />
              <Dialog.Description>Due Date : yy,mm,dd</Dialog.Description>
              <Dialog.Description>
                {date ? date.toString() : ""}
              </Dialog.Description>
            </>
          )}
          <Dialog.Button
            bold={true}
            label="Due Date"
            onPress={() => showCallender(true)}
          />
          <Dialog.Button
            bold={true}
            label="Cancel"
            onPress={() => {
              setDate(null);
              showDialog(false);
              setItem(null);
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
                  dateFormat(item.due_date);
                  showDialog(true);
                }}
              />
            )}
          />
        )}
      </View>
      {renderCallender()}
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
