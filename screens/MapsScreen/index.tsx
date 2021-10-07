import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { LatLng, Marker, Region } from "react-native-maps";

import Geolocation from "@react-native-community/geolocation";
import { marker } from "../../typeData";
import MapViewDirections from "react-native-maps-directions";
import WebView from "react-native-webview";
import { log } from "react-native-reanimated";
// import GetLocation from "react-native-get-location";

export default function MapsScreen({ navigation }: any) {
  const GOOGLE_MAPS_APIKEY = "AIzaSyD6OAz2mQmiGWi6mPIjbefiHntgaAQygDU";
  // const [position, setPosition] = useState<Region>({
  //   latitude: 0,
  //   longitude: 0,
  //   latitudeDelta: 0,
  //   longitudeDelta: 0,
  // });
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
    setTimeout(() => {
      setPosition({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      });
    }, 1000);
  });
  const findNearest = (position: any) => {
    console.log("====================================");
    console.log("aaa");
    console.log("====================================");
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
    findNearest(position);
    console.log("useEffect");
  }, [position]);
  return (
    <View style={styles.container}>
      {/* <MapView
        style={styles.map}
        initialRegion={{
          ...position,
        }}
        zoomEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))} */}
      {/* <MapViewDirections
          origin={{
            latitude: position.latitude,
            longitude: position.longitude,
          }}
          destination={{ latitude: 10.758621, longitude: 106.658415 }}
          apikey={GOOGLE_MAPS_APIKEY}
        /> */}
      {/* </MapView>?\ */}
      {addressNearest.title === "Phòng khám Đa khoa Việt Á Y Dược 99" && (
        <WebView
          source={{
            uri: `https://www.google.com/maps/dir/${position.latitude},${position.longitude}/Ph%C3%B2ng+kh%C3%A1m+%C4%90a+khoa+Vi%E1%BB%87t+%C3%81+Y+D%C6%B0%E1%BB%A3c+99,+109+Thu%E1%BA%ADn+Ki%E1%BB%81u,+P.4,+Qu%E1%BA%ADn+11,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh+700000,+Vi%E1%BB%87t+Nam/@10.6367086,106.5697406,12z/data=!3m1!4b1!4m17!1m6!3m5!1s0x31752f376fc0a4c1:0xf1fdbe4b82da8601!2zUGjDsm5nIGtow6FtIMSQYSBraG9hIFZp4buHdCDDgSBZIETGsOG7o2MgOTk!8m2!3d10.758621!4d106.658415!4m9!1m1!4e1!1m5!1m1!1s0x31752f376fc0a4c1:0xf1fdbe4b82da8601!2m2!1d106.658415!2d10.758621!3e0?hl=vi`,
          }}
        />
      )}
      {addressNearest.title ===
        "Việt Á Medical - Phòng khám đa khoa Trương Phước Phan" && (
        <WebView
          source={{
            uri: `https://www.google.com/maps/dir/${position.latitude},${position.longitude}/Vi%E1%BB%87t+%C3%81+Medical+-+Ph%C3%B2ng+kh%C3%A1m+%C4%91a+khoa+Tr%C6%B0%C6%A1ng+Ph%C6%B0%E1%BB%9Bc+Phan,+98+Tr%C6%B0%C6%A1ng+Ph%C6%B0%E1%BB%9Bc+Phan,+B%C3%ACnh+Tr%E1%BB%8B+%C4%90%C3%B4ng,+B%C3%ACnh+T%C3%A2n,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh+71910,+Vi%E1%BB%87t+Nam/@10.6442536,106.5206153,12z/data=!3m1!4b1!4m18!1m7!3m6!1s0x31752ddb28a12f1f:0xcd64c8e2a70fb99c!2zVmnhu4d0IMOBIE1lZGljYWwgLSBQaMOybmcga2jDoW0gxJFhIGtob2EgVHLGsMahbmcgUGjGsOG7m2MgUGhhbg!8m2!3d10.7643948!4d106.6129623!15sCixwaMOybmcga2jDoW0gxJFhIGtob2EgdHLGsMahbmcgcGjGsOG7m2MgcGhhbpIBDm1lZGljYWxfY2xpbmlj!4m9!1m1!4e1!1m5!1m1!1s0x31752ddb28a12f1f:0xcd64c8e2a70fb99c!2m2!1d106.6129623!2d10.7643948!3e0?hl=vi-VN`,
          }}
        />
      )}
      {addressNearest.title === "Phòng khám Đa Khoa Tam Thăng" && (
        <WebView
          source={{
            uri: `https://www.google.com/maps/dir/${position.latitude},${position.longitude}/15.6161701,108.4758289/@13.0610656,105.7300665,7z/data=!3m1!4b1!4m13!1m7!3m6!1s0x0:0x0!2zMTXCsDM2JzU4LjIiTiAxMDjCsDI4JzMzLjAiRQ!3b1!8m2!3d15.6161701!4d108.4758289!4m4!1m1!4e1!1m0!3e0?hl=vi-VN`,
          }}
        />
      )}
      {addressNearest.title === "Phòng khám Đa khoa khu vực Đông Quế Sơn" && (
        <WebView
          source={{
            uri: `https://www.google.com/maps/dir/${position.latitude},${position.longitude}/15.7924988,108.317107/@13.1495022,105.7300681,7z/data=!3m1!4b1!4m13!1m7!3m6!1s0x0:0x0!2zMTXCsDQ3JzMzLjAiTiAxMDjCsDE5JzAxLjYiRQ!3b1!8m2!3d15.7924988!4d108.317107!4m4!1m1!4e1!1m0!3e0?hl=vi-VN`,
          }}
        />
      )}
      {addressNearest.title === "Phòng khám Lê Đình Cẩn" && (
        <WebView
          source={{
            uri: `https://www.google.com/maps/dir/${position.latitude},${position.longitude}/139+L%C3%AA+%C4%90%C3%ACnh+C%E1%BA%A9n,+T%C3%A2n+T%E1%BA%A1o,+B%C3%ACnh+T%C3%A2n,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh+700000,+Vi%E1%BB%87t+Nam/@10.6373147,106.5206153,12z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x31752c48dbdaaae5:0x4dd243f9abdcfd3b!2m2!1d106.600627!2d10.759598!3e0?hl=vi-VN`,
          }}
        />
      )}
    </View>
  );
}
// latitude: 10.7586210,
// longitude: 106.6584150}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
