import { View, Text, ScrollView, useWindowDimensions, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomView from '../../../components/Views/CustomView'
import CustomHeader from '../../../components/headers/CustomHeaders'
import { DirectInbox, Edit2 } from 'iconsax-react-native'
import { Colors } from '../../../components/Colors'
import { BaseNavigationT } from '../home/Home'
import { BoldText, LightText, MediumText } from '../../../components/styles/styledComponents'
import { useFormik } from 'formik'
import * as yup from "yup"
import Input from '../../../components/Input'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { Button } from '../../../components/Button/Button'
import InputView from '../../../components/Input/InputView'
import { CountryPicker } from 'react-native-country-codes-picker'
import useAxios from '../../../components/hooks/useAxios'
import Loader from '../../../components/Loader/LogoLoader'
import { useToast } from '../../../components/CustomToast/ToastContext'
import { ThunkDispatch } from 'redux-thunk'
import { fetchUserApps } from '../../../features/user/userSlice'

const phoneRegExp = /^(\+?[1-9]{1,4})?([0-9]{10,14})$/;

const EditBusinessSchema = yup.object().shape({
  businessEmail: yup.string().required().label("Business Email").email(),
  businessPhone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .label("Business Phone Number")
    .required("Please enter Phone Number"),
  country: yup.string().required().label("Country"),
  businessAddress: yup.string().required().label("Business Address"),
  city: yup.string().required().label("City"),
  postalCode: yup.string().required().label("Postal Code"),
  webAddress: yup.string().required().label("Web Address"),
  registerWebHook: yup.string().required().label("Register Web Hook"),
  webHookSecretKey: yup.string().required().label("Web Hook Secret Key"),
});

interface EditBusinessI extends BaseNavigationT {} 

export default function EditBusiness({navigation}: EditBusinessI) {
  const {fontScale} = useWindowDimensions()
  const {activeUserApp, userAppsLoading, token} = useSelector((state: RootState)=> state.user)
  const [show, setShow] = useState(false)
  const {put, state} = useAxios()
  const {showToast} = useToast()
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const formikProps = useFormik({
    validationSchema: EditBusinessSchema,
    initialValues: {
      businessEmail: activeUserApp?.support_email,
      businessPhone: activeUserApp?.phone,
      country: activeUserApp?.country,
      businessAddress: activeUserApp?.address,
      city: activeUserApp?.city,
      postalCode: activeUserApp?.postal,
      webAddress: activeUserApp?.website_address,
      registerWebHook: activeUserApp?.web_hook,
      webHookSecretKey: activeUserApp?.keys?.sk_keys[0].value,
    },
    onSubmit: (values) => {
      put(
        "editBusiness",
        "/user/support_coin",
        {
          ...activeUserApp,
          support_email: values?.businessEmail,
          phone: values?.businessPhone,
          country: values?.country,
          address: values?.businessAddress,
          city: values?.city,
          postalCode: values?.postalCode,
          website_address: values?.webAddress,
          web_hook: values?.registerWebHook,
          keys: activeUserApp?.keys
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Api-Key": activeUserApp?.keys?.pub_keys[0].value,
            "Auth-Token": token,
          },
        }
      );
    },
  });


  const togglePopup = () => {
    // setShowPopup(!showPopup);
    setShow(!show);
  };

  const onCountrySelection = (item: any) => {
    // Define your logic when a country is selected
    formikProps.setFieldValue("country", item.code);
    // dispatch(updateFormInput({ countryDialCode: item.dial_code }));
    // dispatch(updateFormInput({ countryName: item.name.en }));
    // dispatch(updateFormInput({ countryFlag: item.flag }));
    // dispatch(updateFormInput({ country: item.code }));
    togglePopup();
  };


  useEffect(() => {
    if (!state?.editBusiness?.loading) {
      if (state?.editBusiness?.data) {
        dispatch(fetchUserApps(token))
        showToast("Successfully updated business", "success");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
      if (state?.editBusiness?.error?.message) {
        const errorResponse =
          state?.editBusiness?.error?.response?.data;
        console.log(errorResponse);
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
          showToast(`${state?.editBusiness?.error?.message}`, "error");
        }
      }
    }
  }, [state?.editBusiness?.loading]);


  return (
    <CustomView>
      <CustomHeader
        icon={<Edit2 color={Colors.primary} variant="TwoTone" />}
        text="Business Settings"
        onPress={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View className=" space-y-2 my-5">
          <BoldText style={{ fontSize: 17 / fontScale }}>
            Business Details
          </BoldText>
          <LightText style={{ fontSize: 15 / fontScale }}>
            Edit/update your business details here
          </LightText>
        </View>

        <View>
          <Input
            formikKey="businessEmail"
            formikProps={formikProps}
            value={formikProps.values.businessEmail}
            label="Business Email:"
          />
          <Input
            formikKey="businessPhone"
            formikProps={formikProps}
            value={formikProps.values.businessPhone}
            label="Business Phone Number:"
          />
          <InputView
            label="Country:"
            value={formikProps.values.country}
            onPress={() => togglePopup()}
            showArrowDown={true}
          />
          {/* <Input formikKey='country' formikProps={formikProps} value={formikProps.values.country} label='Select Country:' /> */}
          <Input
            formikKey="businessAdress"
            formikProps={formikProps}
            value={formikProps.values.businessAddress}
            label="Business Address:"
          />
          <Input
            formikKey="city"
            formikProps={formikProps}
            value={formikProps.values.city}
            label="City:"
          />
          <Input
            formikKey="postalCode"
            formikProps={formikProps}
            value={formikProps.values.postalCode}
            label="Postal Code:"
          />
          <Input
            formikKey="webAddress"
            formikProps={formikProps}
            value={formikProps.values.webAddress}
            label="Website Address:"
          />
          <Input
            formikKey="registerWebHook"
            formikProps={formikProps}
            value={formikProps.values.registerWebHook}
            label="Register Web Hook:"
          />
          <Input
            formikKey="webHookSecretKey"
            formikProps={formikProps}
            value={formikProps.values.webHookSecretKey}
            label="Web Hook Secret Key:"
          />
        </View>
      </ScrollView>
      <View className="mt-auto pb-10">
        <Button onPress={() => formikProps?.handleSubmit()} variant="primary">
          <DirectInbox variant="TwoTone" color={Colors.white} />
          <MediumText style={{ fontSize: 15 / fontScale, color: Colors.white }}>
            Save Changes
          </MediumText>
        </Button>
      </View>

      <CountryPicker
        show={show}
        lang={"en"}
        ListHeaderComponent={() => {
          return (
            <MediumText
              style={[styles.countryButtonText, { fontSize: 15 / fontScale }]}
            >
              Search
            </MediumText>
          );
        }}
        onBackdropPress={togglePopup}
        style={{
          modal: {
            height: 500,
          },
          countryButtonStyles: {
            backgroundColor: Colors.white,
          },
          // Dial code styles [Text]
          dialCode: {
            fontFamily:
              Platform.OS === "ios"
                ? "SpaceGrotesk-Regular"
                : "SpaceGroteskRegular",
            color: Colors.balanceBlack,
            fontSize: 14 / fontScale,
            borderRightColor: Colors.ash,
            borderRightWidth: 1,
            paddingRight: 2,
            display: "none"
          },
          // Country name styles [Text]
          countryName: {
            fontFamily:
              Platform.OS === "ios"
                ? "SpaceGrotesk-Regular"
                : "SpaceGroteskRegular",
            color: Colors.balanceBlack,
          },
        }}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={onCountrySelection}
      />

      <Loader visible={state?.editBusiness?.loading === true} />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  countryContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 10,
    padding: 10,
    borderRadius: 5,
  },
  countryCodeContainer: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.modernBlack,
    borderStyle: "solid",
    paddingLeft: 10,
    alignSelf: "flex-start",
    marginLeft: 6,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 24,
    marginHorizontal: -24,
    borderRadius: 24,
  },
  gridItem: {
    width: "28%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 8,
    borderRadius: 12,
  },
  gridItemText: {
    fontSize: 18,
    fontFamily: "SpaceGrotesk-Medium",
    //backgroundColor: Colors?.searchInput,
    width: "100%",
    textAlign: "center",
    paddingVertical: 24,
  },
  clearButton: {
    marginVertical: 20,
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
  },

  key: {
    // backgroundColor: Colors?.searchInput,
    height: "80%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 16,
    alignSelf: "stretch",
    borderRadius: 24,
    fontFamily: "SpaceGrotesk-Medium",
  },

  countryButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
    borderColor: Colors?.ash,
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 24,
  },
  countryButtonText: {
    color: Colors?.grayText,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(55, 65, 81, 0.30);",
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  popup: {
    zIndex: 44,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    flex: 0.5,
    gap: 24,
  },
  formContainer: {
    gap: 12,
    marginTop: 24,
  },
  buttonContainer: {
    marginLeft: "auto",
    marginVertical: 20,
  },
  buttonText: {
    color: Colors.white,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 0,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
    backgroundColor: Colors?.searchInput,
  },

  inputText: {
    fontSize: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: Colors?.ash,
    width: "100%",
    fontFamily: "SpaceGrotesk-Medium",
    alignItems: "center",
    borderRadius: 8,
    height: 54,
    marginBottom: 4,
  },
  input: {
    fontSize: 18,
    padding: 8,
    width: "100%",
    fontFamily: "SpaceGrotesk-Medium",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
  },
  flag: {
    width: 48,
    height: 28,
    marginRight: 10,
    borderRadius: 23,
  },
  textContainer: {
    flexDirection: "column",
  },
  countryName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  countryCode: {
    fontSize: 14,
    color: "#666",
  },
  displayCode: {
    color: Colors?.grayText,
    borderRightWidth: 1.2,
    borderRightColor: Colors?.grayText,
    alignItems: "stretch",
    width: "auto",
    paddingRight: 12,
    marginRight: 12,
  },
});