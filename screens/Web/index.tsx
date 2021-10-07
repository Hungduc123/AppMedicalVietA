import React from "react";
import { View, Text } from "react-native";
import WebView from "react-native-webview";

const Web = () => {
  return (
    <WebView
      source={{
        uri: "https://vietamedical.com/",
      }}
    />
  );
};

export default Web;
