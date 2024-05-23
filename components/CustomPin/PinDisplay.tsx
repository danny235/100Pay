import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../Colors";

 const PinDisplay = ({ pinLength }) => {
  return (
    <View style={styles.pinContainer}>
      {[...Array(6)].map((_, index) => (
        <View
          key={index}
          style={[styles.pinDot, index < pinLength && styles.pinDotFilled]}
        />
      ))}
    </View>
  );
};

export default PinDisplay

const styles = StyleSheet.create({
  pinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    gap: 10
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: Colors.ash
  },
  pinDotFilled: {
    backgroundColor: Colors.primary,
  },
});