import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors } from "../Colors";

interface RadioButtonProps {
  onPress?: () => void;
  buttonStyle?: ViewStyle;

  enabled: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  onPress,
  buttonStyle,

  enabled,
}) => {
  return (
    <TouchableOpacity onPress={()=> onPress()} style={[styles.radio, buttonStyle]}>
      {enabled && <View style={[styles.radioSelected]} />}
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    backgroundColor: Colors.primary,
    height: 10,
    width: 10,
    borderRadius: 10,
    opacity: .7
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
