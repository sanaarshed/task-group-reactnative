import React, { Component } from "react";
import { View, Button } from "react-native";
import { connect } from "react-redux";
import { getGroupsFunc } from "../redux/actions/groupActions";

class TestScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          title={" calling action to get Groups"}
          onClick={() => {
            this.props.getPostBulk();
            console.log(this.props);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostBulk: getGroupsFunc(dispatch),
  };
};

const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(TestScreen);

export default ConnectApp;
