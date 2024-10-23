import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components/Button/Button";
import { CustomBackdrop } from "../../../../components/ChooseAccountBalance/ChooseAccountBalance";
import { Colors } from "../../../../components/Colors";
import {
  AddCircleIcon,
  CircleIcon,
  CoinIcon,
  GearIcon,
  GreenNairaIcon,
  LinkHookIcon,
  ProfileIcon,
  RecieveIcon,
  SelectIcon,
} from "../../../../components/SvgAssets";
import {
  LightText,
  MediumText,
  RegularText,
} from "../../../../components/styles/styledComponents";
import { RootStackParamList } from "../../../../routes/AppStacks";
import {
  ArrowDown2,
  Bank,
  Copy,
  Flash,
  Flashy,
  Import,
  ImportSquare,
  Link,
  Profile,
  Wallet3,
} from "iconsax-react-native";
import InstantRecieveModal from "./InstantRecieveModal";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootState } from "../../../../app/store";
import {
  addCommas,
  copyToClipboard,
  formatDateString,
  getLastName,
} from "../../../../utils";
import BottomSheetModalComponent from "../../../../components/BottomSheetModal/BottomSheetModalComponent";
import Input from "../../../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import { useFormik } from "formik";
import { useToast } from "../../../../components/CustomToast/ToastContext";
import useAxios from "../../../../components/hooks/useAxios";
import BankList from "../../../../components/banksList/BankList";
import { BankDetailsT, BankT } from "../PayFlow/Pay";
import { validateBankAccount } from "../../../../apis/pay";
import { updateVBAS, VBAT } from "../../../../features/user/userSlice";
import Select from "../../../../components/Select/";

const bvnSchema = yup.object().shape({
  bvn: yup.string().required().label("BVN"),
  accountNumber: yup.string().required().label("Account Number"),
  bankName: yup.string().required().label("Bank Name"),
});

type RecieveModalT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  showRecieve: boolean;
  onClose: () => void;
};

type OptionT = {
  label: string;
  value: string;
};

