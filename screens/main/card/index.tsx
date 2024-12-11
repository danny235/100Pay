import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomView from "../../../components/Views/CustomView";
import { MediumText } from "../../../components/styles/styledComponents";
import { Colors } from "../../../components/Colors";
import TabButton from "../../../components/TabButton";
import { PanGestureHandler } from "react-native-gesture-handler";
import Physical from "./physical";
import Virtual from "./virtual";
import { BaseNavigationT } from "../home/Home";

interface CardI extends BaseNavigationT {}

export default function Card({ navigation }: CardI) {
  const { fontScale } = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState("Physical");

  const onSwipe = (direction: string) => {
    if (direction === "left" && selectedTab === "Physical") {
      setSelectedTab("Virtual");
    } else if (direction === "right" && selectedTab === "Virtual") {
      setSelectedTab("Physical");
    }
  };
  return (
    <CustomView>
      <View className="flex-row justify-center mt-4">
        <View
          style={{
            backgroundColor: Colors.white,
            borderColor: Colors.ash,
            borderWidth: 1,
          }}
          className="flex-row space-x-2  rounded-[50px] px-1 py-1 items-center justify-between"
        >
          <TabButton
            label="Physical"
            isActive={selectedTab === "Physical"}
            onPress={() => setSelectedTab("Physical")}
          />

          <TabButton
            label="Virtual"
            isActive={selectedTab === "Virtual"}
            onPress={() => setSelectedTab("Virtual")}
          />
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: Colors.white }}
        >
          {selectedTab === "Physical" ? (
            <Physical navigation={navigation} />
          ) : (
            <Virtual navigation={navigation} />
          )}
        </ScrollView>
      </PanGestureHandler>
    </CustomView>
  );
}
