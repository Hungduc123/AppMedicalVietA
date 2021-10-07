import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import AnimatedExample from "../AnimatedExample";
import InformationCodeScreen from "../InformationCodeScreen";

import VerifyCodeScreenStep1 from "./VerifyCodeScreenStep1";
import styles from "./VerifyCodeScreenStep1/styles";
import VerifyCodeScreenStep2 from "./VerifyCodeScreenStep2";

export default function VerifyCodeScreen({ navigation }: any) {
  const tempStep = useSelector((state: any) => state.reduxStepCreatCode);

  const step = tempStep.step;
  const [hadCode, setHadCode] = useState<string>("");
  useEffect(() => {
    const getCodeVerification = async () => {
      try {
        const value = await AsyncStorage.getItem("storeCodeVerification");
        if (value !== null) {
          setHadCode(value);
          console.log("====================================");
          console.log({ value });
          console.log("====================================");
        } else {
          setHadCode("");
        }
      } catch (error) {
        console.log({ error });
      }
    };
    getCodeVerification();
  }, [hadCode]);

  useEffect(() => {
    console.log("sss");
  });
  useEffect(() => {});
  return (
    <View style={{ width: "100%", height: "100%" }}>
      {!hadCode ? (
        <>
          {step === 1 ? (
            <VerifyCodeScreenStep1 />
          ) : step === 2 ? (
            <VerifyCodeScreenStep2 />
          ) : (
            step === 3 && <InformationCodeScreen />
          )}
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={async () => {
              try {
                await AsyncStorage.setItem("storeCodeVerification", "");
              } catch (error) {
                console.log({ error });
              }
            }}
          >
            <Text>clear</Text>
          </TouchableOpacity>
          {step === 3 ? (
            <InformationCodeScreen />
          ) : (
            step === 1 && <AnimatedExample code={hadCode} />
          )}
        </>
      )}
    </View>
  );
}
