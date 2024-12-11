import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { MediumText } from "../styles/styledComponents";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import StandardCard from "../../assets/images/standardCard.png";
import EliteCard from "../../assets/images/eliteCard.png";
import Blackcard from "../../assets/images/blackCard.png";
import { Colors } from "../Colors";

const { width } = Dimensions.get("window");

const data = [
  { id: "1", title: "standardCard", img: StandardCard },
  { id: "2", title: "eliteCard", img: EliteCard },
  { id: "3", title: "BlackCard", img: Blackcard },
];

const Cards = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { userProfile } = useSelector((state: RootState) => state.user);
  const { fontScale } = useWindowDimensions();
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     let nextIndex = activeIndex + 1;
  //     if (nextIndex >= data.length) {
  //       nextIndex = 0;
  //     }
  //     scrollViewRef.current.scrollTo({
  //       x: nextIndex * width,
  //       animated: true,
  //     });
  //     setActiveIndex(nextIndex);
  //   }, 3000); // Change slide every 3 seconds

  //   return () => clearInterval(interval); // Cleanup the interval on component unmount
  // }, [activeIndex]);

  const renderItem = (item) => (
    <View
      className="mt-5 relative drop-shadow-lg  rounded-lg"
      style={{ height: 240, width: width / 1 }}
      key={item.id}
    >
      <Image
        source={item.img}
        className=" w-[100%] h-[100%]"
        resizeMode="contain"
      />
      <MediumText
        style={{ fontSize: 20 / fontScale, color: Colors.white }}
        className="absolute z-10 bottom-5 left-12"
      >
        {userProfile?.first_name} {userProfile?.last_name}
      </MediumText>
    </View>
  );

  const dots = data.map((_, index) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const dotScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: "clamp",
    });
    const dotOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.dot,
          {
            opacity: dotOpacity,
            transform: [{ scale: dotScale }],
          },
        ]}
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.carouselWrapper}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(event.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
          contentContainerStyle={styles.scrollViewContent}
        >
          {data.map(renderItem)}
        </ScrollView>
      </View>
      <View style={styles.pagination}>{dots}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  carouselWrapper: {
    width: width, // Ensure the wrapper is full screen width
    justifyContent: "center", // Center the carousel within the wrapper
    alignItems: "center",
  },
  scrollViewContent: {
    paddingHorizontal: (width - width / 1) / 2, // Center the cards
  },
  carouselItem: {
    width: width * 0.85,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    marginHorizontal: 10, // Adjust spacing between cards
  },
  text: {
    color: "#b0b0b0",
    fontSize: 18,
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#ff5252", // Active dot color (red in your example)
  },
});

export default Cards;
