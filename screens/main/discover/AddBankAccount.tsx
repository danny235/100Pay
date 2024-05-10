import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Platform,
  Pressable,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../routes/AppStacks';
import CustomView from '../../../components/Views/CustomView';
import CustomHeader from '../../../components/headers/CustomHeaders';
import {AddCircle, ArrowDown, ArrowDown2, ArrowDown3, Bank, Coin, TickCircle} from 'iconsax-react-native';
import {Colors} from '../../../components/Colors';
import {
  LightText,
  MediumText,
  RegularText,
} from '../../../components/styles/styledComponents';
import {ScrollView, Switch, TextInput} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import {ArrowRightIcon, CircleIcon, DotIcon} from '../../../components/SvgAssets';
import {Button} from '../../../components/Button/Button';
import Input from '../../../components/Input';
import {Formik} from 'formik';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { CustomBackdrop } from '../../../components/ChooseAccountBalance/ChooseAccountBalance';
import {banks} from "../../../components/banks.json"
import AlertModal from '../../../components/Alert/AlertModal';

type BankT = {
  name?: string;
  slug?: string;
  code?: string;
  longCode?: string;
  gateway?: string | null;
  active?: boolean;
  country?: string;
  currency?: string;
  type?: string;
};

const bankSchema = yup.object().shape({
  accountName: yup.string().required().label('Account Name'),
  accounNumber: yup.string().required().label('Account Number'),
});

const walletAddressSchema = yup.object().shape({
  walletAddress: yup.string().required().label('Wallet Address'),
});

type AddBankAccountT = {
  navigation: NavigationProp<RootStackParamList>;
};
export default function AddBankAccount({navigation}: AddBankAccountT) {
  const [useCrypto, setUseCrypto] = useState(false);
  const {fontScale} = useWindowDimensions();
  const toggleSwitch = () => setUseCrypto(previousState => !previousState);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State to store search query
  const [activeBank, setActiveBank] = useState<BankT | null>(null); // State to store active bank
  const [filteredBanks, setFilteredBanks] = useState<BankT[]>(banks); // State to store filtered banks, initially set to all banks
  const [showModal, setShowModal] = useState(false)

 
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
   const handleSearch = (query: string) => {
     setSearchQuery(query); // Update search query state
     // Filter banks based on search query
     const filtered = banks.filter(bank =>
       bank.name.toLowerCase().includes(query.toLowerCase()),
     );
     setFilteredBanks(filtered); // Update filtered banks state
   };
  //   formikProps.setFieldValue('amount', formattedAmount);
  //   formikProps.handleChange('amount');
  return (
    <CustomView>
      <CustomHeader
        text={useCrypto ? 'Add Wallet Adderess' : 'Add Bank Account'}
        icon={
          useCrypto ? (
            <Coin variant="TwoTone" color={Colors.primary} size={24} />
          ) : (
            <Bank variant="TwoTone" color={Colors.primary} size={24} />
          )
        }
        onPress={() => navigation.goBack()}
      />

      <View style={styles.grayBg}>
        <MediumText
          style={{
            fontSize: 17 / fontScale,
            borderLeftColor: Colors.ash,
            borderLeftWidth: 1,
            paddingLeft: 10,
          }}>
          {useCrypto ? 'Use Bank Instead' : 'Use Crypto Instead'}
        </MediumText>
        <View style={{marginLeft: 'auto'}}>
          <Switch
            value={useCrypto}
            onValueChange={toggleSwitch}
            trackColor={{true: Colors.primaryLight, false: Colors.ash}}
            thumbColor={Colors.white}
          />
        </View>
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}>
        <Formik
          initialValues={
            useCrypto
              ? {
                  walletAddress: '',
                }
              : {
                  accountName: '',
                  accountNumber: '',
                }
          }
          onSubmit={async (values, actions) => {
            console.log(values, "line 138");
             setShowModal(true);
          }}
          validationSchema={useCrypto ? walletAddressSchema : bankSchema}>
          {formikProps => (
            <>
              {useCrypto ? (
                <>
                  <Input
                    placeholder="Paste USDT Wallet Address"
                    formikProps={formikProps}
                    formikKey="name"
                    value={formikProps.values.walletAddress}
                    label="USDT Wallet Address"
                    placeholderTextColor={Colors?.ash}
                  />
                  <LightText
                    style={{
                      fontSize: 14 / fontScale,
                      color: Colors.grayText,
                      marginBottom: 10,
                    }}>
                    Ensure that the network is “BEP20” if not you may loose your
                    funds/asset.
                  </LightText>
                </>
              ) : (
                <View>
                  <Input
                    formikProps={formikProps}
                    placeholder="e.g Daniel"
                    formikKey="accountName"
                    value={formikProps.values.accountName}
                    label="Account Name"
                    placeholderTextColor={Colors?.ash}
                  />

                  <Input
                    formikProps={formikProps}
                    placeholder="000000000"
                    formikKey="accountNumber"
                    value={formikProps.values.accountNumber}
                    label="Account Number"
                    placeholderTextColor={Colors?.ash}
                    keyboardType="number-pad"
                    maxLength={10}
                  />

                  <View style={styles.banksWrapper}>
                    <RegularText style={{fontSize: 15 / fontScale}}>
                      Bank
                    </RegularText>
                    <Pressable
                      onPress={handlePresentModalPress}
                      style={styles.bankSelect}>
                      <RegularText style={{fontSize: 15 / fontScale}}>
                        {activeBank?.name
                          ? activeBank?.name
                          : 'Select your bank'}
                      </RegularText>
                      <ArrowDown2
                        variant="Bold"
                        color={Colors.grayText}
                        size={24}
                      />
                    </Pressable>
                  </View>

                  <LightText
                    style={{
                      fontSize: 14 / fontScale,
                      color: Colors.grayText,
                      marginVertical: 20,
                    }}>
                    Details added in this page will be used for payout, please
                    confirm the details are correct before submitting
                  </LightText>
                </View>
              )}

              <Button
                variant="primary"
                isLarge={false}
                isWide={true}
                style={{
                  marginTop: 'auto',
                  marginBottom: 10,
                }}
                onPress={() => {
                    formikProps.handleSubmit();
                   
                }}>
                <MediumText
                  style={{color: Colors.white, fontSize: 15 / fontScale}}>
                  Continue
                </MediumText>
                <ArrowRightIcon />
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>

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
                useCrypto ? (
                  <AddCircle
                    variant="TwoTone"
                    color={Colors.primary}
                    size={24}
                  />
                ) : (
                  <Bank variant="TwoTone" color={Colors.primary} size={24} />
                )
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

            <ScrollView contentContainerStyle={{gap: 10}}>
              {filteredBanks.map((bank, i) => (
                <Pressable
                  onPress={() => {
                    setActiveBank(bank);
                    handlePresentModalClose();
                  }}
                  key={bank.code}
                  style={{flexDirection: 'row', gap: 10}}>
                  <DotIcon />
                  <MediumText
                    style={{
                      fontSize: 14 / fontScale,
                      borderBottomColor: Colors.ash,
                      borderBottomWidth: 1,
                      paddingBottom: 10,
                      width: '90%',
                    }}>
                    {bank.name}
                  </MediumText>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <AlertModal
        show={showModal}
        icon={<TickCircle color={Colors.primary} variant="TwoTone" size={48} />}
        mainText="All Set!"
        subText="Now you can withdraw Naira into this bank account"
        buttonText="Confirm"
        onClose={() => setShowModal(false)}
      />
    </CustomView>
  );
}

const styles = StyleSheet.create({
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
    gap: 10
  },
  bankSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.ash,
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  }
});
