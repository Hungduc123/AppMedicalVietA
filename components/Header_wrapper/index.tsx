import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Platform,
  Alert,
  SafeAreaView,
} from "react-native";
import { Button, Searchbar } from "react-native-paper";
import { Colors } from "../../constant/colors";
import { styles } from "../../constant/styles";
import DatKhamScreen from "../../screens/DatKhamScreen";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import moment from "moment";
import SwiperImage from "../SwiperImage";
import CameraScreen from "../../screens/CameraScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../constant/RootStackParamList";
import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
type Header_wrapperProp = StackNavigationProp<
  RootStackParamList,
  "Header_wrapper"
>;

export default function Header_wrapper() {
  const navigation = useNavigation<Header_wrapperProp>();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query: any) => setSearchQuery(query);
  const [showDatKham, setShowDatKham] = useState<boolean>(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ flex: 1, paddingTop: 10, flexDirection: "row" }}>
        <Button
          color={Colors.primary}
          mode="outlined"
          onPress={() => setShowDatKham(true)}
        >
          Đặt Khám
        </Button>

        {/* <Button
          color={Colors.primary}
          mode="outlined"
          onPress={async () => {
            await schedulePushNotification();
          }}
        >
          test Thông Báo
        </Button> */}
        <Button
          color={Colors.primary}
          mode="outlined"
          onPress={() => {
            navigation.navigate("CameraScreen");
          }}
        >
          test Camera
        </Button>
      </View>

      <Modal
        onRequestClose={() => {
          setShowDatKham(false);
        }}
        animationType="slide"
        transparent={false}
        visible={showDatKham}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {Platform.OS === "ios" && (
            <TouchableOpacity onPress={() => setShowDatKham(false)}>
              <AntDesign
                style={{ paddingTop: 10, paddingStart: 10 }}
                name="close"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          )}

          <DatKhamScreen />
        </SafeAreaView>
      </Modal>
    </View>
  );
}
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Bạn có 1 thông báo ",
      body: "Đây là nội dung của thông báo",
      data: { data: "goes here" },
    },
    trigger: { seconds: 5 },
  });
}
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
