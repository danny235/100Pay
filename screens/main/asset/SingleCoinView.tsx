import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
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
import Bitcoin from "../../../assets/images/bitcoin.png";
import {
  LightText,
  MediumText,
  SemiBoldText,
} from "../../../components/styles/styledComponents";
import { Colors } from "../../../components/Colors";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/AppStacks";
import {
  Clock,
  Convertshape,
  ExportCurve,
  ExportSquare,
  ImportCurve,
  ImportSquare,
  RecoveryConvert,
  WalletMoney,
} from "iconsax-react-native";
import { LineGraph } from "react-native-graph";
import { ArrowUpIcon, CopyIcon } from "../../../components/SvgAssets";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { CustomBackdrop } from "../../../components/ChooseAccountBalance/ChooseAccountBalance";
import QRCode from "react-native-qrcode-svg";
import {
  addCommas,
  copyToClipboard,
  formatDateString,
  formatTimeString,
  truncateText,
} from "../../../utils";
import { UserWalletT } from "./Asset";
import { useToast } from "../../../components/CustomToast/ToastContext";
import BottomSheetModalComponent from "../../../components/BottomSheetModal/BottomSheetModalComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { UserWalletTransactionQuery } from "../../../apis/lib/queries";
import useGraphQL from "../../../components/hooks/useGraphQL";
import { TransactionItemT } from "../home/TransactionItem";
import ActionButton from "../../../components/Button/ActionButton";

type SingleCoinViewT = {
  navigation: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, "SingleCoin">;
};

const activityHistory = [
  {
    id: 1,
    title: "Received",
    date: "01 - Feb - 24",
    time: "2:00pm",
    amount: "+0.0043BTC",
    dollarAmount: "$50",
  },
  {
    id: 2,
    title: "Converted",
    date: "01 - Feb - 24",
    time: "2:00pm",
    amount: "+0.0043BTC",
    dollarAmount: "$50",
  },
  {
    id: 3,
    title: "Received",
    date: "01 - Feb - 24",
    time: "2:00pm",
    amount: "+0.0043BTC",
    dollarAmount: "$50",
  },
  {
    id: 4,
    title: "Converted",
    date: "01 - Feb - 24",
    time: "2:00pm",
    amount: "+0.0043BTC",
    dollarAmount: "$50",
  },
];

