import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { Colors } from "../../../components/Colors";
import {
  ArrowDownIcon,
  AssetFilledIcon,
  CircleIcon,
  FilterIcon,
} from "../../../components/SvgAssets";
import CustomView from "../../../components/Views/CustomView";
import {
  BoldText,
  LightText,
  MediumText,
} from "../../../components/styles/styledComponents";
import { NavigationAction, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/AppStacks";
import useGraphQL from "../../../components/hooks/useGraphQL";
import { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  SupportedWalletsQuery,
  UserWalletsQuery,
} from "../../../apis/lib/queries";
import Loader from "../../../components/Loader/LogoLoader";
import { addCommas, generateUniqueRandomId } from "../../../utils";
import AlertModal from "../../../components/Alert/AlertModal";
import { Refresh, Warning2 } from "iconsax-react-native";
import { CreateUserWalletMutation } from "../../../apis/lib/mutations";
import { useToast } from "../../../components/CustomToast/ToastContext";
import { ThunkDispatch } from "redux-thunk";
import { CoinType, fetchCryptoPrices } from "../../../features/account/accountSlice";
import { getCoinBySymbol } from "../../../functions";

type AssetT = {
  navigation: NavigationProp<RootStackParamList>;
};

type SupportedWalletT = {
  name: string;
  symbol: string;
  logo: string;
  decimals: string | null;
  contractAddress: string | null;
  fee: {
    transfer: string;
    convert: string;
  };
};

// Type for userWallets
export type UserWalletT = {
  name: string;
  symbol: string;
  logo: string;
  accountType: string;
  balance: {
    available: string;
    locked: string;
  };
  decimals: string;
  account: {
    address: string | null;
  };
  status: string;
  walletType: string;
  id: string;
};

export default function Assets({ navigation }: AssetT) {
  const { fontScale } = useWindowDimensions();
  const { activeUserApp, userAppsError, userAppsLoading, token } = useSelector(
    (state: RootState) => state.user
  );
  const { coinPriceList, coinPriceListError, coinPriceListLoading } = useSelector(
    (state: RootState) => state.account
  );
  const [activeSupportedWallet, setActiveSupportedWallet] =
    useState<SupportedWalletT>(null);
  const [showError, setShowError] = useState(false);
  const [refreshing, setRefreshing] = useState(false)
  const { mutate, query, state } = useGraphQL();
  const userWallets = state?.userWallets;
  const supportedWallets = state?.supportedWallets;
  const { showToast } = useToast();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  // Filter out non-crypto wallets (those without an account address)
 const cryptoUserWallets = userWallets?.data?.userWallet?.filter(
   (wallet: UserWalletT) =>
     wallet?.walletType === "crypto" && wallet?.accountType === "mainaccount"
 );


  // Compare supportedWallets and userWallets
  const filteredSupportedWallets =
    supportedWallets?.data?.supportedWallets?.filter(
      (supportedWallet: SupportedWalletT) =>
        !cryptoUserWallets?.some(
          (userWallet: UserWalletT) =>
            userWallet?.symbol === supportedWallet?.symbol
        )
    );

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

  useEffect(() => {
    fetchWallets();
    dispatch(fetchCryptoPrices())
  }, [activeUserApp?._id]);

  useEffect(() => {
    if (!userWallets?.loading) return
    if(coinPriceListLoading === "loading") return
    showToast(coinPriceListError, "error")
  }, [
    userWallets?.loading,
    supportedWallets?.loading,
    state?.createWallet?.loading,
    coinPriceListLoading
  ]);

  useEffect(() => {
    if (!state?.createWallet?.loading) {
      if (state?.createWallet?.data) {
        fetchWallets();
        showToast("Wallet Created", "success");
        setShowError(false);
      }
      if (state?.createWallet?.error?.message) {
        const errorResponse = state?.createWallet?.error?.response?.data;
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
          showToast(`${state?.createWallet?.error?.message}`, "error");
        }
      }
    }
  }, [state?.createWallet?.loading]);

    const onRefresh = React.useCallback(() => {
      setTimeout(() => {
        setRefreshing(false);
        fetchWallets();
        dispatch(fetchCryptoPrices());
        
      }, 1000);
    }, []);

  

  return (
    <CustomView>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <AssetFilledIcon color={Colors.primary} />
        <BoldText
          style={{
            fontSize: 17 / fontScale,
            borderLeftColor: Colors.ash,
            borderLeftWidth: 1,
            paddingHorizontal: 10,
          }}
        >
          Assets
        </BoldText>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            shouldRasterizeIOS={true}
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary, Colors.primaryLight]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {cryptoUserWallets &&
            cryptoUserWallets?.slice(0, 4).map((crypto: UserWalletT, i) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate("SingleCoin", {
                      userWallet: crypto,
                    })
                  }
                  style={styles.coinView}
                  key={crypto.name}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: crypto.logo }}
                      style={{ width: 17, height: 17, borderRadius: 17 }}
                    />
                    <MediumText style={{ fontSize: 15 / fontScale }}>
                      {crypto.symbol}
                    </MediumText>
                  </View>
                  <BoldText
                    style={{
                      fontSize: 26 / fontScale,
                      color: Colors.balanceBlack,
                    }}
                  >
                    {addCommas(Number(crypto.balance.available).toFixed(2))}
                  </BoldText>
                  <LightText
                    style={{ fontSize: 12 / fontScale, color: Colors.grayText }}
                  >
                    ≈ $
                    {coinPriceList
                      ? addCommas((getCoinBySymbol(coinPriceList, crypto.symbol)?.price *
                        Number(crypto.balance.available)).toFixed(2))
                      : "0.00"}
                  </LightText>
                </Pressable>
              );
            })}
        </View>

        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Pressable
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <FilterIcon color={Colors.primary} />

            <LightText
              style={{
                fontSize: 13 / fontScale,
                borderLeftColor: Colors.grayText,
                borderLeftWidth: 1,
                paddingLeft: 10,
              }}
            >
              All
            </LightText>
            <ArrowDownIcon />
          </Pressable>

          <View style={styles.searchBox}>
            <TextInput
              placeholder="Search assets here"
              style={{
                fontFamily: "SpaceGroteskMedium",
                color: Colors.black,
                width: "70%",
                fontSize: 15 / fontScale,
              }}
              placeholderTextColor={Colors.grayText}
            />
            <CircleIcon color={Colors.grayText} />
          </View>
          <Pressable
            onPress={fetchWallets}
            className=" items-center justify-center"
            style={{
              backgroundColor: Colors?.primary,
              width: 40,
              height: 40,
              borderRadius: 40,
            }}
          >
            <Refresh color={Colors.white} size={24} />
          </Pressable>
        </View>

        <View
          style={{
            marginTop: 20,
            gap: 10,
          }}
        >
          {cryptoUserWallets &&
            cryptoUserWallets.map((crypto: UserWalletT, i) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate("SingleCoin", {
                      userWallet: crypto,
                    })
                  }
                  style={styles.singleCoin}
                  key={crypto.id}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: crypto.logo }}
                      style={{ width: 27, height: 27, borderRadius: 27 }}
                    />
                    <MediumText style={{ fontSize: 15 / fontScale }}>
                      {crypto.symbol}
                    </MediumText>
                  </View>
                  <View style={{ marginLeft: "auto" }}>
                    <BoldText
                      style={{
                        fontSize: 16 / fontScale,
                        color: Colors.balanceBlack,
                        textAlign: "right",
                      }}
                    >
                      {addCommas(Number(crypto.balance.available).toFixed(2))}
                    </BoldText>
                    <LightText
                      style={{
                        fontSize: 12 / fontScale,
                        textAlign: "right",
                        color: Colors.grayText,
                      }}
                    >
                      ≈ $
                      {coinPriceList
                        ? addCommas(
                            (
                              getCoinBySymbol(coinPriceList, crypto.symbol)
                                ?.price * Number(crypto.balance.available)
                            ).toFixed(2)
                          )
                        : "0.00"}
                    </LightText>
                  </View>
                </Pressable>
              );
            })}
        </View>
        <View
          style={{
            gap: 10,
          }}
        >
          {filteredSupportedWallets &&
            filteredSupportedWallets.map((crypto: UserWalletT, i) => {
              return (
                <Pressable
                  onPress={() => {
                    setActiveSupportedWallet(crypto as any);
                    setShowError(true);
                  }}
                  style={styles.singleCoin}
                  key={generateUniqueRandomId()}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: crypto.logo }}
                      style={{ width: 27, height: 27, borderRadius: 27 }}
                    />
                    <MediumText style={{ fontSize: 15 / fontScale }}>
                      {crypto.symbol}
                    </MediumText>
                  </View>
                </Pressable>
              );
            })}
        </View>
      </ScrollView>

      <AlertModal
        show={showError}
        icon={<Warning2 color={Colors.primary} variant="TwoTone" size={48} />}
        mainText="No wallet found"
        subText="Click the button below to generate wallet"
        buttonText="Generate Wallet"
        onClose={() => {
          setShowError(false);
          mutate(
            "createWallet",
            CreateUserWalletMutation,
            {
              symbol: activeSupportedWallet?.symbol,
              appId: activeUserApp?._id,
            },
            {
              "auth-token": token,
            }
          );
        }}
      />
      <Loader
        visible={
          userWallets?.loading ||
          supportedWallets?.loading ||
          state?.createWallet?.loading === true
        }
      />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  coinView: {
    paddingVertical: 13,
    gap: 10,
    backgroundColor: Colors.memojiBackground,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexGrow: 1,
    flexBasis: "40%",
  },
  singleCoin: {
    flexDirection: "row",
    borderBottomColor: Colors.memojiBackground,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  searchBox: {
    paddingVertical: Platform.OS === "android" ? 2 : 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 50,
    alignItems: "center",
    paddingHorizontal: 20,
    width: "50%",
    flexGrow: 1,
  },
});
