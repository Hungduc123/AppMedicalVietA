import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Colors } from "../../constant/colors";
import { RootStackParamList } from "../../constant/RootStackParamList";
import { styles } from "../../constant/styles";
import { reduxLogin } from "../../reduxToolkit/reduxLogin";
import { uriBg } from "../../FakeData/index";
type LoginScreenProp = StackNavigationProp<RootStackParamList, "LoginScreen">;
export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Đăng Nhập",
    });
  }, [navigation]);
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const [hidden, setHidden] = useState<boolean>(true);
  const [errors, setErrors] = useState<any>({});
  const input1 = useRef<any>(null);
  const saveDataLoginToStorage = async (data: {
    userName: string;
    password: string;
  }) => {
    try {
      await AsyncStorage.setItem("dataLoginFromStorage", data.toString());
    } catch (error) {
      Alert.alert("Thông báo", "Lưu dữ liệu không thành công", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };
  const login = () => {
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    });

    if (userName !== "" && password !== "") {
      // set empty textInput
      setUserName("");
      setPassword("");
      //
      console.log("login successful");
      //// save Data Login To Storage
      // saveDataLoginToStorage({ userName: userName, password: password });
      //// set isSignin for app (use redux toolkit)
      const action = reduxLogin({
        isSigning: true,
      });
      dispatch(action);
      // navigate to home screen
      saveDataLoginToStorage({ userName, password });
      navigation.push("DrawerComponent");
    } else {
      //  alert("check again, please");
      if (userName === "") {
        setErrors({ userName: "Vui lòng nhập Tên Đăng Nhập" });
      } else if (password === "") {
        setErrors({ password: "Vui lòng nhập password" });
      }
    }
  };

  return (
    <ImageBackground
      source={{ uri: uriBg }}
      style={{
        flex: 1,
        // padding: 10,
        // width: "95%",
      }}
    >
      <View style={{ padding: 10 }}>
        <TextInput
          returnKeyType="next"
          onSubmitEditing={() => input1.current.focus()}
          outlineColor={Colors.main}
          underlineColor="deepskyblue"
          selectionColor="deepskyblue"
          mode="outlined"
          label="Tên Đăng Nhập"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          left={<TextInput.Icon color={Colors.main} name="account" />}
        />
        <Text style={errors.userName ? styles.e : styles.hide}>
          {errors.userName}
        </Text>
        <TextInput
          onSubmitEditing={() => login()}
          ref={input1}
          outlineColor={Colors.main}
          underlineColor="deepskyblue"
          selectionColor="deepskyblue"
          mode="outlined"
          label="Password"
          secureTextEntry={hidden}
          right={
            <TextInput.Icon
              color={Colors.main}
              onPress={() => {
                setHidden(!hidden);
              }}
              name={`${!hidden ? "eye" : "eye-off"}`}
            />
          }
          value={password}
          onChangeText={(text) => setPassword(text)}
          left={
            <TextInput.Icon color={Colors.main} name="form-textbox-password" />
          }
        />
        <Text style={errors.password ? styles.e : styles.hide}>
          {errors.password}
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ padding: 10, flex: 1 }}>
          <Button
            // onPress={() => navigation.navigate("Trang Chủ")}
            onPress={() => {
              login();
            }}
            style={{ backgroundColor: Colors.main }}
            buttonStyle={{ backgroundColor: Colors.main }}
            titleStyle={{ color: "white" }}
            title="ĐĂNG NHẬP"
            type="outline"
          />
        </View>
        <View style={{ padding: 10, flex: 1 }}>
          <Button
            style={{ backgroundColor: Colors.main }}
            buttonStyle={{ backgroundColor: Colors.main }}
            titleStyle={{ color: "white" }}
            onPress={() => navigation.navigate("RegisterScreen")}
            title="Đăng Ký"
            type="outline"
          />
        </View>
      </View>
      <View
        style={{
          padding: 10,
          flex: 3,
          alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
