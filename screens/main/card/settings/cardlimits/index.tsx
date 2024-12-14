import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import CustomView from "../../../../../components/Views/CustomView";
import CustomHeader from "../../../../../components/headers/CustomHeaders";
import { ArrowRight, Setting4 } from "iconsax-react-native";
import { Colors } from "../../../../../components/Colors";
import { BaseNavigationT } from "../../../home/Home";
import { MediumText } from "../../../../../components/styles/styledComponents";
import { TextInput } from "react-native-gesture-handler";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import LimitSelector from "./LimitSelector";
import { Button } from "../../../../../components/Button/Button";

interface CardLimitsI extends BaseNavigationT {}

export default function CardLimits({ navigation }: CardLimitsI) {
  const { fontScale } = useWindowDimensions();
  const amountProgress = useSharedValue(30);
  const amountMin = useSharedValue(0);
  const amountMax = useSharedValue(50000000);

  const getColor = () => {
    if (amountProgress.value >= 2835027.9) {
      ("[#FEF4F6]");
    } else {
      ("gray-200");
    }
  };
  return (
    <CustomView>
      <CustomHeader
        icon={<Setting4 color={Colors.primary} variant="TwoTone" />}
        onPress={() => navigation.goBack()}
        text="Card Limit"
      />

      {/* <View
        style={{ backgroundColor: Colors.memojiBackground }}
        className="rounded-lg p-5 space-y-3"
      >
        <MediumText style={{ fontSize: 15 / fontScale }}>
          Daily Limit:
        </MediumText>

        <View
          style={{ backgroundColor: Colors.white }}
          className="rounded-lg flex-row items-center p-4 justify-between"
        >
          <TextInput
            keyboardType="decimal-pad"
            style={styles.input}
            placeholder="Enter custom limit"
          />
          <Pressable className="border-l border-l-gray-200">
            <MediumText style={{ color: Colors.primary }} className="pl-2">
              Max
            </MediumText>
          </Pressable>
        </View>

        <View className="flex-row justify-between mb-2">
          <MediumText
            style={{ color: Colors.grayText, fontSize: 13 / fontScale }}
          >
            Min: $0.00
          </MediumText>
          <MediumText
            style={{ color: Colors.grayText, fontSize: 13 / fontScale }}
          >
            Max: $50,000,000
          </MediumText>
        </View>

        <View className="relative">
          <View className="flex-row -z-10 justify-evenly absolute w-[100%] -bottom-2.5">
            {Array(10)
              .fill(0)
              .map((val, i) => (
                <View
                  key={i}
                  className={`border-l-2 border-l-gray-200 h-[20px] w-[10px`}
                />
              ))}
          </View>

          <Slider
            progress={amountProgress}
            minimumValue={amountMin}
            maximumValue={amountMax}
            theme={{
              disableMinTrackTintColor: "#fff",
              maximumTrackTintColor: Colors.white,
              minimumTrackTintColor: Colors.primary,
              cacheTrackTintColor: "yellow",
              bubbleBackgroundColor: Colors.primary,
            }}
            containerStyle={{ borderRadius: 10 }}
            thumbWidth={20}
            renderThumb={() => (
              <View
                style={{
                  backgroundColor: Colors.white,
                  borderWidth: 1,
                  borderColor: Colors.primary,
                }}
                className="w-[25px] h-[25px] rounded-[25px]"
              />
            )}
          />
        </View>
      </View> */}
      <ScrollView>
        
          <LimitSelector
            sliderProps={{
              maximumValue: 50000000,
              minimumValue: 0,
              progress: 0,
              theme: {
                disableMinTrackTintColor: "#fff",
                maximumTrackTintColor: Colors.white,
                minimumTrackTintColor: Colors.primary,
                cacheTrackTintColor: "yellow",
                bubbleBackgroundColor: Colors.primary,
              },
            }}
            meterClassName={`border-l-2 border-l-gray-200 h-[20px] w-[10px`}
          />

          <LimitSelector
            title="Weekly Limit"
            sliderProps={{
              maximumValue: 50000000,
              minimumValue: 0,
              progress: 0,
              theme: {
                disableMinTrackTintColor: "#fff",
                maximumTrackTintColor: Colors.white,
                minimumTrackTintColor: Colors.primary,
                cacheTrackTintColor: "yellow",
                bubbleBackgroundColor: Colors.primary,
              },
            }}
            meterClassName={`border-l-2 border-l-gray-200 h-[20px] w-[10px`}
          />

          <LimitSelector
            title="Monthly Limit"
            sliderProps={{
              maximumValue: 50000000,
              minimumValue: 0,
              progress: 0,
              theme: {
                disableMinTrackTintColor: "#fff",
                maximumTrackTintColor: Colors.white,
                minimumTrackTintColor: Colors.primary,
                cacheTrackTintColor: "yellow",
                bubbleBackgroundColor: Colors.primary,
              },
            }}
            meterClassName={`border-l-2 border-l-gray-200 h-[20px] w-[10px`}
          />
        

      </ScrollView>
        <View className="mt-auto pb-10">
            <Button variant="primary" isLarge={true}>
                <MediumText style={{fontSize: 15 / fontScale, color: Colors.white}}>Update</MediumText>
                <ArrowRight color={Colors.white} variant="TwoTone" />
            </Button>
        </View>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily:
      Platform.OS === "ios" ? "SpaceGrotesk-Light" : "SpaceGroteskLight",
    fontSize: 15,
    paddingRight: 10,
    width: "80%",
  },
});
