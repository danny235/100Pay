import React, { useEffect } from "react";
import { Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../../components/Colors";
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
  SemiBoldText,
} from "../../../components/styles/styledComponents";
import {
  ArrowDownIcon,
  EyeIcon,
  EyeLineIcon,
  WalletIcon,
} from "../../../components/SvgAssets";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { BlurView } from "@react-native-community/blur";
import { updateShowAccountBalance } from "../../../features/user/userSlice";
import { addCommas } from "../../../utils";
import { Scan } from "iconsax-react-native";
import useGraphQL from "../../../components/hooks/useGraphQL";
import { UserWalletsQuery } from "../../../apis/lib/queries";
type Props = {
  onBalanceClick?: () => void;
};

export interface LocalWalletI {
  name: string;
  status: string;
  symbol: string;
  decimals: string;
  logo: string;
  account: {
    address: string | null; // Address can be a string or null
  };
  balance: {
    available: string; // Available balance as a string
    locked: string; // Locked balance as a string
  };
  walletType: "local"; // walletType is a specific string "local"
  accountType: string; // accountType can be any string
  id: string; // Unique identifier
}

function formatRealNumber(num: number): string {
  // Convert the number to a string
  const numString = num.toString();
  // Check if the number has a decimal point
  if (numString.includes(".")) {
    // Split the number into integer and fractional parts
    const [integerPart, fractionalPart] = numString.split(".");
    // Pad the fractional part with zeros if necessary
    const paddedFractionalPart = fractionalPart.padEnd(2, "0");
    // Combine the integer and padded fractional parts
    return `${integerPart}.${paddedFractionalPart}`;
  } else {
    // If the number doesn't have a decimal point, append '.00'
    return `${numString}.00`;
  }
}

export default function Balance({ onBalanceClick }: Props): React.JSX.Element {
  const { fontScale } = useWindowDimensions();

  const {
    userApps,
    activeUserApp,
    userAppsError,
    userAppsLoading,
    token,
    showAccountBalance,
    showCamera,
  } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { query, state } = useGraphQL();
  const userWalletState = state?.userWallets;
  const localWallet: LocalWalletI | undefined =
    userWalletState?.data?.userWallet?.find(
      (wallet: LocalWalletI) => wallet.walletType === "local"
    );

  useEffect(() => {
    query(
      "userWallets",
      UserWalletsQuery,
      { appId: activeUserApp?._id },
      { "auth-token": token }
    );
  }, [userWalletState?.loading]);

  

  return (
    <View
      style={{
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 70,
      }}
    >
      <View
        style={{
          gap: 10,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRightColor: Colors.ash,
            paddingRight: 10,
            borderRightWidth: 1,
          }}
        >
          <WalletIcon color={Colors.white} />
        </View>
        <RegularText
          style={{
            fontSize: 15 / fontScale,
            color: Colors.white,
            textAlign: "center",
          }}
        >
          Account Balance
        </RegularText>
        <Pressable onPress={() => dispatch(updateShowAccountBalance())}>
          {showAccountBalance ? (
            <EyeLineIcon color={Colors.white} width={15} height={15} />
          ) : (
            <EyeIcon color={Colors.white} width={15} height={15} />
          )}
        </Pressable>
      </View>
      <View style={{ gap: 3 }}>
        <SemiBoldText
          style={{
            fontSize: 27 / fontScale,
            color: Colors.white,
            textAlign: "center",
          }}
        >
          {/* {accountBalanceType === 'naira' ? '₦ 60,000.00' : '100,000$PAY'} */}
          {!userWalletState?.loading &&
          !userWalletState?.error &&
          showAccountBalance &&
          activeUserApp &&
          Object.keys(activeUserApp)?.length !== 0
            ? `${localWallet?.symbol} ${addCommas(
                Number(localWallet?.balance?.available)?.toFixed(2)
              )}`
            : "*** *** ***"}
          {userAppsLoading !== "loading" &&
            userAppsLoading !== "rejected" &&
            showAccountBalance}
        </SemiBoldText>

        {!showCamera && (
          <View style={styles.messageView}>
            <Scan color={Colors.white} size={20} variant="TwoTone" />
            <MediumText
              style={{
                borderLeftColor: Colors.ash,
                borderLeftWidth: 1,
                paddingLeft: 10,
                color: Colors.white,
                fontSize: 10 / fontScale,
              }}
            >
              Click on the lens icon to pay
            </MediumText>
          </View>
        )}
        {/* <LightText style={{fontSize: 11 / fontScale, color: Colors.white, textAlign: "center"}}>
          ≈ $PAY{' '}
          {userAppsLoading !== 'loading' &&
          userAppsLoading !== 'rejected' &&
          showAccountBalance
            ? addCommas(activeUserApp?.tokenBalance.toFixed(3))
            : '*****'}
          {userAppsLoading !== 'loading' &&
          userAppsLoading !== 'rejected' &&
          showAccountBalance
            ? activeUserApp?.tokenBalance === 0 && '.00'
            : ''}
        </LightText> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageView: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
