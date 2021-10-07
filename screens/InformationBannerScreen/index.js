import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

import * as Animatable from "react-native-animatable";
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
import { uriBg } from "../../FakeData";

export default function InformationBannerScreen({ inforNew }) {
  return (
    <View style={{ flex: 1 }}>
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
      {/* <ScrollView style={{ width: "100%", height: "100%" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Image
            style={{ width: 300, height: 300, borderRadius: 10 }}
            source={{
              uri: inforNew.img,
            }}
          />
        </View>
      </ScrollView> */}
      <ImageHeaderScrollView
        maxHeight={200}
        minHeight={0}
        headerImage={{ uri: inforNew.src }}
      >
        <ImageBackground
          source={{
            uri: uriBg,
          }}
          style={{
            flex: 1,
            height: 1000,
          }}
        >
          <TriggeringView>
            <Text>Scroll Me!</Text>
          </TriggeringView>
        </ImageBackground>
      </ImageHeaderScrollView>
    </View>
  );
}
