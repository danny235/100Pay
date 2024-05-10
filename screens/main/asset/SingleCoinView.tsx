import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import CustomView from '../../../components/Views/CustomView';
import CustomHeader from '../../../components/headers/CustomHeaders';
import Bitcoin from '../../../assets/images/bitcoin.png';
import {
  LightText,
  MediumText,
  SemiBoldText,
} from '../../../components/styles/styledComponents';
import {Colors} from '../../../components/Colors';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../routes/AppStacks';
import {

  Clock,
  
  ImportCurve,
  RecoveryConvert,
  WalletMoney,
} from 'iconsax-react-native';
import {LineGraph} from 'react-native-graph';
import {ArrowUpIcon, CopyIcon} from '../../../components/SvgAssets';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBackdrop} from '../../../components/ChooseAccountBalance/ChooseAccountBalance';
import QRCode from 'react-native-qrcode-svg';
import {truncateText} from '../../../utils';

type SingleCoinViewT = {
  navigation: NavigationProp<RootStackParamList>;
};

const activityHistory = [
  {
    id: 1,
    title: 'Received',
    date: '01 - Feb - 24',
    time: '2:00pm',
    amount: '+0.0043BTC',
    dollarAmount: '$50',
  },
  {
    id: 2,
    title: 'Converted',
    date: '01 - Feb - 24',
    time: '2:00pm',
    amount: '+0.0043BTC',
    dollarAmount: '$50',
  },
  {
    id: 3,
    title: 'Received',
    date: '01 - Feb - 24',
    time: '2:00pm',
    amount: '+0.0043BTC',
    dollarAmount: '$50',
  },
  {
    id: 4,
    title: 'Converted',
    date: '01 - Feb - 24',
    time: '2:00pm',
    amount: '+0.0043BTC',
    dollarAmount: '$50',
  },
];

