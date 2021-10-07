import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useRef, useState, useLayoutEffect } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { Colors } from "../../constant/colors";
import { RootStackParamList } from "../../constant/RootStackParamList";
import { styles } from "../../constant/styles";
import { uriBg } from "../../FakeData";

export default function ModalEditUser() {
  const [numberPhone, setNumberPhone] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = useState<string>("");

  const [errors, setErrors] = useState<any>({});
  const [address, setAddress] = useState<string>("");

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
    const regNumberPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (
      userName !== "" &&
      numberPhone !== "" &&
      email !== "" &&
      address !== ""
    ) {
      if (!regEmail.test(email)) {
        setErrors({ email: "Email phải đúng định dạng, vui lòng nhập lại" });
      } else if (!regNumberPhone.test(numberPhone)) {
        setErrors({
          numberPhone: "Vui lòng nhập đúng số điện thoại",
        });
      } else {
        // RegisterComplete();

        setUserName("");
        setEmail("");
        setAddress("");
        setNumberPhone("");
        // alert("dk thanh cong");
      }
    } else {
      //  alert("check again, please");
      if (userName === "") {
        setErrors({ userName: "Vui lòng nhập Tên " });
      } else if (email === "") {
        setErrors({ email: "Vui lòng nhập email" });
      } else if (numberPhone === "") {
        setErrors({ numberPhone: "Vui lòng nhập số điện thoại" });
      } else if (address === "") {
        setErrors({ address: "Vui lòng nhập địa chỉ" });
      }
    }
  };
  return (
    <ImageBackground source={{ uri: uriBg }} style={{ padding: 10, flex: 1 }}>
      <Image
        resizeMode="contain"
        source={{
          uri: "https://vietamedical.com/images/logo/logo-viet-a-medical-ngang.png",
        }}
        style={{
          width: "100%",
          height: "6%",
          margin: 10,
        }}
      ></Image>
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
        label="Nhập tên"
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
        keyboardType="phone-pad"
        returnKeyType="next"
        onSubmitEditing={() => input3.current.focus()}
        ref={input2}
        outlineColor={Colors.main}
        underlineColor="deepskyblue"
        selectionColor="deepskyblue"
        mode="outlined"
        label="Nhập số điện thoại"
        error={errors.numberPhone}
        value={numberPhone}
        onChangeText={(text) => setNumberPhone(text)}
        left={<TextInput.Icon color={Colors.main} name="phone" />}
      />
      <Text style={errors.numberPhone ? styles.e : styles.hide}>
        {errors.numberPhone}
      </Text>
      <TextInput
        onSubmitEditing={() => register()}
        ref={input3}
        outlineColor={Colors.main}
        underlineColor="deepskyblue"
        selectionColor="deepskyblue"
        mode="outlined"
        label="Nhập địa chỉ"
        error={errors.address}
        value={address}
        onChangeText={(text) => setAddress(text)}
        left={<TextInput.Icon color={Colors.main} name="home" />}
      />
      <Text style={errors.address ? styles.e : styles.hide}>
        {errors.address}
      </Text>
      <View style={{ padding: 10, flex: 1 }}>
        <Button
          buttonStyle={{ backgroundColor: Colors.main }}
          style={{ backgroundColor: Colors.main }}
          titleStyle={{ color: "white" }}
          onPress={() => register()}
          title="Gửi"
          type="outline"
        />
      </View>
    </ImageBackground>
  );
}
