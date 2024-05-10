import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import CustomView from '../../../../components/Views/CustomView'
import CustomHeader from '../../../../components/headers/CustomHeaders'
import { NotifictionIcon } from '../../../../components/SvgAssets'
import { Colors } from '../../../../components/Colors'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../../routes/AppStacks'
import { ScrollView } from 'react-native'
import { BoldText } from '../../../../components/styles/styledComponents'
import TransactionItem from '../TransactionItem'
import { RootState } from '../../../../app/store'
import { useSelector } from 'react-redux'
import TransactionsList from '../../../../components/Transactions/TransactionsList'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const trx = [
  {
    id: 1,
    title: 'From: Oscar',
    from: '984340',
    date: '2:45pm',
    amount: '10,000',
    status: 'successful',
  },
  {
    id: 2,
    title: 'Paid: Market Square',
    from: '984340',
    date: '2:45pm',
    amount: '10,000',
    status: 'successful',
  },
  {
    id: 3,
    title: 'From: Brainy',
    from: '984340',
    date: '2:45pm',
    amount: '10,000',
    status: 'successful',
  },
  {
    id: 4,
    title: 'Paid: Amazon',
    from: '984340',
    date: '2:45pm',
    amount: '10,000',
    status: 'failed',
  },
];

type NotificationT = {
    navigation: NativeStackNavigationProp<RootStackParamList>
}

export default function Notification({navigation}: NotificationT) {
    const {charges} = useSelector((state: RootState) => state.account);
  return (
    <CustomView>
      <CustomHeader
        text="Notifications"
        onPress={() => navigation.goBack()}
        icon={<NotifictionIcon color={Colors.primary} />}
      />

      <ScrollView>
        <TransactionsList navigation={navigation}  />
      </ScrollView>
    </CustomView>
  );
}