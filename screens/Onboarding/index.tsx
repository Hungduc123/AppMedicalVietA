import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { RootStackParamList } from "../../constant/RootStackParamList";
type OnboardingScreenProp = StackNavigationProp<
  RootStackParamList,
  "OnboardingScreen"
>;
export default function OnboardingScreen() {
  const navigation = useNavigation<OnboardingScreenProp>();
  return (
    <Onboarding
      onSkip={() => {
        navigation.navigate("DrawerComponent");
      }}
      onDone={() => {
        navigation.navigate("DrawerComponent");
      }}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ height: 200, width: 200 }}
              source={require("../../assets/onboarding1.png")}
            />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ height: 200, width: 200 }}
              source={require("../../assets/onboarding2.png")}
            />
          ),

          title: "The Title",
          subtitle: "This is the subtitle that sumplements the title.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ height: 200, width: 200 }}
              source={require("../../assets/logo.png")}
            />
          ),
          title: "Triangle",
          subtitle: "Beautiful, isn't it?",
        },
      ]}
    />
  );
}
