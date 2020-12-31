import * as React from "react";
import { Text, View } from "react-native";

const WeeklyMenuDetails = ({ route, navigation }) => {
  const { title } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{title}</Text>
    </View>
  );
};

export default WeeklyMenuDetails;
