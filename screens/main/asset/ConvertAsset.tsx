import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
  Platform,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CustomView from "../../../components/Views/CustomView";
import CustomHeader from "../../../components/headers/CustomHeaders";
import {
  ArrowDown,
  ArrowDown2,
  ArrowDown3,
  ArrowSquareDown,
  RecoveryConvert,
  TickCircle,
  WalletMoney,
} from "iconsax-react-native";
import { Colors } from "../../../components/Colors";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/AppStacks";
import Bitcoin from "../../../assets/images/bitcoin.png";
import PayToken from "../../../assets/images/paytoken.png";
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
  SemiBoldText,
} from "../../../components/styles/styledComponents";
import { Button } from "../../../components/Button/Button";
import { ArrowRightIcon } from "../../../components/SvgAssets";
import CustomNumberKeypad from "../../../components/Keypad/CustomNumberKeypad";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { CustomBackdrop } from "../../../components/ChooseAccountBalance/ChooseAccountBalance";
import AlertModal from "../../../components/Alert/AlertModal";
import { useToast } from "../../../components/CustomToast/ToastContext";
import Loader from "../../../components/Loader/LogoLoader";
import PinInputBottomSheet from "../../../components/CustomPin/PinInputBottomSheet";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import useGraphQL from "../../../components/hooks/useGraphQL";
import useAxios from "../../../components/hooks/useAxios";
import { UserWalletT } from "./Asset";
import { UserWalletsQuery } from "../../../apis/lib/queries";
import BottomSheetModalComponent from "../../../components/BottomSheetModal/BottomSheetModalComponent";
import { addCommas } from "../../../utils";
import { convertCurrency } from "../../../functions";
import { CoinType } from "../../../features/account/accountSlice";

type ConvertAssetT = {
  navigation: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, "ConvertAsset">;
};