export default function SingleCoinView({ navigation, route }: SingleCoinViewT) {
  const { fontScale, width } = useWindowDimensions();
  const { userWallet } = route.params as {
    userWallet: UserWalletT;
  };
  const { showToast } = useToast();
  const [showRecieveModal, setShowRecieveModal] = useState(false);
  const { userApps, activeUserApp, userAppsError, userAppsLoading, token } =
    useSelector((state: RootState) => state.user);
  const { query, state } = useGraphQL();
  const transactions =
    state?.userWalletTransactions?.data?.userWalletTransactions;

  const transactionTypeLabel = (item) => {
    const hash = item.transactionHash?.toLowerCase();
    if (!hash) return "Unknown";

    if (item.type === "credit" && !hash.startsWith("convert")) {
      return "Received";
    } else if (item.type === "debit" && !hash.startsWith("convert")) {
      return "Sent";
    } else if (hash.startsWith("convert")) {
      return "Conversion";
    } else if (hash.startsWith("payout")) {
      return "Payout";
    } else if (hash.startsWith("withdraw")) {
      return "Withdraw";
    } else if (hash.startsWith("transfer-fee")) {
      return "Transfer Fee";
    }
    // Add remaining conditions here
    return "Transfer";
  };

  // const renderTransactionLink = () => {
  //   const hash = item.transactionHash?.toLowerCase();
  //   if (hash && !hash.startsWith("convert") && !hash.startsWith("transfer")) {
  //     return (
  //       <Text style={styles.transactionLink}>
  //         <TouchableOpacity
  //           onPress={() =>
  //             Linking.openURL(`https://bscscan.com/tx/${item.transactionHash}`)
  //           }
  //         >
  //           {concatAddress(item.transactionHash)}
  //         </TouchableOpacity>
  //       </Text>
  //     );
  //   } else if (hash?.startsWith("internal")) {
  //     return (
  //       <TouchableOpacity
  //         style={styles.internalLink}
  //         onPress={() => handleCopy(hash.replace("internal-transfer-", ""))}
  //       >
  //         <Text>
  //           Internal: {concatAddress(hash.replace("internal-transfer-", ""))}
  //         </Text>
  //       </TouchableOpacity>
  //     );
  //   }
  //   // Add remaining transaction types (convert, transfer, etc.)
  //   return null;
  // };

  const renderIcon = (item) => {
    if (
      item.type === "credit" &&
      !item.transactionHash.toLowerCase().startsWith("convert")
    ) {
      return (
        <ImportCurve variant="TwoTone" size={20} color={Colors.grayText} />
      );
    } else if (
      item.type === "debit" &&
      !item.transactionHash.toLowerCase().startsWith("convert")
    ) {
      return (
        <ExportCurve variant="TwoTone" size={20} color={Colors.grayText} />
      );
    } else if (item.transactionHash.toLowerCase().startsWith("convert")) {
      return (
        <RecoveryConvert variant="TwoTone" size={20} color={Colors.primary} />
      );
    } else if (item.transactionHash.toLowerCase().startsWith("transfer")) {
      return (
        <ExportCurve variant="TwoTone" size={20} color={Colors.grayText} />
      );
    }
    return null;
  };

   const quickAction = [
     {
       id: 1,
       title: "Deposit",
       icon: <ImportSquare color={Colors.primary} size={20} />,
       onPress: () => setShowRecieveModal(true),
     },
     {
       id: 2,
       title: "Withdraw",
       icon: <ExportSquare color={Colors.primary} size={20} />,
       onPress: () => null,
     },

     {
       id: 3,
       title: "Convert",
       icon: <Convertshape color={Colors.primary} size={20} />,
       onPress: () => navigation.navigate("ConvertAsset"),
     },
   ];

  useEffect(() => {
    if (state?.userWalletTransactions?.loading) return;
    if (!activeUserApp?.keys?.pub_keys[0]?.value) return;
    query(
      "userWalletTransactions",
      UserWalletTransactionQuery,
      { symbol: userWallet?.symbol, appId: activeUserApp?._id },
      {
        "auth-token": token,
      }
    );
  }, [activeUserApp?.keys?.pub_keys[0].value, userAppsLoading]);

  return (
    <CustomView>
      <CustomHeader
        icon={
          <Image
            source={{ uri: userWallet?.logo }}
            style={{ width: 27, height: 27, borderRadius: 27 }}
          />
        }
        text={userWallet?.symbol}
        subTextComponent={
          <LightText
            style={{ fontSize: 14 / fontScale, color: Colors.grayText }}
          >
            {" "}
            - {userWallet?.name}
          </LightText>
        }
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
          paddingBottom: 20,
          marginVertical: 20,

          backgroundColor: Colors.white,
        }}
      >
        <View style={{ gap: 5 }}>
          <SemiBoldText
            style={{ fontSize: 28 / fontScale, color: Colors.balanceBlack }}
          >
            {addCommas(Number(userWallet?.balance?.available).toFixed(2))}
          </SemiBoldText>
          <LightText
            style={{ fontSize: 14 / fontScale, color: Colors.grayText }}
          >
            ≈ $0.00
          </LightText>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: Colors.memojiBackground,
            paddingVertical: 10,
            paddingHorizontal: 10,
            width: "50%",
          }}
        >
          <View style={{ gap: 10 }}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: Colors.ash,
                paddingBottom: 8,
              }}
            >
              <ArrowUpIcon />
              <LightText>24 hrs</LightText>
            </View>
            <MediumText>+0.80%</MediumText>
          </View>
          {/* <LineGraph
            points={[
              {
                date: new Date('2024-03-21T19:19:01+00:00'),
                value: 250000,
              },
              {
                date: new Date('2024-08-21T19:19:05+00:00'),
                value: 18000,
              },
              {
                date: new Date('2024-12-21T19:20:01+00:00'),
                value: 500,
              },
              {
                date: new Date('2024-18-21T19:21:01+00:00'),
                value: 200,
              },
              {
                date: new Date('2024-26-21T19:12:01+00:00'),
                value: 2000000,
              },
            ]}
            animated={true}
            color={Colors.primary}
            style={{width: '50%', height: 10}}
          /> */}
        </View>
      </View>
      <ScrollView
        style={{ paddingBottom: transactions?.length }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Clock size={25} color={Colors.primary} />
          <SemiBoldText
            style={{
              fontSize: 20 / fontScale,
              borderLeftColor: Colors.ash,
              borderLeftWidth: 1,
              paddingLeft: 10,
            }}
          >
            Activity History
          </SemiBoldText>
        </View>

        <View style={{ gap: 10, marginVertical: 20 }}>
          <View className=" items-center justify-center">
            {state?.userWalletTransactions?.loading && (
              <ActivityIndicator size={30} color={Colors.primary} />
            )}
          </View>
          <View className=" items-center justify-center">
            {state?.userWalletTransactions?.data?.userWalletTransactions
              ?.length === 0 && (
              <MediumText
                style={{ fontSize: 15 / fontScale, color: Colors.grayText }}
              >
                No transactions here!
              </MediumText>
            )}
          </View>
          {transactions &&
            transactions.map((transaction: TransactionItemT, _i) => {
              return (
                <Pressable
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomColor: Colors.ash,
                    borderBottomWidth: 1,
                    paddingBottom: 15,
                  }}
                  key={transaction?.id}
                >
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    {renderIcon(transaction)}

                    <View>
                      <MediumText style={{ fontSize: 15 / fontScale }}>
                        {transactionTypeLabel(transaction)}
                      </MediumText>

                      <LightText
                        style={{
                          color: Colors.grayText,
                          fontSize: 13 / fontScale,
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        {formatDateString(transaction?.createdAt)} |{" "}
                        {formatTimeString(transaction?.createdAt)}
                      </LightText>
                    </View>
                  </View>

                  <View>
                    <MediumText
                      style={{ fontSize: 15 / fontScale, textAlign: "right" }}
                    >
                      {transaction.amount}
                    </MediumText>
                    <LightText
                      style={{
                        color: Colors.grayText,
                        fontSize: 13 / fontScale,
                        alignItems: "center",
                        gap: 10,
                        textAlign: "right",
                      }}
                    >
                      ≈ {0.0}
                    </LightText>
                  </View>
                </Pressable>
              );
            })}
        </View>
      </ScrollView>

      <View className=" flex-row flex-wrap space-x-5 justify-between px-2 pb-10">
        {quickAction.map((action) => (
          <ActionButton
            title={action.title}
            icon={action.icon}
            key={action.id}
            onPress={action.onPress}
          />
        ))}
      </View>
      {/* <View style={styles.buttonGroup}>
        <Pressable
          onPress={() => setShowRecieveModal(true)}
          style={styles.grayButton}
        >
          <ImportCurve variant="TwoTone" size={23} color={Colors.primary} />
          <MediumText style={{ fontSize: 15 / fontScale }}>Receive</MediumText>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("ConvertAsset")}
          style={styles.grayButton}
        >
          <RecoveryConvert variant="TwoTone" size={23} color={Colors.primary} />
          <MediumText style={{ fontSize: 15 / fontScale }}>Convert</MediumText>
        </Pressable>
      </View> */}

      <BottomSheetModalComponent
        onClose={() => setShowRecieveModal(false)}
        show={showRecieveModal}
        snapPoints={["50%", "80%"]}
        enableHandlePanningGesture={false}
      >
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            gap: 20,
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <WalletMoney variant="TwoTone" size={23} color={Colors.primary} />
            <LightText style={{ fontSize: 15 / fontScale, color: Colors.ash }}>
              |
            </LightText>
            <MediumText style={{ fontSize: 15 / fontScale }}>
              Wallet Address
            </MediumText>
          </View>

          <LightText style={{ fontSize: 13 / fontScale }}>
            Send {userWallet?.name} to the wallet address below. Ensure the
            network corresponds with the one below.
          </LightText>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              source={{ uri: userWallet?.logo }}
              style={{ width: 27, height: 27, borderRadius: 27 }}
            />
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <LightText
                style={{ fontSize: 14 / fontScale, color: Colors.ash }}
              >
                |
              </LightText>
              <MediumText style={{ fontSize: 16 / fontScale }}>
                {userWallet?.symbol}
              </MediumText>
              <LightText
                style={{ fontSize: 14 / fontScale, color: Colors.grayText }}
              >
                {" "}
                - {userWallet?.name}
              </LightText>
            </View>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={[styles.qrContainer, { width: width / 1.3 }]}>
              <QRCode size={width / 1.5} value={userWallet?.account?.address} />
            </View>
          </View>

          <View style={styles.borderBox}>
            <MediumText
              style={[styles.borderMainText, { fontSize: 15 / fontScale }]}
            >
              Address
            </MediumText>
            <LightText
              style={[styles.borderSubText, { fontSize: 15 / fontScale }]}
            >
              {truncateText(userWallet?.account?.address, 18)}
            </LightText>
            <Pressable
              onPress={() => {
                copyToClipboard(userWallet?.account?.address);
                showToast("Copied successfully", "success");
              }}
              style={{ marginLeft: "auto" }}
            >
              <CopyIcon width={25} height={25} />
            </Pressable>
          </View>
          <View style={styles.borderBox}>
            <MediumText
              style={[styles.borderMainText, { fontSize: 15 / fontScale }]}
            >
              Network
            </MediumText>
            <LightText
              style={[styles.borderSubText, { fontSize: 15 / fontScale }]}
            >
              BEP20
            </LightText>
          </View>

          <LightText
            style={[
              styles.borderSubText,
              { fontSize: 14 / fontScale, width: "80%" },
            ]}
          >
            Note: Sending via the wrong network may lead to loss of funds.{" "}
          </LightText>
        </ScrollView>
      </BottomSheetModalComponent>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    gap: 20,
    marginTop: "auto",
    paddingVertical: 30,
  },
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
  qrContainer: {
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  borderBox: {
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  borderMainText: {
    borderRightColor: Colors.ash,
    borderRightWidth: 1,
    paddingRight: 10,
  },
  borderSubText: {
    color: Colors.grayText,
  },
});
