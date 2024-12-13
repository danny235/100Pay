import { View, Text } from "react-native";
import React from "react";
import CustomView from "../../../../../components/Views/CustomView";
import CustomHeader from "../../../../../components/headers/CustomHeaders";
import { Setting4 } from "iconsax-react-native";
import { Colors } from "../../../../../components/Colors";
import { BaseNavigationT } from "../../../home/Home";

interface CardLimitsI extends BaseNavigationT {}

export default function CardLimits({navigation}: CardLimitsI) {
  return (
    <CustomView>
      <CustomHeader
        icon={<Setting4 color={Colors.primary} variant="TwoTone" />}
        onPress={() => navigation.goBack()}
        text="Card Limit"
      />
    </CustomView>
  );
}