export default function SingleCoinView({navigation}: SingleCoinViewT) {
  const {fontScale, width} = useWindowDimensions();
  const walletAddress = 'asdfgHJKl34567iokjhvbner45dfbn';
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapTo, setSnapTo] = useState(['50%', '95%']);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <CustomView>
      <CustomHeader
        icon={
          <Image
            source={Bitcoin}
            style={{width: 27, height: 27, borderRadius: 27}}
          />
        }
        text="BTC"
        subTextComponent={
          <LightText style={{fontSize: 14 / fontScale, color: Colors.grayText}}>
            {' '}
            - Bitcoin
          </LightText>
        }
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'space-between',
          paddingBottom: 20,
          marginVertical: 20,
          flex: 1,
          backgroundColor: Colors.white
        }}>
        <View style={{gap: 5}}>
          <SemiBoldText
            style={{fontSize: 28 / fontScale, color: Colors.balanceBlack}}>
            0.0002
          </SemiBoldText>
          <LightText style={{fontSize: 14 / fontScale, color: Colors.grayText}}>
            ≈ $ 50
          </LightText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            backgroundColor: Colors.memojiBackground,
            paddingVertical: 10,
            paddingHorizontal: 10,
            width: '50%',
          }}>
          <View style={{gap: 10}}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: Colors.ash,
                paddingBottom: 8,
              }}>
              <ArrowUpIcon />
              <LightText>24 hrs</LightText>
            </View>
            <MediumText>+0.80%</MediumText>
          </View>
          {/* <LineGraph
            points={[
              {
                date: new Date('2024-03-21T19:19:01+00:00'),
                value: 250000,
              },
              {
                date: new Date('2024-08-21T19:19:05+00:00'),
                value: 18000,
              },
              {
                date: new Date('2024-12-21T19:20:01+00:00'),
                value: 500,
              },
              {
                date: new Date('2024-18-21T19:21:01+00:00'),
                value: 200,
              },
              {
                date: new Date('2024-26-21T19:12:01+00:00'),
                value: 2000000,
              },
            ]}
            animated={true}
            color={Colors.primary}
            style={{width: '50%', height: 10}}
          /> */}
        </View>
      </View>
      <ScrollView>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Clock size={25} color={Colors.primary} />
          <SemiBoldText
            style={{
              fontSize: 20 / fontScale,
              borderLeftColor: Colors.ash,
              borderLeftWidth: 1,
              paddingLeft: 10,
            }}>
            Activity History
          </SemiBoldText>
        </View>

        <View style={{gap: 10, marginVertical: 20}}>
          {activityHistory.map((activity, _i) => {
            return (
              <Pressable
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomColor: Colors.ash,
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                }}
                key={activity.id}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  {activity.title === 'Received' ? (
                    <ImportCurve
                      variant="TwoTone"
                      size={20}
                      color={Colors.grayText}
                    />
                  ) : (
                    <RecoveryConvert
                      variant="TwoTone"
                      size={20}
                      color={Colors.grayText}
                    />
                  )}

                  <View>
                    <MediumText style={{fontSize: 15 / fontScale}}>
                      {activity.title}
                    </MediumText>

                    <LightText
                      style={{
                        color: Colors.grayText,
                        fontSize: 13 / fontScale,
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      {activity.date} | {activity.time}
                    </LightText>
                  </View>
                </View>

                <View>
                  <MediumText
                    style={{fontSize: 15 / fontScale, textAlign: 'right'}}>
                    {activity.amount}
                  </MediumText>
                  <LightText
                    style={{
                      color: Colors.grayText,
                      fontSize: 13 / fontScale,
                      alignItems: 'center',
                      gap: 10,
                      textAlign: 'right',
                    }}>
                    ≈ {activity.dollarAmount}
                  </LightText>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.buttonGroup}>
        <Pressable onPress={handlePresentModalPress} style={styles.grayButton}>
          <ImportCurve variant="TwoTone" size={23} color={Colors.primary} />
          <MediumText style={{fontSize: 15 / fontScale}}>Receive</MediumText>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('ConvertAsset')}
          style={styles.grayButton}>
          <RecoveryConvert variant="TwoTone" size={23} color={Colors.primary} />
          <MediumText style={{fontSize: 15 / fontScale}}>Convert</MediumText>
        </Pressable>
      </View>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableContentPanningGesture={false}
          enablePanDownToClose={false}
          handleIndicatorStyle={{
            borderWidth: 3,
            borderColor: Colors.ash,
            width: '20%',
          }}
          backdropComponent={({animatedIndex, style}) => (
            <CustomBackdrop
              onPress={handlePresentModalClose}
              animatedIndex={animatedIndex}
              style={style}
            />
          )}
          animateOnMount={true}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              gap: 20,
            }}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <WalletMoney variant="TwoTone" size={23} color={Colors.primary} />
              <LightText style={{fontSize: 15 / fontScale, color: Colors.ash}}>|</LightText>
              <MediumText style={{fontSize: 15 / fontScale}}>
                Wallet Address
              </MediumText>
            </View>

            <LightText style={{fontSize: 13 / fontScale}}>
              Send Bitcoin to the wallet address below. Ensure the network
              corresponds with the one below.
            </LightText>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Image
                source={Bitcoin}
                style={{width: 27, height: 27, borderRadius: 27}}
              />
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <LightText
                  style={{fontSize: 14 / fontScale, color: Colors.ash}}>
                  |
                </LightText>
                <MediumText style={{fontSize: 16 / fontScale}}>BTC</MediumText>
                <LightText
                  style={{fontSize: 14 / fontScale, color: Colors.grayText}}>
                  {' '}
                  - Bitcoin
                </LightText>
              </View>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={[styles.qrContainer, {width: width / 1.3}]}>
                <QRCode size={width / 1.5} value={walletAddress} />
              </View>
            </View>

            <View style={styles.borderBox}>
              <MediumText
                style={[styles.borderMainText, {fontSize: 15 / fontScale}]}>
                Addresss
              </MediumText>
              <LightText
                style={[styles.borderSubText, {fontSize: 15 / fontScale}]}>
                {truncateText(walletAddress, 18)}
              </LightText>
              <Pressable style={{marginLeft: 'auto'}}>
                <CopyIcon width={25} height={25} />
              </Pressable>
            </View>
            <View style={styles.borderBox}>
              <MediumText
                style={[styles.borderMainText, {fontSize: 15 / fontScale}]}>
                Network
              </MediumText>
              <LightText
                style={[styles.borderSubText, {fontSize: 15 / fontScale}]}>
                Bitcoin
              </LightText>
            </View>

            <LightText
              style={[
                styles.borderSubText,
                {fontSize: 14 / fontScale, width: '80%'},
              ]}>
              Note: Sending via the wrong network may lead to loss of funds.{' '}
            </LightText>
          </ScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 'auto',
    paddingVertical: 30,
  },
  grayButton: {
    backgroundColor: Colors.memojiBackground,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexGrow: 1,
    flexDirection: 'row',
    gap: 10,
  },
  qrContainer: {
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  borderBox: {
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  borderMainText: {
    borderRightColor: Colors.ash,
    borderRightWidth: 1,
    paddingRight: 10,
  },
  borderSubText: {
    color: Colors.grayText,
  },
});
