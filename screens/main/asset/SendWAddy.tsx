import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../../../components/Input";
import { Button } from "../../../components/Button/Button";
import {
  LightText,
  MediumText,
} from "../../../components/styles/styledComponents";
import { Colors } from "../../../components/Colors";
import AmountInput from "../../../components/Input/AmountInput";
import InputView from "../../../components/Input/InputView";
import { UserWalletT } from "./Asset";
import { AddyT } from "./SendCrypto";
import { addCommas } from "../../../utils";
import { useToast } from "../../../components/CustomToast/ToastContext";

const SendSchema = yup.object().shape({
  address: yup.string().required().label("Address"),
  amount: yup.string().required().label("Amount"),
});

type SendWAddyT = {
  activeCoin: UserWalletT;
  fee: string;
  onSubmit: (val: AddyT) => void;
  onCoinPress?: () => void;
  onNetworkPress?: () => void;
};

export default function SendWAddy({
  activeCoin,
  fee,
  onSubmit,
  onCoinPress,
  onNetworkPress,
}: SendWAddyT) {
  const { fontScale } = useWindowDimensions();
  const { showToast } = useToast();
  const formikProps = useFormik({
    initialValues: {
      address: "",
      amount: "0.00",
    },
    validationSchema: SendSchema,
    onSubmit: (values, action) => {
      
      if (Number(values.amount) === 0) {
        showToast("Amount must be greater than zero", "error");
      } else {
        onSubmit({
          walletAddress: values.address,
          amount: values.amount,
        });
      }
    },
  });

  return (
    <View className=" px-2 mt-3 flex-1">
      <View className=" flex-1 mb-auto">
        <InputView
          label="Asset"
          value={activeCoin ? activeCoin?.symbol : "---"}
          icon={
            <Image
              source={{ uri: activeCoin?.logo }}
              style={{ width: 27, height: 27, borderRadius: 27 }}
            />
          }
          onPress={() => null}
        />

        <View>
          <Input
            formikKey="address"
            formikProps={formikProps}
            label="Address"
            value={formikProps.values.address}
            placeholder="Input or press and hold to paste the withdrawal address"
          />
        </View>

        {/* <InputView label="Network" value="Bep20" onPress={() => null} /> */}

        <AmountInput
          formikKey="amount"
          formikProps={formikProps}
          label="Amount"
          keyboardType="decimal-pad"
          value={formikProps.values.amount}
          placeholder="0.00"
        />
      </View>

      <View className=" mt-20 space-y-3">
        <MediumText
          style={{ fontSize: 15 / fontScale, color: Colors.grayText }}
        >
          Withdrawal Fee:{" "}
          {fee
            ? `${addCommas(Number(fee).toFixed(6))} ${activeCoin?.symbol}`
            : "0.00"}
        </MediumText>
        <Button
          onPress={formikProps.handleSubmit as any}
          variant="primary"
          isLarge={true}
        >
          <MediumText style={{ fontSize: 15 / fontScale, color: Colors.white }}>
            Withdraw
          </MediumText>
        </Button>
      </View>
    </View>
  );
}
