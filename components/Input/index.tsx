import React, {ReactNode, useRef} from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  View,
  useWindowDimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import {Colors} from '../Colors';
import {MediumText, RegularText} from '../styles/styledComponents';

interface InputProps extends TextInputProps {
  label: string;
  formikProps: any;
  formikKey: string;
  onChangeText?: (text: string) => void;
}

const StyledInput = styled.TextInput<{error?: boolean}>`
  border-radius: 7px;
  width: 100%;
  padding: 13px;
  font-family: ${ Platform.OS === "ios" ? "SpaceGrotesk-Medium" : "SpaceGroteskMedium"};
  font-size: 15px;
  border: 1px solid ${({error}) => (error ? 'red' : Colors.ash)};
  background-color: ${Colors.white};
  color: ${Colors.balanceBlack};
`;

function Input({
  label,
  formikProps,
  formikKey,
  onChangeText,
  ...rest
}: InputProps): React.JSX.Element {
  const {fontScale} = useWindowDimensions();

  const scrollRef = useRef<KeyboardAwareScrollView>(null);

  const scrollToInput = (reactNode: any) => {
    if (scrollRef.current) {
      scrollRef.current.scrollToFocusedInput(reactNode);
    }
  };

  const handleInputFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    scrollToInput(event.target);
  };

  return (
    <FieldWrapper
      formikKey={formikKey}
      formikProps={formikProps}
      label={label}
      {...rest}>
      <StyledInput
        onChangeText={
          onChangeText ? onChangeText : formikProps.handleChange(formikKey)
        }
        // onFocus={handleInputFocus}
        onBlur={formikProps.handleBlur(formikKey)}
        error={formikProps.touched[formikKey] && formikProps.errors[formikKey]}
        {...rest}
      />
    </FieldWrapper>
  );
}

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
  ...rest
}: FieldWrapperProps): React.JSX.Element {
  const {fontScale} = useWindowDimensions();

  return (
    <View style={{gap: 10}} >
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
  error: {
    color: 'red',
  },
});

export default Input;
