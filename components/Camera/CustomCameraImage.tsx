import { View, Text, Image } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

export default function CustomCameraImage() {
  return (
    <View
      style={{ position: "absolute", height: "40%", width: "100%", top: 0 }}
    >
      <Image
        style={{
          height: "100%",
          width: "100%",

          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        source={{
          uri: "https://plus.unsplash.com/premium_photo-1715876268512-39d694143a8e?q=80&w=3435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
      />
      <BlurView
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          overflow: "hidden",
        }}
        tint="light"
        intensity={10}
      />
    </View>
  );
}
