import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "../Screens/MainScreen";
import TaskScreen from "../Screens/TaskScreen";
import { AppColors } from "../assets/colors";
import TestScreen from "../Screens/TestScreen";
import { actionTypes } from "../redux/contants/actionType";

const Stack = createStackNavigator();

export default function AppNavigations() {
  // const title = useSelector((state) => state.headerTitleReducer);
  // const storeValue = useSelector((state) => state.groups);
  // console.log(storeValue);

  return (
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
            title: "TODO APPLICATION",
            headerStyle: {
              backgroundColor: AppColors.appColor,
            },
            headerTintColor: AppColors.tint,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="TaskScreen"
          component={TaskScreen}
          options={{
            title: "title",
            headerStyle: {
              backgroundColor: AppColors.appColor,
            },
            headerTintColor: AppColors.tint,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
