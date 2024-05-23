import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { Colors } from "../Colors";
import { BackSpaceIcon } from "../SvgAssets";
import { MediumText } from "../styles/styledComponents";

interface NumberKeypadProps {
  isVisible?: boolean;
  onKeyPress?: (value: string) => void;
  onClose?: () => void;
  onBackspace?: () => void;
}

interface NumberKeypadMethods {
  getKeyboardHeight: () => number;
}

const NumberKeypad = forwardRef<
  NumberKeypadMethods,
  NumberKeypadProps
>(({ isVisible, onKeyPress, onClose, onBackspace }, ref) => {
  const [typedValue, setTypedValue] = useState("");
  const { height } = useWindowDimensions();
  const bottomPosition = useRef(new Animated.Value(-height)).current;
  const { fontScale } = useWindowDimensions();

  const containerRef = useRef<View>(null);

  const handleKeyPress = (value: string) => {
    if (value === "Back") {
      onBackspace && onBackspace();
    } else {
      setTypedValue((prevValue) => prevValue + value);
      onKeyPress && onKeyPress(value);
    }
  };

//   useEffect(() => {
//     if (isVisible) {
//       Animated.timing(bottomPosition, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: false,
//       }).start();
//     } else {
//       Animated.timing(bottomPosition, {
//         toValue: -height,
//         duration: 300,
//         useNativeDriver: false,
//       }).start();
//     }
//   }, [isVisible]);

  const renderKeypadButton = (value: string, key: number) => (
    <TouchableOpacity
      key={key}
      style={value === "" ? styles.inActiveButton : styles.button}
      onPress={() => handleKeyPress(value)}
    >
      {value == "Back" ? (
        <BackSpaceIcon />
      ) : (
        <MediumText style={[styles.buttonText, { fontSize: 15 / fontScale }]}>
          {value}
        </MediumText>
      )}
    </TouchableOpacity>
  );

  return (
   

        <View style={styles.modalContainer}>
          <View style={styles.keypadContainer}>
            <View
              style={styles.keypad}
              ref={containerRef}
            >
              <View style={styles.row}>
                {renderKeypadButton("1", 1)}
                {renderKeypadButton("2", 2)}
                {renderKeypadButton("3", 3)}
              </View>
              <View style={styles.row}>
                {renderKeypadButton("4", 4)}
                {renderKeypadButton("5", 5)}
                {renderKeypadButton("6", 6)}
              </View>
              <View style={styles.row}>
                {renderKeypadButton("7", 7)}
                {renderKeypadButton("8", 8)}
                {renderKeypadButton("9", 9)}
              </View>
              <View style={styles.row}>
                {renderKeypadButton("", null)}
                {renderKeypadButton("0", 10)}
                {renderKeypadButton("Back", 11)}
              </View>
            </View>
          </View>
        </View>


  );
});

const styles = StyleSheet.create({
  modalContainer: {
    marginVertical: 10
   
  },
  keypadContainer: {
    paddingTop: 20, // Add padding to the top of the keypad
  },
  keypad: {
    backgroundColor: Colors.white,
    flexDirection: "column",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Colors.searchInput,
    height: 50
  },
  inActiveButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  buttonText: {
    color: "black",
  },
});

export default NumberKeypad;
