import { Formik } from "formik";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
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
import { Icon, ProfileAdd } from "iconsax-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PinInputBottomSheet from "../../components/CustomPin/PinInputBottomSheet";
import Loader from "../../components/Loader/LogoLoader";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../app/store";
import { updateFormInput } from "../../features/auth/authSlice";
import { addToken, toggleIsLoggedIn } from "../../features/user/userSlice";
import { logInUserRequest } from "../../apis/auth/loginuser";
import { createUserRequest } from "../../apis/auth/createuser";
import { useToast } from "../../components/CustomToast/ToastContext";

const loginSchema = yup.object().shape({
  invitationCode: yup.string().label("invitationCode"),
});

interface RootAuthI {
  navigation: NavigationProp<any>;
}

export default function Invitation({
  navigation,
}: RootAuthI): React.JSX.Element {
  const { fontScale, height } = useWindowDimensions();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { showToast } = useToast();
  const {
    password,
    confirmPassword,
    country,
    email,
    inviteCode,
    first_name,
    last_name,
    phone,
  } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  let scrollRef = useRef<KeyboardAwareScrollView>(null);

  const scrollToInput = (reactNode: any) => {
    if (scrollRef.current) {
      scrollRef.current.scrollToFocusedInput(reactNode);
    }
  };

  return (
    <CustomView>
      <Header />

      <AuthTitleText
        text="Enter the code of the person that invited you."
        title="Invitation"
        icon={<ProfileAdd variant="TwoTone" color={Colors.primary} size={24} />}
        marginTop={24}
      />
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{
            invitationCode: inviteCode,
          }}
          onSubmit={async (values, actions) => {
            setLoading(true); // Set loading to true when login process starts
            const data = {
              email,
              password,
              phone,
              first_name,
              last_name,
              inviteCode,
              country
            };
            try {
              const { message, token, status } = await createUserRequest(data);
              console.log(message, token, status);

              if (token) {
                showToast(message, "success")
                dispatch(toggleIsLoggedIn(true));
                dispatch(addToken(token));
              }
              // Handle success, maybe set token to AsyncStorage or Redux store
            } catch (error) {
              console.log("Login error:", error);
              showToast(error?.message, "error")
              // Handle error, maybe display error message to the user
            } finally {
              setLoading(false); // Set loading to false when login process completes
            }
          }}
          validationSchema={loginSchema}
        >
          {(formikProps) => (
            <View style={{ gap: 12, marginTop: 24, flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Input
                  placeholder="ID: P1234GH6"
                  formikProps={formikProps}
                  formikKey="invitationCode"
                  value={formikProps.values.invitationCode}
                  autoCapitalize="none"
                  label="Invitation Code"
                  placeholderTextColor={Colors?.grayText}
                  onChangeText={(text) => {
                    formikProps.handleChange("invitationCode")(text);
                    dispatch(updateFormInput({ inviteCode: text }));
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "auto",
                }}
              >
                <Button
                  variant="secondary"
                  isLarge={false}
                  isWide={false}
                  style={{ width: "48.5%" }}
                  isLoading={loading}
                  onPress={() => {
                    formikProps.handleSubmit();
                  }}
                >
                  <MediumText
                    style={{ color: Colors.black, fontSize: 15 / fontScale }}
                  >
                    Skip
                  </MediumText>
                </Button>
                <Button
                  variant="primary"
                  isLarge={false}
                  isWide={false}
                  style={{ width: "48.5%" }}
                  isLoading={loading}
                  onPress={() => {
                    formikProps.handleSubmit();
                  }}
                >
                  <MediumText
                    style={{ color: Colors.white, fontSize: 15 / fontScale }}
                  >
                    Continue
                  </MediumText>
                  {loading ? (
                    <ActivityIndicator color={Colors.white} />
                  ) : (
                    <ArrowRightIcon />
                  )}
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </CustomView>
  );
}
