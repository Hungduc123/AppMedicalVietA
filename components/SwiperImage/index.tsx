import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import { styles } from "../../constant/styles";
import { banner } from "../../FakeData";

export default function SwiperImage() {
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
              // setShowInformationBanner(true);

              // setNewCurrent(item);
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
                width: "100%",
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
}
