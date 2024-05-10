import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import * as yup from 'yup';
import {Button} from '../../components/Button/Button';
import {Colors} from '../../components/Colors';
import CustomNumberKeypad from '../../components/Keypad/CustomNumberKeypad';
import {
  ArrowForwardIcon,
  ArrowRightIcon,
  CircleIcon,
  NigeriaFlag,
  PhoneIcon,
} from '../../components/SvgAssets';
import CustomView from '../../components/Views/CustomView';
import Header from '../../components/headers/AuthHeader';
import AuthTitleText from '../../components/headers/AuthTitleText';
import {
  BoldText,
  LightText,
  MediumText,
} from '../../components/styles/styledComponents';
import {CountryPicker} from 'react-native-country-codes-picker';

const loginSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
});

interface Country {
  name: string;
  code: string;
  displayCode: string;
}

interface RootAuthI {
  navigation: NavigationProp<any>;
}

interface CountryInfo {
  code: string;
  dial_code: string;
  flag: string;
  name: {
    ar: string;
    bg: string;
    by: string;
    cn: string;
    cz: string;
    da: string;
    de: string;
    ee: string;
    el: string;
    en: string;
    es: string;
    fr: string;
    he: string;
    it: string;
    jp: string;
    nl: string;
    pl: string;
    pt: string;
    ro: string;
    ru: string;
    tr: string;
    ua: string;
    zh: string;
  };
}

