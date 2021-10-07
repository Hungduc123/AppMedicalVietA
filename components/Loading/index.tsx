import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Colors } from "../../constant/colors";

const Loading = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={Colors.main} />
    </View>
  );
};

export default Loading;
