import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import CardImg from "../../../../assets/images/eliteCard.png";
import CoinImg from "../../../../assets/images/coins.png";
import {
  BoldText,
  MediumText,
  RegularText,
} from "../../../../components/styles/styledComponents";
import { cardStyles } from "../physical";
import { DoubleArrowForward } from "../../../../components/SvgAssets";
import { Card, Setting, Setting2 } from "iconsax-react-native";
import { Colors } from "../../../../components/Colors";
import Cards from "../../../../components/Cards";
import { BaseNavigationT } from "../../home/Home";
import TransactionsList from "../../../../components/Transactions/TransactionsList";

interface VirtualI extends BaseNavigationT {}
export default function Virtual({navigation}: VirtualI) {
  const { fontScale } = useWindowDimensions();
   const [selectedTab, setSelectedTab] = useState("All");
  return (
    <View className="px-5">
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
        <Pressable style={{ ...cardStyles.grayBtn }}>
          <Image source={CoinImg} />
          <MediumText
            style={{ fontSize: 13 / fontScale, color: Colors.grayText }}
          >
            Assets
          </MediumText>
          <DoubleArrowForward />
        </Pressable>
        <Pressable style={{ ...cardStyles.grayBtn }}>
          <Card size={19} color={Colors.primary} />
          <MediumText
            style={{ fontSize: 13 / fontScale, color: Colors.grayText }}
          >
            Card Details
          </MediumText>
          <DoubleArrowForward />
        </Pressable>
        <Pressable style={{ ...cardStyles.grayBtn }}>
          <Setting2 color={Colors.primary} />
        </Pressable>
      </View>

      <View
        style={{
          backgroundColor: Colors.white,
          borderBottomColor: Colors.ash,
          borderBottomWidth: 1,
        }}
        className="flex-row space-x-1 rounded-[50px] items-center mt-5 mb-2"
      >
        <Pressable
          className="py-2 items-center justify-center px-2"
          onPress={() => setSelectedTab("All")}
          style={{
            borderBottomColor: selectedTab === "All" ? Colors.primary : "white",
            borderBottomWidth: selectedTab === "All" ? 2 : 0,
            backgroundColor:
              selectedTab === "All" ? Colors.primaryLight : Colors.white,
          }}
        >
          <MediumText
            style={{
              color: selectedTab === "All" ? Colors.primary : Colors.grayText,
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
              color: selectedTab === "Debit" ? Colors.primary : Colors.grayText,
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
    </View>
  );
}
