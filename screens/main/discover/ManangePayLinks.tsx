import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import CustomView from "../../../components/Views/CustomView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useToast } from "../../../components/CustomToast/ToastContext";
import CustomHeader from "../../../components/headers/CustomHeaders";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../routes/AppStacks";
import { ThunkDispatch } from "redux-thunk";
import { fetchPaymentsLinks } from "../../../features/account/accountSlice";
import { ArrowRight, ArrowRight3, Link } from "iconsax-react-native";
import { Colors } from "../../../components/Colors";
import {
  BoldText,
  MediumText,
  RegularText,
} from "../../../components/styles/styledComponents";
import { addCommas, formatDateString } from "../../../utils";

type ManangePayLinksT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function ManangePayLinks({ navigation }: ManangePayLinksT) {
  const { paymentLinks, paymentLinksError, paymentLinksLoading } = useSelector(
    (state: RootState) => state?.account
  );
  const { token, activeUserApp } = useSelector(
    (state: RootState) => state?.user
  );
  const { showToast } = useToast();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { fontScale } = useWindowDimensions();
  useEffect(() => {
    dispatch(
      fetchPaymentsLinks({
        token,
        apiKey: activeUserApp?.keys?.pub_keys[0]?.value,
      })
    );
  });
  return (
    <CustomView>
      <CustomHeader
        text="Manage pay links"
        icon={<Link color={Colors?.primary} size={24} />}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        }
      />
      <View className="my-3 space-y-2">
        <BoldText style={{ fontSize: 17 / fontScale, color: Colors.black }}>
          Manage your pay links
        </BoldText>
        <RegularText
          style={{ fontSize: 15 / fontScale, color: Colors.grayText }}
        >
          View and manage all your pay links, share and recieve payments
          worldwide
        </RegularText>
      </View>

      <ScrollView
        className=" mt-5 space-y-2"
        contentContainerStyle={{ flex: 1, gap: 10 }}
      >
        {!paymentLinks && paymentLinks?.length === 0 ? (
          <MediumText style={{ fontSize: 15 / fontScale }}>
            There are no payment links here 😢
          </MediumText>
        ) : (
          paymentLinks?.map((paymentLink) => (
            <Pressable
              onPress={() =>
                navigation.navigate("GeneratedLink", {
                  detail: paymentLink?.code,
                })
              }
              style={{ borderColor: Colors?.ash, borderWidth: 1 }}
              className=" flex-row justify-between rounded-lg p-4 items-center"
            >
              <View className=" space-y-2">
                <MediumText
                  style={{ fontSize: 18 / fontScale, color: Colors.black }}
                >
                  {paymentLink?.link_name}
                </MediumText>
                <MediumText
                  style={{ fontSize: 16 / fontScale, color: Colors.grayText }}
                >
                  {paymentLink?.currency} {addCommas(paymentLink?.amount)}
                </MediumText>
                <MediumText
                  style={{ fontSize: 16 / fontScale, color: Colors.grayText }}
                >
                  {formatDateString(paymentLink?.createdAt)}
                </MediumText>
              </View>

              <ArrowRight color={Colors.primary} size={24} />
            </Pressable>
          ))
        )}
      </ScrollView>
    </CustomView>
  );
}
