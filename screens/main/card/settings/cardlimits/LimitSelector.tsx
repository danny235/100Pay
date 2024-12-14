import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Colors } from "../../../../../components/Colors";
import { MediumText } from "../../../../../components/styles/styledComponents";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import { addCommas } from "../../../../../utils";

interface LimitSelectorProps {
  backgroundColor?: string;
  memojiBackground?: string;
  minAmount?: string;
  maxAmount?: string;
  sliderProps?: {
    progress: number;
    minimumValue: number;
    maximumValue: number;
    theme: any; // Define theme type based on your slider library
  };
  onMaxPress?: () => void;
  title?: string;
  inputStyle?: ViewStyle;
  meterClassName?: string;
}

const LimitSelector: React.FC<LimitSelectorProps> = ({
  backgroundColor = Colors.memojiBackground,
  memojiBackground = Colors.white,
  minAmount = "$0.00",
  maxAmount = "$50,000,000",
  sliderProps,
  onMaxPress,
  title = "Daily Limit",
  inputStyle,
  meterClassName,
}) => {
  const amountProgress = useSharedValue(sliderProps?.progress || 0);
  const amountMin = useSharedValue(sliderProps?.minimumValue || 0);
  const amountMax = useSharedValue(sliderProps?.maximumValue || 50000000);
  const [amount, setAmount] = useState(`${amountProgress.value}` || 0);
  const handleInputChange = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (
      !isNaN(numericValue) &&
      numericValue >= amountMin.value &&
      numericValue <= amountMax.value
    ) {
      amountProgress.value = numericValue;
      setAmount(value as any);
    } else if (value === "") {
      amountProgress.value = 0;
      setAmount(0);
    }
  };

  const handleSliderChange = (value: number) => {
    
    setAmount(value.toString());
  };
  return (
    <View
      className="space-y-3 mt-2"
      style={[styles.container, { backgroundColor }]}
    >
      <MediumText style={styles.labelText}>{title}:</MediumText>

      <View
        style={[styles.inputContainer, { backgroundColor: memojiBackground }]}
      >
        <TextInput
          keyboardType="decimal-pad"
          style={[styles.input, inputStyle]}
          placeholder="Enter custom limit"
          value={addCommas(amount) as any}
          onChangeText={handleInputChange}
          maxLength={50000000}
        />
        <Pressable
          onPress={() => handleInputChange("50000000")}
          style={styles.maxButton}
        >
          <MediumText style={styles.maxText}>Max</MediumText>
        </Pressable>
      </View>

      <View style={styles.limitContainer}>
        <MediumText style={styles.limitText}>Min: {minAmount}</MediumText>
        <MediumText style={styles.limitText}>Max: {maxAmount}</MediumText>
      </View>

      <View style={styles.sliderContainer}>
        <View className="flex-row -z-10 justify-evenly absolute w-[100%] -bottom-2">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <View
                className={meterClassName ? meterClassName : ""}
                key={i}
                style={styles.tick}
              />
            ))}
        </View>

        <Slider
          progress={amountProgress}
          minimumValue={amountMin}
          maximumValue={amountMax}
          theme={sliderProps?.theme}
          containerStyle={styles.sliderStyle}
          thumbWidth={20}
          renderThumb={() => <View style={styles.thumbStyle} />}
          onValueChange={handleSliderChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  labelText: {
    fontSize: 15,
  },
  inputContainer: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  maxButton: {
    borderLeftWidth: 1,
    borderColor: Colors.gray200,
    paddingLeft: 8,
  },
  maxText: {
    color: Colors.primary,
  },
  limitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  limitText: {
    color: Colors.grayText,
    fontSize: 13,
  },
  sliderContainer: {
    position: "relative",
    marginTop: 12,
  },
  ticksContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    bottom: -10,
  },
  tick: {
    borderLeftWidth: 2,
    borderColor: Colors.gray200,
    height: 20,
    width: 10,
  },
  sliderStyle: {
    borderRadius: 10,
  },
  thumbStyle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
});

export default LimitSelector;
