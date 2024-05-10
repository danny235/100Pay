import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import UserAvatar from '../../../../assets/images/DashboardEmojis/Avatar-a.png';
import {Button} from '../../../../components/Button/Button';
import {Colors} from '../../../../components/Colors';
import {
  ArrowRightIcon,
  CopyIcon,
  PayIcon,
} from '../../../../components/SvgAssets';
import CustomView from '../../../../components/Views/CustomView';
import CustomHeader from '../../../../components/headers/CustomHeaders';
import {
  BoldText,
  LightText,
  MediumText,
} from '../../../../components/styles/styledComponents';
import {RootStackParamList} from '../../../../routes/AppStacks';
import {addCommas, truncateText} from '../../../../utils';

type ConfirmPaymentT = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function ConfirmPayment({navigation}: ConfirmPaymentT) {
  const {fontScale, height} = useWindowDimensions();
  return (
    <CustomView>
      <CustomHeader
        text="Confirm Payment"
        icon={<PayIcon />}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20,
          }}>
          <LightText style={{fontSize: 14 / fontScale}}>Total Amount</LightText>
          <BoldText style={{fontSize: 36 / fontScale}}>
            {addCommas(6000)}.00
          </BoldText>
        </View>

        <View
          style={{
            backgroundColor: Colors.memojiBackground,
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 10,
            gap: 20,
          }}>
          <MediumText
            style={{
              fontSize: 14 / fontScale,
              borderBottomWidth: 1,
              borderBottomColor: Colors.modernBlack,
              paddingBottom: 7,
            }}>
            To Recipient
          </MediumText>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Image style={styles.avatarImg} source={UserAvatar} />
            <MediumText
              style={{
                fontSize: 14 / fontScale,
                borderRightWidth: 1,
                borderRightColor: Colors.modernBlack,
                paddingRight: 5,
              }}>
              Daniel Barima
            </MediumText>
            <LightText
              style={{fontSize: 13 / fontScale, color: Colors.grayText}}>
              ID: P234GH6
            </LightText>
          </View>
        </View>

        <View style={{gap: 10, paddingVertical: 20, height: height / 1.7}}>
          <View style={[styles.trxDetailContainer, {}]}>
            <LightText style={[{fontSize: 13 / fontScale}]}>
              Transaction Fee:
            </LightText>
            <BoldText style={[{fontSize: 13 / fontScale}]}>0 $Pay</BoldText>
          </View>
          <View
            style={[
              styles.trxDetailContainer,
              {
                borderBottomColor: Colors.ash,
                borderBottomWidth: 1,
                paddingBottom: 10,
              },
            ]}>
            <LightText style={[{fontSize: 13 / fontScale}]}>
              Payment Ref Code:
            </LightText>
            <Pressable
              style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <BoldText style={[{fontSize: 13 / fontScale}]}>
                {truncateText('3456Y8BN0987W12345Y6789', 14)}
              </BoldText>

              <CopyIcon />
            </Pressable>
          </View>
          <View style={[styles.trxDetailContainer, {marginBottom: 40}]}>
            <LightText style={[{fontSize: 13 / fontScale}]}>
              Account Balance:
            </LightText>
            <BoldText style={[{fontSize: 13 / fontScale}]}>
              ₦{addCommas(500000)}.00
            </BoldText>
          </View>

          <View>
            <BoldText style={{fontSize: 12 / fontScale}}>Note:</BoldText>
            <MediumText style={{fontSize: 12 / fontScale, width: '90%'}}>
              Make sure to confirm the all details of this transaction to ensure
              you are making payments to the right recipient.
            </MediumText>
          </View>
        </View>
      </ScrollView>
      <View style={{marginTop: 'auto', paddingVertical: 20}}>
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
      </View>
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
