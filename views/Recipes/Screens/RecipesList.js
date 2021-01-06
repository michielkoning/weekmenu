import React, { useState } from "react";
import SearchBar from "./../../../components/SearchBar";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import useRecipes from "./../../../hooks/useRecipes";
import RecipeListItem from "./../../../components/RecipeListItem";

const RecipesTab = () => {
  const [recipes, filterRecipes] = useRecipes();
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();

  const updateSearch = (term) => {
    filterRecipes(term);
    setSearchTerm(term);
  };

  const onSelect = (item) => {
    navigation.navigate("RecipeDetails", {
      title: item.title,
    });
  };

  const handleSubmit = () => {};

  const renderItem = ({ item, index }) => (
    <RecipeListItem
      title={item.title}
      tags={item.tags}
      index={index}
      navigateTo="RecipeDetails"
      onSelect={() => onSelect(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        onSubmit={handleSubmit}
        searchTerm={searchTerm}
        onChangeSearchTerm={(newSearchTerm) => updateSearch(newSearchTerm)}
      />
      {recipes.length ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default RecipesTab;
