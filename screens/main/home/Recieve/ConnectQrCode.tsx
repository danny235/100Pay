import { NavigationProp } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  Platform,
  Pressable,
  TextInputFocusEventData,
  View,
  useWindowDimensions,
} from "react-native";
import CheckBox from "react-native-check-box";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import { Button } from "../../../../components/Button/Button";
import { Colors } from "../../../../components/Colors";
import Input from "../../../../components/Input";
import {
  AddIcon,
  ArrowRightIcon,
  CursorDownIcon,
  CursorUpIcon,
} from "../../../../components/SvgAssets";
import CustomView from "../../../../components/Views/CustomView";
import CustomHeader from "../../../../components/headers/CustomHeaders";
import { useKeyboard } from "../../../../components/hooks/useKeyboard";
import {
  LightText,
  MediumText,
  RegularText,
} from "../../../../components/styles/styledComponents";
import { RootStackParamList } from "../../../../routes/AppStacks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScanBarcode } from "iconsax-react-native";

const generateRequestLinkSchema = yup.object().shape({
  qrcode: yup.string().required().label("QR code"),
});

type ConnectQrCodeT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function ConnectQrCode({ navigation }: ConnectQrCodeT) {
  const { fontScale } = useWindowDimensions();
  let scrollRef = useRef<KeyboardAwareScrollView>(null);
  const keyboardHeight = useKeyboard();

  const scrollToInput = (reactNode: any) => {
    if (scrollRef.current) {
      scrollRef.current.scrollToFocusedInput(reactNode);
    }
  };
  return (
    <CustomView>
      <CustomHeader
        onPress={() => navigation.goBack()}
        icon={
          <ScanBarcode color={Colors.primary} size={24} variant="TwoTone" />
        }
        text="Connect Qr Code"
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
      >
        <Formik
          initialValues={{
            qrcode: "",
          }}
          onSubmit={async (values, actions) => {
            navigation.navigate("GeneratedLink");
          }}
          validationSchema={generateRequestLinkSchema}
        >
          {(formikProps) => (
            <View>
              <View className=" flex-1 mb-auto">
                <View className=" flex-row items-center flex-1 justify-between">
                  <View style={{ width: "85%" }}>
                    <Input
                      placeholder="GHDIDN"
                      formikProps={formikProps}
                      formikKey="qrcode"
                      value={formikProps.values.qrcode}
                      label="Enter QR code"
                      placeholderTextColor={Colors?.ash}
                    />
                  </View>
                  <Pressable
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: Colors.primary,
                    }}
                    className=" rounded-lg items-center justify-center mt-4"
                  >
                    <ScanBarcode color={Colors.white} variant="TwoTone" />
                  </Pressable>
                </View>
                <LightText
                  style={{
                    fontSize: 14 / fontScale,
                    color: Colors.grayText,
                    marginBottom: 10,
                  }}
                >
                  Type in your QR code you want to connect or simply scan by
                  clicking the scan button
                </LightText>

                {/* Show more details section */}
              </View>

              <View className=" mt-auto mb-10">
                <Button
                  variant="primary"
                  isLarge={false}
                  isWide={true}
                  onPress={() => {
                    formikProps.handleSubmit();
                  }}
                >
                  <MediumText
                    style={{ color: Colors.white, fontSize: 15 / fontScale }}
                  >
                    Continue
                  </MediumText>
                  <ArrowRightIcon />
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </CustomView>
  );
}
