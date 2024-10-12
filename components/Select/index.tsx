import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  GestureResponderEvent,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { LightText, MediumText, RegularText } from "../styles/styledComponents";
import { ArrowDown2 } from "iconsax-react-native";
import { Colors } from "../Colors";

export interface OptionT {
  label: string;
  value: string;
}

interface SelectProps {
  options: OptionT[];
  onSelect: (option: OptionT) => void;
  placeholder: string;
  heading: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  onSelect,
  placeholder,
  heading,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<OptionT | null>(null);
  const { fontScale } = useWindowDimensions();
  const handleSelect = (option: OptionT) => {
    setSelectedOption(option);
    onSelect(option);
    setVisible(false);
  };

  return (
    <View className=" space-y-4 relative z-[70px]">
      <MediumText style={{ fontSize: 15 / fontScale }}>{heading}</MediumText>
      <Pressable
        className=" flex-row items-center justify-between"
        style={styles.selectButton}
        onPress={() => setVisible(true)}
      >
        <MediumText style={{ fontSize: 15 / fontScale }}>
          {selectedOption ? selectedOption.label : placeholder}
        </MediumText>
        <ArrowDown2 color={Colors.black} size={18} />
      </Pressable>

      {visible && (
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.ash,
            width: "100%",
            backgroundColor: Colors.white,
            zIndex: 1000
          }}
          className="absolute rounded-lg z-50 shadow-lg top-[100%]"
        >
          <View className="z-[70]" style={styles.modalContainer}>
            {options &&
              options?.map((item, i) => (
                <Pressable key={i} className="py-2" onPress={() => handleSelect(item)}>
                  <RegularText style={styles.optionText}>
                    {item.label}
                  </RegularText>
                </Pressable>
              ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 5,
  },
  selectButtonText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
  },
  modalContainer: {
    padding: 10,
  },
  option: {
    padding: 15,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Select;
