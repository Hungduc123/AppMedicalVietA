import Geolocation from "@react-native-community/geolocation";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Region } from "react-native-maps";
import WebView from "react-native-webview";
import { marker } from "../../typeData";

export default function index() {
  const [position, setPosition] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [addressNearest, setAddressNearest] = useState<any>({});
  const markers: marker[] = [
    {
      latlng: { latitude: 10.758621, longitude: 106.658415 },
      title: "Phòng khám Đa khoa Việt Á Y Dược 99",
      description:
        "109 Thuận Kiều, P.4, Quận 11, Thành phố Hồ Chí Minh 700000, Việt Nam",
    },
    {
      latlng: { latitude: 10.7643856, longitude: 106.6129563 },
      title: "Việt Á Medical - Phòng khám đa khoa Trương Phước Phan",
      description:
        "98 Trương Phước Phan, Bình Trị Đông, Bình Tân, Thành phố Hồ Chí Minh 71910, Việt Nam",
    },
    {
      latlng: { latitude: 15.6161701, longitude: 108.4758289 },
      title: "Phòng khám Đa Khoa Tam Thăng",
      description: "Thôn Vĩnh Bình, xã Tam Thăng, Thành Phố Tam Kỳ, Quảng Nam.",
    },
    {
      latlng: { latitude: 15.7924988, longitude: 108.317107 },
      title: "Phòng khám Đa khoa khu vực Đông Quế Sơn",
      description:
        " Thôn Hương Quế Đông, xã Quế Phú, huyện Quế Sơn, tỉnh Quảng Nam.",
    },
    {
      latlng: { latitude: 10.759598, longitude: 106.600627 },
      title: "Phòng khám Lê Đình Cẩn",
      description: " 139 Lê Đình Cẩn, P. Tân Tạo, Q. Bình Tân, TP.HCM",
    },
  ];

  Geolocation.getCurrentPosition((info): any => {
    setPosition({
      latitude: info.coords.latitude,
      longitude: info.coords.longitude,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5,
    });
  });
  const findNearest = () => {
    let itemNearest = markers[0];
    const distanceStart = Math.sqrt(
      (itemNearest.latlng.latitude - position.latitude) ** 2 +
        (itemNearest.latlng.longitude - position.longitude) ** 2
    );
    console.log({ distanceStart });

    markers.forEach((item) => {
      const distance = Math.sqrt(
        (item.latlng.latitude - position.latitude) ** 2 +
          (item.latlng.longitude - position.longitude) ** 2
      );
      if (distance < distanceStart) {
        itemNearest = item;
      }
      console.log({ distance });
    });
    setAddressNearest(itemNearest);

    console.log({ itemNearest });
  };
  useEffect(() => {
    findNearest();
  }, []);
  return (
    // <WebView
    //   source={{
    //     uri: "https://www.google.com/maps/search/ph%C3%B2ng+kh%C3%A1m+Vi%E1%BB%87t+%C3%81+/@10.8628385,106.5906049,11z/data=!3m1!4b1",
    //   }}
    // />
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://www.google.com/maps/dir/10.5179269,106.7119905/Ph%C3%B2ng+kh%C3%A1m+%C4%90a+khoa+Vi%E1%BB%87t+%C3%81+Y+D%C6%B0%E1%BB%A3c+99,+109+Thu%E1%BA%ADn+Ki%E1%BB%81u,+P.4,+Qu%E1%BA%ADn+11,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh+700000,+Vi%E1%BB%87t+Nam/@10.6367086,106.5697406,12z/data=!3m1!4b1!4m17!1m6!3m5!1s0x31752f376fc0a4c1:0xf1fdbe4b82da8601!2zUGjDsm5nIGtow6FtIMSQYSBraG9hIFZp4buHdCDDgSBZIETGsOG7o2MgOTk!8m2!3d10.758621!4d106.658415!4m9!1m1!4e1!1m5!1m1!1s0x31752f376fc0a4c1:0xf1fdbe4b82da8601!2m2!1d106.658415!2d10.758621!3e0?hl=vi",
        }}
      />
    </View>
  );
}
