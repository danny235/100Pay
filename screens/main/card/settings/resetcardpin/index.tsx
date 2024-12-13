import { View, Text, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import CustomView from "../../../../../components/Views/CustomView";
import CustomHeader from "../../../../../components/headers/CustomHeaders";
import { PasswordCheck } from "iconsax-react-native";
import { BaseNavigationT } from "../../../home/Home";

import { MediumText } from "../../../../../components/styles/styledComponents";
import { Colors } from "../../../../../components/Colors";
import NewPin from "./NewPin";
import ConfirmPin from "./ConfirmPin";
import { useToast } from "../../../../../components/CustomToast/ToastContext";


interface ResetCardPinI extends BaseNavigationT {}

export default function ResetCardPin({navigation}: ResetCardPinI) {
  const { fontScale } = useWindowDimensions();
  const { showToast } = useToast();
  const [showPin, setShowPin] = useState({

    newPin: true,
    confirmNewPin: false,
  });

  const [pinValues, setPinValues] = useState({
    oldPinVal: "",
    newPinVal: "",
    confirmNewPinVal: "",
  });

  const goBack = () => {
    if (showPin.newPin) {
      navigation.goBack();
    } else if (showPin.confirmNewPin) {
      setShowPin((preVal) => ({
        ...preVal,
        newPin: true,
        confirmNewPin: false,
      }));
    } else {
      return null
    }
  };
  return (
    <CustomView>
      <CustomHeader
        icon={<PasswordCheck color={Colors.primary} variant="TwoTone" />}
        text="Change Card Pin"
        onPress={goBack}
      />
      <View className="items-center justify-center mt-10">
        
        {showPin.newPin && (
          <MediumText style={{ fontSize: 15 / fontScale }}>
            Enter your{" "}
            <MediumText
              style={{ fontSize: 15 / fontScale, color: Colors.black }}
            >
              New Card PIN
            </MediumText>{" "}
            to continue
          </MediumText>
        )}
        {showPin.confirmNewPin && (
          <MediumText style={{ fontSize: 15 / fontScale }}>
            Re-enter your{" "}
            <MediumText
              style={{ fontSize: 15 / fontScale, color: Colors.black }}
            >
              New Card PIN
            </MediumText>{" "}
            to continue
          </MediumText>
        )}
      </View>

      {showPin.newPin && (
        <NewPin
          onContinuePress={(code) => {
            setShowPin((preVal) => ({
              ...preVal,
              newPin: false,
              confirmNewPin: true,
            }));
            setPinValues((preVal) => ({ ...preVal, newPinVal: code }));
          }}
        />
      )}
      {showPin.confirmNewPin && (
        <ConfirmPin
          onContinuePress={(code) => {
            if (code === pinValues.newPinVal) {
              showToast("Pin reset successfully 🎉", "success");
              setPinValues((preVal) => ({ ...preVal, confirmNewPinVal: code }));
              navigation.goBack();
            } else {
              showToast("Your pin doesn't match 😢", "error");
            }
          }}
        />
      )}
    </CustomView>
  );
}
