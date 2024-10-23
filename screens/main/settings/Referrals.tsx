import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import CustomView from "../../../components/Views/CustomView";
import CustomHeader from "../../../components/headers/CustomHeaders";
import { Copy, People, RecoveryConvert } from "iconsax-react-native";
import { Colors } from "../../../components/Colors";
import { BaseNavigationT } from "../home/Home";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BoldText,
  MediumText,
  RegularText,
  SemiBoldText,
} from "../../../components/styles/styledComponents";
import HandImg from "../../../assets/images/Hand.png";
import { Button } from "../../../components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { addCommas, copyToClipboard } from "../../../utils";
import { useToast } from "../../../components/CustomToast/ToastContext";
import useGraphQL from "../../../components/hooks/useGraphQL";
import { GetApp } from "../../../apis/lib/queries";
import Loader from "../../../components/Loader/LogoLoader";
import AvatarE from "../../../assets/images/DashboardEmojis/Avatar-e.png";

interface ReferralsI extends BaseNavigationT {}

export default function Referrals({ navigation }: ReferralsI) {
  const { fontScale } = useWindowDimensions();
  const { showToast } = useToast();
  const { query, state } = useGraphQL();
  const { activeUserApp, token } = useSelector(
    (state: RootState) => state.user
  );
  const insets = useSafeAreaInsets();
  const appData = state?.fetchApp?.data?.app?.referrals || [];

  const fetchApp = () => {
    query(
      "fetchApp",
      GetApp,
      {
        appId: activeUserApp?._id,
      },
      {
        "auth-token": token,
      }
    );
  };

  useEffect(() => {
    if (!state?.fetchApp?.loading) {
      if (state?.fetchApp?.error?.message) {
        const errorResponse = state?.fetchApp?.error?.response?.data;
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
          showToast(`${state?.fetchApp?.error?.message}`, "error");
        }
      }
    }
  }, [state?.fetchApp?.loading]);

  useEffect(() => {
    fetchApp();
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors?.white,
        paddingTop: insets.top,
        flex: 1,
      }}
    >
      <View className="px-3">
        <CustomHeader
          icon={<People variant="TwoTone" color={Colors.primary} />}
          text="Referrals"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        style={{
          backgroundColor: Colors?.lightAsh,
          paddingVertical: 20,
          flex: 1,
        }}
        contentContainerStyle={{ gap: 15, paddingBottom: 60 }}
      >
        <View className=" flex-row justify-between items-center">
          <View className=" w-[60%] px-5 space-y-2">
            <BoldText style={{ fontSize: 19 / fontScale }}>
              Invite Your Friends & Earn $Pay Token
            </BoldText>
            <RegularText
              style={{ fontSize: 16 / fontScale, color: Colors.grayText }}
            >
              Select the category you want to display
            </RegularText>
          </View>
          <View className="w-[40%]">
            <Image source={HandImg} style={{ width: "100%", height: 200 }} />
          </View>
        </View>

        <View className="flex-row justify-between px-5">
          <View style={[styles.roudedBox, { width: "48%" }]}>
            <View className="flex-row items-center space-x-2">
              <People variant="TwoTone" color={Colors.primary} size={15} />
              <View
                style={{ backgroundColor: Colors.ash, height: 10, width: 1 }}
              />
              <RegularText
                style={{ fontSize: 12 / fontScale, color: Colors.grayText }}
              >
                No. of invites
              </RegularText>
            </View>
            <BoldText style={{ fontSize: 24 / fontScale }}>
              {appData?.length !== 0 ? appData?.length : 0}
            </BoldText>
          </View>
          <View style={[styles.roudedBox, { width: "48%" }]}>
            <View className="flex-row items-center space-x-2">
              <People variant="TwoTone" color={Colors.primary} size={15} />
              <View
                style={{ backgroundColor: Colors.ash, height: 10, width: 1 }}
              />
              <RegularText
                style={{ fontSize: 12 / fontScale, color: Colors.grayText }}
              >
                Total Earning
              </RegularText>
            </View>
            <BoldText style={{ fontSize: 24 / fontScale }}>
              {appData?.length !== 0 ? addCommas(appData?.length * 10) : 0} $Pay
            </BoldText>
          </View>
        </View>

        <View className="px-5 space-y-4">
          <View style={[styles.roudedBox, { gap: 10 }]}>
            <View className="flex-row items-center space-x-2">
              <RecoveryConvert
                variant="TwoTone"
                color={Colors.primary}
                size={20}
              />
              <View
                style={{ backgroundColor: Colors.ash, height: 10, width: 1 }}
              />
              <MediumText style={{ fontSize: 16 / fontScale }}>
                Invitation Code
              </MediumText>
            </View>
            <Button isLarge={true} variant="secondary">
              <MediumText style={{ fontSize: 15 / fontScale }}>
                {activeUserApp.referralCode}
              </MediumText>
            </Button>
            <Button
              onPress={() => {
                showToast("Referral code copied", "success");
                copyToClipboard(activeUserApp?.referralCode);
              }}
              isLarge={true}
              variant="primary"
            >
              <Copy color={Colors.white} variant="TwoTone" />
              <MediumText
                style={{ fontSize: 15 / fontScale, color: Colors.white }}
              >
                Copy Invitation Code
              </MediumText>
            </Button>
            <MediumText
              style={{ fontSize: 15 / fontScale, color: Colors.grayText }}
            >
              Copy and share your referral code to earn{" "}
              <MediumText
                style={{ fontSize: 15 / fontScale, color: Colors.balanceBlack }}
              >
                $Pay tokens
              </MediumText>
            </MediumText>
          </View>

          <View style={[styles.roudedBox, { gap: 20 }]}>
            <View className="flex-row items-center space-x-2">
              <People variant="TwoTone" color={Colors.primary} size={20} />
              <View
                style={{ backgroundColor: Colors.ash, height: 10, width: 1 }}
              />
              <MediumText style={{ fontSize: 17 / fontScale }}>
                Referrals
              </MediumText>
            </View>
            {appData?.length !== 0 ? (
              appData?.map((user, i) => (
                <View key={i} className="flex-row space-x-2 items-center">
                  <Image
                    style={{ borderRadius: 40, height: 40, width: 40 }}
                    source={
                      user?.photo && user?.photo !== null
                        ? { uri: user?.photo }
                        : AvatarE
                    }
                  />
                  <MediumText style={[{ fontSize: 16 / fontScale }]}>
                    {user?.first_name} {user?.last_name}
                  </MediumText>
                </View>
              ))
            ) : (
              <MediumText
                className="text-center"
                style={[{ fontSize: 14 / fontScale, color: Colors.grayText }]}
              >
                You have no referrers
              </MediumText>
            )}
          </View>
        </View>
      </ScrollView>

      <Loader visible={state?.fetchApp?.loading === true} />
    </View>
  );
}

const styles = StyleSheet.create({
  roudedBox: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 10,
  },
});
