import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { Checkbox, RadioButton, TextInput } from "react-native-paper";
import { Button } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { styles } from "../../constant/styles";
import { fromDatKham } from "../../typeData";
import { timeKhambenh, uriBg } from "../../FakeData";

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import { Colors } from "../../constant/colors";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function DatKhamScreen() {
  ////////////////////////////////  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [numberPhone, setNumberPhone] = useState<string>("");
  const [sex, setSex] = useState<string>("male");
  const [address, setAddress] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [errors, setErrors] = useState<any>({});

  /////////
  const today = new Date();
  const [date, setDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState(false);
  //////////////////////////notify//////////////////////////
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const input1 = useRef<any>(null);
  const input2 = useRef<any>(null);
  const input3 = useRef<any>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  async function schedulePushNotification(
    timeNotification: number,
    content: any
  ) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "B???n c?? l???ch h???n kh??m b???nh",
        body: `L???ch kh??m b???nh v??o ${moment(content.date).format(
          "DD-MM-YYYY"
        )} l??c ${content.time} t???i ${content.address}`,
        data: { data: "goes here" },
      },
      trigger: { seconds: timeNotification },
    });
  }
  /////////////////////////////////////////////////
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log({ currentDate });
  };
  const localNotifyAppointmentDay = async () => {
    const today = new Date(moment().format());
    const appointmentDay = new Date(
      `${moment(date).format("YYYY-MM-DD")}T${time}+07:00`
    );
    console.log(`${moment(date).format("YYYY-MM-DD")}T${time}+07:00`);

    const convertSeconds: number =
      appointmentDay.getTime() / 1000 - today.getTime() / 1000;

    await schedulePushNotification(convertSeconds, {
      date,
      time,
      address,
    });
  };
  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const datKham = () => {
    setErrors({
      email: "",
      fullName: "",
      reason: "",
      numberPhone: "",
      address: "",
      time: "",
    });
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regNumberPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (
      fullName !== "" &&
      reason !== "" &&
      email !== "" &&
      numberPhone !== "" &&
      address !== "" &&
      time !== ""
    ) {
      if (!regEmail.test(email)) {
        setErrors({ email: "Email ph???i ????ng ?????nh d???ng, vui l??ng nh???p l???i" });
      } else if (!regNumberPhone.test(numberPhone)) {
        setErrors({
          numberPhone: "Vui l??ng nh???p ????ng s??? ??i???n tho???i",
        });
      } else {
        // RegisterComplete();
        // setFullName("");
        // setEmail("");
        // setNumberPhone("");
        // setReason("");
        // setAddress("");
        const form: fromDatKham = {
          fullName: fullName,
          email: email,
          numberPhone: numberPhone,
          sex: sex,
          address: address,
          reason: reason,
          date: date,
          time: time,
        };
        // ham thong bao local ngay kham
        // localNotifyAppointmentDay();
        setShowAlert(true);
        console.log(`?????t kh??m th??nh c??ng \n ${JSON.stringify(form)} `);
      }
    } else {
      //  alert("check again, please");
      if (fullName === "") {
        setErrors({ fullName: "Vui l??ng nh???p H??? v?? t??n" });
      } else if (email === "") {
        setErrors({ email: "Vui l??ng nh???p email" });
      } else if (numberPhone === "") {
        setErrors({ numberPhone: "Vui l??ng nh???p s??? ??i???n tho???i" });
      } else if (address === "") {
        setErrors({ address: "Vui l??ng ch???n ?????a ch??? kh??m b???nh" });
      } else if (time === "") {
        setErrors({ time: "Vui l??ng ch???n th???i gian kh??m b???nh" });
      } else if (reason === "") {
        setErrors({ reason: "Vui l??ng nh???p l?? do kh??m b???nh" });
      }
    }
  };
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
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={{ uri: uriBg }} style={{ flex: 1, padding: 10 }}>
        <Image
          resizeMode="contain"
          source={{
            uri: "https://vietamedical.com/images/logo/logo-viet-a-medical-ngang.png",
          }}
          style={{
            width: "100%",
            height: "7%",
            marginTop: 10,
          }}
        ></Image>

        <ScrollView>
          <View>
            <Button
              onPress={() => showDatepicker()}
              title=" Ch???n Ng??y Kh??m ????"
              type="outline"
            />
          </View>
          <Text style={{ fontSize: 20 }}>
            Ng??y ????ng k?? kh??m b???nh: {moment(date).format("DD/MM/YYYY")}
          </Text>
          {/* <Text>{moment(date).format("LL")}</Text> */}

          {show && (
            <RNDateTimePicker
              testID="dateTimePicker"
              value={
                new Date(today.getFullYear(), today.getMonth(), today.getDate())
              }
              minimumDate={
                new Date(today.getFullYear(), today.getMonth(), today.getDate())
              }
              maximumDate={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() + 30
                )
              }
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <TextInput
            blurOnSubmit
            autoCorrect
            returnKeyType="next"
            importantForAutofill="auto"
            autoCompleteType="username"
            onSubmitEditing={() => input1.current.focus()}
            outlineColor={Colors.main}
            underlineColor="deepskyblue"
            selectionColor="deepskyblue"
            mode="outlined"
            label="H??? v?? t??n"
            value={fullName}
            error={errors.fullName}
            onChangeText={(text) => setFullName(text)}
            left={<TextInput.Icon color={Colors.main} name="account" />}
          />

          <Text style={errors.fullName ? styles.e : styles.hide}>
            {errors.fullName}
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
            label="Email"
            value={email}
            error={errors.email}
            onChangeText={(text) => setEmail(text)}
            left={
              <TextInput.Icon
                color={Colors.main}
                onPress={() => {}}
                name="email"
              />
            }
          />
          <Text style={errors.email ? styles.e : styles.hide}>
            {errors.email}
          </Text>
          <TextInput
            keyboardType="phone-pad"
            dataDetectorTypes="phoneNumber"
            autoCorrect
            returnKeyType="next"
            importantForAutofill="auto"
            autoCompleteType="tel"
            onSubmitEditing={() => input3.current.focus()}
            ref={input2}
            outlineColor={Colors.main}
            underlineColor="deepskyblue"
            selectionColor="deepskyblue"
            mode="outlined"
            label="s??? ??i???n tho???i"
            value={numberPhone}
            error={errors.numberPhone}
            onChangeText={(text) => setNumberPhone(text)}
            left={
              <TextInput.Icon
                color={Colors.main}
                onPress={() => {}}
                name="cellphone-iphone"
              />
            }
          />
          <Text style={errors.numberPhone ? styles.e : styles.hide}>
            {errors.numberPhone}
          </Text>
          <RadioButton.Group
            onValueChange={(newValue) => setSex(newValue)}
            value={sex}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>Nam</Text>
                <RadioButton value="male" />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>N???</Text>
                <RadioButton value="female" />
              </View>
            </View>
          </RadioButton.Group>
          <View style={{ padding: 10 }}>
            <View style={{ padding: 10 }}>
              <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{
                  label: "Ch???n ?????a ch??? kh??m b???nh",
                  value: null,
                  color: "black",
                }}
                onValueChange={(value) => {
                  if (value === null) {
                    setAddress("");
                  } else {
                    setAddress(value);
                  }
                  console.log({ value });
                }}
                items={[
                  {
                    label: "B???nh vi???n 1",
                    value: "B???nh vi???n 1",
                    color: "black",
                  },
                  {
                    label: "B???nh vi???n 2",
                    value: "B???nh vi???n 2",
                    color: "black",
                  },
                  {
                    label: "B???nh vi???n 3",
                    value: "B???nh vi???n 3",
                    color: "black",
                  },
                ]}
                Icon={() => {
                  return (
                    <FontAwesome5
                      name="hospital-alt"
                      size={24}
                      color={Colors.main}
                    />
                  );
                }}
              />
              <Text style={errors.address ? styles.e : styles.hide}>
                {errors.address}
              </Text>
            </View>

            <View style={{ padding: 10 }}>
              <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{
                  label: "Ch???n gi??? kh??m b???nh",
                  value: null,
                  color: "black",
                }}
                onValueChange={(value) => {
                  if (value === null) {
                    setTime("");
                  } else {
                    setTime(value);
                  }
                  console.log({ value });
                }}
                items={timeKhambenh}
                Icon={() => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons
                        name="ios-time-outline"
                        size={24}
                        color={Colors.main}
                      />
                    </View>
                  );
                }}
              />
              <Text style={errors.time ? styles.e : styles.hide}>
                {errors.time}
              </Text>
            </View>
          </View>
          <TextInput
            onSubmitEditing={() => datKham()}
            ref={input3}
            outlineColor={Colors.main}
            underlineColor="deepskyblue"
            selectionColor="deepskyblue"
            mode="outlined"
            label="L?? do Kh??m"
            value={reason}
            onChangeText={(text) => setReason(text)}
            error={errors.reason}
            multiline={true}
            numberOfLines={5}
            left={
              <TextInput.Icon
                color={Colors.main}
                onPress={() => {}}
                name="clipboard-list-outline"
              />
            }
          />
          <Text style={errors.reason ? styles.e : styles.hide}>
            {errors.reason}
          </Text>
          <View style={{ padding: 10, flex: 1 }}>
            <Button
              buttonStyle={{ backgroundColor: Colors.main }}
              style={{ backgroundColor: Colors.main }}
              titleStyle={{ color: "white" }}
              onPress={() => datKham()}
              title="G???i"
              type="outline"
            />
          </View>
        </ScrollView>
        <AwesomeAlert
          //customView :object
          show={showAlert}
          showProgress={false}
          title="X??c nh???n"
          message="B???n ch???c ch???n v??? th??ng tin ???? nh???p v?? mu???n ?????t l???ch kh??m kh??ng?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Kh??ng"
          confirmText="????ng, ?????t l???ch ????"
          confirmButtonColor={Colors.main}
          onCancelPressed={() => {
            setShowAlert(false);
          }}
          onConfirmPressed={() => {
            localNotifyAppointmentDay();
            setShowAlert(false);
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

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
