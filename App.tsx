import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./store";
import App2 from "./App2";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  return (
    <Provider store={store}>
      <App2></App2>
    </Provider>
  );
}
