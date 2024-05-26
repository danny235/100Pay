import {Formik} from 'formik';
import React, {useState} from 'react';
import {Pressable, View, useWindowDimensions} from 'react-native';
import * as yup from 'yup';
import {Button} from '../../components/Button/Button';
import {Colors} from '../../components/Colors';
import {ArrowRightIcon, MailIcon} from '../../components/SvgAssets';
import CustomView from '../../components/Views/CustomView';
import {MediumText} from '../../components/styles/styledComponents';
import {NavigationProp} from '@react-navigation/native';
import Input from '../../components/Input';
import Header from '../../components/headers/AuthHeader';
import AuthTitleText from '../../components/headers/AuthTitleText';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormInput } from '../../features/auth/authSlice';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../app/store';

const loginSchema = yup.object().shape({
  email: yup.string().required().label('Email').email(),
});

interface RootAuthI {
  navigation: NavigationProp<any>;
}

export default function CreateAccount({
  navigation,
}: RootAuthI): React.JSX.Element {
  const {fontScale} = useWindowDimensions();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const {email} = useSelector((state: RootState)=>state.auth)


  return (
    <CustomView>
      <Header />

      <AuthTitleText
        text="Hello, tell us your email address so that we can get you started on this journey."
        title="Your email"
        icon={<MailIcon color={Colors.primary} />}
        marginTop={24}
      />

      <Formik
        initialValues={{
          email: email,
        }}
        onSubmit={async (values, actions) => {
          console.log("Form values:", values);
          try {
            await loginSchema.validate(values);
            console.log("Form validation passed. Navigating to PhoneNumber...");
            navigation.navigate("PhoneNumber");
          } catch (error) {
            console.error("Form validation failed:", error);
          }
        }}
        validationSchema={loginSchema}
      >
        {(formikProps) => (
          <View style={{ gap: 12, marginTop: 24 }}>
            <View>
              <Input
                placeholder="johndoe@example.com"
                formikProps={formikProps}
                formikKey="email"
                value={formikProps.values.email}
                autoCapitalize="none"
                keyboardType="email-address"
                label="Email"
                placeholderTextColor={Colors?.grayText}
                onChangeText={(text) => {
                  formikProps.handleChange("email")(text);
                  dispatch(updateFormInput({ email: text }));
                }}
              />
            </View>
            <View style={{ marginLeft: "auto" }}>
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
