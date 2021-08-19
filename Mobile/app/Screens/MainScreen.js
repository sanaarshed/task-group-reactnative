import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import Dialog from "react-native-dialog";
import { useDispatch } from "react-redux";

import Screen from "../Components/Screen";
import AddButton from "../Components/AddButton";
import Group from "../Components/Group";
import GroupService from "../Services/group";
import { AppColors } from "../assets/colors";
import { actionTypes } from "../redux/contants/actionType";

export default function MainScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  const [title, setTitle] = useState("title 1");
  const [item, setItem] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    showAll();
  }, [refresh]);

  function showDialog(v = true) {
    setDialogVisible(v);
  }
  function showModal(v = true) {
    setModalVisible(v);
  }

  const setHeaderTitle = (title) => {
    dispatch({ type: actionTypes.HEADER_TITLE, payload: title });
  };

  const showAll = async () => {
    const result = await new GroupService().showAll();
    if (result.success) {
      setGroups(result.data);
    } else {
      alert("Error: " + result);
    }
    setLoading(false);
    setRefresh(false);
  };

  const create = (data) => {
    const result = new GroupService().create(data);
    result.then((res) => {
      if (!res) {
        alert("Error inserting ");
      }
    });
    setRefresh(true);
  };

  const update = (data) => {
    data = `{"name" :" ${data}"}`;
    const result = new GroupService().update(data, item.id);
    result.then((res) => {
      if (!res) {
        alert("Error Updating");
      }
    });
    setItem(null);
    setRefresh(true);
  };

  function handleDelete() {
    Alert.alert("Delete List", "Are you sure want to delete the list? ", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => {
          const result = new GroupService().delete(item.id);
          if (result) setRefresh(true);
        },
      },
    ]);
    setItem(null);
    showModal(false);
  }

  function handleRename() {
    //console.log("rename");
    update(title);
    showDialog(false);
    showModal(false);
  }

  const add = () => {
    const newGroup = {
      name: title,
      task: [{}],
    };
    create(newGroup);
    setGroups(groups);
    showDialog(false);
  };

  function renderDialog() {
    return (
      <View>
        <Dialog.Container visible={dialogVisible}>
          {item ? (
            <>
              <Dialog.Title>Rename the List</Dialog.Title>
              <Dialog.Input onChangeText={(value) => setTitle(value)}>
                {item.name}
              </Dialog.Input>
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
              showDialog(false);
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
          showModal(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            showModal(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modelButtons}>
              <Button
                title={"Rename"}
                onPress={showDialog}
                color={AppColors.appColor}
              />
              <Button
                title={"Delete"}
                onPress={() => handleDelete()}
                color={AppColors.appColor}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size={"large"} color={"gray"} />
        ) : (
          <FlatList
            style={{ flex: 1, minHeight: 100 }}
            // keyExtractor={({ id }) => id.toString()}
            data={groups}
            renderItem={({ item }) => (
              <Group
                onPress={() => {
                  setHeaderTitle(item.name);
                  navigation.navigate("TaskScreen", {
                    GroupId: item.id,
                  });
                }}
                onPressDots={() => {
                  setItem(item), showModal(true);
                }}
                title={item.name}
              />
            )}
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
          />
        )}
        <AddButton onPress={showDialog} />
      </View>
      {renderDialog()}
      {renderModal()}
      {/* */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  modalContainer: {
    margin: 0,
    flex: 1,
    backgroundColor: AppColors.modal,
    justifyContent: "flex-end",
  },
  modelButtons: {
    height: 120,
    margin: 5,
    padding: 10,
    justifyContent: "space-evenly",
    alignItems: "stretch",
    backgroundColor: AppColors.tint,
    alignSelf: "stretch",
  },
});
