import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Linking,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Button, Icon, Input } from "react-native-elements";
// import { Card } from "react-native-paper";
import { styles } from "../../constant/styles";
import { banner, uriBg } from "../../FakeData";
import InformationNewScreen from "../../screens/InformationNewScreen";

import { SwiperFlatList } from "react-native-swiper-flatlist";
import InformationBannerScreen from "../../screens/InformationBannerScreen";
import { Card, Paragraph, Title } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../constant/RootStackParamList";

// import { Card } from "native-base";
type ScrollNewsScreenProp = StackNavigationProp<
  RootStackParamList,
  "ScrollNews"
>;
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import VipCardScreen from "../../screens/VipCardScreen";
import ServiceScreen from "../../screens/ServiceScreen";
import { Colors } from "../../constant/colors";
import Foundation from "@expo/vector-icons/build/Foundation";
import { getNews } from "../../apis";
import { dataNewsApi } from "../../typeData";
import { useSelector } from "react-redux";

const Tab = createMaterialTopTabNavigator();
export default function ScrollNews({ extraData }: any) {
  const [showInformationNew, setShowInformationNew] = useState<boolean>(false);
  const lastPage = useSelector((state: any) => state.reduxPageNews);

  const [showInformationBanner, setShowInformationBanner] =
    useState<boolean>(false);
  const [newCurrent, setNewCurrent] = useState<dataNewsApi | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [listTemp, setListTemp] = useState<any>([]);

  useEffect(() => {
    setListTemp(extraData);
  }, [extraData]);

  const [fetchingStatus, setFetchingStatus] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = React.useState(false);

  let onEndReached = false;

  const Footer = () => {
    return (
      <>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          {lastPage.lastPage > page && (
            <TouchableOpacity onPress={() => reLoadCallApi()}>
              <Text style={{ fontSize: 20 }}>Xem Thêm...</Text>
            </TouchableOpacity>
          )}

          {isLoading && (
            <ActivityIndicator
              size="large"
              color={Colors.main}
              style={{ marginLeft: 6 }}
            />
          )}
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              padding: 10,
            }}
            source={{
              uri: "https://vietamedical.com/public/images/newsletter.png",
            }}
          />
          <Text
            style={{
              width: "70%",

              padding: 10,
            }}
          >
            "Đăng ký để nhận thông tin ưu đãi, sự kiện, kiến thức y khoa từ Hệ
            Thống Phòng Khám Việt Á”
          </Text>
          <View style={{ width: "60%" }}>
            <Input
              placeholder="Địa chỉ Email của bạn"
              leftIcon={<Icon name="email" size={24} color={Colors.main} />}
            />
          </View>
          <Text>Đặt lịch hẹn khám ngay :</Text>
          <Button
            onPress={() => {
              Linking.openURL("tel:1900571543");
            }}
            title="Gọi 1900571543"
            type="clear"
          />
        </View>
      </>
    );
  };
  const SwiperImage = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <SwiperFlatList
          autoplay
          autoplayDelay={5}
          autoplayLoop
          autoplayLoopKeepAnimation
          index={2}
          showPagination
          data={banner}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                console.log({ item });
                setShowInformationBanner(true);

                setNewCurrent(item);
              }}
              style={[
                styles.child,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 10,
                },
              ]}
            >
              <Image
                source={{
                  uri: item.src,
                }}
                // source={{ uri: item.img }}
                style={{
                  width: "95%",
                  height: 200,
                  borderRadius: 30,
                  resizeMode: "stretch",
                }}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const callApi = (page: number) => {
    getNews(page)
      .then((res: any) => {
        // const countries = _.sortBy(res.data, "Country");
        let arrTemp: any = [];

        res.data.value.data.forEach((element: any) => {
          if (element.cat_alias === extraData[0].cat_alias) {
            arrTemp.push(element);
          }
        });

        setListTemp([...listTemp, ...arrTemp]);
      })
      .catch((e) => {
        console.error({ e });
      });
  };
  const reLoadCallApi = () => {
    setIsLoading(true);
    if (page < lastPage.lastPage) {
      callApi(page + 1); // tải dũ liệu trang 2
      setPage(page + 1); // set trang tiếp theo
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  // const apiCall = () => {
  //   if (page < 2) {
  //     let a: any[];
  //     switch (page) {
  //       case 0:
  //         a = data1;
  //         break;
  //       case 1:
  //         a = data2;
  //         break;
  //     }
  //     setPage(page + 1);
  //     setIsLoading(true);

  //     setTimeout(function () {
  //       setResponseList([...responseList, ...a]);

  //       setIsLoading(false);
  //     }, 1000);
  //   } else {
  //     setResponseList(data0);
  //     setPage(0);
  //   }

  //   //  that.setState({ responseList: [ ...this.state.responseList, ...responseJson ], isLoading: false,setOnLoad: true  });
  // };
  const wait = (timeout: any) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log("====================================");
    console.log("onRefresh");
    console.log("====================================");

    wait(500).then(() => setRefreshing(false));
  }, []);

  return (
    <ImageBackground
      source={{
        uri: uriBg,
      }}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <FlatList
        style={{
          flex: 1,
          width: "100%",
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor="white"
          />
        }
        data={listTemp}
        initialNumToRender={8}
        maxToRenderPerBatch={2}
        onEndReachedThreshold={0.1}
        keyExtractor={(item) => item.id.toString()}
        // onEndReached={() => {
        //   //   apiCall(); // on end reached
        //   //   onEndReached = true;
        //   // }
        //   apiCall();
        //

        // }}
        ListFooterComponent={() => <Footer></Footer>}
        ListHeaderComponent={() => <SwiperImage></SwiperImage>}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                shadowOpacity: 0.2,
                shadowRadius: 30,
                // shadowOffset: { height: -17, width: 14 },
              }}
              onPress={() => {
                setShowInformationNew(true);

                setNewCurrent(item);
              }}
            >
              <Card
                style={{
                  padding: 10,
                  margin: 10,
                  borderRadius: 10,
                  width: "90%",
                  shadowOpacity: 0.5,
                  // shadowRadius: 12,
                  // shadowOffset: { height: -17, width: 14 },
                }}
              >
                <View style={{ flex: 1, flexDirection: "row", height: "100%" }}>
                  <Foundation
                    style={{ position: "absolute", right: 0, top: 0 }}
                    name="burst-new"
                    size={30}
                    color={Colors.red}
                  />
                  {item.IsLike !== null && item.IsLike !== 0 && (
                    <AntDesign
                      style={{ position: "absolute", right: 0, bottom: 0 }}
                      name="heart"
                      size={30}
                      color={Colors.red}
                    />
                  )}
                  <View style={{ flex: 1.5, height: "100%" }}>
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,
                        resizeMode: "contain",
                      }}
                      source={{
                        uri: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 3,
                      height: "100%",
                      paddingTop: 12,
                      paddingEnd: 12,
                    }}
                  >
                    <Card.Content>
                      {/* <Title style={{ fontSize: 12 }}> {item.name}</Title> */}
                      <Text
                        style={{
                          fontSize: 15,

                          fontWeight: "bold",
                        }}
                      >
                        {item.news_name}
                      </Text>
                      <Paragraph>
                        {item.news_small_description.slice(0, 50)}{" "}
                        <Text style={{ fontStyle: "italic" }}>...Xem thêm</Text>
                      </Paragraph>
                    </Card.Content>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="clockcircleo" size={20} color="gray" />
                  <Text style={{ padding: 10, color: "gray" }}>
                    {item.created_at}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        )}
      ></FlatList>

      <Modal
        onRequestClose={() => {
          setShowInformationNew(false);
        }}
        animationType="slide"
        transparent={false}
        visible={showInformationNew}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {Platform.OS === "ios" && (
            <TouchableOpacity onPress={() => setShowInformationNew(false)}>
              <AntDesign
                style={{ paddingStart: 10 }}
                name="close"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          )}

          <InformationNewScreen inforNew={newCurrent} dataList={listTemp} />
        </SafeAreaView>
      </Modal>
      <Modal
        onRequestClose={() => {
          setShowInformationBanner(false);
        }}
        animationType="slide"
        transparent={false}
        visible={showInformationBanner}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {Platform.OS === "ios" && (
            <TouchableOpacity onPress={() => setShowInformationBanner(false)}>
              <AntDesign
                style={{ paddingStart: 10 }}
                name="close"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          )}

          <InformationBannerScreen inforNew={newCurrent} />
        </SafeAreaView>
      </Modal>
    </ImageBackground>
  );
}
