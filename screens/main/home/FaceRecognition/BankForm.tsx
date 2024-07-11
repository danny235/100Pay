import {
  View,
  Text,
  Pressable,
  Platform,
  StyleSheet,
  useWindowDimensions,
  Switch,
} from "react-native";
import React, { useState } from "react";
import BottomSheetModalComponent from "../../../../components/BottomSheetModal/BottomSheetModalComponent";
import BankList, { BankT } from "../../../../components/banksList/BankList";
import { ArrowRightIcon, StarIcon } from "../../../../components/SvgAssets";
import { Button } from "../../../../components/Button/Button";
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
} from "../../../../components/styles/styledComponents";
import { Colors } from "../../../../components/Colors";
import { AddCircle, ArrowDown2 } from "iconsax-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../../../components/Input";
import { BankAccountT } from "../../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

type BankFormT = {
  showForm: boolean;
  handleShowForm: () => void;
  onSubmit: (values) => void;
  onClose: () => void;
};

const bankSchema = yup.object().shape({
  accountName: yup.string().required().label("Account Name"),
  accountNumber: yup.string().required().label("Account Number"),
});

export default function BankForm({
  showForm,
  onSubmit,
  onClose,
  handleShowForm,
}: BankFormT) {
  const [showBanks, setShowBanks] = useState(false);
  const [activeBank, setActiveBank] = useState<BankT>(null);
  const { fontScale } = useWindowDimensions();
  const [favourite, setFavourite] = useState(false);
  const {
    userProfile,
    userApps,
    activeUserApp,
    userAppsError,
    userAppsLoading,
    token,
  } = useSelector((state: RootState) => state.user);

  const toggleSwitch = () => {
    setFavourite(!favourite);
  };

  const handleSubmit = async () => {};
  return (
    <BottomSheetModalComponent
      show={showForm}
      onClose={onClose}
      snapPoints={["38%", "75%"]}
    >
      <View className="gap-10">
        <View className="flex-row gap-5 items-center">
          <AddCircle color={Colors.primary} size={24} />
          <BoldText
            style={{
              fontSize: 17 / fontScale,
              borderLeftColor: Colors.ash,
              borderLeftWidth: 1,
              paddingLeft: 10,
            }}
          >
            Add Bank Account
          </BoldText>
        </View>
        <LightText style={{ fontSize: 14 / fontScale }}>
          Fill in the details below to add your bank{" "}
        </LightText>
      </View>
      <View style={styles.grayBg}>
        <StarIcon />
        <MediumText
          style={{
            fontSize: 17 / fontScale,
            borderLeftColor: Colors.ash,
            borderLeftWidth: 1,
            paddingLeft: 10,
          }}
        >
          Mark as favourite
        </MediumText>
        <View style={{ marginLeft: "auto" }}>
          <Switch
            value={favourite}
            onValueChange={toggleSwitch}
            trackColor={{ true: Colors.primary, false: Colors.ash }}
            thumbColor={Colors.white}
          />
        </View>
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
      >
        <Formik
          initialValues={{
            accountName: `${userProfile?.first_name} ${userProfile?.last_name}`,
            accountNumber: "",
          }}
          onSubmit={async (values, action) => {
            const bankVal: BankAccountT = {
              account_name: values?.accountName,
              account_number: values?.accountNumber,
              bank_name: activeBank.name,
              bankCode: activeBank.code,
              isFavourite: favourite,
            };
            onSubmit(bankVal);
               onClose();
               setActiveBank(null)
          }}
          validationSchema={bankSchema}
        >
          {(formikProps) => (
            <>
              <View>
                <Input
                  formikProps={formikProps}
                  placeholder="e.g Daniel"
                  formikKey="accountName"
                  value={formikProps.values.accountName}
                  label="Account Name"
                  placeholderTextColor={Colors?.ash}
                  editable={false}
                />

                <Input
                  formikProps={formikProps}
                  placeholder="000000000"
                  formikKey="accountNumber"
                  value={formikProps.values.accountNumber}
                  label="Account Number"
                  placeholderTextColor={Colors?.ash}
                  maxLength={10}
                  keyboardType="number-pad"
                />

                <View style={styles.banksWrapper}>
                  <RegularText style={{ fontSize: 15 / fontScale }}>
                    Bank Name
                  </RegularText>
                  <Pressable
                    onPress={() => setShowBanks(true)}
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
              </View>

              <Button
                variant="primary"
                isLarge={false}
                isWide={true}
                style={{
                  marginVertical: 10,
                }}
                onPress={() => {
                 
                  formikProps.handleSubmit();
                }}
              >
                <AddCircle color={Colors.white} size={24} />
                <MediumText
                  style={{ color: Colors.white, fontSize: 15 / fontScale }}
                >
                  Add Bank Account
                </MediumText>
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>

      <BankList
        isOpen={showBanks}
        onBankPress={(bank) => setActiveBank(bank)}
        onClose={() => setShowBanks(false)}
      />
    </BottomSheetModalComponent>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    paddingVertical: Platform.OS === "android" ? 2 : 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  grayBg: {
    backgroundColor: Colors.memojiBackground,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  acctContainer: {
    borderBottomColor: Colors.ash,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  acctDetContainer: {
    gap: 10,
    flex: 1,
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
