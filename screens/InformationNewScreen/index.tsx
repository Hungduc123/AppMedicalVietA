import { AntDesign } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import Modal from "react-native-modal";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Card, Paragraph } from "react-native-paper";
import BottomNav from "../../components/BottomNav";
import { Colors } from "../../constant/colors";
import { RootStackParamList } from "../../constant/RootStackParamList";
import Ionicons from "react-native-vector-icons/Ionicons";
import ScrollNews from "../../components/ScrollNews";
import ServiceScreen from "../ServiceScreen";
import { ButtonGroup } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { dataNewsApi } from "../../typeData";
import Foundation from "@expo/vector-icons/build/Foundation";

const Tab = createMaterialTopTabNavigator();
type TrackingScreenProp = StackNavigationProp<
  RootStackParamList,
  "InformationNewScreen"
>;

export default function InformationNewScreen({ inforNew, dataList }: any) {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  function arrayRemove(arr: Array<any>, value: any) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }

  const navigation = useNavigation<TrackingScreenProp>();
  const listSeeMore = arrayRemove(dataList, inforNew);
  const [itemChooseSeeMore, setItemChooseSeeMore] = useState<any>({});
  console.log({ listSeeMore });
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const News = ({ extraData }: any) => {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Card
          style={{
            shadowColor: `${Colors.main}`,
            padding: 10,
            borderRadius: 10,
            width: "95%",
          }}
        >
          <Text style={{ paddingStart: 10, fontSize: 20, fontWeight: "bold" }}>
            {extraData.news_name}
          </Text>
          <View
            style={{
              paddingStart: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign name="clockcircleo" size={20} color="gray" />
            <Text style={{ padding: 10, color: "gray" }}>
              {extraData.created_at}
            </Text>
          </View>
        </Card>
        <ScrollView style={{ width: "100%", height: "100%" }}>
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
                uri: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg",
              }}
            />
          </View>

          <Text style={{ padding: 25, fontSize: 20 }}>
            {extraData.news_small_description}
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  };
  const TinGanGiong = () => {
    return (
      <>
        <FlatList
          style={{
            flex: 1,
            width: "100%",
          }}
          data={listSeeMore}
          initialNumToRender={8}
          maxToRenderPerBatch={2}
          onEndReachedThreshold={0.1}
          keyExtractor={(item) => item.id.toString()}
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
                  toggleModal();
                  console.log("press");
                  setItemChooseSeeMore(item);
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
                  <View
                    style={{ flex: 1, flexDirection: "row", height: "100%" }}
                  >
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
                          <Text style={{ fontStyle: "italic" }}>
                            ...Xem thêm
                          </Text>
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
          backdropOpacity={0.95}
          backdropColor="white"
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          isVisible={isModalVisible}
          onBackButtonPress={toggleModal}
          // swipeDirection="down"
          onSwipeComplete={toggleModal}
          scrollHorizontal={true}
        >
          <SafeAreaView
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <ScrollView
              style={{ width: "100%", height: "70%", backgroundColor: "white" }}
            >
              {/* <Button onPress={toggleModal}> title="Hide modal"</Button> */}
              {/* <Text>{JSON.stringify(itemChooseSeeMore)}(</Text> */}
              <News extraData={itemChooseSeeMore} />
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </>
    );
  };
  const News2 = () => {
    return <Text>New2</Text>;
  };

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

      <Tab.Navigator>
        {/* <Tab.Screen name="Tin Tức" component={News} /> */}
        <Tab.Screen name="Tin Tức">
          {(props) => <News {...props} extraData={inforNew} />}
        </Tab.Screen>
        <Tab.Screen name="Xem Thêm" component={TinGanGiong} />
        <Tab.Screen name="Something Else" component={News2} />
      </Tab.Navigator>
    </View>
  );
}
