import * as React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import WeeklyMenuList from "./WeeklyMenu/WeeklyMenuList";
import WeeklyMenuDetails from "./WeeklyMenu/WeeklyMenuDetails";

const HomeStack = createStackNavigator();
function WeeklyMenuTab() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={WeeklyMenuList}
        options={{ title: "Overzicht" }}
      />
      <HomeStack.Screen
        name="Details"
        component={WeeklyMenuDetails}
        options={{ title: "Recept" }}
      />
    </HomeStack.Navigator>
  );
}

export default WeeklyMenuTab;
