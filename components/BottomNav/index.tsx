import React, { useState } from "react";
import { View, Text } from "react-native";
import { ButtonGroup } from "react-native-elements";

export default function BottomNav() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const updateIndex = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex);
    console.log({ selectedIndex });
  };

  const buttons = ["new_a", "new_b", "new_c"];
  return (
    <ButtonGroup
      buttonContainerStyle={{ borderRadius: 10 }}
      buttonStyle={{ borderRadius: 10 }}
      onPress={updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{ height: 50, borderRadius: 10 }}
    />
  );
}
