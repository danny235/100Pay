import { View, Text, StyleSheet, useWindowDimensions, ScrollView, Image } from 'react-native'
import React from 'react'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../routes/AppStacks';
import { Button } from '../../../../components/Button/Button';
import CustomView from '../../../../components/Views/CustomView';
import CustomHeader from '../../../../components/headers/CustomHeaders';
import { ArrowRightIcon, CopyIcon, PayIcon, TickCircleIcon } from '../../../../components/SvgAssets';
import { BoldText, LightText, MediumText } from '../../../../components/styles/styledComponents';
import { Colors } from '../../../../components/Colors';
import { addCommas, truncateText } from '../../../../utils';
import { Pressable } from 'react-native';
import UserAvatar from '../../../../assets/images/DashboardEmojis/Avatar-a.png';
import { Clock } from 'iconsax-react-native';
import { ChargeType, PayoutsI } from '../../../../features/account/accountSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { TransactionItemT } from '../../home/TransactionItem';

type TransactionsT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList>
};

export default function TransactionDetail({navigation, route}: TransactionsT) {
  const {fontScale, height} = useWindowDimensions();
  const {
    detail,
    screen,
  }: {detail?: TransactionItemT | undefined; screen?: string | undefined} =
    route.params ?? {};

  const {

    activeUserApp,
  
    
  } = useSelector((state: RootState) => state.user);

    const transactionTypeLabel = () => {
      const hash = detail.transactionHash?.toLowerCase();
      if (!hash) return "Unknown";

      if (detail.type === "credit" && !hash.startsWith("convert")) {
        return "Received";
      } else if (detail.type === "debit" && !hash.startsWith("convert")) {
        return "Sent";
      } else if (hash.startsWith("convert")) {
        return "Conversion";
      } else if (hash.startsWith("payout")) {
        return "Payout";
      } else if (hash.startsWith("withdraw")) {
        return "Withdraw";
      }

      // Add remaining conditions here
      return "Transfer";
    };

  
  return (
    <CustomView>
      <CustomHeader
        text="Transaction History"
        icon={<Clock color={Colors.primary} size={24} />}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 20,
          }}
        >
          <LightText style={{ fontSize: 14 / fontScale }}>
            Total Amount
          </LightText>
          <BoldText style={{ fontSize: 36 / fontScale }}>
            {detail?.symbol}
            {addCommas(Number(detail?.amount).toFixed(2))}
          </BoldText>
        </View>

        <View
          style={{
            backgroundColor: Colors.memojiBackground,
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 10,
            gap: 20,
          }}
        >
          <MediumText
            style={{
              fontSize: 14 / fontScale,
              borderBottomWidth: 1,
              borderBottomColor: Colors.modernBlack,
              paddingBottom: 7,
            }}
          >
            To Recipient
          </MediumText>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image style={styles.avatarImg} source={UserAvatar} />
            <MediumText
              style={{
                fontSize: 14 / fontScale,
                borderRightWidth: 1,
                borderRightColor: Colors.modernBlack,
                paddingRight: 5,
                textTransform: "capitalize",
              }}
            >
              {detail?.to}
            </MediumText>
            <LightText
              style={{ fontSize: 13 / fontScale, color: Colors.grayText }}
            >
              Description: {transactionTypeLabel()}
            </LightText>
          </View>
        </View>

        <View style={{ gap: 10, paddingVertical: 20, height: height / 1.7 }}>
          <View style={[styles.trxDetailContainer, {}]}>
            <LightText style={[{ fontSize: 13 / fontScale }]}>
              Transaction Fee:
            </LightText>
            <BoldText style={[{ fontSize: 13 / fontScale }]}>
              0.00 {activeUserApp.currency}
            </BoldText>
          </View>
          <View
            style={[
              styles.trxDetailContainer,
              {
                borderBottomColor: Colors.ash,
                borderBottomWidth: 1,
                paddingBottom: 10,
              },
            ]}
          >
            <LightText style={[{ fontSize: 13 / fontScale }]}>
              Payment Ref Code:
            </LightText>
            <Pressable
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <BoldText style={[{ fontSize: 13 / fontScale }]}>
                {truncateText(detail?.transactionHash)}
              </BoldText>

              <CopyIcon />
            </Pressable>
          </View>
          {/* <View style={[styles.trxDetailContainer, {marginBottom: 40}]}>
            <LightText style={[{fontSize: 13 / fontScale}]}>
              Account Balance:
            </LightText>
            <BoldText style={[{fontSize: 13 / fontScale}]}>
              ₦{addCommas()}.00
            </BoldText>
          </View> */}

          <View>
            <BoldText style={{ fontSize: 12 / fontScale }}>Note:</BoldText>
            <MediumText style={{ fontSize: 12 / fontScale, width: "90%" }}>
              Make sure to confirm the all details of this transaction to ensure
              you are making payments to the right recipient.
            </MediumText>
          </View>
        </View>
      </ScrollView>
      {/* <View style={{marginTop: 'auto', paddingVertical: 20}}>
        <Button
          variant="primary"
          isLarge={false}
          isWide={true}
          onPress={() => navigation.navigate('TransactionPin')}>
          <MediumText style={{color: Colors.white, fontSize: 15 / fontScale}}>
            Pay
          </MediumText>
          <ArrowRightIcon />
        </Button>
      </View> */}
    </CustomView>
  );
}

const styles = StyleSheet.create({
  avatarImg: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  trxDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
