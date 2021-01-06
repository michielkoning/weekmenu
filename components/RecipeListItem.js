import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const colors = ["#FFC393", "#CAE0A5", "#F7E36A", "#F8AAAE"];

const Item = ({ day, title, tags, index, navigateTo, onSelect }) => {
  const navigation = useNavigation();
  const onPress = () =>
    navigation.navigate(navigateTo, {
      title,
    });

  return (
    <TouchableOpacity onPress={onSelect} style={styles.item}>
      {day ? (
        <View style={{ ...styles.day, backgroundColor: colors[index % 4] }}>
          <Text style={styles.dayText}>{day}</Text>
        </View>
      ) : null}
      <View style={styles.text}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.tags}>{tags ? tags.join(", ") : ""}</Text>
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

const styles = StyleSheet.create({
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

export default Item;
