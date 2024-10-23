import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import CustomView from "../../../components/Views/CustomView";
import Avatar from "../../../assets/images/DashboardEmojis/Avatar-a.png";
import {
  BoldText,
  LightText,
  MediumText,
} from "../../../components/styles/styledComponents";
import { Colors } from "../../../components/Colors";
import {
  CSServiceIcon,
  CopyIcon,
  EditIcon,
  InfoIcon,
  RateIcon,
  ReferralIcon,
  SecuritySafeIcon,
  TransactionIcon,
} from "../../../components/SvgAssets";
import { useToast } from "../../../components/CustomToast/ToastContext";
import * as Clipboard from "expo-clipboard";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/AppStacks";
import { useDispatch, useSelector } from "react-redux";
import {
  HeartAdd,
  Login,
  LoginCurve,
  MusicPlay,
  Note,
  ProfileAdd,
  ProfileCircle,
  SecuritySafe,
} from "iconsax-react-native";
import {
  addToken,
  logOut,
  toggleIsLoggedIn,
} from "../../../features/user/userSlice";
import { RootState, logoutUser } from "../../../app/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { clearAccount } from "../../../features/account/accountSlice";

type SettingsT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function Settings({ navigation }: SettingsT): React.JSX.Element {
  const { fontScale } = useWindowDimensions();
  const { showToast } = useToast();
  const {
    userApps,
    activeUserApp,
    userAppsError,
    userAppsLoading,
    token,
    userProfile,
  } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOut());
    dispatch(clearAccount());
  };
  const settingList = [
    {
      id: 1,
      title: "Account Settings",
      description: "Business Name, Country, Web Address, Web Hook...",
      icon: (
        <ProfileCircle
          variant="TwoTone"
          width={24}
          height={24}
          color={Colors.primary}
        />
      ),
      onPress: () => navigation.navigate("EditBusiness"),
    },
    {
      id: 2,
      title: "Security",
      description: "Password, Biometrics, Payment Pin, Freeze Account...",
      icon: (
        <SecuritySafe
          variant="TwoTone"
          width={24}
          height={24}
          color={Colors.primary}
        />
      ),
      onPress: () => null,
    },
    {
      id: 3,
      title: "Transactions",
      description: "View your transaction history here",
      icon: <Note variant="TwoTone" color={Colors.primary} />,
      onPress: () => navigation.navigate("Transactions"),
    },
    {
      id: 4,
      title: "Referrals",
      description: "Refer your friends and earn $Pay Tokens",
      icon: <ProfileAdd variant="TwoTone" color={Colors.primary} />,
      onPress: () => navigation.navigate("Referrals"),
    },
    {
      id: 5,
      title: "Customer Service",
      description: "Get solutions to your problem here",
      icon: <MusicPlay variant="TwoTone" color={Colors.primary} />,
      onPress: () => null,
    },
    {
      id: 6,
      title: "Rate Our App",
      description: "Rate our app on app store and google play store.",
      icon: <HeartAdd variant="TwoTone" color={Colors.primary} />,
      onPress: () => null,
    },
    {
      id: 7,
      title: "Sign Out",
      description: "Sign out of your Paylens account",
      icon: <LoginCurve variant="TwoTone" color={Colors.primary} size={24} />,
      onPress: () => logout(),
    },
  ];
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`${activeUserApp?.referralCode}`);
    showToast("Copied successfully", "success");
  };
  return (
    <CustomView>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 30,
          }}
        >
          <Image
            style={styles.userPhoto}
            source={
              userProfile?.avatar && userProfile?.avatar !== "user.png"
                ? { uri: userProfile.avatar }
                : Avatar
            }
          />
          <BoldText
            style={{
              textTransform: "capitalize",
              fontSize: 15 / fontScale,
              color: Colors.balanceBlack,
            }}
          >
            {userProfile?.first_name} {userProfile?.last_name}
          </BoldText>
          <Pressable
            onPress={copyToClipboard}
            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
          >
            <LightText
              style={{
                textTransform: "uppercase",
                fontSize: 12 / fontScale,
                color: Colors.grayText,
              }}
            >
              ID:{" "}
              {userAppsLoading === "loading" || userAppsLoading === "rejected"
                ? "*****"
                : userAppsLoading === "success"
                ? activeUserApp?.referralCode || "*****"
                : undefined}
            </LightText>
            <CopyIcon />
          </Pressable>
        </View>
        <View style={{ flexDirection: "row", gap: 20, marginVertical: 20 }}>
          <Pressable onPress={copyToClipboard} style={styles.pressableCTA}>
            <MediumText
              style={{
                textTransform: "uppercase",
                fontSize: 12 / fontScale,
                color: Colors.balanceBlack,
              }}
            >
              {userAppsLoading === "loading" || userAppsLoading === "rejected"
                ? "*****"
                : userAppsLoading === "success"
                ? activeUserApp?.referralCode || "*****"
                : undefined}
            </MediumText>
            <CopyIcon />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("EditProfile")}
            style={styles.pressableCTA}
          >
            <MediumText
              style={{
                fontSize: 12 / fontScale,
                color: Colors.balanceBlack,
              }}
            >
              Edit Profile
            </MediumText>
            <EditIcon />
          </Pressable>
        </View>

        <View>
          {settingList.map((setting, index) => {
            return (
              <Pressable
                key={setting.id}
                style={{
                  gap: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 15,
                  flexWrap: "wrap",
                }}
                onPress={setting.onPress}
              >
                {setting.icon}
                <View style={{ gap: 6, flexBasis: "70%" }}>
                  <MediumText
                    style={{
                      fontSize: 15 / fontScale,
                      color: Colors.balanceBlack,
                    }}
                  >
                    {setting.title}
                  </MediumText>
                  <LightText
                    style={{
                      fontSize: 13 / fontScale,
                      color: Colors.grayText,
                    }}
                  >
                    {setting.description}
                  </LightText>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  userPhoto: {
    width: 90,
    height: 90,
    borderRadius: 90,
  },
  pressableCTA: {
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    backgroundColor: Colors.memojiBackground,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexGrow: 1,
  },
});
