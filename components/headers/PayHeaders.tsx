import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {ArrowBackwardIcon, WalletIcon} from '../SvgAssets';
import {Colors} from '../Colors';
import {SemiBoldText} from '../styles/styledComponents';
import {useNavigation} from '@react-navigation/native';

const PayHeaders = ({title}: {title: string}) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleGoBack}>
        <ArrowBackwardIcon />
      </Pressable>
      <View style={styles.walletContainer}>
        <WalletIcon />
      </View>
      <SemiBoldText style={styles.title}>{title}</SemiBoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingBottom: 12
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRightColor: Colors.ash,
    borderRightWidth: 1.4,
    paddingRight: 12,
  },
  title: {
    color: Colors.balanceBlack,
    fontSize: 18,
    marginLeft: -12,
  },
});

export default PayHeaders;
