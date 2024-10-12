import { View, Pressable, useWindowDimensions } from "react-native";
import React, { ReactNode } from "react";
import { Colors } from "../Colors";
import { RegularText } from "../styles/styledComponents";

type ActionButtonT = {
  title: string;
  icon: ReactNode;
  onPress?: () => void;
};

export default function ActionButton({ title, icon, onPress }: ActionButtonT) {
  const { fontScale } = useWindowDimensions();
  return (
    <Pressable className=" items-center space-y-2 my-2" onPress={onPress}>
      <View
        style={{ borderColor: Colors.ash, borderWidth: 1 }}
        className=" rounded-[15px] items-center justify-center p-4"
      >
        {icon}
      </View>
      <RegularText style={{ fontSize: 13 / fontScale, color: Colors.grayText }}>
        {title}
      </RegularText>
    </Pressable>
  );
}
