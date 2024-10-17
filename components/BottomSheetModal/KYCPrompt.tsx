import { View, Text, useWindowDimensions, Linking } from "react-native";
import React from "react";
import BottomSheetModalComponent from "./BottomSheetModalComponent";
import { BoldText, MediumText, RegularText } from "../styles/styledComponents";
import { Colors } from "../Colors";
import { Personalcard, ProfileTick } from "iconsax-react-native";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type KYCPromptT = {
  showPrompt: boolean;
};

export default function KYCPrompt({ showPrompt }: KYCPromptT) {
  const { fontScale } = useWindowDimensions();
  const {token} = useSelector((state: RootState)=> state.user)

  return (
    <BottomSheetModalComponent
      show={showPrompt}
      snapPoints={["30%", "80%"]}
      onClose={() => null}
    >
      <View className=" p-10 space-y-4 justify-between flex-1 ">
        <View className=" justify-between items-center mb-auto space-y-4">
          <View
            className=" items-center justify-center"
            style={{
              width: 120,
              height: 120,
              backgroundColor: Colors.primaryLight,
              borderRadius: 120,
            }}
          >
            <ProfileTick size={60} color={Colors.primary} />
          </View>
          <View className="">
            <BoldText
              className=" text-center"
              style={{ fontSize: 26 / fontScale, color: Colors.black }}
            >
              Verify Identity
            </BoldText>
            <RegularText
              className=" text-center"
              style={{ fontSize: 14 / fontScale, color: Colors.grayText }}
            >
              Please verify your identity to continue
            </RegularText>
          </View>
        </View>
        <View className="mt-auto pb-10">
          <Button
            variant="primary"
            isLarge={true}
            onPress={() =>
              Linking.openURL(
                `https://dashboard.100pay.co/settings?tab=verification&token=${token}&startVerification=true`
              )
            }
          >
            <MediumText
              style={{ fontSize: 15 / fontScale, color: Colors.white }}
            >
              Verify Me
            </MediumText>
          </Button>
        </View>
      </View>
    </BottomSheetModalComponent>
  );
}
