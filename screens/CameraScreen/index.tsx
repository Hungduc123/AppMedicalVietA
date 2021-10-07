import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  Modal,
  SafeAreaView,
  Platform,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

import { AntDesign } from "@expo/vector-icons";
import CameraComponent from "./CameraComponent";
import { useSelector } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../constant/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
type CameraScreenProp = StackNavigationProp<RootStackParamList, "CameraScreen">;

const CameraScreen = () => {
  const navigation = useNavigation<CameraScreenProp>();
  const impTemp = useSelector((state: any) => state.reduxTakePhoto);

  const [img, setImg] = useState<string>("");
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setImg(pickerResult.uri);
    console.log(pickerResult);
  };
  useEffect(() => {
    setImg(impTemp.capturedPhoto);
  }, [impTemp]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>img</Text>
        <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 10,
            resizeMode: "contain",
          }}
          source={{
            uri: img
              ? img
              : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg",
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={openImagePickerAsync}
          style={{ padding: 12 }}
        >
          <Text>From library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 12 }}
          onPress={() => {
            setOpenCamera(true);
          }}
        >
          <Text>From Camera</Text>
        </TouchableOpacity>
      </View>

      <Modal
        onRequestClose={() => {
          setOpenCamera(false);
        }}
        animationType="slide"
        transparent={false}
        visible={openCamera}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {Platform.OS === "ios" && (
            <TouchableOpacity onPress={() => setOpenCamera(false)}>
              <AntDesign
                style={{ paddingTop: 10, paddingStart: 10 }}
                name="close"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          )}

          <CameraComponent />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default CameraScreen;
