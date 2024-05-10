import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import UserAvatar from '../../../../assets/images/DashboardEmojis/Avatar-a.png';
import {Button} from '../../../../components/Button/Button';
import {Colors} from '../../../../components/Colors';
import CustomNumberKeypad from '../../../../components/Keypad/CustomNumberKeypad';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  CircleIcon,
  PayIcon,
} from '../../../../components/SvgAssets';
import CustomView from '../../../../components/Views/CustomView';
import CustomHeader from '../../../../components/headers/CustomHeaders';
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
  SemiBoldText,
} from '../../../../components/styles/styledComponents';
import {RootStackParamList} from '../../../../routes/AppStacks';
import {addCommas} from '../../../../utils';
import ChooseAccountBalance, {
  CustomBackdrop,
} from '../../../../components/ChooseAccountBalance/ChooseAccountBalance';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../app/store';
import {
  AddCircle,
  RecoveryConvert,
  TickCircle,
  Warning2,
} from 'iconsax-react-native';
import AlertModal from '../../../../components/Alert/AlertModal';
import Btc from '../../../../assets/images/bitcoin.png';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import RadioSwitch from '../../../../components/Radio/RadioSwitch';

type SendPaymentT = {
  navigation: NavigationProp<RootStackParamList>;
};

const coins = [
  {
    id: 1,
    currency: 'Btc',
    balance: '1',
    equivalentBalance: '10',
    symbol: Btc,
  },
  {
    id: 2,
    currency: 'Usdt',
    balance: '0.1',
    equivalentBalance: '100',
    symbol: Btc,
  },
  {
    id: 3,
    currency: 'Eth',
    balance: '0.005',
    equivalentBalance: '1000',
    symbol: Btc,
  },
];

