import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Typography from "./../constants/Typography";
import Colors from "./../constants/Colors";
import Layout from "./../constants/Layout";

const SearchBar = ({ onSubmit, searchTerm, onChangeSearchTerm }) => {
  return (
    <View style={styles.wrapper}>
      <Entypo name="magnifying-glass" size={25} style={styles.icon} />
      <TextInput
        returnKeyType="search"
        style={styles.input}
        value={searchTerm}
        clearButtonMode="while-editing"
        onChangeText={onChangeSearchTerm}
        onEndEditing={onSubmit}
        placeholder="Zoeken naar recepten"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.grey,
    height: 50,
    marginHorizontal: Layout.gutter,
    marginTop: Layout.gutter,
    flexDirection: "row",
    borderBottomColor: Colors.black,
    borderBottomWidth: 2,
  },
  icon: {
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 5,
  },
  input: {
    ...Typography,
    flex: 1,
  },
});

export default SearchBar;
