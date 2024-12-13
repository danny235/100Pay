import { StyleSheet, useWindowDimensions, View } from "react-native";
import { BoldText } from "../styles/styledComponents";
import { Colors } from "../Colors";

interface ToDigitInputProps {
  idx: number;
  code: string;
  CODE_LENGTH: number;
  containerIsFocused: boolean;
}

export const toDigitInput = ({
  idx,
  code,
  CODE_LENGTH,
  containerIsFocused,
}: ToDigitInputProps): React.JSX.Element => {
  const emptyInputChar = "";
  const digit = code[idx] || emptyInputChar;
  const { fontScale } = useWindowDimensions();

  const isCurrentDigit = idx === code.length;
  const isLastDigit = idx === CODE_LENGTH - 1;
  const isCodeFull = code.length === CODE_LENGTH;

  const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

  const containerStyle =
    containerIsFocused && isFocused
      ? { ...styles.inputContainer, ...styles.inputContainerFocused }
      : styles.inputContainer;

  return (
    <View className="items-center justify-center pt-2" style={containerStyle} key={idx}>
      <BoldText style={{ opacity: 1, fontSize: 34 / fontScale }}>
        {digit&&"*"}
      </BoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: Colors.ash,
    borderWidth: 1,
    borderRadius: 10,
    width: "18%",
    aspectRatio: 4 / 4,
  },
  inputContainerFocused: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
});
