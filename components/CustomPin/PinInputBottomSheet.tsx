// PinInputBottomSheet.js

import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import CustomNumberKeypad from "../Keypad/CustomNumberKeypad"; // Adjust the import path as needed
import PinDisplay from "./PinDisplay"; // Adjust the import path as needed

import NumberKeypad from "../Keypad/NumberKeypad";
import { Colors } from "../Colors";
import { Button } from "../Button/Button";
import { CustomBackdrop } from "../ChooseAccountBalance/ChooseAccountBalance";
import { LightText, SemiBoldText } from "../styles/styledComponents";
import { PasswordCheck } from "iconsax-react-native";
import BottomSheetModalComponent from "../BottomSheetModal/BottomSheetModalComponent";

const PinInputBottomSheet = ({
  mainTxt,
  subTxt,
  isVisible,
  onClose,
  onSubmit,
}) => {
  const { fontScale, height, width } = useWindowDimensions();
  const [snapTo, setSnapTo] = useState(["38%", "75%"]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [pin, setPin] = useState("");
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    // onClose();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleKeyPress = (value) => {
    if (value === "Back") {
      setPin((prevPin) => prevPin.slice(0, -1));
    } else if (pin.length < 6) {
      setPin((prevPin) => prevPin + value);
    }
  };

  const handleConfirm = () => {
    if (pin.length === 6) {
      onSubmit(pin);
      setPin("");
    }
  };

 

  useEffect(() => {
    if (pin.length === 6) {
      handleConfirm()
    } 
  }, [pin]);


  return (
    <BottomSheetModalComponent
      show={isVisible}
      onClose={onClose}
      snapPoints={snapTo}>
     
        <View style={styles.sheetContent}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 10 }}>
            <PasswordCheck color={Colors.primary} variant="TwoTone" />
            <SemiBoldText
              style={[
                styles.title,
                {
                  borderLeftColor: Colors.ash,
                  borderLeftWidth: 1,
                  paddingLeft: 10,
                },
              ]}
            >
              {mainTxt}
            </SemiBoldText>
          </View>
          <LightText style={styles.subtitle}>{subTxt}</LightText>
          <PinDisplay pinLength={pin.length} />
          <NumberKeypad
            isVisible={true}
            onKeyPress={handleKeyPress}
            onBackspace={() => handleKeyPress("Back")}
          />
          {/* <Button
            variant="primary"
            style={[
            
              pin.length !== 6 && styles.disabledButton,
            ]}
            onPress={handleConfirm}
            disabled={pin.length !== 6}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </Button> */}
        </View>

    </BottomSheetModalComponent>
  );
};

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    backgroundColor: "white",
    padding: 20
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  confirmButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});

export default PinInputBottomSheet;
