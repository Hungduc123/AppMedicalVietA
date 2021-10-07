import Entypo from "@expo/vector-icons/build/Entypo";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/build/SimpleLineIcons";
import {
  DrawerContentScrollView,
  DrawerItem,
  useDrawerStatus,
} from "@react-navigation/drawer";
import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Avatar, Button, Card, Drawer } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../constant/colors";
import { windowWidth } from "../../constant/styles";
import { reduxLogin } from "../../reduxToolkit/reduxLogin";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { uriBg } from "../../FakeData";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function DrawerContent(props: any) {
  const isSigning = useSelector((state: any) => state.reduxLogin);
  const dispatch = useDispatch();
  const isDrawerOpen = useDrawerStatus();
  const removeDataLoginToStorage = async () => {
    try {
      await AsyncStorage.removeItem("dataLoginFromStorage");
    } catch (e) {
      // remove error
      console.log(e);
    }

    console.log("Done.");
  };
  useEffect(() => {
    console.log(isDrawerOpen);
  }, [isDrawerOpen]);
  return (
    <ImageBackground source={{ uri: uriBg }} style={{ flex: 1 }}>
      {isSigning.isSigning && (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("InformationUserScreen");
          }}
          style={{
            flex: 2,
            paddingStart: 12,
            paddingEnd: 12,

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            style={{
              justifyContent: "center",
              width: "95%",
              padding: 12,
              borderRadius: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Avatar.Text
                style={{ backgroundColor: `${Colors.main}` }}
                size={80}
                label={"Jonathon Dustin"
                  .split(" ")
                  .map((word: any) => word.slice(0, 1))
                  .join("")}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>name</Text>
                <Text>email</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      )}

      <View
        style={{
          flex: 9,
          width: "100%",
          padding: 12,
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            style={{
              flex: 1,
              justifyContent: "center",
              width: "95%",
              height: "100%",
              padding: 12,
              borderRadius: 20,
            }}
          >
            <ScrollView style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  props.navigation.navigate("Trang Chủ");
                }}
              >
                <AntDesign
                  style={{ padding: 12 }}
                  name="home"
                  size={24}
                  color={Colors.main}
                />
                <Text>TRANG CHỦ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  props.navigation.navigate("Chuyên Khoa");
                }}
              >
                <AntDesign
                  style={{ padding: 12 }}
                  name="home"
                  size={24}
                  color={Colors.main}
                />
                <Text>CHUYÊN KHOA</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  props.navigation.navigate("Gói khám");
                }}
              >
                <Entypo
                  style={{ padding: 12 }}
                  name="list"
                  size={24}
                  color={Colors.main}
                />
                <Text>GÓI KHÁM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  props.navigation.navigate("Ưu đãi");
                }}
              >
                <AntDesign
                  style={{ padding: 12 }}
                  name="tags"
                  size={24}
                  color={Colors.main}
                />
                <Text>ƯU ĐÃI</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  props.navigation.navigate("Vip Card");
                }}
              >
                <AntDesign
                  style={{ padding: 12 }}
                  name="home"
                  size={24}
                  color={Colors.main}
                />
                <Text>VIP CARD</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  props.navigation.navigate("Dịch vụ");
                }}
              >
                <MaterialIcons
                  style={{ padding: 12 }}
                  name="medical-services"
                  size={24}
                  color={Colors.main}
                />
                <Text>DỊCH VỤ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  props.navigation.navigate("Tin Tức");
                }}
              >
                <FontAwesome
                  style={{ padding: 12 }}
                  name="newspaper-o"
                  size={24}
                  color={Colors.main}
                />
                <Text>TIN TỨC</Text>
              </TouchableOpacity>
            </ScrollView>
          </Card>
        </View>

        {isDrawerOpen === "closed" ? (
          <View style={{ position: "absolute", right: "-15%" }}>
            <TouchableOpacity>
              <FontAwesome name="chevron-right" size={40} color={Colors.main} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ position: "absolute", right: "-15%" }}>
            <FontAwesome name="chevron-left" size={40} color={Colors.main} />
          </View>
        )}
      </View>

      <View style={{ flex: 0.5 }}>
        {isSigning.isSigning ? (
          <Button
            color={Colors.red}
            style={{
              width: "100%",
              backgroundColor: "white",
            }}
            icon="logout"
            mode="outlined"
            onPress={() => {
              const action = reduxLogin({
                isSigning: false,
              });
              dispatch(action);
              removeDataLoginToStorage();
            }}
          >
            Đăng Xuất
          </Button>
        ) : (
          <View
            // style={{ position: "absolute", bottom: 0, flex: 1, width: "100%" }}
            style={{ width: "100%" }}
          >
            <Button
              style={{ width: "100%", backgroundColor: "white" }}
              color={Colors.main}
              icon="login"
              mode="outlined"
              onPress={() => props.navigation.navigate("LoginScreen")}
            >
              ĐĂNG NHẬP
            </Button>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