export default function RecieveModal({
  navigation,
  showRecieve,
  onClose,
}: RecieveModalT) {
  const { fontScale } = useWindowDimensions();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { paymentLinks, paymentLinksLoading } = useSelector(
    (state: RootState) => state.account
  );
  const {
    userApps,
    activeUserApp,
    userAppsError,
    userAppsLoading,
    token,
    userProfile,
    vbas,
  } = useSelector((state: RootState) => state.user);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapTo, setSnapTo] = useState(["38%", "80%"]);
  const [showInstantRecieve, setShowInstantRecieve] = useState(false);
  const [showBVNForm, setShowBVNForm] = useState(false);
  const [showBankAccountDetails, setShowBankAccountDetails] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [activeBank, setActiveBank] = useState<BankT>(null);
  const [bankDetails, setBankDetails] = useState<BankDetailsT>(null);
  const [fetching, setFetching] = useState(false);
  const [activeOption, setActiveOption] = useState<OptionT | null>(null);
  const bankOptions = [
    {
      label: "Wema Bank",
      value: "wema-bank",
    },
    {
      label: "Titan Bank (recommended)",
      value: "titan-paystack",
    },
  ];
  const { post, state } = useAxios();
  const handleSelect = (option: OptionT) => {
    console.log("Selected:", option);
    setActiveOption(option);
  };
  const formikProps = useFormik({
    initialValues: {
      bvn: "",
      accountNumber: "",
      bankName: "",
    },
    onSubmit: (values) => {
      post(
        "createVBA",
        "/user/create-bank",
        {
          appId: activeUserApp?._id,
          accountNumber: values?.accountNumber,
          bankCode: activeBank?.code,
          bvn: values?.bvn,
          middleName: getLastName(bankDetails?.account_name),
          provider: activeOption ? activeOption?.value : "wema-bank",
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
    },
    validationSchema: bvnSchema,
  });

  // Recieve Via Options

  // Recieve list items
  const recieveItems = [
    {
      id: 1,
      name: "Deposit Crypto",
      subTitle: "Receive crypto with a wallet address",
      icon: <Bank variant="TwoTone" color={Colors.primary} />,
      cb: () => {
        navigation.navigate("MainTabs", {
          screen: "Asset"
        })
        onClose();

        // // setShowBVNForm(true);
        // if (vbas === null || vbas?.length === 0) {
        //   setShowBVNForm(true);
        // } else {
        //   setShowBankAccountDetails(true);
        // }

        // handlePresentRecieveModalClose();
      },
    },
    {
      id: 2,
      name: "Pay ID",
      subTitle: "Receive from other 100Pay users",
      icon: <Profile color={Colors.primary} variant="TwoTone" />,
      cb: () => {
        onClose();

        setTimeout(() => navigation.navigate("GeneratedCode"), 300);
      },
    },
    // {
    //   id: 3,
    //   name: "Payment Link",
    //   subTitle: "Send a payment link to recieve money",
    //   icon: <Link color={Colors.primary} variant="TwoTone" />,
    //   cb: () => {
    //     onClose()
    //     navigation.navigate("MainTabs", {
    //       screen: "Discover",
    //       params: {
    //         screen: "GenerateLink",
    //         initial: true,
    //       },
    //     });
    //   },
    // },
    // {
    //   id: 4,
    //   name: "Pay Checkout",
    //   subTitle: "Recieve money from any digital asset",
    //   icon: <Wallet3 variant="TwoTone" color={Colors.primary} />,
    //   cb: () => {
    //     onClose()
    //     setShowInstantRecieve(true);
    //   },
    // },
    // {
    //   id: 2,
    //   name: "Asset Deposit",
    //   icon: <CoinIcon />,
    //   cb: () => {
    //     onClose()
    //     navigation.replace("MainTabs", {
    //       screen: "Asset",
    //     });
    //   },
    // },
  ];

  const validateBank = async (accountNumber, bank, token) => {
    setActiveBank(bank);

    const data = {
      accountNumber,
      bankCode: bank?.code,
    };
    setFetching(true);
    try {
      const res = await validateBankAccount(data, token);

      if (res.data?.status) {
        setBankDetails(res.data?.data);
        setFetching(false);
      } else {
        setFetching(false);
        showToast(res.data?.message, "error");
      }
    } catch (err) {
      setFetching(false);
      showToast(err?.message, "error");
    }
  };

  useEffect(() => {
    if (!state?.createVBA?.loading) {
      if (state?.createVBA?.data) {
        setShowBVNForm(false);
        showToast("Account information is being processed", "success");

        post(
          "vbas",
          "/user/vbas",
          {
            appId: activeUserApp?._id,
          },
          {
            headers: {
              "auth-token": token,
            },
          }
        );
      }

      if (state?.createVBA?.error) {
        const errorResponse = state?.createVBA?.error?.response?.data;
        const genericErrorMessage = state?.createVBA?.error?.message;

        console.log(errorResponse, "line 271");

        // Display generic error message if available

        if (errorResponse) {
          showToast(`${errorResponse}`, "error");
          // Display main response error message
          if (errorResponse.message) {
            showToast(`${errorResponse.message}`, "error");
          }

          const errorData = errorResponse.data;
          if (errorData) {
            // Iterate over error fields and display each message
            Object.keys(errorData).forEach((field) => {
              const fieldErrors = errorData[field];
              if (Array.isArray(fieldErrors)) {
                fieldErrors.forEach((error) => {
                  showToast(`${error}`, "error");
                });
              }
            });
          }
        }
        showToast(genericErrorMessage, "error");
      }
    }
  }, [state?.createVBA?.loading]);

  useEffect(() => {
    if (formikProps?.values?.accountNumber?.length < 10) {
      setBankDetails(null);
    }
  }, [formikProps.values?.accountNumber]);

  useEffect(() => {
    if (!state?.vbas?.loading) {
      if (state?.vbas?.data) {
        dispatch(updateVBAS(state?.vbas?.data));
        formikProps?.resetForm();
        showToast("Fetch virtual bank account success", "success");
        if (state?.vbas?.data?.length === 0) {
          setShowBVNForm(true);
          setShowBankAccountDetails(false);
        }
      }
    }
  }, [state?.vbas?.loading]);

  return (
    <>
      {/* <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableContentPanningGesture={false}
          enablePanDownToClose={false}
          handleIndicatorStyle={{
            borderWidth: 3,
            borderColor: Colors.ash,
            width: "20%",
          }}
          backdropComponent={({ animatedIndex, style }) => (
            <CustomBackdrop
              onPress={handlePresentModalClose}
              animatedIndex={animatedIndex}
              style={style}
            />
          )}
          animateOnMount={true}
        >
          <View
            style={{
              paddingVertical: 20,
              gap: 20,
              paddingHorizontal: 20,
              flex: 1,
            }}
          >
            <View style={{ gap: 20, flexDirection: "row" }}>
              <SelectIcon />
              <MediumText
                style={{
                  fontSize: 20 / fontScale,
                  borderLeftColor: Colors.ash,
                  borderLeftWidth: 1,
                  paddingLeft: 10,
                }}
              >
                Recieve Payments
              </MediumText>
            </View>
            <LightText
              style={{
                fontSize: 15 / fontScale,
                color: Colors.authTextTitle,
              }}
            >
              Recieve payment via Crypto, Pay ID, Payment Link
            </LightText>
            <Pressable style={styles.searchBox}>
              <LightText>Search request code here...</LightText>
              <CircleIcon color={Colors.grayText} />
            </Pressable>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ gap: 10, flex: 1 }}
            >
              {paymentLinksLoading === "loading" && (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <ActivityIndicator color={Colors.primary} size={30} />
                </View>
              )}

              {paymentLinks?.length > 0 &&
                paymentLinks.map((paymentLink, i) => {
                  return (
                    <Pressable
                      onPress={() => {
                        onClose();
                        handlePresentModalClose();
                        navigation.navigate("MainTabs", {
                          screen: "Discover",
                          params: {
                            screen: "GeneratedLink",
                            initial: false,
                            params: {
                              detail: paymentLink.code,
                            },
                          },
                        });
                      }}
                      style={styles.linkItem}
                      key={paymentLink._id}
                    >
                      <View style={styles.linkCurrency}>
                        <GreenNairaIcon />
                      </View>
                      <View style={styles.linkDetails}>
                        <MediumText style={{ fontSize: 18 / fontScale }}>
                          {paymentLink.link_name}
                        </MediumText>
                        <View style={styles.linkSubtextWrapper}>
                          <LightText
                            style={{
                              fontSize: 15 / fontScale,
                              borderRightColor: Colors.ash,
                              borderRightWidth: 1,
                              paddingRight: 5,
                            }}
                          >
                            Created: {formatDateString(paymentLink?.createdAt)}
                          </LightText>
                          <LightText style={{ fontSize: 15 / fontScale }}>
                            Amount: {activeUserApp?.currency}
                            {addCommas(paymentLink.amount)}
                          </LightText>
                        </View>
                      </View>
                    </Pressable>
                  );
                })}

              {paymentLinks?.length === 0 && (
                <View style={styles.emptyPaymentLinks}>
                  <MediumText
                    style={{
                      textAlign: "center",
                      fontSize: 15 / fontScale,
                      color: Colors.balanceBlack,
                    }}
                  >
                    No payments links yet
                  </MediumText>
                  <LightText
                    style={{
                      textAlign: "center",
                      fontSize: 15 / fontScale,
                      color: Colors.balanceBlack,
                      width: "80%",
                    }}
                  >
                    Links generated would appear in this section
                  </LightText>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,

                  marginHorizontal: 10,
                }}
              >
                <Button
                  style={{ flexBasis: 40, flexGrow: 1 }}
                  variant="secondary"
                  isLarge={false}
                  isWide={false}
                  onPress={handlePresentRecieveModalPress}
                >
                  <AddCircleIcon />
                  <MediumText style={{ fontSize: 15 / fontScale }}>
                    Pay ID
                  </MediumText>
                </Button>

                <Button
                  style={{ flexBasis: 40, flexGrow: 1 }}
                  variant="primary"
                  isLarge={false}
                  isWide={false}
                  onPress={() => {
                    handlePresentModalClose();
                    setShowInstantRecieve(true);
                  }}
                >
                  <Flashy color={Colors.white} size={24} />
                  <MediumText
                    style={{ color: Colors.white, fontSize: 15 / fontScale }}
                  >
                    Instant Recieve
                  </MediumText>
                </Button>
              </View>
            </ScrollView>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider> */}

      {/* Recieve Modal */}
      <BottomSheetModalComponent
        show={showRecieve}
        onClose={onClose}
        snapPoints={["38%", "50%"]}
      >
        <ScrollView style={{flex: 1}} contentContainerStyle={{ gap: 20, padding: 20 }}>
          <View className="flex flex-row items-center gap-3">
            <ImportSquare variant="TwoTone" color={Colors.primary} />
            <MediumText
              className={`border-l border-[#E5E7EB] pl-3`}
              style={{
                fontSize: 20 / fontScale,
              }}
            >
              Recieve Payments Via:
            </MediumText>
          </View>
          <LightText
            style={{ fontSize: 15 / fontScale, color: Colors.grayText }}
          >
            Select how you want to receive money to your 100Pay account.
          </LightText>
          <View style={{ gap: 10 }}>
            {recieveItems.map((item, i) => (
              <Pressable
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  paddingVertical: 15,
                }}
                onPress={item.cb}
                key={item.id}
              >
                <View className="bg-gray-100 items-center justify-center rounded-md p-3">
                  {item.icon}
                </View>
                <View className="gap-2">
                  <RegularText style={{ fontSize: 15 / fontScale }}>
                    {item.name}
                  </RegularText>
                  <LightText
                    style={{
                      fontSize: 14 / fontScale,
                      color: Colors.grayText,
                    }}
                  >
                    {item.subTitle}
                  </LightText>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </BottomSheetModalComponent>

      {/* BVN form for users that haven't added their bvn and created a bank account */}

      <BottomSheetModalComponent
        show={showBVNForm}
        onClose={() => setShowBVNForm(false)}
        snapPoints={["40%", "75%"]}
      >
        <ScrollView>
          <View className=" flex-1 p-5 space-y-4">
            <View className=" mb-auto space-y-2">
              <View>
                <MediumText
                  style={{ color: Colors.black, fontSize: 18 / fontScale }}
                >
                  Enter your details
                </MediumText>
                <RegularText
                  style={{ color: Colors.grayText, fontSize: 15 / fontScale }}
                >
                  Please enter your BVN and an account linked to the bvn so we
                  can create an account for you
                </RegularText>
              </View>

              <View className=" mb-4 z-50">
                <Select
                  options={bankOptions}
                  onSelect={handleSelect}
                  placeholder="Click to select"
                  heading="Select Your Preferred Bank"
                />
              </View>
              <Input
                formikKey="bvn"
                formikProps={formikProps}
                value={formikProps.values.bvn}
                label="BVN"
                placeholder="2345xxxxxx"
                placeholderTextColor={Colors.grayText}
              />
              <Input
                formikKey="accountNumber"
                formikProps={formikProps}
                value={formikProps.values.accountNumber}
                label="Account Number"
                placeholder="2345xxxxxx"
                placeholderTextColor={Colors.grayText}
              />
              <View style={styles.banksWrapper}>
                <RegularText style={{ fontSize: 15 / fontScale }}>
                  Bank Name
                </RegularText>
                <Pressable
                  onPress={() => setBankOpen(true)}
                  style={styles.bankSelect}
                >
                  <RegularText style={{ fontSize: 15 / fontScale }}>
                    {activeBank?.name ? activeBank?.name : "Select your bank"}
                  </RegularText>
                  <ArrowDown2
                    variant="Bold"
                    color={Colors.grayText}
                    size={24}
                  />
                </Pressable>
              </View>
              {fetching && (
                <MediumText
                  style={{ fontSize: 15 / fontScale, color: Colors.primary }}
                >
                  ....
                </MediumText>
              )}
              {bankDetails && (
                <MediumText
                  className="mb-3"
                  style={{ fontSize: 15 / fontScale, color: Colors.primary }}
                >
                  {bankDetails?.account_name}
                </MediumText>
              )}
            </View>
            <View className="pb-14">
              <Button
                isLoading={state?.createVBA?.loading}
                onPress={formikProps.handleSubmit as any}
                variant="primary"
              >
                <MediumText
                  style={{ color: Colors.white, fontSize: 15 / fontScale }}
                >
                  Submit
                </MediumText>
                {state?.createVBA?.loading && (
                  <ActivityIndicator color={Colors.white} size={24} />
                )}
              </Button>
            </View>
          </View>
        </ScrollView>
      </BottomSheetModalComponent>

      {/* Account details form */}
      <BottomSheetModalComponent
        show={showBankAccountDetails}
        onClose={() => setShowBankAccountDetails(false)}
        snapPoints={["40%", "50%"]}
      >
        <View className=" flex-1 p-5 space-y-4">
          <View className=" space-y-2">
            <MediumText
              style={{ color: Colors.black, fontSize: 18 / fontScale }}
            >
              Account Details
            </MediumText>
            <RegularText
              style={{ color: Colors.grayText, fontSize: 15 / fontScale }}
            >
              Please ensure you transfer money from your personal account to the
              account below
            </RegularText>
          </View>
          {vbas?.some((vba: VBAT) => vba.assigned) ? (
            // Show account details if any assigned vba is found
            <ScrollView>
              {vbas
                ?.filter((vba: VBAT) => vba.assigned)
                ?.map((vba) => (
                  <View className="space-y-4" key={vba.accountNumber}>
                    <View className="flex-row justify-between items-center">
                      <View className="space-y-2">
                        <RegularText
                          style={{
                            color: Colors.grayText,
                            fontSize: 13 / fontScale,
                          }}
                        >
                          Account Holder
                        </RegularText>
                        <RegularText
                          className="capitalize"
                          style={{
                            color: Colors.black,
                            fontSize: 15 / fontScale,
                          }}
                        >
                          {vba?.accountName}
                        </RegularText>
                      </View>
                      <Pressable
                        onPress={() => {
                          copyToClipboard(vba?.accountName);
                          showToast("Copied successfully", "success");
                        }}
                      >
                        <Copy color={Colors.primary} variant="TwoTone" />
                      </Pressable>
                    </View>

                    <View className="flex-row justify-between items-center">
                      <View className="space-y-2">
                        <RegularText
                          style={{
                            color: Colors.grayText,
                            fontSize: 13 / fontScale,
                          }}
                        >
                          Account number
                        </RegularText>
                        <RegularText
                          className="capitalize"
                          style={{
                            color: Colors.black,
                            fontSize: 15 / fontScale,
                          }}
                        >
                          {vba?.accountNumber}
                        </RegularText>
                      </View>
                      <Pressable
                        disabled={!vba?.accountNumber}
                        onPress={() => {
                          copyToClipboard(vba?.accountNumber);
                          showToast("Copied successfully", "success");
                        }}
                      >
                        <Copy color={Colors.primary} variant="TwoTone" />
                      </Pressable>
                    </View>

                    <View className="flex-row justify-between items-center">
                      <View className="space-y-2">
                        <RegularText
                          style={{
                            color: Colors.grayText,
                            fontSize: 13 / fontScale,
                          }}
                        >
                          Bank name
                        </RegularText>
                        <RegularText
                          className="capitalize"
                          style={{
                            color: Colors.black,
                            fontSize: 15 / fontScale,
                          }}
                        >
                          {vba?.bank?.name}
                        </RegularText>
                      </View>
                      <Pressable
                        onPress={() => {
                          copyToClipboard(vba?.bank?.name);
                          showToast("Copied successfully", "success");
                        }}
                      >
                        <Copy color={Colors.primary} variant="TwoTone" />
                      </Pressable>
                    </View>
                  </View>
                ))}
            </ScrollView>
          ) : (
            // Show a message if no assigned vba is found
            <View className=" space-y-4 flex-1" style={{ marginTop: 20 }}>
              <RegularText
                className=" text-center mb-auto mt-3"
                style={{ color: Colors.grayText, fontSize: 15 / fontScale }}
              >
                Account creation is in process. Please wait...
              </RegularText>
              <View className="pb-10">
                <Button
                  isLoading={state?.vbas?.loading}
                  onPress={() =>
                    post(
                      "vbas",
                      "/user/vbas",
                      {
                        appId: activeUserApp?._id,
                      },
                      {
                        headers: {
                          "auth-token": token,
                        },
                      }
                    )
                  }
                  variant="primary"
                >
                  <MediumText
                    style={{ color: Colors.white, fontSize: 15 / fontScale }}
                  >
                    Refresh
                  </MediumText>
                  {state?.vbas?.loading && (
                    <ActivityIndicator color={Colors.white} size={24} />
                  )}
                </Button>
              </View>
            </View>
          )}
        </View>
      </BottomSheetModalComponent>
      <InstantRecieveModal
        navigation={navigation}
        show={showInstantRecieve}
        onClose={() => setShowInstantRecieve(false)}
      />

      <BankList
        isOpen={bankOpen}
        onBankPress={(bank) => {
          validateBank(formikProps?.values?.accountNumber, bank, token);
          formikProps.setFieldValue("bankName", bank?.name);
        }}
        onClose={() => setBankOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyPaymentLinks: {
    backgroundColor: Colors.whiteShade,
    borderRadius: 10,
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  linkItem: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },
  linkDetails: {
    gap: 10,
    borderBottomColor: Colors.ash,
    borderBottomWidth: 1,
    padding: 10,
  },
  linkCurrency: {
    backgroundColor: Colors.memojiBackground,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  linkSubtextWrapper: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  banksWrapper: {
    gap: 10,
  },
  bankSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.ash,
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
});
