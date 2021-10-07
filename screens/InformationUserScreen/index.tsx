import AntDesign from "@expo/vector-icons/build/AntDesign";
import Entypo from "@expo/vector-icons/build/Entypo";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AppState,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Platform,
} from "react-native";
import { Avatar, Button, Card } from "react-native-paper";

import { useDispatch } from "react-redux";
import { FormEditProfile } from "../../components/FormEditProfile";
import { Colors } from "../../constant/colors";
import { RootStackParamList } from "../../constant/RootStackParamList";
import { reduxLogin } from "../../reduxToolkit/reduxLogin";
import { reduxStepCreatCode } from "../../reduxToolkit/reduxStepCreatCode";
import BiometricPopup from "../FingerPrint/Anroid";
import TouchId from "../TouchId";
import VerifyCodeScreen from "../VerifyCodeScreen";
import { uriBg } from "../../FakeData/index";
import AwesomeAlert from "react-native-awesome-alerts";
import ModalEditUser from "../../components/ModalEditUser";

type InformationUserScreenProp = StackNavigationProp<
  RootStackParamList,
  "InformationUserScreen"
>;

export default function InformationUserScreen() {
  const navigation = useNavigation<InformationUserScreenProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Thông Tin Người Dùng",
    });
  }, [navigation]);
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [showVerify, setShowVerify] = useState<boolean>(false);
  const [is, setIs] = useState<boolean>(true); //đẻ khi người dùng thoat khỏi app( đa nhiệm) thì sẽ ko thấy nội dung
  const fingerprint = true;
  const [selection, setSelection] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  // const [showHistory, setShowHistory] = useState(false);
  useEffect(() => {
    console.log("InformationUserScreen");
  }, []);
  const _handleAppStateChange = (nextAppState: any) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      closeModal();
    }

    appState.current = nextAppState;
    // setAppStateVisible(appState.current);
    if (appState.current.toString() === "active") {
      closeModal();
    } else {
      setIs(false);
    }

    console.log("AppState", appState.current);
  };
  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);
  const closeModal = () => {
    setShowVerify(false);
    const action = reduxStepCreatCode({ step: 1 });
    dispatch(action);
    setIs(true);
    setSelection("");
  };

  return (
    // <View style={styles.container}>
    //   <View style={styles.header}></View>
    //   <Image
    //     style={styles.avatar}
    //     source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
    //   />
    //   <ScrollView style={styles.body}>
    //     <View style={styles.bodyContent}>
    //       <TouchableOpacity style={[styles.buttonContainer]}>
    //         <Text style={{ color: "white" }}>Name ...</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.buttonContainer}>
    //         <Text style={{ color: "white" }}>Email ...</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={styles.buttonContainer}
    //         onPress={() => {
    //           setShowVerify(true);
    //         }}
    //       >
    //         <Text style={{ color: "white" }}> lịch sử khám bệnh</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </ScrollView>
    //   <Button
    //     color={Colors.red}
    //     icon="logout"
    //     mode="outlined"
    //     onPress={() => {
    //       const action = reduxLogin({
    //         isSigning: false,
    //       });
    //       dispatch(action);
    //     }}
    //   >
    //     Đăng Xuất
    //   </Button>

    //   <Modal
    //     onRequestClose={() => {
    //       closeModal();
    //     }}
    //     animationType="slide"
    //     transparent={false}
    //     visible={showVerify}
    //   >
    //     <TouchableOpacity
    //       onPress={() => {
    //         closeModal();
    //       }}
    //     >
    //       <AntDesign
    //         style={{ paddingTop: 10, paddingStart: 10 }}
    //         name="close"
    //         size={30}
    //         color="black"
    //       />
    //     </TouchableOpacity>

    //     {selection !== "passCode" && selection !== "fingerprint" && (
    //       <View
    //         style={{
    //           flex: 1,
    //           flexDirection: "row",
    //           alignItems: "center",
    //           justifyContent: "center",
    //           padding: 12,
    //         }}
    //       >
    //         <Card
    //           style={{
    //             borderRadius: 10,
    //             width: "40%",
    //             height: "20%",
    //             paddingTop: 12,
    //           }}
    //         >
    //           <TouchableOpacity
    //             style={{ alignItems: "center", justifyContent: "center" }}
    //             onPress={() => {
    //               setSelection("passCode");
    //             }}
    //           >
    //             <Image
    //               source={require("../../assets/passcode.png")}
    //               style={{ width: 100, height: 50 }}
    //             />
    //             <Text>Pass Code</Text>
    //           </TouchableOpacity>
    //         </Card>
    //         <Card
    //           style={{
    //             borderRadius: 10,
    //             width: "40%",
    //             height: "20%",
    //             paddingTop: 12,
    //           }}
    //         >
    //           <TouchableOpacity
    //             style={{ alignItems: "center", justifyContent: "center" }}
    //             onPress={() => {
    //               setSelection("fingerprint");
    //             }}
    //           >
    //             <Entypo name="fingerprint" size={60} color={Colors.main} />
    //             <Text>Vân Tay</Text>
    //           </TouchableOpacity>
    //         </Card>
    //       </View>
    //     )}

    //     {selection === "passCode" && is && <VerifyCodeScreen />}
    //     {selection === "fingerprint" && is && <TouchId />}
    //     {/* {fingerprint && <BiometricPopup />} */}
    //   </Modal>
    // </View>

    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={{
          uri: uriBg,
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Avatar.Text
            style={{ backgroundColor: `${Colors.main}` }}
            size={120}
            label={"Jonathon Dustin"
              .split(" ")
              .map((word: any) => word.slice(0, 1))
              .join("")}
          />
          <Text style={{ color: Colors.main, fontSize: 20 }}> FULL NAME</Text>
          <Text style={{ color: Colors.main }}> Address: ABC , abc, abc</Text>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", top: 10, right: 10 }}
          onPress={() => {
            setEdit(true);
          }}
        >
          <AntDesign name="edit" size={30} color={Colors.main} />
        </TouchableOpacity>
      </ImageBackground>
      <ScrollView style={{ flex: 1, padding: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesome
            style={{ padding: 12 }}
            name="phone"
            size={24}
            color={Colors.main}
          />

          <Text style={{ padding: 12 }}>Số điện thoại: 0123456789</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
          }}
        >
          <MaterialIcons name="email" size={24} color={Colors.main} />

          <Text style={{ padding: 12 }}>Email: abc@gmail.com </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingStart: 12,
            alignItems: "center",
          }}
        >
          <FontAwesome name="history" size={24} color={Colors.main} />
          <TouchableOpacity
            onPress={() => {
              setShowVerify(true);
            }}
          >
            <Text style={{ padding: 12 }}>Lịch sử người dùng khám bệnh </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Button
        color={Colors.red}
        icon="logout"
        mode="outlined"
        onPress={() => {
          const action = reduxLogin({
            isSigning: false,
          });
          dispatch(action);
          navigation.push("DrawerComponent");
        }}
      >
        Đăng Xuất
      </Button>
      <Modal
        onRequestClose={() => {
          closeModal();
        }}
        animationType="slide"
        transparent={false}
        visible={showVerify}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {Platform.OS === "ios" && (
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}
            >
              <AntDesign
                style={{ paddingTop: 10, paddingStart: 10 }}
                name="close"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          )}

          {selection !== "passCode" && selection !== "fingerprint" && (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
              }}
            >
              <Card
                style={{
                  borderRadius: 10,
                  width: "40%",
                  height: "20%",
                  paddingTop: 12,
                }}
              >
                <TouchableOpacity
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={() => {
                    setSelection("passCode");
                  }}
                >
                  <Image
                    source={require("../../assets/passcode.png")}
                    style={{ width: 100, height: 50 }}
                  />
                  <Text>Pass Code</Text>
                </TouchableOpacity>
              </Card>
              <Card
                style={{
                  borderRadius: 10,
                  width: "40%",
                  height: "20%",
                  paddingTop: 12,
                }}
              >
                <TouchableOpacity
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={() => {
                    setSelection("fingerprint");
                  }}
                >
                  <Entypo name="fingerprint" size={60} color={Colors.main} />
                  <Text>Vân Tay</Text>
                </TouchableOpacity>
              </Card>
            </View>
          )}

          {selection === "passCode" && is && <VerifyCodeScreen />}
          {selection === "fingerprint" && is && <TouchId />}
        </SafeAreaView>
      </Modal>

      <Modal
        visible={edit}
        onRequestClose={() => {
          setEdit(false);
        }}
        animationType="slide"
        transparent={false}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ModalEditUser />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.main,
    height: 150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 80,
  },

  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: Colors.main,
  },
});
