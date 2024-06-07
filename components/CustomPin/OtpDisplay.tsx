import React, { useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Colors } from "../Colors";
import { BoldText, MediumText, RegularText } from "../styles/styledComponents";

const OtpDisplay = ({ pinLength, pin }) => {
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const { fontScale } = useWindowDimensions();
  return (
    <View style={styles.pinContainer}>
      {[...Array(6)].map((value, index) => {
        const emptyInputChar = "";
        const digit = pin[index] || emptyInputChar;

        const isCurrentDigit = index === pin.length;
        const isLastDigit = index === 6 - 1;
        const isCodeFull = pin.length === 6;

        const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

        const containerStyle =
          containerIsFocused && isFocused
            ? { ...styles.inputContainer, ...styles.inputContainerFocused }
            : styles.inputContainer;
        return (
          <View style={{flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-around"}}>
            <View
              key={index}
              style={[styles.pinDot, {...containerStyle}]}
            >
              <RegularText style={{ fontSize: 16 / fontScale }}>
                {digit}
              </RegularText>
            </View>
            {index === 2 && <BoldText style={{fontSize: 20 / fontScale, color: Colors.ash,}}>-</BoldText>}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pinContainer: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 10,
  },
  pinDot: {
    width: 44,
    aspectRatio: 1 / 1.13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.ash,
    alignItems: "center",
    justifyContent: "center",
  },


  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainerFocused: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
});

export default OtpDisplay;
