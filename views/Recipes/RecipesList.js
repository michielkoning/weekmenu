import React, { useState } from "react";
import SearchBar from "./../../components/SearchBar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import useRecipes from "./../../hooks/useRecipes";

const Item = ({ day, title, tags, index }) => {
  const navigation = useNavigation();
  const onPress = () =>
    navigation.navigate("Details", {
      title,
    });

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.text}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.tags}>{tags.join(", ")}</Text>
        </View>
      </View>
      <View style={styles.more}>
        <Ionicons
          name="chevron-forward-outline"
          size={36}
          style={styles.moreIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

const RecipesTab = () => {
  const [recipes, filterRecipes] = useRecipes();
  const [searchTerm, setSearchTerm] = useState("");


  const updateSearch = (term) => {
    filterRecipes(term)
    setSearchTerm(term)
  }

  const handleSubmit = () => {
    // const where = {
    //   search: searchTerm,
    // };
    // setWhere(where);
  };

  const renderItem = ({ item, index }) => (
    <Item title={item.title} day={item.day} tags={item.tags} index={index} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        onSubmit={handleSubmit}
        searchTerm={searchTerm}
        onChangeSearchTerm={(newSearchTerm) => updateSearch(newSearchTerm)}
      />
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
  item: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  day: {
    borderRadius: 10,
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 24,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    marginVertical: 5,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 24,
  },
  tags: {
    fontSize: 16,
    marginBottom: 5,
  },
  more: {
    justifyContent: "flex-end",
  },
});

export default RecipesTab;
