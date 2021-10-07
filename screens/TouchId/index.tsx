import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import TouchID from "react-native-touch-id";
import { Colors } from "../../constant/colors";
import InformationCodeScreen from "../InformationCodeScreen";

export default function TouchId() {
  const [auth, setAuth] = useState<string | null>(null);
  const _pressHandler = () => {
    const optionalConfigObject = {
      title: "Sử dụng vân tay", // Android
      imageColor: Colors.main, // Android
      imageErrorColor: Colors.red, // Android
      sensorDescription: "Touch sensor", // Android
      sensorErrorDescription: "Thất bại", // Android
      cancelText: "Cancel", // Android
      fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    TouchID.authenticate(
      "Để ngón tay đã đăng ký vào cảm biến vân tay",
      optionalConfigObject
    )
      .then((success: any) => {
        setAuth("true");
      })
      .catch((error: any) => {
        // Alert.alert("Authentication Failed");
        setAuth("false");
      });
  };
  const _testSupport = () => {
    TouchID.isSupported()
      .then((biometryType) => {
        // Success code
        // Alert.alert("Touch ID supported");
        if (biometryType === "FaceID") {
          console.log("FaceID is supported.");
        }

        if (biometryType === "TouchID") {
          console.log("TouchID is supported.");
        }
      })
      .catch((error) => {
        // Failure code
        Alert.alert("Touch ID not support");
      });
  };
  _testSupport();
  useEffect(() => {
    _pressHandler();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {auth === "true" ? (
        <InformationCodeScreen />
      ) : (
        auth === "false" && <Text>Vui lòng thử lại sau</Text>
      )}
    </View>
  );
}
