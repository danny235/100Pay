import { NavigationProp } from "@react-navigation/native";
import { Formik, useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
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
import { Scan, ScanBarcode } from "iconsax-react-native";
import WalletScan from "../Scan/WalletScan";
import useAxios from "../../../../components/hooks/useAxios";
import { useToast } from "../../../../components/CustomToast/ToastContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { createSlug } from "../../../../utils";

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
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState<string>("");
    const { post, state } = useAxios();
    const { showToast } = useToast();
    const { activeUserApp, userProfile, token } = useSelector(
      (state: RootState) => state.user
    );
  const formikProps = useFormik({
    initialValues: {
      qrcode: "",
    },
    onSubmit: (values, actions) => {
      // navigation.navigate("GeneratedLink");
      //  post(
      //    "payLink",
      //    "/pay/payment_page",
      //    {
      //      amount: checked ? "0" : Number(values.amount.replace(/,/g, "")),
      //      app_id: activeUserApp?._id,
      //      business_name: activeUserApp?.business_name,
      //      userId: userProfile?._id,
      //      call_back_url: "https://app.100pay.co/",
      //      code: createSlug(values?.name),
      //      description: `Pay ${activeUserApp?.business_name} in any amount, and in any currency via crypto`,
      //      link_name: values?.title,
      //      currency: "USD",
      //    },
      //    {
      //      headers: {
      //        "auth-token": token,
      //      },
      //    }
      //  );
    },
    validationSchema: generateRequestLinkSchema,
  });

  const scrollToInput = (reactNode: any) => {
    if (scrollRef.current) {
      scrollRef.current.scrollToFocusedInput(reactNode);
    }
  };

  useEffect(() => {
    formikProps.setFieldValue("qrcode", scannedData);
  }, [scannedData]);
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
        <View>
          <View className=" flex-1 mb-auto">
            <View className=" flex-row items-center flex-1 justify-between">
              <View className="relative" style={{ width: "100%" }}>
                <Input
                  placeholder="GHDIDN"
                  formikProps={formikProps}
                  formikKey="qrcode"
                  value={formikProps.values.qrcode}
                  label="Enter QR code"
                  placeholderTextColor={Colors?.ash}
                  maxLength={6}
                />
                <Pressable
                  className={`absolute ${Platform.OS === "ios" ? "bottom-9" : "bottom-10"} right-2`}
                  onPress={()=> setShowScanner(true)}
                >
                  <Scan color={Colors.primary} variant="TwoTone" />
                </Pressable>
              </View>
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
      </KeyboardAwareScrollView>

      <WalletScan
        isVisible={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={(code) => setScannedData(code)}
      />
    </CustomView>
  );
}
