import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TestScreen from "./app/Screens/TestScreen";
import MainScreen from "./app/Screens/MainScreen";
import TaskScreen from "./app/Screens/TaskScreen";
import { AppColors } from "./app/assets/colors.js";

const Stack = createStackNavigator();

export default function App() {
  return <TestScreen />;
  <NavigationContainer>
    <Stack.Navigator
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      <Stack.Screen
        initialRouteName={"MainScreen"}
        name="MainScreen"
        component={MainScreen}
        options={{
          title: "TODO APPLICATION", //Set Header Title
          headerStyle: {
            backgroundColor: AppColors.appColor, //Set Header color
          },
          headerTintColor: AppColors.tint, //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="TaskScreen"
        component={TaskScreen}
        options={{
          title: "TASKS", //Set Header Title
          headerStyle: {
            backgroundColor: AppColors.appColor, //Set Header color
          },
          headerTintColor: AppColors.tint, //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
