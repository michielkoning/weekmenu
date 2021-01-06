import * as React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipesList from "./Screens/RecipesList";
import RecipeDetails from "./Screens/RecipeDetails";

const RecipesStack = createStackNavigator();
const RecipesTab = () => {
  return (
    <RecipesStack.Navigator>
      <RecipesStack.Screen
        name="RecipesList"
        component={RecipesList}
        options={{ title: "Overzicht" }}
      />
      <RecipesStack.Screen
        name="RecipeDetails"
        component={RecipeDetails}
        options={{ title: "Recept" }}
      />
    </RecipesStack.Navigator>
  );
};

export default RecipesTab;
