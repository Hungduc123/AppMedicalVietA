import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  Platform,
} from "react-native";

import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import * as FaceDetector from "expo-face-detector";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../../constant/colors";
import { uriBg } from "../../../FakeData";
import { ImageBackground } from "react-native";
import { reduxTakePhoto } from "../../../reduxToolkit/reduxTakePhoto";
import { useDispatch } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../constant/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
type CameraComponentProp = StackNavigationProp<
  RootStackParamList,
  "CameraComponent"
>;

function CameraComponent() {
  const navigation = useNavigation<CameraComponentProp>();

  const dispatch = useDispatch();
  const camRef = useRef<object | any>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [capturedPhoto, setCapturedPhoto] = useState<string | any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [faceDetected, setFaceDetected] = useState<any>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      setHasPermission(status === "granted");
    })();
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();

    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setOpen(true);
      setCapturedPhoto(data.uri);
      console.log(data);
    }
  }
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // const action = newTakePicture(result.uri);
      // dispatch(action);
      // history.push({ pathname: "/home", state: result.uri });
      //////////do something here
    }
  }

  async function savePicture() {
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
      .then(() => {
        Alert.alert("Saved Picture", "Do you want change image?", [
          {
            text: "Cancel",

            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              // wait().then(() => {
              //   navigation.navigate("CameraScreen");
              // });
              const action = reduxTakePhoto({ capturedPhoto });
              dispatch(action);
              console.log("====================================");
              console.log("ok");
              console.log("====================================");
              setOpen(false);
            },
          },
        ]);
      })
      .catch((error: any) => {
        console.log("err", error);
      });
  }
  // const wait = () => {
  //   return new Promise(() => {
  //     const action = reduxTakePhoto({ capturedPhoto });
  //     dispatch(action);
  //   });
  // };

  //////////////////xuay hinh//////////////
  // const _rotate90andFlip = async () => {
  //   const manipResult = await ImageManipulator.manipulateAsync(
  //     image.localUri || image.uri,
  //     [{ rotate: 90 }, { flip: ImageManipulator.FlipType.Vertical }],
  //     { compress: 1, format: ImageManipulator.SaveFormat.PNG }
  //   );
  //   setImage(manipResult);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={{ uri: uriBg }}>
        <View
          style={{
            flex: 0.5,

            padding: 12,

            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              )
            }
          >
            {flash === Camera.Constants.FlashMode.off && (
              <Ionicons name="flash-off" size={24} color={Colors.main} />
            )}
            {flash === Camera.Constants.FlashMode.on && (
              <Ionicons name="flash" size={24} color={Colors.main} />
            )}
          </TouchableOpacity>
        </View>

        <Camera
          autoFocus={Camera.Constants.AutoFocus.on}
          style={{ flex: 10 }}
          type={type}
          ref={camRef}
          flashMode={flash}
        />

        <View
          style={{
            flex: 2,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Ionicons name="ios-camera-reverse" size={40} color={Colors.main} />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={{ padding: 20 }}>
            <FontAwesome name="camera" size={50} color={Colors.main} />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={{ padding: 20 }}>
            <Fontisto name="picture" size={30} color={Colors.main} />
          </TouchableOpacity>
        </View>
        {capturedPhoto && (
          <Modal
            onRequestClose={() => {
              setOpen(false);
            }}
            transparent={true}
            animationType="slide"
            visible={open}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                backgroundColor: "#000000c0",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  width: "90%",
                  justifyContent: "space-between",
                  borderRadius: 12,
                }}
              >
                <TouchableOpacity
                  style={{ padding: 12 }}
                  onPress={() => setOpen(false)}
                >
                  <FontAwesome5
                    name="window-close"
                    size={25}
                    color={Colors.red}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 12 }} onPress={savePicture}>
                  <FontAwesome name="save" size={25} color={Colors.main} />
                </TouchableOpacity>
              </View>

              <Image
                style={{
                  resizeMode: "cover",
                  width: "100%",
                  height: "90%",
                  borderRadius: 12,
                }}
                source={{ uri: capturedPhoto }}
              />
            </View>
          </Modal>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

export default CameraComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
