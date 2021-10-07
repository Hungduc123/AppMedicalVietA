import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  ImageBackground,
  Linking,
  TouchableOpacity,
  Platform,
} from "react-native";
import { View, Text, Image } from "react-native";
import { Card, FAB, Portal, Provider } from "react-native-paper";

import Header_wrapper from "../../components/Header_wrapper";
import ScrollNews from "../../components/ScrollNews";
import { Colors } from "../../constant/colors";
import { styles } from "../../constant/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VipCardScreen from "../VipCardScreen";
import ServiceScreen from "../ServiceScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import PromotionScreen from "../PromotionScreen";
import { getNews } from "../../apis";
import Search from "../../components/Search/index";
import { banner } from "../../FakeData";
import SwiperFlatList from "react-native-swiper-flatlist";
import { reduxPageNews } from "../../reduxToolkit/reduxPageNews";
import { useDispatch } from "react-redux";
import { location } from "./locationclosest";

const Tab = createBottomTabNavigator();

export default function NewsScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: any) => setState({ open });
  const [data, setData] = useState<any>({});
  const { open } = state;
  const strKienThucYKhoa = "kien-thuc-y-khoa";
  const strTinYTe = "tin-y-te";
  const strUuDai = "uu-dai";
  const strGocTruyenThong = "goc-truyen-thong";

  // useEffect(() => {
  //   console.log("====================================");
  //   const a = location();
  //   console.log({ a });
  //   console.log("====================================");
  // }, []);
  const callApi = () => {
    getNews(1)
      .then((res: any) => {
        // const countries = _.sortBy(res.data, "Country");
        let arrTempKienThucYKhoa: any[] = [];
        let arrTempTinYTe: any[] = [];
        let arrTempUuDai: any[] = [];
        let arrTempGocTruyenThong: any[] = [];

        res.data.value.data.forEach((element: any) => {
          // if (element.cat_alias === strKienThucYKhoa) {
          //   arrTempKienThucYKhoa.push(element);
          // }
          switch (element.cat_alias) {
            case strKienThucYKhoa:
              arrTempKienThucYKhoa.push(element);
              break;
            case strTinYTe:
              arrTempTinYTe.push(element);
              break;
            case strUuDai:
              arrTempUuDai.push(element);
              break;
            case strGocTruyenThong:
              arrTempGocTruyenThong.push(element);
              break;
          }
        });
        setData({
          arrKienThucYKhoa: arrTempKienThucYKhoa,
          arrTinYTe: arrTempTinYTe,
          arrUuDai: arrTempUuDai,
          arrGocTruyenThong: arrTempGocTruyenThong,
        });
        let lastPage = res.data.value.last_page;
        const action = reduxPageNews({ lastPage });
        dispatch(action);
      })
      .catch((e) => {
        console.log({ e });
      });
  };
  useEffect(() => {
    callApi();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      <View style={{ flex: 0.5 }}>
        <Card
          style={{
            backgroundColor: `${Colors.main}`,
            width: "100%",
            flexDirection: "row",
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            flex: 1,
          }}
        >
          <Header_wrapper />
        </Card>
      </View>

      <View style={{ flex: 5, width: "100%" }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Góc Truyền Thông") {
                iconName = focused
                  ? "information-circle"
                  : "information-circle-outline";
              } else if (route.name === "Tin Tức Mới") {
                iconName = focused ? "newspaper" : "newspaper-outline";
              } else if (route.name === "Ưu Đãi") {
                iconName = focused ? "pricetag" : "pricetag-outline";
              } else if (route.name === "Kiến Thức Y Khoa") {
                iconName = focused
                  ? "information-circle"
                  : "information-circle-outline";
              } else if (route.name === "Tìm Kiếm") {
                iconName = focused ? "search" : "search-outline";
              }

              // You can return any component that you like here!
              return (
                <Ionicons name={`${iconName}`} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: Colors.main,
            tabBarInactiveTintColor: "gray",
            tabBarHideOnKeyboard: true,
          })}
        >
          <Tab.Screen name="Tin Tức Mới">
            {(props) => <ScrollNews {...props} extraData={data?.arrTinYTe} />}
          </Tab.Screen>
          <Tab.Screen name="Ưu Đãi">
            {(props) => <ScrollNews {...props} extraData={data?.arrUuDai} />}
          </Tab.Screen>
          <Tab.Screen name="Góc Truyền Thông">
            {(props) => (
              <ScrollNews {...props} extraData={data?.arrGocTruyenThong} />
            )}
          </Tab.Screen>

          <Tab.Screen name="Kiến Thức Y Khoa">
            {(props) => (
              <ScrollNews {...props} extraData={data?.arrKienThucYKhoa} />
            )}
          </Tab.Screen>
          <Tab.Screen name="Tìm Kiếm">
            {(props) => <Search {...props} extraData={data} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
      {/* <FAB
        animated={true}
        style={styles.fabCall}
        icon="phone"
        onPress={() => {
          Linking.openURL("tel:1900571543");
        }}
      />
      <FAB
        style={styles.fabEmergency}
        icon="google-maps"
        onPress={() => navigation.push("Bản đồ")}
      /> */}

      <FAB.Group
        fabStyle={{ backgroundColor: Colors.red }}
        style={styles.fab}
        visible={true}
        open={open}
        icon={open ? "arrow-down-bold-outline" : "hospital-building"}
        actions={[
          {
            style: { backgroundColor: Colors.red },
            icon: "google-maps",
            label: "Bản đồ",
            onPress: () => {
              location();

              // const addressNearest: any = location();
              // console.log("====================================");
              // console.log({ addressNearest });
              // console.log("====================================");
              // // // navigation.push("Bản đồ");
              // const scheme = Platform.select({
              //   ios: "maps:0,0?q=",
              //   android: "geo:0,0?q=",
              // });
              // const latLng = `${addressNearest.latlng.latitude},${addressNearest.latlng.longitude}`;
              // const label = "Custom Label";
              // const url: any = Platform.select({
              //   ios: `${scheme}${label}@${latLng}`,
              //   android: `${scheme}${latLng}(${label})`,
              // });
              // Linking.openURL(url);
            },
            small: false,
          },
          {
            style: { backgroundColor: Colors.red },
            small: false,
            icon: "phone",
            label: "Hotline",
            onPress: () => Linking.openURL("tel:1900571543"),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </SafeAreaView>
  );
}