export default function PhoneNumber({
  navigation,
}: RootAuthI): React.JSX.Element {
  const {fontScale, width} = useWindowDimensions();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [flag, setFlag] = useState('');
  /*-- -- -- -- -- - --- -- */
  const [showKeypad, setShowKeypad] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  const handleKeypadToggle = () => {
    setShowKeypad(prevValue => !prevValue);
  };

  const handleKeypadKeyPress = (value: string) => {
    if (inputValue.length < 11) {
      setInputValue(prevValue => prevValue + value);
      setPhoneNumberError('');
    } else if (inputValue.length === 10) {
      setPhoneNumberError('Phone number must be 10 digits');
    } else {
      setPhoneNumberError('Phone number must be 10 digits');
    }
  };

  const handleBackspace = () => {
    setInputValue(prevValue => prevValue.slice(0, -1));
  };

  /*  -- ------- --- -- -*/

  const togglePopup = () => {
    // setShowPopup(!showPopup);
    setShow(!show);
  };

  const onCountrySelection = (item: any) => {
    // Define your logic when a country is selected
    setSelectedCountry(item.dial_code);
    setSelectedCountryName(item.name.en);
    setFlag(item.flag);

    togglePopup();
  };

  const handleKeyPress = (key: number) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber(prevPhoneNumber => prevPhoneNumber + key);
      setPhoneNumberError('Phone number must be 10 digits');
    } else if (phoneNumber.length === 10) {
      setPhoneNumberError('');
    } else {
      setPhoneNumberError('Phone number must be 10 digits');
    }
  };

  const handleDelete = () => {
    setPhoneNumber(prevPhoneNumber => {
      if (prevPhoneNumber.length > 0) {
        return prevPhoneNumber.slice(0, -1);
      } else if (phoneNumber.length < 11) {
        setPhoneNumberError('Phone number must be 11 digits');
      }
      return prevPhoneNumber;
    });
    setPhoneNumberError('');
  };
  const handleClearPin = (): void => {
    setPhoneNumber('');
  };

  return (
    <CustomView>
      <Header />

      <View>
        <Pressable onPress={() => setShowKeypad(false)}>
          <AuthTitleText
            text="Confirm your country code and input your phone number to continue."
            title="Your Phone Number"
            icon={<PhoneIcon />}
            marginTop={24}
          />
          <Pressable
            style={styles.countryButton}
            onPress={() => {
              console.log('win');
              togglePopup();
            }}>
            <MediumText
              style={[styles.countryButtonText, {fontSize: 15 / fontScale}]}>
              {selectedCountry ? (
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <MediumText>{flag}</MediumText>
                  <MediumText>{selectedCountryName}</MediumText>
                  <MediumText>{selectedCountry}</MediumText>
                </View>
              ) : (
                'Country'
              )}
            </MediumText>
            <ArrowForwardIcon color={Colors?.grayText} />
          </Pressable>

          
          <BoldText
            style={{
              color: Colors?.grayText,
              fontSize: 16 / fontScale,
              marginBottom: 4,
              marginTop: 32,
            }}>
            Phone Number
          </BoldText>
          <View>
            <View
              style={[styles.inputText, {flexDirection: 'row', padding: 16}]}>
              <View style={styles.displayCode}>
                <MediumText>{selectedCountry}</MediumText>
              </View>
              <Pressable onPress={handleKeypadToggle}>
                <BoldText style={{color: Colors.grayText, fontSize: 16}}>
                  {inputValue ? inputValue : 'Enter your Phone Number'}
                </BoldText>
              </Pressable>
            </View>
          </View>

          <LightText>
            {phoneNumberError ? (
              <LightText style={{color: 'red'}}>{phoneNumberError}</LightText>
            ) : null}
          </LightText>
          <View style={styles.buttonContainer}>
            <Button
              variant="primary"
              isLarge={false}
              isWide={false}
              onPress={() => {
                navigation.navigate('Referral');
              }}>
              <MediumText style={styles.buttonText}>Continue</MediumText>
              <ArrowRightIcon />
            </Button>
          </View>
        </Pressable>

        <CountryPicker
          show={show}
          lang={'en'}
          ListHeaderComponent={() => {
            return (
              <MediumText
                style={[styles.countryButtonText, {fontSize: 15 / fontScale}]}>
                Search
              </MediumText>
            );
          }}
          onBackdropPress={togglePopup}
          style={{
            modal: {
              height: 500,
            },
            countryButtonStyles: {
              backgroundColor: Colors.white,
            },
            // Dial code styles [Text]
            dialCode: {
              fontFamily:
                Platform.OS === 'ios'
                  ? 'SpaceGrotesk-Regular'
                  : 'SpaceGroteskRegular',
              color: Colors.balanceBlack,
              fontSize: 14 / fontScale,
              borderRightColor: Colors.ash,
              borderRightWidth: 1,
              paddingRight: 2,
            },
            // Country name styles [Text]
            countryName: {
              fontFamily:
                Platform.OS === 'ios'
                  ? 'SpaceGrotesk-Regular'
                  : 'SpaceGroteskRegular',
              color: Colors.balanceBlack,
            },
          }}
          // when picker button press you will get the country object with dial code
          pickerButtonOnPress={onCountrySelection}
        />
        <CustomNumberKeypad
          isVisible={showKeypad}
          onClose={handleKeypadToggle}
          onKeyPress={handleKeypadKeyPress}
          onBackspace={handleBackspace}
        />
      </View>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 10,
    padding: 10,
    borderRadius: 5,
  },
  countryCodeContainer: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.modernBlack,
    borderStyle: 'solid',
    paddingLeft: 10,
    alignSelf: 'flex-start',
    marginLeft: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 24,
    marginHorizontal: -24,
    borderRadius: 24,
  },
  gridItem: {
    width: '28%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 8,
    borderRadius: 12,
  },
  gridItemText: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Medium',
    //backgroundColor: Colors?.searchInput,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 24,
  },
  clearButton: {
    marginVertical: 20,
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'MontserratRegular',
  },

  key: {
    // backgroundColor: Colors?.searchInput,
    height: '80%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'stretch',
    borderRadius: 24,
    fontFamily: 'SpaceGrotesk-Medium',
  },

  countryButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 13,
    borderColor: Colors?.ash,
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 24,
  },
  countryButtonText: {
    color: Colors?.grayText,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(55, 65, 81, 0.30);',
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  popup: {
    zIndex: 44,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    flex: 0.5,
    gap: 24,
  },
  formContainer: {
    gap: 12,
    marginTop: 24,
  },
  buttonContainer: {
    marginLeft: 'auto',
  },
  buttonText: {
    color: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 0,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
    backgroundColor: Colors?.searchInput,
  },

  inputText: {
    fontSize: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: Colors?.ash,
    width: '100%',
    fontFamily: 'SpaceGrotesk-Medium',
    alignItems: 'center',
    borderRadius: 8,
    height: 54,
    marginBottom: 4,
  },
  input: {
    fontSize: 18,
    padding: 8,
    width: '100%',
    fontFamily: 'SpaceGrotesk-Medium',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
  },
  flag: {
    width: 48,
    height: 28,
    marginRight: 10,
    borderRadius: 23,
  },
  textContainer: {
    flexDirection: 'column',
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  countryCode: {
    fontSize: 14,
    color: '#666',
  },
  displayCode: {
    color: Colors?.grayText,
    borderRightWidth: 1.2,
    borderRightColor: Colors?.grayText,
    alignItems: 'stretch',
    width: 'auto',
    paddingRight: 12,
    marginRight: 12,
  },
});
