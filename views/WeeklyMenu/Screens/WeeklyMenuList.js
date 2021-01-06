import * as React from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import Constants from "expo-constants";
import useRecipes from "../../../hooks/useRecipes";
import RecipeListItem from "../../../components/RecipeListItem";

const WeeklyMenuList = () => {
  const [recipes] = useRecipes();

  const renderItem = ({ item, index }) => (
    <RecipeListItem
      title={item.title}
      day={item.day}
      tags={item.tags}
      index={index}
      navigateTo="WeeklyMenuDetails"
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => item.title + index}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
});

export default WeeklyMenuList;
