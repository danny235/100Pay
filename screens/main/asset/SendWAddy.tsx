import { View, Text, useWindowDimensions, Pressable } from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../../../components/Input";
import { Button } from "../../../components/Button/Button";
import { MediumText } from "../../../components/styles/styledComponents";
import { Colors } from "../../../components/Colors";
import AmountInput from "../../../components/Input/AmountInput";

const SendSchema = yup.object().shape({
  coin: yup.string().required().label("Coin"),
  address: yup.string().required().label("Address"),
  network: yup.string().required().label("Network"),
  amount: yup.string().required().label("Amount"),
});

export default function SendWAddy() {
  const { fontScale } = useWindowDimensions();
  const formikProps = useFormik({
    initialValues: {
      coin: "Pay",
      address: "",
      network: "Bep20",
      amount: "0.00",
    },
    validationSchema: SendSchema,
    onSubmit: (values, action) => {
      console.log(values);
    },
  });
  return (
    <View  className=" px-2 mt-3 flex-1">
      <View className=" flex-1 mb-auto">

      <Pressable>
        <Input
          formikKey="coin"
          formikProps={formikProps}
          label="Coin"
          editable={false}
          value={formikProps.values.coin}
        />
      </Pressable>
      <View>

      <Input
        formikKey="address"
        formikProps={formikProps}
        label="Address"
        value={formikProps.values.address}
        placeholder="Input or press and hold to paste the withdrawal address"
      />
      </View>
      <Input
        formikKey="network"
        formikProps={formikProps}
        label="Network"
        editable={false}
        value={formikProps.values.network}
      />
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
        <MediumText style={{fontSize: 15 / fontScale, color: Colors.grayText}}>Withdrawal Fees:</MediumText>
        <Button onPress={formikProps.handleSubmit as any} variant="primary" isLarge={true}>
          <MediumText style={{fontSize: 15 / fontScale, color: Colors.white}}>Withdraw</MediumText>
        </Button>
      </View>
    </View>
  );
}
