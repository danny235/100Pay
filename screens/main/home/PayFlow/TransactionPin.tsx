import {NavigationProp} from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  useWindowDimensions,
} from 'react-native';
import UserAvatar from '../../../../assets/images/DashboardEmojis/Avatar-a.png';
import {Colors} from '../../../../components/Colors';
import {
  ArrowRightIcon,
  CopyIcon,
  PasswordCheckIcon,
  PayIcon,
  SecuritySafeIcon,
} from '../../../../components/SvgAssets';
import CustomView from '../../../../components/Views/CustomView';
import CustomHeader from '../../../../components/headers/CustomHeaders';
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
} from '../../../../components/styles/styledComponents';
import {RootStackParamList} from '../../../../routes/AppStacks';
import {addCommas, truncateText} from '../../../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from '../../../../components/Button/Button';

type TransactionPinT = {
  navigation: NavigationProp<RootStackParamList>;
};

const CODE_LENGTH = 6;

export default function TransactionPin({navigation}: TransactionPinT) {
    const {fontScale, height} = useWindowDimensions();
      const ref = useRef<TextInput>(null);
      const [containerIsFocused, setContainerIsFocused] = useState(false);
      const [code, setCode] = useState('');
      const codeDigitsArray = new Array(CODE_LENGTH).fill(0);
      const handleOnPress = () => {
        setContainerIsFocused(true);
      };

      const handleOnBlur = () => {
        setContainerIsFocused(false);
      };

      const toDigitInput = (_value: string, idx: number) => {
        const emptyInputChar = '';
        const digit = code[idx] || emptyInputChar;

        const isCurrentDigit = idx === code.length;
        const isLastDigit = idx === CODE_LENGTH - 1;
        const isCodeFull = code.length === 6;

        const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

        const containerStyle =
          containerIsFocused && isFocused
            ? {...styles.inputContainer, ...styles.inputContainerFocused}
            : styles.inputContainer;

        return (
          <View style={containerStyle} key={idx}>
            <BoldText style={{opacity: 1, fontSize: 27 / fontScale}}>
              {digit}
            </BoldText>
          </View>
        );
      };
  return (
    <CustomView>
      <CustomHeader
        text="Transaction Pin"
        icon={<PasswordCheckIcon />}
        onPress={() => navigation.goBack()}
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 30,
        }}>
        <SecuritySafeIcon />
      </View>

      <RegularText style={{fontSize: 14 / fontScale, width: '90%'}}>
        Enter your transaction pin here to complete the payment process.
      </RegularText>

      <View style={{marginVertical: 30,}}>
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 20,
          }}
          onPress={handleOnPress}>
          {codeDigitsArray.map(toDigitInput)}
        </Pressable>
        <TextInput
          ref={ref}
          value={code}
          onChangeText={setCode}
          onSubmitEditing={handleOnBlur}
          keyboardType="number-pad"
          returnKeyType="done"
          textContentType="oneTimeCode"
          maxLength={CODE_LENGTH}
          style={{
            opacity: 0,
            position: 'absolute',
          }}
        />
      </View>
      <View style={{marginLeft: 'auto'}}>
        <Button
          variant="primary"
          isLarge={false}
          isWide={false}
          onPress={() => navigation.navigate('PaymentComplete')}>
          <MediumText style={{color: Colors.white, fontSize: 15 / fontScale}}>
            Continue
          </MediumText>
          <ArrowRightIcon />
        </Button>
      </View>
    </CustomView>
  );
}


const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '12%',
    aspectRatio: 2 / 2.5,
    borderColor: Colors.modernBlack,
    borderWidth: 1,
  },
  inputContainerFocused: {
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: '12%',
    aspectRatio: 2 / 2.5,
  },
});