import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { ExportSquare, Gift, Global, MoneyChange, Security } from "iconsax-react-native";
import { Colors } from "../../../components/Colors";
import Cards from "../../../components/Cards";
import {
  BoldText,
  MediumText,
  RegularText,
} from "../../../components/styles/styledComponents";
import { Button } from "../../../components/Button/Button";

interface OrderCardI {
    onOrderPress: () => void
}

export default function OrderCard({onOrderPress}: OrderCardI) {
  const { fontScale } = useWindowDimensions();
  const orderList = [
    {
      id: 1,
      title: "Global Accessibility",
      description: "Spend your crypto anywhere Visa is accepted.",
      icon: <Global color={Colors.primary} variant="TwoTone" />,
    },
    {
      id: 2,
      title: "Effortless Transactions",
      description: "Seamless, fast and reliable payment processing.",
      icon: <MoneyChange color={Colors.primary} variant="TwoTone" />,
    },
    {
      id: 3,
      title: "Enhanced Security",
      description: "Advanced security features for secure transactions.",
      icon: <Security color={Colors.primary} variant="TwoTone" />,
    },
    {
      id: 4,
      title: "Exclusive Rewards",
      description: "Exclusive discount for using Pay Card on purchases.",
      icon: <Gift color={Colors.primary} variant="TwoTone" />,
    },
  ];
  return (
    <View className="space-y-7">
      <Cards />
      <BoldText
        className="w-[70%]"
        style={{ fontSize: 25 / fontScale, color: Colors.balanceBlack }}
      >
        Spend Your Crypto Easily With{" "}
        <BoldText style={{ fontSize: 25 / fontScale, color: Colors.primary }}>
          PAY Card{" "}
        </BoldText>
      </BoldText>

      {orderList.map((orderItem, i) => {
        return (
          <View key={orderItem.id} className="flex-row items-center space-x-2">
            <View
              style={{ backgroundColor: Colors.primaryLight }}
              className="rounded-md items-center justify-center h-[40px] w-[40px]"
            >
              {orderItem.icon}
            </View>
            <View style={{flexShrink: 1, gap: 3}}>
              <MediumText style={{fontSize: 16 / fontScale, color: Colors.black}}>{orderItem.title}</MediumText>
              <RegularText style={{fontSize: 13 / fontScale,}}>{orderItem.description}</RegularText>
            </View>
          </View>
        );
      })}

      <Button onPress={onOrderPress} variant="primary" isLarge={true}>
        <MediumText style={{color: Colors.white, fontSize: 17 / fontScale}}>Order Now</MediumText>
        <ExportSquare color={Colors.white} variant="TwoTone" />
      </Button>
    </View>
  );
}
