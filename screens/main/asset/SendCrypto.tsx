import { View, Text } from 'react-native'
import React from 'react'
import CustomView from '../../../components/Views/CustomView'
import CustomHeader from '../../../components/headers/CustomHeaders'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/AppStacks';

type SingleCoinViewT = {
  navigation: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, "SendCrypto">;
};

export default function SendCrypto({navigation, route}) {
  return (
    <CustomView>
      <CustomHeader />
    </CustomView>
  )
}