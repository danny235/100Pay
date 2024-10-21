import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../../../components/Input";
import { Button } from "../../../components/Button/Button";
import { MediumText } from "../../../components/styles/styledComponents";
import { Colors } from "../../../components/Colors";
import AmountInput from "../../../components/Input/AmountInput";
import InputView from "../../../components/Input/InputView";
import { UserWalletT } from "./Asset";
import { PayT } from "./SendCrypto";
import { addCommas } from "../../../utils";
import { useToast } from "../../../components/CustomToast/ToastContext";
import { Scan } from "iconsax-react-native";

const SendSchema = yup.object().shape({
  payId: yup.string().required().label("Pay ID"),
  amount: yup.string().required().label("Amount"),
});

type SendWPayT = {
  activeCoin: UserWalletT;
  fee: string;
  payId: string;
  onSubmit: (val: PayT) => void;
  onCoinPress?: () => void;
  onNetworkPress?: () => void;
  onScanPress: () => void;
};

export default function SendWPayID({
  activeCoin,
  fee,
  payId,
  onSubmit,
  onCoinPress,
  onNetworkPress,
  onScanPress
}: SendWPayT) {
  const { fontScale } = useWindowDimensions();
  const { showToast } = useToast();
  const formikProps = useFormik({
    initialValues: {
      payId: payId ? payId : "",
      amount: "",
    },
    validationSchema: SendSchema,
    onSubmit: (values, action) => {
      if (Number(values.amount) === 0) {
        showToast("Amount must be greater than zero", "error");
      } else {
        onSubmit({
          payId: values.payId,
          amount: values.amount,
        });
      }
    },
  });

  useEffect(() => {
    if (payId) {
      formikProps?.setFieldValue("payId", payId);
    }
  }, [payId]);
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
        <View className="relate">
          <Input
            formikKey="payId"
            formikProps={formikProps}
            label="Pay ID"
            value={formikProps.values.payId}
            placeholder="Input or press and hold to paste id"
            maxLength={6}
          />
          <Pressable
            className="absolute bottom-10 right-2"
            onPress={onScanPress}
          >
            <Scan color={Colors.primary} variant="TwoTone" />
          </Pressable>
        </View>

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
            ? `${addCommas(Number(fee).toFixed(2))} ${activeCoin?.symbol}`
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
