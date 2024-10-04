import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {RootState} from '../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import TransactionItem, { TransactionItemT } from '../../screens/main/home/TransactionItem';
import {fetchCharge, fetchPayments} from '../../features/account/accountSlice';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/AppStacks';
import TransactionItemLoader from '../SkeletonLoaders/TransactionItemLoader';
import {Colors} from '../Colors';
import {MediumText} from '../styles/styledComponents';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useGraphQL from '../hooks/useGraphQL';
import { UserWalletTransactionQuery } from '../../apis/lib/queries';

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
  const {charges, chargesLoading, payOuts, payOutsLoading} = useSelector(
    (state: RootState) => state.account,
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { query, state } = useGraphQL();
  const transactions =
    state?.userWalletTransactions?.data?.userWalletTransactions;
  useEffect(() => {
    if (state?.userWalletTransactions?.loading) return;
    if (!activeUserApp?.keys?.pub_keys[0]?.value) return;
    query(
      "userWalletTransactions",
      UserWalletTransactionQuery,
      { symbol: "NGN", appId: activeUserApp?._id },
      {
        "auth-token": token,
      }
    );
    dispatch(
      fetchPayments({
        token,
        apiKey: activeUserApp?.keys.pub_keys[0].value,
        appId: activeUserApp?._id,
      })
    );
    dispatch(
      fetchCharge({ token, apiKey: activeUserApp?.keys.pub_keys[0].value })
    );
  }, [activeUserApp?.keys?.pub_keys[0].value, userAppsLoading]);
  return (
    <View style={{ flex: 1, gap: 20, paddingVertical: 4 }}>
      {state?.userWalletTransactions?.loading && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={Colors.primary} size={30} />
        </View>
      )}
      {state?.userWalletTransactions?.data?.userWalletTransactions?.length ===
        0 && (
        <MediumText style={{ textAlign: "center" }}>
          No transactions here
        </MediumText>
      )}
      {transactions &&
        transactions.length > 0 &&
        transactions
          .slice(sliceFrom, sliceTo)
          .reverse()
          .map((item: TransactionItemT) => (
            <TransactionItem
              key={item.transactionHash}
              onPress={() =>
                navigation.navigate("TransactionDetail", {
                  detail: item,
                })
              }
              item={item}
            />
          ))}
    </View>
  );
}
