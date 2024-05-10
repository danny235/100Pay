import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {RootState} from '../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import TransactionItem from '../../screens/main/home/TransactionItem';
import {fetchCharge, fetchPayments} from '../../features/account/accountSlice';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/AppStacks';
import TransactionItemLoader from '../SkeletonLoaders/TransactionItemLoader';
import {Colors} from '../Colors';
import {MediumText} from '../styles/styledComponents';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type TransactionsT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  sliceFrom?: number;
  sliceTo?: number | undefined;
};

export default function TransactionsList({
  navigation,
  sliceFrom = 0,
  sliceTo,
}: TransactionsT) {
  const {userApps, activeUserApp, userAppsError, userAppsLoading, token} =
    useSelector((state: RootState) => state.user);
  const {charges, chargesLoading} = useSelector(
    (state: RootState) => state.account,
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(
      fetchPayments({
        token,
        apiKey: activeUserApp?.keys.pub_keys[0].value,
        appId: activeUserApp?._id,
      })
    );
    dispatch(
      fetchCharge({token, apiKey: activeUserApp?.keys.pub_keys[0].value}),
    );
  }, []);
  return (
    <View style={{flex: 1, gap: 20, paddingVertical: 4}}>
      {chargesLoading === 'loading' && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color={Colors.primary} size={30} />
        </View>
      )}
      {charges?.length === 0 && (
        <MediumText style={{textAlign: 'center'}}>
          No transactions here
        </MediumText>
      )}
      {charges?.length !== 0 &&
        charges?.slice(sliceFrom, sliceTo).map((item, i) => (
          <TransactionItem
            key={item._id}
            onPress={() =>
              navigation.navigate('TransactionDetail', {
                detail: item,
              })
            }
            item={item}
          />
        ))}
    </View>
  );
}
