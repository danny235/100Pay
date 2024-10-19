import {
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import CustomView from "../../../components/Views/CustomView";
import CustomHeader from "../../../components/headers/CustomHeaders";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/AppStacks";
import { ExportSquare } from "iconsax-react-native";
import { MediumText } from "../../../components/styles/styledComponents";
import { Colors } from "../../../components/Colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import SendWAddy from "./SendWAddy";
import SendWPayID from "./SendWPayID";

type SendCryptoT = {
  navigation: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, "SendCrypto">;
};

export default function SendCrypto({ navigation, route }: SendCryptoT) {
  const [selectedTab, setSelectedTab] = useState<"External" | "Internal">(
    "External"
  );
  const { fontScale } = useWindowDimensions();
  const onSwipe = (direction: string) => {
    if (direction === "left" && selectedTab === "External") {
      setSelectedTab("Internal");
    } else if (direction === "right" && selectedTab === "Internal") {
      setSelectedTab("External");
    }
  };
  return (
    <CustomView>
      <CustomHeader
        onPress={() => navigation.goBack()}
        text="Send Crypto"
        icon={<ExportSquare color={Colors.primary} variant="TwoTone" />}
      />
      <ScrollView style={{flex: 1}}>
        <View className="flex-row justify-between mt-4">
          <View
            style={{ backgroundColor: Colors.white }}
            className="flex-row space-x-4  rounded-[50px] px-1 py-1 items-center justify-between"
          >
            <Pressable
              className="  py-2 items-center justify-center"
              onPress={() => setSelectedTab("External")}
              style={{
                borderBottomColor:
                  selectedTab === "External" ? Colors.primary : "white",
                borderBottomWidth: selectedTab === "External" ? 1 : 0,
              }}
            >
              <MediumText
                style={{
                  color: selectedTab === "External" ? Colors.primary : "black",
                  fontSize: 14 / fontScale,
                }}
              >
                External
              </MediumText>
            </Pressable>
            <Pressable
              className="  py-2 items-center justify-center"
              onPress={() => setSelectedTab("Internal")}
              style={{
                borderBottomColor:
                  selectedTab === "Internal" ? Colors.primary : "white",
                borderBottomWidth: selectedTab === "Internal" ? 1 : 0,
              }}
            >
              <MediumText
                style={{
                  color: selectedTab === "Internal" ? Colors.primary : "black",
                  fontSize: 14 / fontScale,
                }}
              >
                Internal
              </MediumText>
            </Pressable>
          </View>

        </View>
          {/* Conditional rendering based on selectedTab with swipe gesture */}
          <PanGestureHandler
          
            onGestureEvent={(event) => {
              const { translationX } = event.nativeEvent;
              if (translationX > 50) {
                onSwipe("right");
              } else if (translationX < -50) {
                onSwipe("left");
              }
            }}
          >
            <ScrollView style={{ flex: 1 }}>
              {selectedTab === "External" ? <SendWAddy /> : <SendWPayID />}
            </ScrollView>
          </PanGestureHandler>
      </ScrollView>
    </CustomView>
  );
}
