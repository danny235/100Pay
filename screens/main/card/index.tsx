import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomView from "../../../components/Views/CustomView";
import {
  MediumText,
  RegularText,
} from "../../../components/styles/styledComponents";
import { Colors } from "../../../components/Colors";
import TabButton from "../../../components/TabButton";
import { PanGestureHandler } from "react-native-gesture-handler";
import Physical from "./physical";
import Virtual from "./virtual";
import { BaseNavigationT } from "../home/Home";
import BottomSheetModalComponent from "../../../components/BottomSheetModal/BottomSheetModalComponent";
import { Card, Copy } from "iconsax-react-native";
import Cards from "../../../components/Cards";
import { useToast } from "../../../components/CustomToast/ToastContext";
import { copyToClipboard } from "../../../utils";

interface CardI extends BaseNavigationT {}

export default function CardComponent({ navigation }: CardI) {
  const { fontScale } = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState("Physical");
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [activePhysicalCard, setActivePhysicalCard] = useState(0);
  const { showToast } = useToast();
  const onSwipe = (direction: string) => {
    if (direction === "left" && selectedTab === "Physical") {
      setSelectedTab("Virtual");
    } else if (direction === "right" && selectedTab === "Virtual") {
      setSelectedTab("Physical");
    }
  };

  const copy = (val: string) => {
    copyToClipboard(val);
    showToast("Copied", "success");
  };
  return (
    <CustomView style={{ paddingHorizontal: 0 }}>
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
   
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: Colors.white }}
        >
          {selectedTab === "Physical" ? (
            <Physical
              onViewPhysicalCardPress={() => setShowCardDetails(true)}
              navigation={navigation}
            />
          ) : (
            <Virtual navigation={navigation} />
          )}
        </ScrollView>
   

      <BottomSheetModalComponent
        snapPoints={["50%", "70%"]}
        show={showCardDetails}
        onClose={() => setShowCardDetails(false)}
      >
        <ScrollView className=" space-y-4 px-5">
          <View className="flex-row items-center mb-0 space-x-1">
            <Card color={Colors.primary} />
            <View
              style={{ backgroundColor: Colors.ash, height: 13, width: 1 }}
            />
            <MediumText style={{ fontSize: 17 / fontScale }}>
              Card Details
            </MediumText>
          </View>
          <RegularText style={{ fontSize: 15 / fontScale }}>
            Copy card details here, disclosing these details to anyone will put
            your money at high risk.
          </RegularText>

          <Cards onCardChange={(index) => setActivePhysicalCard(index)} />
          <View
            style={{ backgroundColor: Colors.memojiBackground }}
            className="rounded-lg p-5"
          >
            <MediumText
              style={{
                fontSize: 15 / fontScale,
                borderBottomColor: Colors.balanceBlack,
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}
            >
              {activePhysicalCard === 0
                ? "Standard"
                : activePhysicalCard === 1
                ? "Elite"
                : "Black"}
            </MediumText>

            <View
              style={{ borderTopColor: Colors.ash, borderTopWidth: 1 }}
              className="pt-3 space-y-4"
            >
              <View className="flex-row justify-between">
                <RegularText>Card Number:</RegularText>
                <View className="flex-row items-center space-x-1">
                  <MediumText>0000-0000-0000-0000</MediumText>
                  <Copy
                    color={Colors.primary}
                    size={16}
                    onPress={() => copy("me")}
                  />
                </View>
              </View>

              <View className="flex-row justify-between">
                <RegularText>Expiry Date:</RegularText>
                <View className="flex-row items-center space-x-1">
                  <MediumText>00/00</MediumText>
                  <Copy
                    color={Colors.primary}
                    size={16}
                    onPress={() => copy("me")}
                  />
                </View>
              </View>

              <View className="flex-row justify-between">
                <RegularText>CVV:</RegularText>
                <View className="flex-row items-center space-x-1">
                  <MediumText>000</MediumText>
                  <Copy
                    color={Colors.primary}
                    size={16}
                    onPress={() => copy("me")}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </BottomSheetModalComponent>
    </CustomView>
  );
}
