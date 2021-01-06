import React, { useState } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import WeeklyMenuTab from "./views/WeeklyMenu/WeeklyMenuTab";
import RecipesTab from "./views/Recipes/RecipesTab";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "WeeklyMenu") {
              iconName = "restaurant-outline";
            } else if (route.name === "Recipes") {
              iconName = "book-outline";
            } else if (route.name === "Settings") {
              iconName = "settings-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          labelPosition: "below-icon",
        }}
      >
        <Tab.Screen
          name="WeeklyMenu"
          options={{ title: "Weekmenu" }}
          component={WeeklyMenuTab}
        />
        <Tab.Screen
          name="Recipes"
          options={{ title: "Mijn recepten" }}
          component={RecipesTab}
        />
        <Tab.Screen
          name="Settings"
          options={{ title: "Instellingen" }}
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
