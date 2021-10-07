import React from "react";
import { View, Text } from "react-native";

export default function ServiceScreen({ extraData }: any) {
  return (
    <View>
      <Text>{extraData}</Text>
    </View>
  );
}
