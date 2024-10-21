import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  Pressable,
  Image,
  Linking,
} from "react-native";
import React, { useState } from "react";
import CustomView from "../../../components/Views/CustomView";
import CustomHeader from "../../../components/headers/CustomHeaders";
import { ShoppingCart, TickCircle } from "iconsax-react-native";
import { Colors } from "../../../components/Colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../routes/AppStacks";
import {
  BoldText,
  MediumText,
  RegularText,
} from "../../../components/styles/styledComponents";
import StickerImg from "../../../assets/images/sticker.png";
import BannerImg from "../../../assets/images/banner.png";
import RollUpImg from "../../../assets/images/rollup.png";
import BottomSheetModalComponent from "../../../components/BottomSheetModal/BottomSheetModalComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../../../components/Input";
import { addCommas } from "../../../utils";
import { Button } from "../../../components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import CustomToast from "../../../components/CustomToast/CustomToast";
import AlertModal from "../../../components/Alert/AlertModal";

type OrderQrCodeT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

type qrCodesT = {
  id: number;
  title: string;
  price: string;
  img: any;
  amount: number;
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const paymentSchema = yup.object().shape({
  address: yup.string().required().label("Address"),
  amount: yup.string().required().label("Amount"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .label("Phone number")
    .required("Please enter Phone Number"),
});

export default function OrderQrCode({ navigation }: OrderQrCodeT) {
  const { fontScale } = useWindowDimensions();
  const [showOrder, setShowOrder] = useState(false);
  const [activeQrCode, setActiveQrCode] = useState<qrCodesT>(null);
  const { userProfile, activeUserApp } = useSelector(
    (state: RootState) => state.user
  );
  const [showSuccesToast, setShowSuccessToast] = useState(false);
  const qrCodes: qrCodesT[] = [
    {
      id: 1,
      title: "Sticker",
      price: "PAY 110",
      img: StickerImg,
      amount: 110,
    },
    {
      id: 2,
      title: "Roll up banners",
      price: "PAY 70",
      img: RollUpImg,
      amount: 70,
    },
    {
      id: 3,
      title: "Banner",
      price: "PAY 70",
      img: BannerImg,
      amount: 70,
    },
  ];
  const formikProps = useFormik({
    initialValues: {
      address: "",
      amount: "",
      phone: userProfile?.phone,
    },
    onSubmit: (values) => {
      setShowOrder(false);
      setShowSuccessToast(true);
    },
    validationSchema: paymentSchema,
  });

  const handleCodePress = (qrcode: qrCodesT) => {
    setActiveQrCode(qrcode);
    formikProps.setFieldValue(
      "amount",
      `N ${qrcode?.amount ? addCommas(qrcode?.amount) : 0.0}`
    );
    setShowOrder(true);
  };
  return (
    <CustomView>
      <CustomHeader
        icon={<ShoppingCart color={Colors.primary} variant="TwoTone" />}
        text="Order Qr Code"
        onPress={() => navigation.goBack()}
      />

      <RegularText style={{ fontSize: 15 / fontScale, color: Colors.grayText, paddingBottom: 20 }}>
        Get a PayCheckout QR code and showcase that you accept crypto payments.
      </RegularText>

      <ScrollView style={{ flex: 1, paddingBottom: 10, paddingTop: 10 }} contentContainerStyle={{paddingBottom: 100}}>
        <View className=" space-y-5">
          {qrCodes.map((qrCode, i) => {
            return (
              <Pressable
                key={qrCode.id}
                onPress={() =>
                  Linking?.openURL(`https://wa.me/16282812947?text=Hello%20my%20name%20is%20${userProfile?.first_name}%20from%20${userProfile?.country}%20with%20the%20ID%3A%20${activeUserApp?.referralCode}%20and%20I'm%20interested%20in%20the%20Pay%20Checkout%20QR%20code%2C%20how%20do%20I%20get%20it%3F
`)
                }
                style={{ borderWidth: 1, borderColor: Colors.ash }}
                className="space-y-1 items-center rounded-lg p-5"
              >
                <Image
                  className=" rounded-lg"
                  style={{
                    height: 250,
                    width: "100%",
                    objectFit: "contain",
                  }}
                  source={qrCode.img}
                />
                <MediumText style={{ fontSize: 13 / fontScale }}>
                  {qrCode.title}
                </MediumText>
                <BoldText style={{ fontSize: 15 / fontScale }}>
                  {qrCode.price}
                </BoldText>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <BottomSheetModalComponent
        show={showOrder}
        onClose={() => setShowOrder(false)}
      >
        <ScrollView style={{ gap: 10, padding: 20 }}>
          <MediumText className=" text-center mb-5">
            Place your order
          </MediumText>
          <Input
            formikKey="address"
            formikProps={formikProps}
            label="Address"
            value={formikProps.values.address}
            placeholder="123 off keen street, NY"
          />
          <Input
            editable={false}
            formikKey="amount"
            formikProps={formikProps}
            label="Amount"
            value={formikProps.values.amount}
          />
          <Input
            formikKey="phone"
            formikProps={formikProps}
            label="Phone"
            value={formikProps.values.phone}
            placeholder="080xxxxxxx"
          />

          <Button
            variant="primary"
            isLarge={true}
            onPress={formikProps.handleSubmit as any}
          >
            <MediumText
              style={{ color: Colors.white, fontSize: 15 / fontScale }}
            >
              Continue
            </MediumText>
          </Button>
        </ScrollView>
      </BottomSheetModalComponent>

      <AlertModal
        mainText="Order Placed 🎊"
        subText="Congratulations your order has been placed. An agent will reach out to you shortly."
        buttonText="Complete"
        icon={<TickCircle color={Colors.primary} size={30} />}
        show={showSuccesToast}
        onClose={() => navigation.goBack()}
      />
    </CustomView>
  );
}
