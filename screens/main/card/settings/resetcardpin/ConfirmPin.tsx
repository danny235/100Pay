import {
  View,
  Text,
  useWindowDimensions,
  TextInput,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import { toDigitInput } from "../../../../../components/Input/ToDigitInput";
import { Button } from "../../../../../components/Button/Button";
import { MediumText } from "../../../../../components/styles/styledComponents";
import { ArrowRightIcon } from "../../../../../components/SvgAssets";
import { Colors } from "../../../../../components/Colors";
import { NewPinI } from "./NewPin";


const CODE_LENGTH = 4;

interface ConfirmPinI extends NewPinI {}

export default function ConfirmPin({ onContinuePress }: ConfirmPinI) {
  const { fontScale } = useWindowDimensions();
  const [code, setCode] = useState("");

  const ref = useRef<TextInput>(null);
  const [containerIsFocused, setContainerIsFocused] = useState(false);

  const handleOnPress = () => {
    setContainerIsFocused(true);
    ref?.current?.focus();
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };
  return (
    <View className="space-y-3 px-5 py-3 flex-1 mt-5">
      <Pressable
        onPress={handleOnPress}
        className=" flex-row mb-auto items-center justify-center space-x-4"
      >
        {Array.from({ length: CODE_LENGTH }).map((_value, idx) =>
          toDigitInput({
            idx,
            code,
            CODE_LENGTH,
            containerIsFocused,
          })
        )}
      </Pressable>
      <TextInput
        ref={ref}
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        style={{
          opacity: 0,
          position: "absolute",
        }}
      />

      <View className="pb-10" style={{ marginLeft: "auto" }}>
        <Button
          variant="primary"
          isLarge={false}
          isWide={false}
          onPress={() => {
            onContinuePress(code);
          }}
        >
          <MediumText style={{ color: Colors.white, fontSize: 15 / fontScale }}>
            Continue
          </MediumText>
          <ArrowRightIcon />
        </Button>
      </View>
    </View>
  );
}
