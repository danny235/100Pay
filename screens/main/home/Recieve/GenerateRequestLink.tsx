import { NavigationProp } from "@react-navigation/native";
import { Formik, useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
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
import useAxios from "../../../../components/hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { createSlug } from "../../../../utils";
import { useToast } from "../../../../components/CustomToast/ToastContext";
import { fetchPaymentsLinks } from "../../../../features/account/accountSlice";
import { ThunkDispatch } from "redux-thunk";

//

const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const generateRequestLinkSchema = yup.object().shape({
  title: yup.string().required().label("Title"),
  name: yup.string().required().label("Name"),
  amount: yup.string().label("Amount"),
});

type GenerateCodeT = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function GenerateRequestLink({ navigation }: GenerateCodeT) {
  const { fontScale, height } = useWindowDimensions();
  const keyboardHeight = useKeyboard();
  const [checked, setChecked] = useState(false);
  const { post, state } = useAxios();
  const { showToast } = useToast();
  const { activeUserApp, userProfile, token } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const formikProps = useFormik({
    initialValues: {
      title: "",
      name: "",
      amount: "",
    },
    onSubmit: (values, actions) => {
      console.log(values.name, values.amount.replace(/,/g, ""));

      post(
        "payLink",
        "/pay/payment_page",
        {
          amount: checked ? "0" : Number(values.amount.replace(/,/g, "")),
          app_id: activeUserApp?._id,
          business_name: activeUserApp?.business_name,
          userId: userProfile?._id,
          call_back_url: "https://app.100pay.co/",
          code: createSlug(values?.name),
          description: `Pay ${activeUserApp?.business_name} in any amount, and in any currency via crypto`,
          link_name: values?.title,
          currency: "USD",
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
    },
    validationSchema: generateRequestLinkSchema,
  });

  let scrollRef = useRef<KeyboardAwareScrollView>(null);

  const scrollToInput = (reactNode: any) => {
    if (scrollRef.current) {
      scrollRef.current.scrollToFocusedInput(reactNode);
    }
  };

  const handleInputFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    scrollToInput(event.target);
  };

  useEffect(() => {
    if (!state?.payLink?.loading) {
      if (state?.payLink?.data) {
        navigation.navigate("GeneratedLink", {
          detail: state?.payLink?.data?.code,
        });
        showToast("Link created successful", "success");
        dispatch(
          fetchPaymentsLinks({
            token,
            apiKey: activeUserApp?.keys?.pub_keys[0]?.value,
          })
        );
      }
      if (state?.payLink?.error?.message) {
        const errorResponse = state?.payLink?.error?.response?.data;

        if (errorResponse) {
          showToast(`${errorResponse}`, "error");
          // Display field-specific errors (email, username, etc.)
          if (errorResponse.message) {
            showToast(`${errorResponse.message}`, "error");
          }
          const errorData = errorResponse.data;
          if (errorData) {
            // Iterate over error fields to display each message
            Object.keys(errorData).forEach((field) => {
              const fieldErrors = errorData[field];
              if (Array.isArray(fieldErrors)) {
                fieldErrors.forEach((error) => {
                  showToast(`${error}`, "error");
                });
              }
            });
          }
        } else {
          // Fallback to the generic error message if no specific response data
          showToast(`${state?.payLink?.error?.message}`, "error");
        }
      }
    }
  }, [state?.payLink?.loading]);

  return (
    <CustomView>
      <CustomHeader
        text="Generate Request Link"
        icon={<AddIcon />}
        onPress={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
      >
        <View className=" flex-1 space-y-3">
          <View className=" mb-auto flex-1">
            <Input
              placeholder="e.g School Fees"
              formikProps={formikProps}
              formikKey="title"
              value={formikProps.values.title}
              label="Title"
              placeholderTextColor={Colors?.ash}
            />
            <Input
              placeholder="e.g my-school-fees"
              formikProps={formikProps}
              formikKey="name"
              value={formikProps.values.name}
              label="Link Name"
              placeholderTextColor={Colors?.ash}
            />
            <LightText
              style={{
                fontSize: 14 / fontScale,
                color: Colors.grayText,
                marginBottom: 10,
              }}
            >
              Type in the name of the new pay link you want to create
            </LightText>

            <Input
              formikProps={formikProps}
              formikKey="amount"
              placeholder="000.000"
              value={formikProps.values.amount}
              label="Amount"
              placeholderTextColor={Colors?.ash}
              keyboardType="decimal-pad"
              editable={!checked}
              onChangeText={(text: string) => {
                // Remove commas and other non-numeric characters
                const cleanedText = text.replace(/[^0-9.]/g, "");

                // Format the number with commas
                const formattedAmount = formatNumberWithCommas(
                  Number(cleanedText)
                );

                // Update the Formik field value
                formikProps.setFieldValue("amount", formattedAmount);
                formikProps.handleChange("amount");
              }}
            />

            <CheckBox
              onClick={() => {
                setChecked(!checked);
              }}
              checkBoxColor={Colors.primary}
              checkedCheckBoxColor={Colors.primary}
              isChecked={checked}
              rightText={"Any Amount"}
              rightTextStyle={{
                fontFamily: "SpaceGrotesk-Regular",
                fontSize: 14 / fontScale,
                color: Colors.balanceBlack,
              }}
            />
          </View>

          <View className="pb-14 mt-auto">
            <Button
              variant="primary"
              isLoading={state?.payLink?.loading}
              isLarge={true}
              isWide={true}
              style={{
                marginTop: "auto",
                marginBottom: Platform.OS === "ios" ? keyboardHeight : 5,
              }}
              onPress={() => {
                formikProps.values.amount.replace(/,/g, "");
                formikProps.handleSubmit();
                console.log(formikProps.values.amount.replace(/,/g, ""));
              }}
            >
              <MediumText
                style={{ color: Colors.white, fontSize: 15 / fontScale }}
              >
                Create Link
              </MediumText>

              {state?.payLink?.loading ? (
                <ActivityIndicator color={Colors?.white} size={24} />
              ) : (
                <ArrowRightIcon />
              )}
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </CustomView>
  );
}
