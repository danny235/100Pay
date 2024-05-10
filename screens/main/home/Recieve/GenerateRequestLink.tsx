import {NavigationProp} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  Pressable,
  TextInputFocusEventData,
  View,
  useWindowDimensions,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import {Button} from '../../../../components/Button/Button';
import {Colors} from '../../../../components/Colors';
import Input from '../../../../components/Input';
import {
  AddIcon,
  ArrowRightIcon,
  CursorDownIcon,
  CursorUpIcon,
} from '../../../../components/SvgAssets';
import CustomView from '../../../../components/Views/CustomView';
import CustomHeader from '../../../../components/headers/CustomHeaders';
import {useKeyboard} from '../../../../components/hooks/useKeyboard';
import {
  LightText,
  MediumText,
  RegularText,
} from '../../../../components/styles/styledComponents';
import {RootStackParamList} from '../../../../routes/AppStacks';

//

const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const generateRequestLinkSchema = yup.object().shape({
  name: yup.string().required().label('Name'),
  amount: yup.string().label('Amount'),
  firstName: yup.string().label('First Name'),
  lastName: yup.string().label('Last Name'),
  email: yup.string().label('Email').email(),
  thankYouPage: yup.string().label('thankYouPage'),
});

type GenerateCodeT = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function GenerateRequestLink({navigation}: GenerateCodeT) {
  const {fontScale, height} = useWindowDimensions();
  const keyboardHeight = useKeyboard();
  const [checked, setChecked] = useState(false);
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

  let scrollRef = useRef<KeyboardAwareScrollView>(null);

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
    <CustomView>
      <CustomHeader
        text="Generate Request Link"
        icon={<AddIcon />}
        onPress={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}>
        <Formik
          initialValues={{
            name: '',
            amount: '',
            firstName: '',
            lastName: '',
            email: '',
            thankYouPage: '',
          
          }}
          onSubmit={async (values, actions) => {
            console.log(values.name, values.amount.replace(/,/g, ''));
            navigation.navigate('GeneratedLink');
          }}
          validationSchema={generateRequestLinkSchema}>
          {formikProps => (
            <View>
              <View>
                <Input
                  placeholder="e.g School Fees"
                  formikProps={formikProps}
                  formikKey="name"
                  value={formikProps.values.name}
                  label="Link Description"
                  placeholderTextColor={Colors?.ash}
                />
                <LightText
                  style={{
                    fontSize: 14 / fontScale,
                    color: Colors.grayText,
                    marginBottom: 10
                  }}>
                  Type in the name of the new request link you want to create
                </LightText>

                <Input
                  formikProps={formikProps}
                  formikKey="amount"
                  placeholder="000.000"
                  value={formikProps.values.amount}
                  label="Amount"
                  placeholderTextColor={Colors?.ash}
                  keyboardType="decimal-pad"
                  editable={!checked}
                  onChangeText={(text: string) => {
                    // Remove commas and other non-numeric characters
                    const cleanedText = text.replace(/[^0-9.]/g, '');

                    // Format the number with commas
                    const formattedAmount = formatNumberWithCommas(
                      Number(cleanedText),
                    );

                    // Update the Formik field value
                    formikProps.setFieldValue('amount', formattedAmount);
                    formikProps.handleChange('amount');
                  }}
                />

                <CheckBox
                  onClick={() => {
                    setChecked(!checked);
                  }}
                  checkBoxColor={Colors.primary}
                  checkedCheckBoxColor={Colors.primary}
                  isChecked={checked}
                  rightText={'Any Amount'}
                  rightTextStyle={{
                    fontFamily: 'SpaceGrotesk-Regular',
                    fontSize: 14 / fontScale,
                    color: Colors.balanceBlack,
                  }}
                />

                {/* Show more details section */}
                <View
                  style={{
                    borderTopColor: Colors.ash,
                    borderTopWidth: 1,
                    paddingVertical: 10,
                    marginVertical: 10,
                    width: '100%',
                  }}>
                  <Pressable
                    onPress={() =>
                      setShowAdditionalDetails(!showAdditionalDetails)
                    }
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <RegularText style={{fontSize: 14 / fontScale}}>
                      Show Additional Details
                    </RegularText>
                    {showAdditionalDetails ? (
                      <CursorUpIcon />
                    ) : (
                      <CursorDownIcon />
                    )}
                  </Pressable>

                  {showAdditionalDetails && (
                    <View style={{width: '100%', marginTop: 20}}>
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <View style={{width: '45%', flexGrow: 1}}>
                          <Input
                            placeholder="John"
                            formikProps={formikProps}
                            formikKey="firstName"
                            value={formikProps.values.firstName}
                            label="First Name"
                            placeholderTextColor={Colors?.ash}
                          />
                        </View>
                        <View style={{width: '45%', flexGrow: 1}}>
                          <Input
                            placeholder="Doe"
                            formikProps={formikProps}
                            formikKey="lastName"
                            value={formikProps.values.lastName}
                            label="Last Name"
                            placeholderTextColor={Colors?.ash}
                          />
                        </View>
                      </View>

                      <Input
                        placeholder="johndoe@gmail.com"
                        formikProps={formikProps}
                        formikKey="email"
                        value={formikProps.values.email}
                        label="Email"
                        keyboardType="email-address"
                        placeholderTextColor={Colors?.ash}
                      />

                      <Input
                        placeholder="https://thankyou.com"
                        formikProps={formikProps}
                        formikKey="thankYouPage"
                        value={formikProps.values.thankYouPage}
                        label="Thank You Page"
                        placeholderTextColor={Colors?.ash}
                      />
                   
                    </View>
                  )}
                </View>
              </View>

              <Button
                variant="primary"
                isLarge={false}
                isWide={true}
                style={{
                  marginTop: 'auto',
                  marginBottom: Platform.OS === 'ios' ? keyboardHeight : 5,
                }}
                onPress={() => {
                  formikProps.values.amount.replace(/,/g, '');
                  formikProps.handleSubmit();
                  console.log(formikProps.values.amount.replace(/,/g, ''));
                }}>
                <MediumText
                  style={{color: Colors.white, fontSize: 15 / fontScale}}>
                  Continue
                </MediumText>
                <ArrowRightIcon />
              </Button>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </CustomView>
  );
}
