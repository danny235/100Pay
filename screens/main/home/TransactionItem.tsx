import React from 'react';
import {Pressable, View, useWindowDimensions} from 'react-native';
import {Colors} from '../../../components/Colors';
import {PayIcon, RecieveIcon} from '../../../components/SvgAssets';
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
} from '../../../components/styles/styledComponents';
import { ChargeType } from '../../../features/account/accountSlice';
import { addCommas, formatDateString, getRelativeTime, truncateText } from '../../../utils';

type TransactionItemT = {
  id: number;
  title: string;
  from: string;
  date: string;
  amount: string;
  status: string;
};

interface TransactionItemProps {
  item: ChargeType;
  onPress: () => void
}

export default function TransactionItem({
  item,
  onPress
}: TransactionItemProps): React.JSX.Element {
  const {fontScale} = useWindowDimensions();
  return (
    <Pressable
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
      <View style={{gap: 4}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          {item.billing.description.includes('Fund wallet') ? (
            <PayIcon width={15} height={15} />
          ) : (
            <RecieveIcon width={15} height={15} color={Colors.balanceBlack} />
          )}
          <MediumText
            style={{
              fontSize: 14 / fontScale,
              textTransform: 'capitalize',
              color: Colors.balanceBlack,
            }}>
            {truncateText(item.billing.description, 20)}
          </MediumText>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <LightText
            style={{
              fontSize: 12 / fontScale,
              color: Colors.grayText,
              borderRightColor: Colors.ash,
              borderRightWidth: 1,
              paddingRight: 10,
            }}>
            ID: {truncateText(item._id, 10)}
          </LightText>
          <LightText style={{fontSize: 11 / fontScale, color: Colors.grayText}}>
            {formatDateString(item.createdAt)}
          </LightText>
        </View>
      </View>

      <View style={{marginLeft: 'auto', justifyContent: 'flex-end'}}>
        <MediumText
          style={{
            textAlign: 'right',
            fontSize: 14 / fontScale,
            textTransform: 'capitalize',
            color: Colors.balanceBlack,
          }}>
          N{addCommas(item.billing.amount)}
        </MediumText>
        <RegularText
          style={{
            textAlign: 'right',
            fontSize: 11 / fontScale,
            textTransform: 'capitalize',
            color:
              item.status.context.status === 'not-paid'
                ? Colors.error07
                : Colors.success700,
          }}>
          {item.status.context.status}
        </RegularText>
      </View>
    </Pressable>
  );
}
