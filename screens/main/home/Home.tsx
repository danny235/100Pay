import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleProp,
  View,
  useWindowDimensions,
} from 'react-native';
import {Colors} from '../../../components/Colors';
import {BoldText, LightText} from '../../../components/styles/styledComponents';
import {RootStackParamList} from '../../../routes/AppStacks';
import Action from './Action';
import Balance from './Balance';
import TransactionItem from './TransactionItem';

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import * as Clipboard from "expo-clipboard";
import {TouchableOpacity, ViewStyle} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import ChooseAccountBalance from '../../../components/ChooseAccountBalance/ChooseAccountBalance';
import {useToast} from '../../../components/CustomToast/ToastContext';
import {
  ArrowFrontIcon,
  CopyIcon,
  NotifictionIcon,
  ScanIcon,
} from '../../../components/SvgAssets';
import CustomView from '../../../components/Views/CustomView';
import Memojis from './Memojis';
import {fetchUserApps, fetchUserData} from '../../../features/user/userSlice';
import {
  fetchBanks,
  fetchCharge,
  fetchPayments,
  fetchPaymentsLinks,
} from '../../../features/account/accountSlice';
import {ThunkDispatch} from 'redux-thunk';
import {GenerateArray} from '../../../utils';
import {object} from 'yup';
import TransactionsList from '../../../components/Transactions/TransactionsList';
import {NavigationProp} from '@react-navigation/native';
import SwitchBusiness from './SwitchBusiness/SwitchBusiness';
import RecieveModal from './RecieveModal/RecieveModal';

interface CustomBackdropProps {
  animatedIndex: SharedValue<number>;
  style: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const CustomBackdrop: React.FC<CustomBackdropProps> = ({
  animatedIndex,
  style,
  onPress,
}) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity style={style} onPress={onPress} />
    </Animated.View>
  );
};

interface HomeProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function Home({navigation}: HomeProps): React.JSX.Element {
  const {fontScale} = useWindowDimensions();
  const [showSwitchBalanceModal, setShowSwithBalanceModal] = useState(false);
  const [showRecieveModal, setShowRecieveModal] = useState(false)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [showSwitch, setShowSwitch] = useState(false);
  const {showToast} = useToast();
  const {userApps, activeUserApp, userAppsError, userAppsLoading, token} =
    useSelector((state: RootState) => state.user);
  const {charges} = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
      dispatch(fetchUserApps(token));
      dispatch(
        fetchBanks({token, apiKey: activeUserApp?.keys.pub_keys[0].value}),
      );
      dispatch(
        fetchPayments({token, apiKey: activeUserApp?.keys.pub_keys[0].value, appId: activeUserApp?._id}),
      );
     
      dispatch(
        fetchCharge({token, apiKey: activeUserApp?.keys.pub_keys[0].value}),
      );
      dispatch(
        fetchPaymentsLinks({token, apiKey: activeUserApp?.keys.pub_keys[0].value}),
      );
    }, 3000);
  }, []);
  const copyToClipboard = async () => {
     await Clipboard.setStringAsync(`${activeUserApp?.referralCode}`);
    showToast('Copied successfully', "success");
  };

  const handleShowModal = () => {
    setShowSwithBalanceModal(true);
  };
  useEffect(() => {
    dispatch(fetchUserApps(token));
    dispatch(fetchUserData(token));
    dispatch(
      fetchBanks({token, apiKey: activeUserApp?.keys.pub_keys[0].value}),
    );
    dispatch(
       fetchPaymentsLinks({
         token,
         apiKey: activeUserApp?.keys.pub_keys[0].value,
       })
     );
  }, []);

  // console.log(activeUserApp?.keys.pub_keys[0].value)
  return (
    <CustomView>
      <ScrollView
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            shouldRasterizeIOS={true}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', gap: 10, paddingVertical: 20}}>
            <Pressable onPress={()=>setShowSwitch(true)}>
            <Image
              style={{borderRadius: 40, height: 40, width: 40}}
              source={{
                uri: 'https://plus.unsplash.com/premium_photo-1703617663829-ac7430988118?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
              }}
            />
            </Pressable>

            
            <View style={{gap: 4}}>
              <BoldText
                style={{fontSize: 16 / fontScale, color: Colors.balanceBlack}}>
                {userAppsLoading === 'loading' || userAppsLoading === 'rejected'
                  ? '*****'
                  : userAppsLoading === 'success'
                    ? activeUserApp?.app_name || '*****'
                    : undefined}
              </BoldText>
              <Pressable
                onPress={copyToClipboard}
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <LightText
                  style={{
                    textTransform: 'uppercase',
                    fontSize: 12 / fontScale,
                    color: Colors.grayText,
                  }}>
                  Pay ID:{' '}
                  {userAppsLoading === 'loading' ||
                  userAppsLoading === 'rejected'
                    ? '*****'
                    : userAppsLoading === 'success'
                      ? activeUserApp?.referralCode || '*****'
                      : undefined}
                </LightText>
                <CopyIcon />
              </Pressable>
            </View>
            
            
          </View>

          <View style={{flexDirection: 'row', gap: 20}}>
            <Pressable onPress={() => navigation.navigate('Scan')}>
              <ScanIcon />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Notification')}>
              <NotifictionIcon />
            </Pressable>
          </View>
        </View>
        <View style={{gap: 10}}>
          <Balance />

          <Action
            onPayPress={() => navigation.navigate('Pay')}
            onRecievePress={() => setShowRecieveModal(true)}
          />
        </View>
        <Memojis onPress={() => navigation.navigate('SendPayment')} />
        <View
          style={{
            backgroundColor: Colors.memojiBackground,
            padding: 16,
            borderRadius: 12,
            gap: 10,
          }}>
          <Pressable
            onPress={() => navigation.navigate('Transactions')}
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderLeftColor: Colors.primary,
                borderLeftWidth: 5,
                borderRadius: 20,
                height: 16,
              }}
            />
            <BoldText
              style={{
                fontSize: 17 / fontScale,
                color: Colors.balanceBlack,
              }}>
              History
            </BoldText>
            <ArrowFrontIcon />
          </Pressable>
          <TransactionsList navigation={navigation} sliceFrom={0} sliceTo={5} />
        </View>
      </ScrollView>
          <SwitchBusiness showSwitch={showSwitch} onClose={()=>setShowSwitch(false)} />
          <RecieveModal navigation={navigation} showRecieve={showRecieveModal} onClose={()=>setShowRecieveModal(false)} />
      {/* Send naira modal */}
{/* 
      {showSwitchBalanceModal && (
        <ChooseAccountBalance onHide={() => setShowSwithBalanceModal(false)} />
      )} */}
    </CustomView>
  );
}
