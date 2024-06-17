import React, { useEffect, useRef, useState, ReactNode } from "react";
import { Animated, StyleSheet, View, Image } from "react-native";

interface WithSplashScreenProps {
  children: ReactNode;
  isAppReady: boolean;
}

export function WithSplashScreen({
  children,
  isAppReady,
}: WithSplashScreenProps) {
  return (
    <>
      {isAppReady && children}

      <Splash isAppReady={isAppReady} />
    </>
  );
}

const LOADING_IMAGE = "Loading image";
const FADE_IN_IMAGE = "Fade in image";
const WAIT_FOR_APP_TO_BE_READY = "Wait for app to be ready";
const FADE_OUT = "Fade out";
const HIDDEN = "Hidden";

interface SplashProps {
  isAppReady: boolean;
}

export const Splash = ({ isAppReady }: SplashProps) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState<string>(LOADING_IMAGE);

  useEffect(() => {
    if (state === FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000, // Fade in duration
        useNativeDriver: true,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000, // Fade out duration
        delay: 1000, // Minimum time the logo will stay visible
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === HIDDEN) return null;

  return (
    <Animated.View
      collapsable={false}
      style={[style.container, { opacity: containerOpacity }]}
    >
      <Animated.Image
        source={require("../../assets/images/Logo.png")}
        fadeDuration={0}
        onLoad={() => {
          setState(FADE_IN_IMAGE);
        }}
        style={{ opacity: imageOpacity, width: "100%", height: 110 }}
        resizeMode="contain"
      />
      {/* Uncomment and use if needed */}
      {/* <Animated.Image
        source={require("../../assets/images/Title.png")}
        fadeDuration={0}
        onLoad={() => {
          setState(FADE_IN_IMAGE);
        }}
        style={{ opacity: imageOpacity, width: "50%", height: 15 }}
        resizeMode="contain"
      /> */}
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
