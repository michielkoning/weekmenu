import * as React from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import Constants from "expo-constants";
import useRecipes from "../../../hooks/useRecipes";
import RecipeListItem from "../../../components/RecipeListItem";
import { useNavigation } from "@react-navigation/native";

const WeeklyMenuList = () => {
  const [recipes] = useRecipes();
  const navigation = useNavigation();

  const onSelect = (item) => {
    navigation.navigate("WeeklyMenuDetails", {
      title: item.day,
    });
  };

  const renderItem = ({ item, index }) => (
    <RecipeListItem
      title={item.title}
      day={item.day}
      tags={item.tags}
      index={index}
      navigateTo="WeeklyMenuDetails"
      onSelect={() => onSelect(item)}
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
