import React, { ReactNode } from "react";
import { View, useWindowDimensions, ViewStyle } from "react-native";
import { Colors } from "../Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

export default function CustomView({ children, style }: CustomViewProps) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingHorizontal: 20,
          flex: 2,
          backgroundColor: Colors.white,
          position: "relative",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
