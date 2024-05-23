import { Formik } from "formik";
import React, { useState } from "react";
import { Pressable, View, useWindowDimensions } from "react-native";
import * as yup from "yup";
import { Button } from "../../components/Button/Button";
import { Colors } from "../../components/Colors";
import { ArrowRightIcon, MailIcon } from "../../components/SvgAssets";
import CustomView from "../../components/Views/CustomView";
import { MediumText } from "../../components/styles/styledComponents";
import { NavigationProp } from "@react-navigation/native";
import Input from "../../components/Input";
import Header from "../../components/headers/AuthHeader";
import AuthTitleText from "../../components/headers/AuthTitleText";
import { useDispatch, useSelector } from "react-redux";
import { updateFormInput } from "../../features/auth/authSlice";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../app/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/AppStacks";
import { Profile } from "iconsax-react-native";

const signUpSchema = yup.object().shape({
  first_name: yup
    .string()
    .required()
    .label("First Name")
    .min(3, "First name must be 3 characters long"),
  last_name: yup
    .string()
    .required()
    .label("Last Name")
    .min(3, "Last name must be 3 characters long"),
});

interface RootAuthI {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
export default function PersonalInfo({
  navigation,
}: RootAuthI): React.JSX.Element  {
     const { fontScale } = useWindowDimensions();
     const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
     const {  first_name, last_name } = useSelector((state: RootState) => state.auth);

  return (
    <CustomView>
      <Header />

      <AuthTitleText
        text="Please tell us your personal information, input your first name & last name"
        title="Your Personal Info"
        icon={<Profile color={Colors.primary} variant="TwoTone" />}
        marginTop={24}
      />

      <Formik
        initialValues={{
          first_name,
          last_name,
        }}
        onSubmit={async (values, actions) => {
          console.log("Form values:", values);
          try {
            await signUpSchema.validate(values);
            navigation.navigate("SetPassword");
          } catch (error) {
            console.error("Form validation failed:", error);
          }
        }}
        validationSchema={signUpSchema}
      >
        {(formikProps) => (
          <View style={{ gap: 12, marginTop: 24 }}>
            <Input
              placeholder="Daniel"
              formikProps={formikProps}
              formikKey="first_name"
              value={formikProps.values.first_name}
              label="First Name"
              placeholderTextColor={Colors?.grayText}
              onChangeText={(text) => {
                formikProps.handleChange("first_name")(text);
                dispatch(updateFormInput({ first_name: text }));
              }}
            />
            <Input
              placeholder="Goddy"
              formikProps={formikProps}
              formikKey="last_name"
              value={formikProps.values.last_name}
              label="Last Name"
              placeholderTextColor={Colors?.grayText}
              onChangeText={(text) => {
                formikProps.handleChange("last_name")(text);
                dispatch(updateFormInput({ last_name: text }));
              }}
            />
            <View style={{ marginLeft: "auto", marginTop: "auto" }}>
              <Button
                variant="primary"
                isLarge={false}
                isWide={false}
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
    </CustomView>
  );
}
