import {
  Animated,
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { reduxStepCreatCode } from "../../../reduxToolkit/reduxStepCreatCode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHistory } from "react-router";

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
const source = {
  uri: "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png",
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }: any) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      // duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

export default function VerifyCodeScreenStep2(navigation: any) {
  const dispatch = useDispatch();
  const history = useHistory<any>();
  const valueCode = useSelector((state: any) => state.reduxStepCreatCode);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({ index, symbol, isFocused }: any) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };
  const onSubmitted = (value: string) => {
    if (value === valueCode.value) {
      console.log("thanh cong");
      storeCodeVerification(value);
      const action = reduxStepCreatCode({ step: 3, value: "" });
      dispatch(action);
    } else {
      console.log("that bai");
      setValue("");
    }
  };
  const storeCodeVerification = async (value: string) => {
    try {
      await AsyncStorage.setItem("storeCodeVerification", value);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    const backAction = () => {
      // Alert.alert("Hold on!", "Are you sure you want to go back?", [
      //   {
      //     text: "Cancel",
      //     onPress: () => null,
      //     style: "cancel",
      //   },
      //   { text: "YES", onPress: () => BackHandler.exitApp() },
      // ]);
      const action = reduxStepCreatCode({ step: 1, value: "" });
      dispatch(action);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Tạo mã xác thực</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MaterialCommunityIcons
          name="numeric-2-box-multiple-outline"
          size={50}
          color="lightskyblue"
        />
      </View>

      <Text style={styles.subTitle}>
        Vui lòng nhập lại mã số xác thực gồm 4 chữ số
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <View style={styles.nextButton}>
        <TouchableOpacity
          onPress={() => {
            onSubmitted(value);
          }}
        >
          <Text style={styles.nextButtonText}>Tiếp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
