import React from "react";
import { Pressable, View, useWindowDimensions } from "react-native";
import { Colors } from "../../../components/Colors";
import { PayIcon, RecieveIcon } from "../../../components/SvgAssets";
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
} from "../../../components/styles/styledComponents";
import {
  addCommas,
  formatDateString,
  truncateText,
} from "../../../utils";
import {
  RecoveryConvert,
} from "iconsax-react-native";

export type TransactionItemT = {
  userId: string;
  updatedAt: string;
  type: "debit" | "credit";
  transactionHash: string;
  to: string;
  symbol: string;
  status: "pending" | "successful" | "failed";
  id: string;
  from: string;
  createdAt: string;
  appId: string;
  amount: string;
  accountId: string;
};

interface TransactionItemProps {
  item: TransactionItemT;
  onPress: () => void;
}

export default function TransactionItem({
  item,
  onPress,
}: TransactionItemProps): React.JSX.Element {
  const { fontScale } = useWindowDimensions();

  const GetStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "failed":
        return Colors.error07;
      case "successful":
        return Colors.success700;
      default:
        return Colors.warning;
    }
  };

  const TransactionTypeLabel = () => {
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

  const RenderIcon = () => {
    if (
      item.type === "credit" &&
      !item.transactionHash.toLowerCase().startsWith("convert")
    ) {
      return <RecieveIcon width={15} height={15} color={Colors.balanceBlack} />;
    } else if (
      item.type === "debit" &&
      !item.transactionHash.toLowerCase().startsWith("convert")
    ) {
      return <PayIcon width={15} height={15} />;
    } else if (item.transactionHash.toLowerCase().startsWith("convert")) {
      return <RecoveryConvert color={Colors.primary} />;
    } else if (item.transactionHash.toLowerCase().startsWith("transfer")) {
      return <PayIcon width={15} height={15} />;
    }
    return null;
  };



  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
      }}
    >
      <View style={{ gap: 4 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {RenderIcon()}
          <MediumText
            style={{
              fontSize: 14 / fontScale,
              textTransform: "capitalize",
              color: Colors.balanceBlack,
            }}
          >
            {TransactionTypeLabel()}
          </MediumText>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <LightText
            style={{
              fontSize: 12 / fontScale,
              color: Colors.grayText,
              borderRightColor: Colors.ash,
              borderRightWidth: 1,
              paddingRight: 10,
            }}
          >
            ID: {truncateText(item?.id, 10)}
          </LightText>
          <LightText
            style={{ fontSize: 11 / fontScale, color: Colors.grayText }}
          >
            {formatDateString(item?.createdAt)}
          </LightText>
        </View>
      </View>

      <View style={{ justifyContent: "flex-end" }}>
        <MediumText
          style={{
            textAlign: "right",
            fontSize: 14 / fontScale,
            textTransform: "uppercase",
            color: Colors.balanceBlack,
          }}
        >
          {item?.symbol}
          {addCommas(Number(item?.amount).toFixed(2))}
        </MediumText>
        <RegularText
          style={{
            textAlign: "right",
            fontSize: 11 / fontScale,
            textTransform: "capitalize",
            color: GetStatusColor(item.status),
          }}
        >
          {item.status}
        </RegularText>
      </View>
    </Pressable>
  );
}