export default function SendPayment({navigation}: SendPaymentT) {
  const {fontScale} = useWindowDimensions();
  const [amount, setAmount] = useState<number>(100);
  const [balance, setBalance] = useState(0);
  const [showSwitchBalanceModal, setShowSwithBalanceModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const {accountBalanceType, accountBalance} = useSelector(
    (state: RootState) => state.user,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCoins, setFilteredCoins] = useState(coins);
  const [emptyField, setEmptyField] = useState(false);
  /*-- -- -- -- -- - --- -- */
  const [showKeypad, setShowKeypad] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapTo, setSnapTo] = useState(['38%', '100%']);
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

  const convertSheetModalRef = useRef<BottomSheetModal>(null);
  const [convertSnapTo, setConvertSnapTo] = useState(['38%', '50%']);
  const convertSnapPoints = useMemo(() => convertSnapTo, [convertSnapTo]);
  const handlePresentConvertPress = useCallback(() => {
    convertSheetModalRef.current?.present();
  }, []);
  const handlePresentConvertClose = useCallback(() => {
    convertSheetModalRef.current?.dismiss();
  }, []);
  const handleConvertSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update search query state
    // Filter banks based on search query
    const filtered = coins.filter(coin =>
      coin.currency.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredCoins(filtered); // Update filtered banks state
  };

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

  const makePayment = () => {
    if (balance < Number(inputValue)) {
      setShowError(true);
    } else {
      navigation.navigate('ConfirmPayment');
    }
  };

  const handleBackspace = () => {
    setInputValue(prevValue => prevValue.slice(0, -1));
  };

  /*  -- ------- --- -- -*/

  useEffect(() => {
    setShowKeypad(true);
  }, []);

  const handleShowModal = () => {
    setShowSwithBalanceModal(true);
  };

  return (
    <CustomView>
      <CustomHeader
        text="Send Payment"
        icon={<PayIcon />}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <Pressable
          onPress={() => setShowKeypad(false)}
          style={styles.payContainer}>
          <View
            style={{gap: 10, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.avatarWrapper}>
              <Image style={styles.avatarImg} source={UserAvatar} />
            </View>
            <View style={styles.userTextWrapper}>
              <LightText style={{fontSize: 15 / fontScale}}>
                Send money to
              </LightText>
              <MediumText
                style={{fontSize: 15 / fontScale, color: Colors.iconColor}}>
                Daniel Barima
              </MediumText>
            </View>
          </View>

          <Pressable style={styles.payWithToggle}>
            <LightText
              style={{
                fontSize: 15 / fontScale,
                borderRightColor: Colors.modernBlack,
                borderRightWidth: 1,
                paddingHorizontal: 5,
              }}>
              Pay with
            </LightText>
            <BoldText style={{fontSize: 15 / fontScale}}>
              ₦ {addCommas(balance)}
            </BoldText>
          </Pressable>

          <View style={styles.amountContainer}>
            <Pressable
              onPress={handleKeypadToggle}
              style={styles.amountWarpper}>
              <BoldText style={{fontSize: 30 / fontScale}}>
                {inputValue ? addCommas(inputValue) : '0.00'}
              </BoldText>
            </Pressable>
            <LightText
              style={{
                fontSize: 17 / fontScale,
                textAlign: 'center',
                width: '70%',
              }}>
              Enter the amount you want to send to the user
            </LightText>
          </View>

          <View style={{marginLeft: 'auto'}}>
            <Button
              variant="primary"
              isLarge={false}
              isWide={false}
              onPress={makePayment}>
              <MediumText
                style={{color: Colors.white, fontSize: 15 / fontScale}}>
                Pay
              </MediumText>
              <ArrowRightIcon />
            </Button>
          </View>
        </Pressable>
      </ScrollView>

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
          <View style={{paddingVertical: 20, gap: 20, paddingHorizontal: 20}}>
            <CustomHeader
              text={'Select Bank'}
              icon={
                <AddCircle variant="TwoTone" color={Colors.primary} size={24} />
              }
              onPress={handlePresentModalClose}
            />
            <View style={styles.searchBox}>
              <TextInput
                placeholder="Search assets here"
                style={{
                  fontFamily: 'SpaceGrotesk-SemiBold',
                  color: Colors.black,
                  width: '70%',
                  fontSize: 15 / fontScale,
                }}
                placeholderTextColor={Colors.grayText}
                onChangeText={handleSearch} // Call handleSearch on text change
                value={searchQuery} // Bind searchQuery state to the input value
              />
              <CircleIcon color={Colors.grayText} />
            </View>
            <LightText
              style={{fontSize: 14 / fontScale, color: Colors.grayText}}>
              Select the assets you want to convert from the options below
            </LightText>

            <ScrollView contentContainerStyle={{gap: 10}}>
              {filteredCoins.map((coin, i) => (
                <Pressable
                  onPress={() => {
                    setIsSelected(true);
                  }}
                  key={coin.id}
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    borderBottomColor: Colors.ash,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                      gap: 10,
                    }}>
                    <Image
                      source={coin.symbol}
                      style={{width: 30, height: 30, borderRadius: 30}}
                    />
                    <MediumText
                      style={{
                        fontSize: 15 / fontScale,
                      }}>
                      {coin.currency}
                    </MediumText>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <View>
                      <MediumText
                        style={{
                          fontSize: 15 / fontScale,
                          textAlign: 'right',
                        }}>
                        {coin.balance}
                      </MediumText>
                      <RegularText
                        style={{
                          fontSize: 15 / fontScale,
                          textAlign: 'right',
                          color: Colors.grayText,
                        }}>
                        ≈ ₦{coin.equivalentBalance}
                      </RegularText>
                    </View>
                    <RadioSwitch isActive={isSelected} key={coin.id} />
                  </View>
                </Pressable>
              ))}
            </ScrollView>
            <Button
              variant="primary"
              isLarge={false}
              isWide={true}
              style={{
                marginTop: 'auto',
                marginBottom: 10,
              }}
              onPress={() => {
                handlePresentModalClose();
                handlePresentConvertPress();
              }}>
              <MediumText
                style={{color: Colors.white, fontSize: 15 / fontScale}}>
                Continue
              </MediumText>
              <ArrowRightIcon />
            </Button>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      {/* Confirm conversion */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={convertSheetModalRef}
          index={1}
          snapPoints={convertSnapPoints}
          onChange={handleConvertSheetChanges}
          enableContentPanningGesture={false}
          enablePanDownToClose={false}
          handleIndicatorStyle={{
            borderWidth: 3,
            borderColor: Colors.ash,
            width: '20%',
          }}
          backdropComponent={({animatedIndex, style}) => (
            <CustomBackdrop
              onPress={handlePresentConvertClose}
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
              <LightText>-----------------------</LightText>
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
              <MediumText
                style={{
                  fontSize: 15 / fontScale,
                }}>
                BTC
              </MediumText>
              <View>
                <MediumText
                  style={{
                    fontSize: 15 / fontScale,
                    textAlign: 'right',
                  }}>
                  {inputValue}
                </MediumText>
                <RegularText
                  style={{
                    fontSize: 15 / fontScale,
                    textAlign: 'right',
                    color: Colors.grayText,
                  }}>
                  ≈ {500}$Pay
                </RegularText>
              </View>
            </View>

            <View style={styles.buttonGroup}>
              <Pressable
                onPress={handlePresentConvertClose}
                style={styles.grayButton}>
                <MediumText style={{fontSize: 15 / fontScale}}>
                  Cancel
                </MediumText>
              </Pressable>
              <Pressable
                onPress={() => {
                  setBalance(10000);
                  setShowSuccess(true);
                  handlePresentConvertClose();
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
      {showSwitchBalanceModal && (
        <ChooseAccountBalance onHide={() => setShowSwithBalanceModal(false)} />
      )}

      <AlertModal
        show={showError}
        icon={<Warning2 color={Colors.primary} variant="TwoTone" size={48} />}
        mainText="Low Balance"
        subText="Convert assets to $Pay to continue payment"
        buttonText="Convert Assets"
        onClose={() => {
          setShowError(false);
          handlePresentModalPress();
        }}
      />

      <AlertModal
        show={showSuccess}
        icon={<TickCircle color={Colors.primary} variant="TwoTone" size={48} />}
        mainText="Conversion Successful"
        subText="You can now proceed to make payments"
        buttonText="Continue"
        onClose={() => setShowSuccess(false)}
      />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  payContainer: {
    marginVertical: 50,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  userTextWrapper: {
    flexDirection: 'row',
    gap: 3,
  },
  payWithToggle: {
    flexDirection: 'row',
    paddingVertical: 10,

    borderColor: Colors.modernBlack,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  amountWarpper: {
    paddingVertical: 10,
    width: '85%',
    borderBottomColor: Colors.modernBlack,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  amountContainer: {
    marginVertical: 20,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  searchBox: {
    paddingVertical: Platform.OS === 'android' ? 2 : 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  grayBg: {
    backgroundColor: Colors.memojiBackground,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    gap: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  acctContainer: {
    borderBottomColor: Colors.ash,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  acctDetContainer: {
    gap: 10,
    flex: 1,
  },
  banksWrapper: {
    gap: 10,
  },
  bankSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.ash,
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
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
