import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import CustomView from "../../../components/Views/CustomView";
import {
  ArrowForwardIcon,
  DiscoverIcon,
  LinkIcon,
} from "../../../components/SvgAssets";
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
} from "../../../components/styles/styledComponents";
import { Colors } from "../../../components/Colors";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/AppStacks";
import { Money4, ShoppingCart } from "iconsax-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type DiscoverT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function Discover({ navigation }: DiscoverT): React.JSX.Element {
  const { fontScale } = useWindowDimensions();
  return (
    <CustomView>
      <View style={{ gap: 20, alignItems: "center", marginVertical: 50 }}>
        <DiscoverIcon color={Colors.primary} width={80} height={80} />
        <BoldText style={{ fontSize: 20 / fontScale }}>
          Discover Amazing Features
        </BoldText>
      </View>

      <View style={{ gap: 20 }}>
        {/* <Pressable onPress={()=> navigation.navigate("Contest")} style={styles.discoverCTA}>
          <ShoppingCart color={Colors.primary} size={24} />
          <View style={{ gap: 10, flexShrink: 1 }}>
            <View className="flex-row gap-2 items-center">
              <MediumText style={{ fontSize: 17 / fontScale }}>
                Contest App
              </MediumText>
              <LightText style={{color: Colors.primary, fontSize: 8 / fontScale}} className="rounded-full p-1">New</LightText>
            </View>
            <RegularText
              style={{
                fontSize: 13 / fontScale,
                color: Colors.grayText,
                width: "80%",
              }}
            >
              Shop amazing products at 99% discount
            </RegularText>
          </View>
          <View style={{ marginLeft: "auto" }}>
            <ArrowForwardIcon color={Colors.iconColor} />
          </View>
        </Pressable> */}
        <Pressable
          style={styles.discoverCTA}
          onPress={() => navigation.navigate("GenerateLink")}
        >
          <LinkIcon color={Colors.primary} />
          <View style={{ gap: 10, flexShrink: 1 }}>
            <MediumText style={{ fontSize: 17 / fontScale }}>
              Generate Request Link
            </MediumText>
            <RegularText
              style={{
                fontSize: 13 / fontScale,
                color: Colors.grayText,
                width: "80%",
              }}
            >
              Generate a link you can send to your client to make payments.
            </RegularText>
          </View>
          <ArrowForwardIcon color={Colors.iconColor} />
        </Pressable>

        {/* <Pressable
          onPress={() => navigation.navigate('Payouts')}
          style={styles.discoverCTA}>
          <Money4 color={Colors.primary} size={24} />
          <View style={{gap: 10, flexShrink: 1}}>
            <MediumText style={{fontSize: 17 / fontScale}}>Payouts</MediumText>
            <RegularText
              style={{
                fontSize: 13 / fontScale,
                color: Colors.grayText,
                width: '80%',
              }}>
              Gain more control over your payouts.
            </RegularText>
          </View>
          <View style={{marginLeft: 'auto'}}>
            <ArrowForwardIcon color={Colors.iconColor} />
          </View>
        </Pressable> */}

        <Pressable
          onPress={() => navigation.navigate("ConnectQr")}
          style={styles.discoverCTA}
        >
          <Money4 color={Colors.primary} size={24} />
          <View style={{ gap: 10, flexShrink: 1 }}>
            <MediumText style={{ fontSize: 17 / fontScale }}>
              Connect QR Code
            </MediumText>
            <RegularText
              style={{
                fontSize: 13 / fontScale,
                color: Colors.grayText,
                width: "80%",
              }}
            >
              Connect your payment QR Code to your 100Pay account
            </RegularText>
          </View>
          <View style={{ marginLeft: "auto" }}>
            <ArrowForwardIcon color={Colors.iconColor} />
          </View>
        </Pressable>
        <Pressable onPress={()=> navigation.navigate("OrderQrCode")} style={styles.discoverCTA}>
          <ShoppingCart color={Colors.primary} size={24} />
          <View style={{ gap: 10, flexShrink: 1 }}>
            <MediumText style={{ fontSize: 17 / fontScale }}>
              Order QR Code
            </MediumText>
            <RegularText
              style={{
                fontSize: 13 / fontScale,
                color: Colors.grayText,
                width: "80%",
              }}
            >
              Order your payment QR Code for your 100Pay account
            </RegularText>
          </View>
          <View style={{ marginLeft: "auto" }}>
            <ArrowForwardIcon color={Colors.iconColor} />
          </View>
        </Pressable>
      </View>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  discoverCTA: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: Colors.memojiBackground,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
});
