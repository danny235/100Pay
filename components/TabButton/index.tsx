import React from "react";
import { Pressable, StyleSheet, TextStyle, useWindowDimensions } from "react-native";
import { MediumText } from "../styles/styledComponents";
import { Colors } from "../Colors";


interface TabButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  fontScale?: number;
  style?: TextStyle;
}

const TabButton: React.FC<TabButtonProps> = ({
  label,
  isActive,
  onPress,

  style,
}) => {
    const {fontScale} = useWindowDimensions()
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: isActive ? Colors.ash : "white",
          borderRadius: 25,
        },
      ]}
      className=" px-5 py-2 items-center justify-center"
    >
      <MediumText
        style={[
          styles.text,
          style,
          {
            color: isActive ? Colors.balanceBlack : Colors.grayText,
            fontSize: 12 / fontScale,
          },
        ]}
      >
        {label}
      </MediumText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  text: {
    textAlign: "center",
  },
});

export default TabButton;
