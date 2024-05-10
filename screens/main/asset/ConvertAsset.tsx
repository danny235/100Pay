import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import CustomView from '../../../components/Views/CustomView';
import CustomHeader from '../../../components/headers/CustomHeaders';
import {RecoveryConvert, TickCircle, WalletMoney} from 'iconsax-react-native';
import {Colors} from '../../../components/Colors';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../routes/AppStacks';
import Bitcoin from '../../../assets/images/bitcoin.png';
import PayToken from '../../../assets/images/paytoken.png';
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
  SemiBoldText,
} from '../../../components/styles/styledComponents';
import {Button} from '../../../components/Button/Button';
import {ArrowRightIcon} from '../../../components/SvgAssets';
import CustomNumberKeypad from '../../../components/Keypad/CustomNumberKeypad';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBackdrop} from '../../../components/ChooseAccountBalance/ChooseAccountBalance';
import AlertModal from '../../../components/Alert/AlertModal';

type ConvertAssetT = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function ConvertAsset({navigation}: ConvertAssetT) {
  const [convertFrom, setConvertFrom] = useState('');
  const [convertTo, setConvertTo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const {fontScale} = useWindowDimensions();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [snapTo, setSnapTo] = useState(['30%', '40%']);
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

  /*-- -- -- -- -- - --- -- */
  const [showKeypad, setShowKeypad] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const handleKeypadToggle = () => {
    setShowKeypad(prevValue => !prevValue);
  };

  const handleKeypadKeyPress = (value: string) => {
    if (inputValue.length < 10) {
      setInputValue(prevValue => prevValue + value);
      setPhoneNumberError('Phone number must be 10 digits');
    } else if (inputValue.length === 10) {
      setPhoneNumberError('');
    } else {
      setPhoneNumberError('Phone number must be 10 digits');
    }
  };

  const handleBackspace = () => {
    setInputValue(prevValue => prevValue.slice(0, -1));
  };

  /*  -- ------- --- -- -*/

  useEffect(() => {
    setShowKeypad(true);
  }, []);

  return (
    <CustomView>
      <CustomHeader
        icon={
          <RecoveryConvert variant="TwoTone" size={23} color={Colors.primary} />
        }
        text="Convert Asset"
        onPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={{gap: 30, marginTop: 20}}>
        <View
          style={{
            gap: 10,
            position: 'relative',
            marginTop: 20,
            marginBottom: 40,
          }}>
          <Pressable
            onPress={() => setShowKeypad(true)}
            style={styles.inputGrayBox}>
            <View style={styles.coinImgWrapper}>
              <Image source={Bitcoin} style={styles.coinImg} />
              <MediumText style={[styles.coinText, {fontSize: 15 / fontScale}]}>
                BTC
              </MediumText>
            </View>

            <View style={styles.amountWrapper}>
              <View style={styles.coinImgWrapper}>
                <RegularText
                  style={{
                    fontSize: 12 / fontScale,
                    color: Colors.grayText,
                    textAlign: 'right',
                  }}>
                  Balance
                </RegularText>
                <MediumText
                  style={[
                    styles.coinText,
                    {fontSize: 12 / fontScale, textAlign: 'right'},
                  ]}>
                  0.000932 BTC
                </MediumText>
              </View>

              <BoldText
                style={[
                  styles.amountText,
                  {
                    fontSize: 23 / fontScale,
                    color: convertFrom ? Colors.balanceBlack : Colors.grayText,
                  },
                ]}>
                {inputValue ? inputValue : '0.0000'}
              </BoldText>
            </View>
          </Pressable>

          <View style={styles.iconWrapper}>
            <View
              style={{
                backgroundColor: Colors.memojiBackground,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <RecoveryConvert
                variant="TwoTone"
                size={23}
                color={Colors.grayText}
              />
            </View>
          </View>

          <Pressable
            onPress={() => setShowKeypad(true)}
            style={styles.inputGrayBox}>
            <View style={styles.coinImgWrapper}>
              <Image source={PayToken} style={styles.coinImg} />
              <MediumText style={[styles.coinText, {fontSize: 15 / fontScale}]}>
                $Pay
              </MediumText>
            </View>

            <View style={styles.amountWrapper}>
              <BoldText
                style={[
                  styles.amountText,
                  {
                    fontSize: 23 / fontScale,
                    color: convertTo ? Colors.balanceBlack : Colors.grayText,
                  },
                ]}>
                {inputValue ? Number(inputValue) / 10000 : '0.0000'}
              </BoldText>
            </View>
          </Pressable>
        </View>
        <Button
          onPress={handlePresentModalPress}
          variant="primary"
          isLarge={false}
          isWide={true}>
          <MediumText style={{color: Colors.white, fontSize: 15 / fontScale}}>
            Continue
          </MediumText>
          <ArrowRightIcon />
        </Button>
      </ScrollView>

      {/* Confirm conversion */}
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
              <RecoveryConvert
                variant="TwoTone"
                size={23}
                color={Colors.primary}
              />
              <BoldText style={{fontSize: 15 / fontScale, color: Colors.ash}}>
                |
              </BoldText>
              <MediumText style={{fontSize: 15 / fontScale}}>
                Confirm Conversion
              </MediumText>
            </View>
            <LightText style={{fontSize: 15 / fontScale}}>
              Confirm your asset conversion to continue.
            </LightText>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <RegularText>Total Conversion:</RegularText>
              <LightText>-------------------------</LightText>
              <SemiBoldText>
                {inputValue ? Math.floor(Number(inputValue) / 10000) : '0.0000'}{' '}
                $Pay
              </SemiBoldText>
            </View>

            <View
              style={{
                backgroundColor: Colors.memojiBackground,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                borderRadius: 10,
              }}>
              <MediumText>BTC</MediumText>
              <MediumText>{inputValue}</MediumText>
            </View>

            <View style={styles.buttonGroup}>
              <Pressable
                onPress={handlePresentModalClose}
                style={styles.grayButton}>
                <MediumText style={{fontSize: 15 / fontScale}}>
                  Cancel
                </MediumText>
              </Pressable>
              <Pressable
                onPress={()=>{setShowModal(true)
                handlePresentModalClose()
                }}
                style={[styles.grayButton, {backgroundColor: Colors.primary}]}>
                <MediumText
                  style={{fontSize: 15 / fontScale, color: Colors.white}}>
                  Confirm
                </MediumText>
              </Pressable>
            </View>
          </ScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      <CustomNumberKeypad
        isVisible={showKeypad}
        onClose={handleKeypadToggle}
        onKeyPress={handleKeypadKeyPress}
        onBackspace={handleBackspace}
      />
      <AlertModal
        show={showModal}
        icon={<TickCircle color={Colors.primary} variant="TwoTone" size={48} />}
        mainText="Conversion Successful"
        subText="You have successfully converted your asset to $Pay Token"
        buttonText="Close"
        onClose={()=>setShowModal(false)}
      />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  inputGrayBox: {
    backgroundColor: Colors.memojiBackground,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    height: 100,
  },
  iconWrapper: {
    borderWidth: 10,
    borderColor: Colors.white,
    borderRadius: 50,
    width: 50,
    height: 50,
    padding: 20,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: '35%',
    zIndex: 2,
    left: '40%',
  },
  coinImgWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  coinImg: {width: 27, height: 27, borderRadius: 27},
  coinText: {
    borderLeftColor: Colors.ash,
    borderLeftWidth: 1,
    paddingLeft: 10,
  },
  amountWrapper: {
    gap: 10,
  },
  amountText: {textAlign: 'right'},
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
  buttonGroup: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 'auto',
    paddingVertical: 30,
  },
});
