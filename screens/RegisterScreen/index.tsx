import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useRef, useState, useLayoutEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { Colors } from "../../constant/colors";
import { RootStackParamList } from "../../constant/RootStackParamList";
import { styles } from "../../constant/styles";
import { uriBg } from "../../FakeData";

type RegisterScreenProp = StackNavigationProp<
  RootStackParamList,
  "RegisterScreen"
>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Đăng Ký",
    });
  }, [navigation]);
  const [password, setPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [hidden, setHidden] = useState<boolean>(true);
  const [errors, setErrors] = useState<any>({});
  const input1 = useRef<any>(null);
  const input2 = useRef<any>(null);
  const input3 = useRef<any>(null);

  const register = () => {
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    });
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regPassword =
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
    if (
      userName !== "" &&
      password !== "" &&
      email !== "" &&
      confirmPassword !== ""
    ) {
      if (!regEmail.test(email)) {
        setErrors({ email: "Email phải đúng định dạng, vui lòng nhập lại" });
      } else if (!regPassword.test(password)) {
        setErrors({
          password:
            "Password có ít nhất 6 ký tự, có ít nhất 1 ký tự viết hoa, 1 ký tự số, 1 ký tự đặc biệt",
        });
      } else if (password !== confirmPassword) {
        setErrors({
          confirmPassword: "Mật khẩu nhập chưa chính xác",
        });
      } else {
        // RegisterComplete();
        navigation.navigate("LoginScreen");
        setUserName("");
        setEmail("");
        setConfirmPassword("");
        setPassword("");
        // alert("dk thanh cong");
      }
    } else {
      //  alert("check again, please");
      if (userName === "") {
        setErrors({ userName: "Vui lòng nhập Tên Đăng Nhập" });
      } else if (email === "") {
        setErrors({ email: "Vui lòng nhập email" });
      } else if (password === "") {
        setErrors({ password: "Vui lòng nhập password" });
      } else if (confirmPassword === "") {
        setErrors({ confirmPassword: "Vui lòng nhập lại password" });
      }
    }
  };

  return (
    <ImageBackground source={{ uri: uriBg }} style={{ padding: 10, flex: 1 }}>
      <TextInput
        style={{ borderColor: "red" }}
        autoCorrect
        returnKeyType="next"
        importantForAutofill="auto"
        autoCompleteType="username"
        onSubmitEditing={() => input1.current.focus()}
        outlineColor={Colors.main}
        underlineColor="deepskyblue"
        selectionColor="deepskyblue"
        mode="outlined"
        label="Tên Đăng Nhập"
        value={userName}
        error={errors.userName}
        onChangeText={(text) => setUserName(text)}
        left={<TextInput.Icon color={Colors.main} name="account" />}
      />

      <Text style={errors.userName ? styles.e : styles.hide}>
        {errors.userName}
      </Text>
      <TextInput
        keyboardType="email-address"
        autoCorrect
        returnKeyType="next"
        importantForAutofill="auto"
        autoCompleteType="email"
        onSubmitEditing={() => input2.current.focus()}
        ref={input1}
        outlineColor={Colors.main}
        underlineColor="deepskyblue"
        selectionColor="deepskyblue"
        mode="outlined"
        label="Nhập email"
        error={errors.email}
        value={email}
        onChangeText={(text) => setEmail(text)}
        left={<TextInput.Icon color={Colors.main} name="email" />}
      />
      <Text style={errors.email ? styles.e : styles.hide}>{errors.email}</Text>
      <TextInput
        returnKeyType="next"
        onSubmitEditing={() => input3.current.focus()}
        ref={input2}
        outlineColor={Colors.main}
        underlineColor="deepskyblue"
        selectionColor="deepskyblue"
        mode="outlined"
        label="Password"
        error={errors.password}
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
      <TextInput
        onSubmitEditing={() => register()}
        ref={input3}
        outlineColor={Colors.main}
        underlineColor="deepskyblue"
        selectionColor="deepskyblue"
        mode="outlined"
        label="Nhập lại password"
        error={errors.confirmPassword}
        secureTextEntry={hidden}
        right={
          <TextInput.Icon
            name={`${!hidden ? "eye" : "eye-off"}`}
            color={Colors.main}
            onPress={() => {
              setHidden(!hidden);
            }}
          />
        }
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        left={
          <TextInput.Icon color={Colors.main} name="form-textbox-password" />
        }
      />
      <Text style={errors.confirmPassword ? styles.e : styles.hide}>
        {errors.confirmPassword}
      </Text>
      <View style={{ padding: 10, flex: 1 }}>
        <Button
          buttonStyle={{ backgroundColor: Colors.main }}
          style={{ backgroundColor: Colors.main }}
          titleStyle={{ color: "white" }}
          onPress={() => register()}
          title="ĐĂNG KÝ"
          type="outline"
        />
      </View>
    </ImageBackground>
  );
}
