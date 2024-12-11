import {
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomView from "../../../components/Views/CustomView";
import CustomHeader from "../../../components/headers/CustomHeaders";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/AppStacks";
import { ExportSquare } from "iconsax-react-native";
import { MediumText } from "../../../components/styles/styledComponents";
import { Colors } from "../../../components/Colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import SendWAddy from "./SendWAddy";
import SendWPayID from "./SendWPayID";
import useGraphQL from "../../../components/hooks/useGraphQL";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import {
  SupportedWalletsQuery,
  UserWalletsQuery,
} from "../../../apis/lib/queries";
import Loader from "../../../components/Loader/LogoLoader";
import { SupportedWalletT, UserWalletT } from "./Asset";
import PinInputBottomSheet from "../../../components/CustomPin/PinInputBottomSheet";
import useAxios from "../../../components/hooks/useAxios";
import { useToast } from "../../../components/CustomToast/ToastContext";
import WalletScan from "../home/Scan/WalletScan";

type SendCryptoT = {
  navigation: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, "SendCrypto">;
};

export type AddyT = {
  amount: string;
  walletAddress: string;
};

export type PayT = {
  amount: string;
  payId: string;
};

export default function SendCrypto({ navigation, route }: SendCryptoT) {
  const [selectedTab, setSelectedTab] = useState<"External" | "Internal">(
    "External"
  );
  const { showToast } = useToast();
  const { symbol } = route.params as {
    symbol: string;
  };
  const [showPinSheet, setShowPinSheet] = useState(false);
  const [activeCoin, setActiveCoin] = useState<UserWalletT>(null);
  const { activeUserApp, userAppsError, userAppsLoading, token } = useSelector(
    (state: RootState) => state.user
  );
  const [cryptoForm, setCrypto] = useState<AddyT>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState<string>("");
  const [payForm, setPayForm] = useState<PayT>(null);
  const { fontScale } = useWindowDimensions();
  const { query, state } = useGraphQL();
  const { post, state: transferAsset } = useAxios();
  const userWallets = state?.userWallets;
  const supportedWallets = state?.supportedWallets;
  const cryptoUserWallets = userWallets?.data?.userWallet?.filter(
    (wallet: UserWalletT) =>
      wallet?.walletType === "crypto" && wallet?.accountType === "mainaccount"
  );
  const currentFee: SupportedWalletT =
    supportedWallets?.data?.supportedWallets?.find(
      (sup: SupportedWalletT) => sup.symbol === symbol
    );
  const onSwipe = (direction: string) => {
    if (direction === "left" && selectedTab === "External") {
      setSelectedTab("Internal");
    } else if (direction === "right" && selectedTab === "Internal") {
      setSelectedTab("External");
    }
  };

  const fetchWallets = () => {
    if (userAppsLoading === "loading") return;
    if (!activeUserApp?._id) return;
    query(
      "userWallets",
      UserWalletsQuery,
      { appId: activeUserApp?._id },
      { "auth-token": token }
    );
    query(
      "supportedWallets",
      SupportedWalletsQuery,
      {},
      { "auth-token": token }
    );
  };

  const handleExternalTransfer = (pin: string) => {
    const total = Number(cryptoForm.amount) + Number(currentFee.fee.transfer);
    if (total > Number(activeCoin?.balance?.available)) {
      showToast("Not enough balance please topup 😢", "error");
    } else {
      post(
        "externalTransfer",
        "/user/transfer-asset",
        {
          amount: total,
          symbol: activeCoin?.symbol,
          appId: activeUserApp?._id,
          to: cryptoForm?.walletAddress,
          transactionPin: pin,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
    }
  };

  const handleInternalTransfer = (pin: string) => {
    const total = Number(payForm.amount);
    if (total > Number(activeCoin?.balance?.available)) {
      showToast("Not enough balance please topup 😢", "error");
    } else {
      post(
        "internalTransfer",
        "/user/transfer-asset",
        {
          amount: Number(payForm.amount),
          symbol: activeCoin?.symbol,
          appId: activeUserApp?._id,
          to: payForm.payId,
          transactionPin: pin,
          transferType: "internal",
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
    }
  };

  useEffect(() => {
    fetchWallets();
  }, [activeUserApp?._id]);

  useEffect(() => {
    if (userWallets?.loading) return;
    if (userWallets?.data?.userWallet) {
      setActiveCoin(
        userWallets?.data?.userWallet?.find(
          (coin: UserWalletT) => coin?.symbol === symbol
        )
      );
    }
  }, [
    userWallets?.loading,
    supportedWallets?.loading,
    state?.createWallet?.loading,
    activeCoin,
  ]);

  useEffect(() => {
    if (!transferAsset?.externalTransfer?.loading) {
      if (transferAsset?.externalTransfer?.data) {
        showToast("Transfer successful", "success");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
      if (transferAsset?.externalTransfer?.error?.message) {
        const errorResponse =
          transferAsset?.externalTransfer?.error?.response?.data;
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
          showToast(
            `${transferAsset?.externalTransfer?.error?.message}`,
            "error"
          );
        }
      }
    }
  }, [transferAsset?.externalTransfer?.loading]);
  useEffect(() => {
    if (!transferAsset?.internalTransfer?.loading) {
      if (transferAsset?.internalTransfer?.data) {
        showToast("Transfer successful", "success");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
      if (transferAsset?.internalTransfer?.error?.message) {
        const errorResponse =
          transferAsset?.internalTransfer?.error?.response?.data;
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
          showToast(
            `${transferAsset?.internalTransfer?.error?.message}`,
            "error"
          );
        }
      }
    }
  }, [transferAsset?.internalTransfer?.loading]);
  /*-------------------------------------*/

  return (
    <CustomView>
      <CustomHeader
        onPress={() => navigation.goBack()}
        text="Send Crypto"
        icon={<ExportSquare color={Colors.primary} variant="TwoTone" />}
      />
      <ScrollView style={{ flex: 1 }}>
        <View className="flex-row justify-between mt-4">
          <View
            style={{ backgroundColor: Colors.white }}
            className="flex-row space-x-4  rounded-[50px] px-1 py-1 items-center justify-between"
          >
            {activeCoin?.walletType === "crypto" && <Pressable
              className="  py-2 items-center justify-center"
              onPress={() => setSelectedTab("External")}
              style={{
                borderBottomColor:
                  selectedTab === "External" ? Colors.primary : "white",
                borderBottomWidth: selectedTab === "External" ? 1 : 0,
              }}
            >
              <MediumText
                style={{
                  color: selectedTab === "External" ? Colors.primary : "black",
                  fontSize: 14 / fontScale,
                }}
              >
                External
              </MediumText>
            </Pressable>}
            <Pressable
              className="  py-2 items-center justify-center"
              onPress={() => setSelectedTab("Internal")}
              style={{
                borderBottomColor:
                  selectedTab === "Internal" ? Colors.primary : "white",
                borderBottomWidth: selectedTab === "Internal" ? 1 : 0,
              }}
            >
              <MediumText
                style={{
                  color: selectedTab === "Internal" ? Colors.primary : "black",
                  fontSize: 14 / fontScale,
                }}
              >
                Internal
              </MediumText>
            </Pressable>
          </View>
        </View>
        {/* Conditional rendering based on selectedTab with swipe gesture */}
        <PanGestureHandler
          onGestureEvent={(event) => {
            const { translationX } = event.nativeEvent;
            if (translationX > 50) {
              onSwipe("right");
            } else if (translationX < -50) {
              onSwipe("left");
            }
          }}
        >
          <ScrollView style={{ flex: 1 }}>
            {selectedTab === "External" ? (
              <SendWAddy
                activeCoin={activeCoin}
                fee={currentFee?.fee.transfer}
                wallet={scannedData}
                onSubmit={(val: AddyT) => {
                  setCrypto(val);
                  setShowPinSheet(true);
                }}
                onScanPress={()=> setShowScanner(true)}
              />
            ) : (
              <SendWPayID
                activeCoin={activeCoin}
                fee="0.00"
                payId={scannedData}
                onSubmit={(val: PayT) => {
                  setPayForm(val);
                  setShowPinSheet(true);
                }}
                onScanPress={()=> setShowScanner(true)}
              />
            )}
          </ScrollView>
        </PanGestureHandler>
      </ScrollView>

      <Loader
        visible={
          userWallets?.loading ||
          supportedWallets?.loading ||
          transferAsset?.internalTransfer?.loading === true ||
          transferAsset?.externalTransfer?.loading === true
        }
      />

      <PinInputBottomSheet
        key={2}
        mainTxt="Enter Pin"
        subTxt="Enter your transaction pin to continue payment"
        isVisible={showPinSheet}
        onClose={setShowPinSheet}
        onSubmit={(pin) =>
          selectedTab === "External"
            ? handleExternalTransfer(pin)
            : handleInternalTransfer(pin)
        }
      />

      <WalletScan
        isVisible={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={(code) => setScannedData(code)}
      />
    </CustomView>
  );
}
