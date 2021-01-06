import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WeeklyMenuList from "./Screens/WeeklyMenuList";
import WeeklyMenuDetails from "./Screens/WeeklyMenuDetails";

const WeeklyMenuStack = createStackNavigator();
function WeeklyMenuTab() {
  return (
    <WeeklyMenuStack.Navigator>
      <WeeklyMenuStack.Screen
        name="WeeklyMenuList"
        component={WeeklyMenuList}
        options={{ title: "Overzicht" }}
      />
      <WeeklyMenuStack.Screen
        name="WeeklyMenuDetails"
        component={WeeklyMenuDetails}
        options={{ title: "Recept" }}
      />
    </WeeklyMenuStack.Navigator>
  );
}

export default WeeklyMenuTab;