export default function ConvertAsset({ navigation, route }: ConvertAssetT) {
  const [convertFrom, setConvertFrom] = useState("");
  const [convertTo, setConvertTo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPinSheet, setShowPinSheet] = useState(false);
  const [activeCoin, setActiveCoin] = useState<UserWalletT>(null);
  const [convertFromAsset, setConvertFromAsset] = useState<UserWalletT>(null);
  const [showAssets, setShowAssets] = useState(false);
  const { fontScale } = useWindowDimensions();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { activeUserApp, userAppsError, userAppsLoading, token } = useSelector(
    (state: RootState) => state.user
  );
  const { coinPriceList, coinPriceListLoading } = useSelector(
    (state: RootState) => state.account
  );
  const { query, state } = useGraphQL();
  const { post, state: convertAsset } = useAxios();
  const { showToast } = useToast();
  const { symbol } = route.params as {
    symbol: string;
  };

  /***--------------****/
  const fromPrice = coinPriceList?.find(
    (coin: CoinType) => coin?.symbol === symbol
  ).price;
  const toPrice =
    convertFromAsset &&
    coinPriceList?.find(
      (coin: CoinType) => coin?.symbol === convertFromAsset?.symbol
    ).price;
  /***--------------****/

  const [snapTo, setSnapTo] = useState(["30%", "40%"]);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const userWallets = state?.userWallets;
  const cryptoUserWallets = userWallets?.data?.userWallet?.filter(
    (wallet: UserWalletT) =>
      wallet?.walletType === "crypto" && wallet?.accountType === "mainaccount"
  );
  /*-- -- -- -- -- - --- -- */
  const [showKeypad, setShowKeypad] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleKeypadToggle = () => {
    setShowKeypad((prevValue) => !prevValue);
  };

  const handleKeypadKeyPress = (value: string) => {
    if (inputValue.length < 10) {
      setInputValue((prevValue) => prevValue + value);
      setPhoneNumberError("Phone number must be 10 digits");
    } else if (inputValue.length === 10) {
      setPhoneNumberError("");
    } else {
      setPhoneNumberError("Phone number must be 10 digits");
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
  };

  const handleConvert = (pin: string) => {
    if (Number(inputValue) > Number(activeCoin?.balance?.available)) {
      showToast("Insufficient funds please top up", "error");
    } else {
      post("convert", "/user/convert-asset", {
        amount: Number(inputValue),
        appId: activeUserApp?._id,
        from_symbol: symbol,
        to: convertFromAsset?.account?.address,
        to_symbol: convertFromAsset?.symbol,
        transactionPin: pin,
      }, {
        headers: {
          "auth-token": token
        }
      });
    }
  };

  const handleBackspace = () => {
    setInputValue((prevValue) => prevValue.slice(0, -1));
  };

  /*  -- ------- --- -- -*/
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
  }, [userWallets?.loading, state?.createWallet?.loading, activeCoin]);

  useEffect(() => {
    if (!convertAsset?.convert?.loading) {
      if (convertAsset?.convert?.data) {
        showToast("Convertion successful", "success");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
      if (convertAsset?.convert?.error?.message) {
        const errorResponse =
          convertAsset?.convert?.error?.response?.data;
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
            `${convertAsset?.convert?.error?.message}`,
            "error"
          );
        }
      }
    }
  }, [convertAsset?.convert?.loading]);

  return (
    <CustomView>
      <CustomHeader
        icon={
          <RecoveryConvert variant="TwoTone" size={23} color={Colors.primary} />
        }
        text="Convert Asset"
        onPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={{ gap: 30, marginTop: 20 }}>
        <View
          style={{
            gap: 10,
            position: "relative",
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <Pressable style={styles.inputGrayBox}>
            <View style={styles.coinImgWrapper}>
              <Image
                source={{ uri: activeCoin?.logo }}
                style={styles.coinImg}
              />
              <MediumText
                style={[styles.coinText, { fontSize: 15 / fontScale }]}
              >
                {activeCoin ? activeCoin?.symbol : "---"}
              </MediumText>
            </View>

            <Pressable
              onPress={() => {
                if (convertFromAsset) {
                  setShowKeypad(true);
                } else {
                  showToast("Please select an asset to covert to", "error");
                }
              }}
              style={styles.amountWrapper}
            >
              <View style={styles.coinImgWrapper}>
                <RegularText
                  style={{
                    fontSize: 12 / fontScale,
                    color: Colors.grayText,
                    textAlign: "right",
                  }}
                >
                  Balance
                </RegularText>
                <MediumText
                  style={[
                    styles.coinText,
                    { fontSize: 12 / fontScale, textAlign: "right" },
                  ]}
                >
                  {`${addCommas(
                    Number(activeCoin?.balance.available).toFixed(3)
                  )} ${activeCoin?.symbol}`}
                </MediumText>
              </View>

              <BoldText
                style={[
                  styles.amountText,
                  {
                    fontSize: 20 / fontScale,
                    color: convertFrom ? Colors.balanceBlack : Colors.grayText,
                  },
                ]}
              >
                {inputValue ? inputValue : "Click to convert"}
              </BoldText>
            </Pressable>
          </Pressable>

          <View style={styles.iconWrapper}>
            <View
              style={{
                backgroundColor: Colors.memojiBackground,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RecoveryConvert
                variant="TwoTone"
                size={23}
                color={Colors.grayText}
              />
            </View>
          </View>

          <Pressable style={styles.inputGrayBox}>
            <Pressable
              onPress={() => setShowAssets(true)}
              style={styles.coinImgWrapper}
            >
              {convertFromAsset && (
                <Image
                  source={{ uri: convertFromAsset?.logo }}
                  style={styles.coinImg}
                />
              )}
              <MediumText
                style={[styles.coinText, { fontSize: 15 / fontScale }]}
              >
                {convertFromAsset ? convertFromAsset?.symbol : "----"}
              </MediumText>
              <ArrowDown2 variant="TwoTone" color={Colors.primary} />
            </Pressable>

            <Pressable
              onPress={() => setShowKeypad(true)}
              style={styles.amountWrapper}
            >
              <BoldText
                style={[
                  styles.amountText,
                  {
                    fontSize: 20 / fontScale,
                    color: convertTo ? Colors.balanceBlack : Colors.grayText,
                  },
                ]}
              >
                {convertFromAsset !== null
                  ? addCommas(
                      convertCurrency({
                        amount: Number(inputValue),
                        fromPrice: Number(fromPrice),
                        toPrice: Number(toPrice),
                      })?.toFixed(7)
                    )
                  : "0.0000"}
              </BoldText>
            </Pressable>
          </Pressable>
        </View>
        <Button
          onPress={handlePresentModalPress}
          variant="primary"
          isLarge={false}
          isWide={true}
        >
          <MediumText style={{ color: Colors.white, fontSize: 15 / fontScale }}>
            Continue
          </MediumText>
          <ArrowRightIcon />
        </Button>
      </ScrollView>

      {/* Confirm conversion */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableContentPanningGesture={false}
          enablePanDownToClose={false}
          handleIndicatorStyle={{
            borderWidth: 3,
            borderColor: Colors.ash,
            width: "20%",
          }}
          backdropComponent={({ animatedIndex, style }) => (
            <CustomBackdrop
              onPress={handlePresentModalClose}
              animatedIndex={animatedIndex}
              style={style}
            />
          )}
          animateOnMount={true}
        >
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              gap: 20,
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <RecoveryConvert
                variant="TwoTone"
                size={23}
                color={Colors.primary}
              />
              <BoldText style={{ fontSize: 15 / fontScale, color: Colors.ash }}>
                |
              </BoldText>
              <MediumText style={{ fontSize: 15 / fontScale }}>
                Confirm Conversion
              </MediumText>
            </View>
            <LightText style={{ fontSize: 15 / fontScale }}>
              Confirm your asset conversion to continue.
            </LightText>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <RegularText>Total Conversion:</RegularText>
              <LightText>------------------</LightText>
              <SemiBoldText>
                {inputValue} {activeCoin?.symbol}
              </SemiBoldText>
            </View>

            <View
              style={{
                backgroundColor: Colors.memojiBackground,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <MediumText>{convertFromAsset?.symbol}</MediumText>
              <MediumText>
                {inputValue
                  ? addCommas(
                      convertCurrency({
                        amount: Number(inputValue),
                        fromPrice: Number(fromPrice),
                        toPrice: Number(toPrice),
                      })?.toFixed(7)
                    )
                  : "0.0000"}
              </MediumText>
            </View>

            <View style={styles.buttonGroup}>
              <Pressable
                onPress={handlePresentModalClose}
                style={styles.grayButton}
              >
                <MediumText style={{ fontSize: 15 / fontScale }}>
                  Cancel
                </MediumText>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowPinSheet(true);
                  handlePresentModalClose();
                }}
                style={[styles.grayButton, { backgroundColor: Colors.primary }]}
              >
                <MediumText
                  style={{ fontSize: 15 / fontScale, color: Colors.white }}
                >
                  Confirm
                </MediumText>
              </Pressable>
            </View>
          </ScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      <BottomSheetModalComponent
        show={showAssets}
        onClose={() => setShowAssets(false)}
      >
        <View className="p-5 flex-1">
          <MediumText className="text-center">Select Asset</MediumText>
          <BottomSheetScrollView
          showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ gap: 25 }}>
            {cryptoUserWallets
              ?.filter((crypto: UserWalletT) => crypto?.symbol !== symbol)
              .map((crypto: UserWalletT, i) => (
                <Pressable
                  key={crypto?.id}
                  onPress={() => {
                    setConvertFromAsset(crypto);
                    setShowAssets(false);
                  }}
                  style={[
                    styles.coinImgWrapper,
                    { justifyContent: "flex-start" },
                  ]}
                >
                  <Image
                    source={{ uri: crypto?.logo }}
                    style={styles.coinImg}
                  />
                  <MediumText
                    style={[styles.coinText, { fontSize: 15 / fontScale }]}
                  >
                    {crypto?.symbol}
                  </MediumText>
                </Pressable>
              ))}
          </BottomSheetScrollView>
        </View>
      </BottomSheetModalComponent>

      <CustomNumberKeypad
        isVisible={showKeypad}
        onClose={handleKeypadToggle}
        onKeyPress={handleKeypadKeyPress}
        onBackspace={handleBackspace}
      />
      <AlertModal
        show={showModal}
        icon={<TickCircle color={Colors.primary} variant="TwoTone" size={48} />}
        mainText="Conversion Successful"
        subText="You have successfully converted your asset to $Pay Token"
        buttonText="Close"
        onClose={() => setShowModal(false)}
      />

      <Loader
        visible={userWallets?.loading || coinPriceListLoading === "loading" || convertAsset?.convert?.loading === true}
      />

      <PinInputBottomSheet
        key={2}
        mainTxt="Enter Pin"
        subTxt="Enter your transaction pin to continue payment"
        isVisible={showPinSheet}
        onClose={setShowPinSheet}
        onSubmit={(pin) => handleConvert(pin)}
      />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  inputGrayBox: {
    backgroundColor: Colors.memojiBackground,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    height: 100,
  },
  iconWrapper: {
    borderWidth: 10,
    borderColor: Colors.white,
    borderRadius: 50,
    width: 50,
    height: 50,
    padding: 20,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: "35%",
    zIndex: 2,
    left: "40%",
  },
  coinImgWrapper: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  coinImg: { width: 27, height: 27, borderRadius: 27 },
  coinText: {
    borderLeftColor: Colors.ash,
    borderLeftWidth: 1,
    paddingLeft: 10,
  },
  amountWrapper: {
    gap: 10,
  },
  amountText: { textAlign: "right" },
  grayButton: {
    backgroundColor: Colors.memojiBackground,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexGrow: 1,
    flexDirection: "row",
    gap: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 20,
    marginTop: "auto",
    paddingVertical: 30,
  },
});
