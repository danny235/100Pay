import { View, Text, Image, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { BlurView } from "expo-blur";
import BgImage from "../../assets/images/bg.png"


export default function CustomCameraImage({isVisible}) {
    const opacity = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

    useEffect(() => {
      Animated.timing(opacity, {
        toValue: isVisible ? 0 : 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [isVisible]);
  return (
    <Animated.View
      style={{
        position: "absolute",
        height: "40%",
        width: "100%",
        top: 0,
        opacity,
      }}
    >
      <Image
        style={{
          height: "100%",
          width: "100%",

          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        source={BgImage}
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
        tint="systemThickMaterialDark"
        intensity={80}
      />
    </Animated.View>
  );
}
