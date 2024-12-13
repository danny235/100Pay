import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Switch,
} from "react-native";
import React, { useState } from "react";
import CustomView from "../../../../components/Views/CustomView";
import CustomHeader from "../../../../components/headers/CustomHeaders";
import {
  Briefcase,
  Card,
  Lock,
  PasswordCheck,
  Setting2,
  Setting4,
  Slash,
  Trash,
} from "iconsax-react-native";
import { Colors } from "../../../../components/Colors";
import { BaseNavigationT } from "../../home/Home";
import {
  LightText,
  MediumText,
  RegularText,
} from "../../../../components/styles/styledComponents";
import PinInputBottomSheet from "../../../../components/CustomPin/PinInputBottomSheet";
import OtpKeypad from "../../../../components/CustomPin/OtpKeypad";
import BottomSheetModalComponent from "../../../../components/BottomSheetModal/BottomSheetModalComponent";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import RadioButton from "../../../../components/RadioButton";
import { Button } from "../../../../components/Button/Button";

interface CardSettingsI extends BaseNavigationT {}

export default function CardSettings({ navigation }: CardSettingsI) {
  const { fontScale } = useWindowDimensions();
  const [showOtp, setShowOtp] = useState(false);
  const [showFreezeReasons, setShowFreezeReasons] = useState(false);
  const [showDeleteReasons, setShowDeleteReasons] = useState(false);
  const [freezeReason, setFreezeReason] = useState(null);
  const [deleteReason, setDeleteReason] = useState(null);
  const cardSettings = [
    {
      id: 1,
      name: "Change Card Pin",
      icon: <PasswordCheck color={Colors.primary} variant="TwoTone" />,
      onPress: () => navigation.navigate("ChangeCardPin"),
    },
    {
      id: 2,
      name: "Reset Card Pin",
      icon: <Lock color={Colors.primary} variant="TwoTone" />,
      onPress: () => setShowOtp(true),
    },
    {
      id: 3,
      name: "Card Limits",
      icon: <Setting4 color={Colors.primary} variant="TwoTone" />,
      onPress: () => navigation.navigate("CardLimit"),
    },
    {
      id: 4,
      name: "Freeze Card",
      icon: <Slash color={Colors.primary} variant="TwoTone" />,
      onPress: () => setShowFreezeReasons(true),
    },
    {
      id: 5,
      name: "Delete Card",
      icon: <Trash color={Colors.primary} variant="TwoTone" />,
      onPress: () => setShowDeleteReasons(true),
    },
  ];
  const freezeReasons = [
    {
      id: 1,
      reason: "Lost or stolen card.",
    },
    {
      id: 2,
      reason: "Unauthorized transactions.",
    },
    {
      id: 3,
      reason: "Temporary inactivity.",
    },
    {
      id: 4,
      reason: "Security breach or data compromise.",
    },
    {
      id: 5,
      reason: "Switching to a new card or account.",
    },
    {
      id: 6,
      reason: "Suspected card cloning or skimming.",
    },
    {
      id: 7,
      reason: "Personal budget control or spending limits.",
    },
  ];
  const deleteReasons = [
    {
      id: 1,
      reason: "Lost or stolen card.",
    },
    {
      id: 2,
      reason: "Unauthorized transactions.",
    },
    {
      id: 3,
      reason: "Temporary inactivity.",
    },
    {
      id: 4,
      reason: "Security breach or data compromise.",
    },
    {
      id: 5,
      reason: "Switching to a new card or account.",
    },
    {
      id: 6,
      reason: "Suspected card cloning or skimming.",
    },
    {
      id: 7,
      reason: "Personal budget control or spending limits.",
    },
  ];
  return (
    <CustomView>
      <CustomHeader
        icon={<Setting2 color={Colors.primary} />}
        text="Card Settings"
        onPress={() => navigation.goBack()}
      />

      <View className="space-y-8 mt-5">
        {cardSettings.map((setting, i) => {
          return (
            <Pressable
              key={setting.id}
              className="flex-row items-center space-x-2"
              onPress={setting.onPress}
            >
              <View
                style={{ backgroundColor: Colors.primaryLight }}
                className="rounded-md items-center justify-center h-[40px] w-[40px]"
              >
                {setting.icon}
              </View>
              <MediumText>{setting.name}</MediumText>
            </Pressable>
          );
        })}
      </View>

      <OtpKeypad
        isVisible={showOtp}
        onResendPress={null}
        mainTxt="Enter OTP"
        subTxt="Enter the OTP sent to your email here to continue"
        onClose={() => setShowOtp(false)}
        onSubmit={() => {
          setShowOtp(false);
          navigation.navigate("ResetCardPin");
        }}
      />

      {/* Freeze card reasons */}
      <BottomSheetModalComponent
        show={showFreezeReasons}
        onClose={() => setShowFreezeReasons(false)}
        snapPoints={["50%", "60%"]}
      >
        <BottomSheetScrollView
          style={{ paddingHorizontal: 20, paddingTop: 10, gap: 10 }}
        >
          <View className="flex-row items-center mb-3 space-x-1">
            <Briefcase variant="TwoTone" color={Colors.primary} />
            <View
              style={{ backgroundColor: Colors.ash, height: 13, width: 1 }}
            />
            <MediumText
              style={{ fontSize: 17 / fontScale, color: Colors.black }}
            >
              Freeze Card
            </MediumText>
          </View>
          <RegularText
            style={{ fontSize: 15 / fontScale, color: Colors.grayText }}
          >
            You can unfreeze your card anytime you want, frozen cards will incur
            declined transactions.
          </RegularText>
          <MediumText
            style={{
              fontSize: 17 / fontScale,
              color: Colors.black,
              marginTop: 20,
            }}
          >
            Reason:
          </MediumText>
          <View className="space-y-5 mt-2">
            {freezeReasons.map((freeze, i) => {
              return (
                <Pressable
                  onPress={() => setFreezeReason(freeze)}
                  className="flex-row justify-between items-center"
                  key={freeze.id}
                >
                  <LightText
                    style={{ fontSize: 15 / fontScale, color: Colors.black }}
                  >
                    {freeze.reason}
                  </LightText>
                  <RadioButton
                    enabled={freezeReason?.id === freeze.id}
                    onPress={() => setFreezeReason(freeze)}
                  />
                </Pressable>
              );
            })}
          </View>

          <View className="flex-row justify-between mt-8 space-x-2">
            <Button
              onPress={() => setShowFreezeReasons(false)}
              className="w-[49%]"
              isWide={true}
              isLarge={true}
              variant="secondary"
            >
              <MediumText style={{ fontSize: 15 / fontScale }}>
                Cancel
              </MediumText>
            </Button>
            <Button
              onPress={() => setShowFreezeReasons(false)}
              className="w-[49%]"
              variant="primary"
            >
              <MediumText
                style={{ fontSize: 15 / fontScale, color: Colors.white }}
              >
                Freeze
              </MediumText>
            </Button>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModalComponent>

      {/* Delete card reasons */}
      <BottomSheetModalComponent
        show={showDeleteReasons}
        onClose={() => setShowDeleteReasons(false)}
        snapPoints={["50%", "60%"]}
      >
        <BottomSheetScrollView
          style={{ paddingHorizontal: 20, paddingTop: 10, gap: 10 }}
        >
          <View className="flex-row items-center mb-3 space-x-1">
            <Trash variant="TwoTone" color={Colors.primary} />
            <View
              style={{ backgroundColor: Colors.ash, height: 13, width: 1 }}
            />
            <MediumText
              style={{ fontSize: 17 / fontScale, color: Colors.black }}
            >
              Delete Card
            </MediumText>
          </View>
          <RegularText
            style={{ fontSize: 15 / fontScale, color: Colors.grayText }}
          >
            Deleting your Pay card cannot be undone, You will be charged to get
            a new Pay Card.
          </RegularText>
          <MediumText
            style={{
              fontSize: 17 / fontScale,
              color: Colors.black,
              marginTop: 20,
            }}
          >
            Reason:
          </MediumText>
          <View className="space-y-5 mt-2">
            {deleteReasons.map((item, i) => {
              return (
                <Pressable
                  onPress={() => setDeleteReason(item)}
                  className="flex-row justify-between items-center"
                  key={item.id}
                >
                  <LightText
                    style={{ fontSize: 15 / fontScale, color: Colors.black }}
                  >
                    {item.reason}
                  </LightText>
                  <RadioButton
                    enabled={deleteReason?.id === item.id}
                    onPress={() => setDeleteReason(item)}
                  />
                </Pressable>
              );
            })}
          </View>

          <View className="flex-row justify-between mt-8 space-x-2">
            <Button
              onPress={() => setShowDeleteReasons(false)}
              className="w-[49%]"
              isWide={true}
              isLarge={true}
              variant="secondary"
            >
              <MediumText style={{ fontSize: 15 / fontScale }}>
                Cancel
              </MediumText>
            </Button>
            <Button
              onPress={() => setShowDeleteReasons(false)}
              className="w-[49%]"
              variant="primary"
            >
              <MediumText
                style={{ fontSize: 15 / fontScale, color: Colors.white }}
              >
                Delete
              </MediumText>
            </Button>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModalComponent>
    </CustomView>
  );
}
