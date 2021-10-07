import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../../constant/RootStackParamList";
type ForgotPasswordScreenProp = StackNavigationProp<
  RootStackParamList,
  "ForgotPasswordScreen"
>;
const ForgotPasswordScreen = () => {
  const navigation = useNavigation<ForgotPasswordScreenProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Quên mật khẩu",
    });
  }, [navigation]);
  return (
    <View>
      <Text>ForgotPassword</Text>
    </View>
  );
};

export default ForgotPasswordScreen;
