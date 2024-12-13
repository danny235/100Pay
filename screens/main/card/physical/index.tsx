import {
  View,
  Image,
  useWindowDimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import CardImg from "../../../../assets/images/eliteCard.png";
import CoinImg from "../../../../assets/images/coins.png";
import { Colors } from "../../../../components/Colors";
import {
  BoldText,
  MediumText,
  RegularText,
} from "../../../../components/styles/styledComponents";
import { DoubleArrowForward } from "../../../../components/SvgAssets";
import { Card, Global, Setting2 } from "iconsax-react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import Cards from "../../../../components/Cards";
import TransactionsList from "../../../../components/Transactions/TransactionsList";
import { BaseNavigationT } from "../../home/Home";
import BottomSheetModalComponent from "../../../../components/BottomSheetModal/BottomSheetModalComponent";
import OrderCard from "../OrderCard";

interface PhysicalI extends BaseNavigationT {
  onViewPhysicalCardPress: () => void;
}
export default function Physical({
  navigation,
  onViewPhysicalCardPress,
}: PhysicalI) {
  const { fontScale } = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState("All");
  const [showCard, setShowCard] = useState(false);
  const orderList = [
    {
      id: 1,
      title: "Global Accessibility",
      description: "Spend your crypto anywhere Visa is accepted.",
      icon: <Global color={Colors.white} />,
    },
  ];

  return (
    <View className="px-5">
      {!showCard ? (
        <>
          <Cards />

          <View className="justify-center space-y-2 items-center my-5">
            <RegularText style={{ fontSize: 13 / fontScale }}>
              Card Balance [NGN]
            </RegularText>
            <BoldText style={{ fontSize: 28 / fontScale }}>
              1,000,000.00 PAY
            </BoldText>
          </View>

          <View className="flex-row space-x-4 justify-evenly">
            <Pressable
              onPress={() =>
                navigation.navigate("MainTabs", {
                  screen: "Asset",
                })
              }
              style={{ ...cardStyles.grayBtn }}
            >
              <Image source={CoinImg} />
              <MediumText
                style={{ fontSize: 13 / fontScale, color: Colors.grayText }}
              >
                Assets
              </MediumText>
              <DoubleArrowForward />
            </Pressable>
            <Pressable
              onPress={onViewPhysicalCardPress}
              style={{ ...cardStyles.grayBtn }}
            >
              <Card size={19} color={Colors.primary} />
              <MediumText
                style={{ fontSize: 13 / fontScale, color: Colors.grayText }}
              >
                Card Details
              </MediumText>
              <DoubleArrowForward />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("CardSetting")}
              style={{ ...cardStyles.grayBtn }}
            >
              <Setting2 color={Colors.primary} />
            </Pressable>
          </View>

          <View
            style={{
              backgroundColor: Colors.white,
              borderBottomColor: Colors.ash,
              borderBottomWidth: 1,
            }}
            className="flex-row space-x-1 rounded-[50px]  items-center mt-5 mb-2 "
          >
            <Pressable
              className="  py-2 items-center justify-center px-2"
              onPress={() => setSelectedTab("All")}
              style={{
                borderBottomColor:
                  selectedTab === "All" ? Colors.primary : "white",
                borderBottomWidth: selectedTab === "All" ? 2 : 0,
                backgroundColor:
                  selectedTab === "All" ? Colors.primaryLight : Colors.white,
              }}
            >
              <MediumText
                style={{
                  color:
                    selectedTab === "All" ? Colors.primary : Colors.grayText,
                  fontSize: 14 / fontScale,
                }}
              >
                All
              </MediumText>
            </Pressable>

            <Pressable
              className="  py-2 items-center justify-center px-2"
              onPress={() => setSelectedTab("Debit")}
              style={{
                borderBottomColor:
                  selectedTab === "Debit" ? Colors.primary : "white",
                borderBottomWidth: selectedTab === "Debit" ? 2 : 0,
                backgroundColor:
                  selectedTab === "Debit" ? Colors.primaryLight : Colors.white,
              }}
            >
              <MediumText
                style={{
                  color:
                    selectedTab === "Debit" ? Colors.primary : Colors.grayText,
                  fontSize: 14 / fontScale,
                }}
              >
                Debit
              </MediumText>
            </Pressable>

            <Pressable
              className="  py-2 items-center justify-center px-2"
              onPress={() => setSelectedTab("Credit")}
              style={{
                borderBottomColor:
                  selectedTab === "Credit" ? Colors.primary : "white",
                borderBottomWidth: selectedTab === "Credit" ? 2 : 0,
                backgroundColor:
                  selectedTab === "Credit" ? Colors.primaryLight : Colors.white,
              }}
            >
              <MediumText
                style={{
                  color:
                    selectedTab === "Credit" ? Colors.primary : Colors.grayText,
                  fontSize: 14 / fontScale,
                }}
              >
                Credit
              </MediumText>
            </Pressable>
          </View>

          <TransactionsList navigation={navigation} sliceFrom={0} sliceTo={5} />
        </>
      ) : (
        <OrderCard onOrderPress={()=> setShowCard(true)} />
      )}
    </View>
  );
}

export const cardStyles = StyleSheet.create({
  grayBtn: {
    backgroundColor: Colors.memojiBackground,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
