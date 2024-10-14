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

      <ScrollView showsVerticalScrollIndicator={false}>
        <TransactionsList navigation={navigation}  />
      </ScrollView>
    </CustomView>
  );
}