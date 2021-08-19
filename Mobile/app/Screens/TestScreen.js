import React, { useEffect, Component } from "react";
import { FlatList, Text, View, StyleSheet, Button } from "react-native";
import { getGroupsfunc } from "../redux/actions/groupActions";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../redux/contants/actionType";

function TestScreen() {
  const headerTitle = useSelector((state) => state.headerTitleReducer);
  const dispath = useDispatch();

  const setHeaderTitle = (title) => {
    dispath({
      type: actionTypes.HEADER_TITLE,
      payload: title,
    });
  };

  return (
    <View
      style={{
        marginTop: 100,
        alignItems: "center",
      }}
    >
      <Button
        title={"click to change the name"}
        onPress={() => {
          setHeaderTitle("THIS IS TITLE");
        }}
      />
      <Text>{headerTitle}</Text>
      {/* <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      /> */}
    </View>
  );
}
export default TestScreen;

//----------in case of class component------------
// const mapStateToProps = (state) => {
//   return {
//     state,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getGroups: getGroupsfunc(dispatch),
//   };
// };
// const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(TestScreen);

// export default ConnectApp;
