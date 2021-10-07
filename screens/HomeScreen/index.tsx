import React, { useLayoutEffect } from "react";
import { SafeAreaView, ImageBackground } from "react-native";
import { View, Text, Image } from "react-native";
import { Card } from "react-native-paper";

import Header_wrapper from "../../components/Header_wrapper";
import { Colors } from "../../constant/colors";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      <Card
        style={{
          flex: 1,
          backgroundColor: `${Colors.main}`,
          width: "100%",
          flexDirection: "row",
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
        }}
      >
        <Header_wrapper />
      </Card>

      <View style={{ flex: 5, width: "100%" }}>{/* <ScrollNews /> */}</View>
    </SafeAreaView>
  );
}
