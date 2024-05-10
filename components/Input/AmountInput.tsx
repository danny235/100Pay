import React, {ReactNode, useRef} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  View,
  useWindowDimensions,
} from 'react-native';
import styled from 'styled-components/native';
import {Colors} from '../Colors';
import {MediumText, RegularText} from '../styles/styledComponents';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface AmountInputProps extends TextInputProps {
  label: string;
  formikProps: any;
  formikKey: string;
  onChangeText?: (text: string) => void;
}

const StyledInput = styled.TextInput<{error?: boolean}>`
  border-radius: 7px;
  width: 100%;
  padding: 13px;
  font-family: SpaceGrotesk-Medium;
  font-size: 15px;
  border: 1px solid ${({error}) => (error ? 'red' : Colors.ash)};
  background-color: ${Colors.white};
`;

const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const AmountInput: React.FC<AmountInputProps> = ({
  label,
  formikProps,
  formikKey,
  ...rest
}) => {
  const inputStyles: any = {};
  const {fontScale} = useWindowDimensions();

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  const handleAmountChange = (text: string) => {
    // Remove commas and other non-numeric characters
    const cleanedText = text.replace(/[^0-9.]/g, '');

    // Format the number with commas
    const formattedAmount = formatNumberWithCommas(Number(cleanedText));

    // Update the Formik field value
    formikProps.setFieldValue(formikKey, formattedAmount);
    formikProps.handleChange(formikKey);
  };

  return (
    <FieldWrapper label={label} formikProps={formikProps} formikKey={formikKey}>
      <StyledInput
        value={formikProps.values[formikKey]}
        onChangeText={handleAmountChange}
        onBlur={formikProps.handleBlur(formikKey)}
        error={formikProps.touched[formikKey] && formikProps.errors[formikKey]}
        style={inputStyles}
        {...rest}
        // selectionColor={Colors.secondary}
      />
    </FieldWrapper>
  );
};

interface FieldWrapperProps {
  children: ReactNode;
  label: string;
  formikProps: any;
  formikKey: string;
}

function FieldWrapper({
  children,
  label,
  formikProps,
  formikKey,
}: FieldWrapperProps): React.JSX.Element {
  const {fontScale} = useWindowDimensions();

  return (
    <View style={{gap: 10}}>
      <MediumText
        style={{fontSize: 15 / fontScale, color: Colors?.balanceBlack}}>
        {label}
      </MediumText>
      {children}
      <RegularText style={styles.error}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </RegularText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    marginBottom: 20,
    height: 17.5,
    color: 'red',
    fontFamily: 'DMSans-Regular',
  },
  input: {
    padding: 10,
    marginBottom: 3,
  },
  inputContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default AmountInput;
