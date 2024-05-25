import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { isObject, useFormik } from "formik";
import * as yup from "yup";
import { Button } from "../../../../components/Button/Button";
import { Colors } from "../../../../components/Colors";
import {
  LightText,
  MediumText,
  RegularText,
  SemiBoldText,
} from "../../../../components/styles/styledComponents";
import PayHeaders from "../../../../components/headers/PayHeaders";
import SafeAreaViewHeader from "../../../../components/Views/SafeAreaView";
import Input from "../../../../components/Input";
import {
  ArrowFrontIcon,
  CircleIcon,
  ScanIcon,
  ScanRedIcon,
} from "../../../../components/SvgAssets";
import Memojis from "../Memojis";
import UserPayList from "./UsersPayList";
import { ScrollView } from "react-native";
import CustomView from "../../../../components/Views/CustomView";
import CustomHeader from "../../../../components/headers/CustomHeaders";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../../routes/AppStacks";
import BankList from "../../../../components/banksList/BankList";
import Loader from "../../../../components/Loader/LogoLoader";
import { ArrowForward, ArrowRight } from "iconsax-react-native";
import { useToast } from "../../../../components/CustomToast/ToastContext";
import { validateBankAccount, validatePayId } from "../../../../apis/pay";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { UserAppType } from "../../../../features/user/userSlice";

const validationSchema = yup.object().shape({
  recipientNameOrID: yup
    .string()
    .min(
      6,
      "Recipient Account number must be 11 or Pay ID must be at least 6 characters"
    )
    .required("Recipient Name or ID is required"),
});

type PayHomeT = {
  navigation: NavigationProp<RootStackParamList>;
};

type BankT = {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
};


export default function PayHome({ navigation }: PayHomeT) {
  const { fontScale } = useWindowDimensions();
  const [submitted, setSubmitted] = useState(false); // State to track form submission
  const [payIdDetails, setPayIdDetails] = useState<UserAppType>(null);
  const [bankDetails, setBankDetails] = useState<BankT>(null);
  const [fetching, setFetching] = useState(false);
  const [activeBank, setActiveBank] = useState(null);
  const [bankOpen, setBankOpen] = useState(false);
  const [accountNum, setAccountNum] = useState("");
  const [showBankForm, setShowBankForm] = useState(false);
  const fetchTimeoutRef = useRef(null);
  const resetTimeoutRef = useRef(null);
  const {showToast} = useToast()
  const {
    userApps,
    activeUserApp,
    userAppsError,
    userAppsLoading,
    token,
    userProfile,
    userProfileLoading,
  } = useSelector((state: RootState) => state.user);

  const validateId = async (payId) => {
    setFetching(true)
    try {
      const res = await validatePayId(payId, token)

      if(res.data) {
        setFetching(false)
        setPayIdDetails(res.data)
      }
    } catch(err) {
      setFetching(false)
      showToast(err?.message, "error")
    }
  }

  const validateBank = async (accountNumber, bank, token) => {
    setActiveBank(bank)
    const data = {
      accountNumber,
      bankCode: bank?.code
    }
    setFetching(true)
    try {
      const res = await validateBankAccount(data, token)

      if(res.data) {
        setFetching(false)
        setBankDetails(res.data)
      }
    } catch(err) {
      setFetching(false)
      showToast(err?.message, "error")
    }
  }

  useEffect(() => {
    if (accountNum.length === 6) {
      fetchTimeoutRef.current = setTimeout(() => {
       validateId(accountNum)
      }, 1000);
    } else if (accountNum.length === 10) {
      setShowBankForm(true);
      
    } else if (accountNum.length < 10) {
      setShowBankForm(false);
    }

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    
    };
  }, [accountNum]);

  return (
    <CustomView>
      <CustomHeader
        text="Send payment"
        icon={<ScanRedIcon />}
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <LightText style={styles.description}>
            Find and select the user you want to send payment to here.
          </LightText>
          <RegularText style={{ fontSize: 16 / fontScale }}>
            Recipient account
          </RegularText>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 20,
              alignItems: "center",
              flex: 1,
              marginVertical: 10,
            }}
          >
            <TextInput
              value={accountNum}
              placeholder="Enter recipient bank or ID here"
              autoCapitalize="none"
              keyboardType="default"
              placeholderTextColor={Colors.grayText}
              onChangeText={(text) => setAccountNum(text)}
              style={[styles.searchInputField, { fontSize: 15 / fontScale }]}
              maxLength={10}
            />

            <Pressable
              style={styles.qrBtn}
              onPress={() => {
                navigation.navigate("Scan");
              }}
            >
              <ScanIcon width={15} height={15} color="#fff" />
            </Pressable>
          </View>
          <View style={{ marginTop: 12, gap: 24 }}>
            {submitted && (
              <Pressable
                onPress={() => navigation.navigate("SendPayment")}
                style={{
                  backgroundColor: Colors.memojiBackground,
                  padding: 16,
                  borderRadius: 12,
                }}
              >
                <SemiBoldText style={{ color: Colors.balanceBlack }}>
                  Send Money to:
                </SemiBoldText>
                <View style={{ marginTop: 12, marginBottom: -24 }}>
                  <UserPayList renderSingleItem />
                </View>
              </Pressable>
            )}

            {showBankForm && (
              <Pressable
                onPress={() => setBankOpen(true)}
                style={{
                  backgroundColor: Colors.memojiBackground,
                  padding: 16,
                  borderRadius: 12,
                }}
              >
                <SemiBoldText
                  style={{
                    color: Colors.balanceBlack,
                    fontSize: 17 / fontScale,
                  }}
                >
                  Select Bank:
                </SemiBoldText>
                <View
                  style={{
                    marginTop: 12,
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <RegularText style={{ fontSize: 15 / fontScale }}>
                    Click here to select
                  </RegularText>
                  <ArrowRight
                    color={Colors.primary}
                    variant="TwoTone"
                    size={20}
                  />
                </View>
              </Pressable>
            )}
            <View>
              <Memojis onPress={() => navigation.navigate("SendPayment")} />

              <MediumText
                style={[styles.countryButtonText, { fontSize: 15 / fontScale }]}
              >
                Search
              </MediumText>
              <View style={styles.searchContainer}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Search person or ID here..."
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
                <CircleIcon color={Colors.grayText} />
              </View>
            </View>
            <View>
              <SemiBoldText
                style={{ color: Colors.balanceBlack, fontSize: 16 / fontScale }}
              >
                Send Money To:
              </SemiBoldText>
              <UserPayList onPress={() => navigation.navigate("SendPayment")} />
            </View>
          </View>
        </View>
      </ScrollView>

      <BankList
        isOpen={bankOpen}
        onBankPress={(bank) => validateBank(accountNum, bank, token)}
        onClose={() => setBankOpen(false)}
      />

      <Loader visible={fetching} />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  description: {
    color: Colors.grayText,
    fontSize: 16,
    marginBottom: 20,
  },
  countryButtonText: {
    color: Colors?.grayText,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
    borderColor: Colors?.searchInput,
  },
  input: {
    fontSize: 14,
    padding: 8,
    width: "100%",
    fontFamily: "SpaceGrotesk-Medium",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
  },
  searchInputField: {
    borderColor: Colors.ash,
    borderWidth: 1,
    borderRadius: 7,
    width: "83%",
    padding: 10,
  },
  qrBtn: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    marginLeft: "auto",
    width: 40,
    height: 40,
  },
});
