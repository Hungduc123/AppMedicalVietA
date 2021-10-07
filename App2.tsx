import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  View,
  Text,
} from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsScreen from "./screens/NewsScreen";
import ChuyenKhoaScreen from "./screens/ChuyenKhoaScreen";
import GoiKhamScreen from "./screens/GoiKhamScreen";
import PromotionScreen from "./screens/PromotionScreen";
import VipCardScreen from "./screens/VipCardScreen";
import ServiceScreen from "./screens/ServiceScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerContent from "./screens/DrawerContent";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import InformationCodeScreen from "./screens/InformationCodeScreen";
import InformationUserScreen from "./screens/InformationUserScreen";
import MapsScreen from "./screens/MapsScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import OnboardingScreen from "./screens/Onboarding/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reduxLogin } from "./reduxToolkit/reduxLogin";
import Loading from "./components/Loading";
import CameraScreen from "./screens/CameraScreen";
import CameraComponent from "./screens/CameraScreen/CameraComponent";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App2() {
  const dispatch = useDispatch();
  const isSigning = useSelector((state: any) => state.reduxLogin);
  const [isSigningStorage, setIsSigningStorage] = useState<string>("");
  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem("dataLoginFromStorage");
        if (value !== null) {
          const action = reduxLogin({
            isSigning: true,
          });
          dispatch(action);
          setIsSigningStorage("yes");
          console.log(value);
        } else {
          setIsSigningStorage("no");
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    _retrieveData();
  }, []);

  function DrawerComponent() {
    return (
      <Drawer.Navigator
        drawerContent={(props: any) => (
          <DrawerContent {...props}></DrawerContent>
        )}
      >
        <Drawer.Screen name="Trang Chủ" component={NewsScreen}></Drawer.Screen>
        <Drawer.Screen name="Chuyên Khoa" component={ChuyenKhoaScreen} />
        <Drawer.Screen name="Gói khám" component={GoiKhamScreen} />
        <Drawer.Screen name="Ưu đãi" component={PromotionScreen} />
        <Drawer.Screen name="Vip Card" component={VipCardScreen} />
        <Drawer.Screen name="Dịch vụ" component={ServiceScreen} />
        <Drawer.Screen name="Tin Tức" component={NewsScreen} />

        <Drawer.Screen
          name="InformationCodeScreen"
          component={InformationCodeScreen}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <>
      {isSigningStorage === "yes" ? (
        <Provider store={store}>
          <SafeAreaView style={{ flex: 1 }}>
            {/* <StatusBar hidden={true} /> */}

            <NavigationContainer>
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

              <Stack.Navigator>
                <Stack.Screen
                  name="DrawerComponent"
                  component={DrawerComponent}
                  options={{ headerShown: false }}
                />
                {!isSigning.isSigning && (
                  <>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen
                      name="RegisterScreen"
                      component={RegisterScreen}
                    />
                  </>
                )}
                {/* <Stack.Screen name="Bản đồ" component={MapsScreen} /> */}

                <Stack.Screen
                  name="InformationUserScreen"
                  component={InformationUserScreen}
                />

                <Stack.Screen
                  name="InformationCodeScreen"
                  component={InformationCodeScreen}
                />
                <Stack.Screen
                  name="ForgotPasswordScreen"
                  component={ForgotPasswordScreen}
                />
                <Stack.Screen name="CameraScreen" component={CameraScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </Provider>
      ) : isSigningStorage == "no" ? (
        <Provider store={store}>
          <SafeAreaView style={{ flex: 1 }}>
            {/* <StatusBar hidden={true} /> */}

            <NavigationContainer>
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

              <Stack.Navigator>
                {!isSigning.isSigning && (
                  <>
                    <Stack.Screen
                      name="OnboardingScreen"
                      component={OnboardingScreen}
                      options={{ headerShown: false }}
                    />
                  </>
                )}

                <Stack.Screen
                  name="DrawerComponent"
                  component={DrawerComponent}
                  options={{ headerShown: false }}
                />
                {!isSigning.isSigning && (
                  <>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen
                      name="RegisterScreen"
                      component={RegisterScreen}
                    />
                  </>
                )}
                <Stack.Screen name="Bản đồ" component={MapsScreen} />

                <Stack.Screen
                  name="InformationUserScreen"
                  component={InformationUserScreen}
                />

                <Stack.Screen
                  name="InformationCodeScreen"
                  component={InformationCodeScreen}
                />
                <Stack.Screen
                  name="ForgotPasswordScreen"
                  component={ForgotPasswordScreen}
                />
                <Stack.Screen name="CameraScreen" component={CameraScreen} />
                <Stack.Screen
                  name="CameraComponent"
                  component={CameraComponent}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </Provider>
      ) : (
        isSigningStorage == "" && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Loading />
          </View>
        )
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
