import React from "react";
import {
  View,
  Pressable,
  useWindowDimensions,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { MediumText } from "../styles/styledComponents";
import { Colors } from "../Colors";
import { ArrowBackwardIcon } from "../SvgAssets";

interface Props {
  text: string;
  subTextComponent?: React.ReactNode;
  icon: React.ReactNode;
  textColor?: string;
  onPress: () => void;
  style?: ViewStyle; // Include style as a prop
}

const CustomHeader: React.FC<Props> = ({
  text,
  subTextComponent,
  icon,
  textColor = Colors.iconColor,
  onPress,
  style,
  ...rest
}) => {
  const { fontScale } = useWindowDimensions();

  return (
    <View style={[styles.container, style]} {...rest}>
      <Pressable onPress={onPress}>
        <ArrowBackwardIcon color={textColor} />
      </Pressable>

      <View style={styles.iconContainer}>{icon}</View>

      <View style={styles.textContainer}>
        <MediumText style={{ fontSize: 17 / fontScale, color: textColor }}>
          {text}
        </MediumText>
        {subTextComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 20,
  },
  iconContainer: {
    borderRightColor: Colors.ash,
    borderRightWidth: 1,
    paddingRight: 6,
  },
  textContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});

export default CustomHeader;
