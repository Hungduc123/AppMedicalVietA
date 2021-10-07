import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../colors";

const { width } = Dimensions.get("window");
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  searchbar: {
    margin: 10,
  },
  buttonMenu: {
    margin: 20,
  },
  hide: {
    height: 0,
  },
  e: {
    color: "red",

    fontStyle: "italic",
  },
  ePass: {
    color: "red",
    height: 40,
    fontStyle: "italic",
  },
  child: { width, justifyContent: "center" },
  fabCall: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.red,
  },
  fabEmergency: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 70,
    backgroundColor: Colors.red,
  },
  fab: {
    position: "absolute",

    right: 0,
    bottom: 50,
  },
});
