import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Platform,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import slides from "../../assets/slides";
import { Colors } from "../../components/Colors";
import {
  BoldText,
  Indicator,
  IndicatorsWrappers,
  PrimaryButton,
} from "../../components/styles/styledComponents";
import OnboardingItem from "./OnboardingItem";
import { Button } from "../../components/Button/Button";
import { NavigationProp } from "@react-navigation/native";
import { updateUserOnboarded } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface OnboardingI {
  navigation: NativeStackNavigationProp<any>;
}

export default function Onboarding({
  navigation,
}: OnboardingI): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  // const dispatch = useDispatch();
  const { width, height, fontScale } = useWindowDimensions();
  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<any> }) => {
      setCurrentIndex(viewableItems[0].index);
      console.log(viewableItems[0]);
    }
  ).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const scrollTo = () => {
    if (currentIndex > slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
      console.log(currentIndex, "From currentIndex");
    } else {
      navigation.navigate("RootAuth");
    }
  };

  const webScrollTo = () => {
    if (currentIndex < slides.length - 1) {
      const scrollPosition = (currentIndex + 1) * width; // Calculate the scroll position
      slidesRef.current?.scrollToOffset({
        offset: scrollPosition,
        animated: true,
      }); // Scroll to the calculated position
      setCurrentIndex((prevIndex) => prevIndex + 1); // Update currentIndex
    } else {
      navigation.navigate("RootAuth");
    }
  };
  return (
    <View
      style={{ position: "relative", backgroundColor: Colors.white, flex: 1 }}
    >
      <View>
        <IndicatorsWrappers>
          <Indicator isActive={currentIndex === 0} />
          <Indicator isActive={currentIndex === 1} />
          <Indicator isActive={currentIndex === 2} />
          <Indicator isActive={currentIndex === 3} />
        </IndicatorsWrappers>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <OnboardingItem currentIndex={currentIndex} item={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          pagingEnabled
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />

        <View
          style={{
            paddingHorizontal: 12,
            flexDirection: "row",
            gap: 10,
            marginTop: "auto",
          }}
        >
          <Button
            style={{ width: "48.5%" }}
            variant="secondary"
            isLarge={true}
            isWide={false}
            onPress={() => {
              navigation.replace("RootAuth");
              dispatch(updateUserOnboarded());
            }}
          >
            <BoldText style={{ color: Colors.black, fontSize: 16 / fontScale }}>
              Skip
            </BoldText>
          </Button>
          <Button
            style={{ width: "48.5%" }}
            variant="primary"
            isWide={false}
            isLarge={true}
            onPress={() => {
              if (currentIndex <= 2) {
                Platform.OS === "web" ? webScrollTo() : scrollTo();
              } else {
                navigation.replace("RootAuth");

                dispatch(updateUserOnboarded());
              }
            }}
          >
            <BoldText style={{ color: Colors.white, fontSize: 16 / fontScale }}>
              Next
            </BoldText>
          </Button>
        </View>
      </View>
    </View>
  );
}
