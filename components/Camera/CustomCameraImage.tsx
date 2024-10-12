import {
  View,
  Text,
  Image,
  Animated,
  Platform,
  UIManager,
  LayoutAnimation,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import BgImage from "../../assets/images/bg.jpg";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CustomCameraImage({ isVisible, children }) {
  const opacity = useRef(new Animated.Value(isVisible ? 1 : 0)).current;
  const { height } = useWindowDimensions();

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
        // position: "absolute",
        height: Platform.OS === "android" ? 444 : 466,
        width: "100%",
        top: 0,
        opacity,
        marginBottom: 30,
      }}
    >
      <>
        <Image
          style={{
            height: "100%",
            width: "100%",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
          source={BgImage}
          resizeMode="cover"
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
          tint="systemMaterialDark"
          intensity={80}
        />
        {Platform.OS === "android" && (
          <>
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
              tint="systemMaterialDark"
              intensity={80}
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
              tint="systemMaterialDark"
              intensity={80}
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
              tint="systemMaterialDark"
              intensity={80}
            />
          </>
        )}
      </>

      <View style={{ position: "absolute", left: 0, right: 0 }}>
        {children}
      </View>
    </Animated.View>
  );
}
