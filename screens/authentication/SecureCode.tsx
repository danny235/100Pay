import {Formik} from 'formik';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import * as yup from 'yup';
import {Button} from '../../components/Button/Button';
import {Colors} from '../../components/Colors';
import {
  ArrowRightIcon,
  BackSpaceIcon,
  MailIcon,
} from '../../components/SvgAssets';
import CustomView from '../../components/Views/CustomView';
import {
  BoldText,
  LightText,
  MediumText,
} from '../../components/styles/styledComponents';
import {NavigationProp} from '@react-navigation/native';
import Input from '../../components/Input';
import Header from '../../components/headers/AuthHeader';
import AuthTitleText from '../../components/headers/AuthTitleText';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';

interface RootAuthI {
  navigation: NavigationProp<any>;
}

export default function SecureCode({navigation}: RootAuthI): React.JSX.Element {
  const {fontScale} = useWindowDimensions();
  const [phoneNumber, setPhoneNumber] = useState('');
  //const [phoneNumberError, setPhoneNumberError] = useState('');
  const handleKeyPress = (key: number) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber(prevPhoneNumber => prevPhoneNumber + key);
      //setPhoneNumberError('Phone number must be 10 digits');
    } else if (phoneNumber.length === 10) {
      //setPhoneNumberError('');
    } else {
      // setPhoneNumberError('Phone number must be 10 digits');
    }
  };

  const handleDelete = () => {
    setPhoneNumber(prevPhoneNumber => {
      if (prevPhoneNumber.length > 0) {
        return prevPhoneNumber.slice(0, -1);
      } else if (phoneNumber.length < 10) {
        //setPhoneNumberError('Phone number must be 10 digits');
      }
      return prevPhoneNumber;
    });
    // setPhoneNumberError('');
  };
  const handleClearPin = (): void => {
    setPhoneNumber('');
  };

  return (
    <CustomView>
      <Header />

      <AuthTitleText
        text="Reset your 100Pay account password"
        title="Forgot Your Password?"
        icon={<MailIcon />}
        marginTop={24}
      />

      <View style={{marginTop: 32}}>
        <MediumText style={{color: Colors.grayText, marginBottom: 4}}>
          Secure Code
        </MediumText>
        <View style={{flexDirection: 'row', marginBottom: 48}}>
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.ash,
                borderRadius: 8,
                marginRight: index !== 5 ? 8 : 0,
                height: 60,
              }}>
              <BoldText style={{color: Colors.grayText, fontSize: 16}}>
                {phoneNumber.length > index ? (
                  phoneNumber[index]
                ) : (
                  <MediumText
                    style={{opacity: 0.4, fontFamily: 'SpaceGrotesk-Medium'}}>
                    0
                  </MediumText>
                )}
              </BoldText>
            </View>
          ))}
        </View>
        <LightText
          style={{color: Colors?.grayText, marginTop: -24, marginBottom: 24}}>
          Enter the confirmation code sent to your email here.
        </LightText>
        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            isLarge={false}
            isWide={false}
            onPress={() => {
              navigation.navigate('SetPassword');
            }}>
            <MediumText style={styles.buttonText}>Continue</MediumText>
            <ArrowRightIcon />
          </Button>
        </View>
        <View>
          <View style={styles.grid}>
            {[
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              <MediumText
                style={{
                  // backgroundColor: Colors?.searchInput,
                  padding: 12,
                  textAlign: 'center',
                }}
                key="clear"
                onPress={() => handleClearPin()}>
                Clear all
              </MediumText>,
              0,
              <TouchableOpacity
                style={{
                  //backgroundColor: Colors?.searchInput,
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key="backspace"
                onPress={handleDelete}>
                <BackSpaceIcon />
              </TouchableOpacity>,
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (typeof item === 'number') {
                    handleKeyPress(item);
                  }
                }}
                style={styles.gridItem}>
                {typeof item === 'number' ? (
                  <Text style={styles.gridItemText}>{item}</Text>
                ) : (
                  item
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </CustomView>
  );
}
const styles = StyleSheet.create({
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
    marginTop: 2,
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
  buttonContainer: {
    marginLeft: 'auto',
  },
  buttonText: {
    color: Colors.white,
  },
});
