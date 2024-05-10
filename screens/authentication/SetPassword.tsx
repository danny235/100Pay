import {Formik} from 'formik';
import React, {useState} from 'react';
import {Platform, Pressable, View, useWindowDimensions} from 'react-native';
import * as yup from 'yup';
import {Button} from '../../components/Button/Button';
import {Colors} from '../../components/Colors';
import {
  ArrowRightIcon,
  EyeIcon,
  EyeLineIcon,
  MailIcon,
} from '../../components/SvgAssets';
import CustomView from '../../components/Views/CustomView';
import {
  MediumText,
  RegularText,
} from '../../components/styles/styledComponents';
import {NavigationProp} from '@react-navigation/native';
import Input from '../../components/Input';
import Header from '../../components/headers/AuthHeader';
import AuthTitleText from '../../components/headers/AuthTitleText';

const setPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

interface RootAuthI {
  navigation: NavigationProp<any>;
}

export default function SetPassword({
  navigation,
}: RootAuthI): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {fontScale} = useWindowDimensions();

  return (
    <CustomView>
      <Header />

      <AuthTitleText
        text="Secure your account by entering a password exclusive to you only"
        title="Your Password"
        icon={<MailIcon />}
        marginTop={24}
      />

      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, actions) => {
          console.log(values);
          //navigation.navigate('ForgotPassword')
        }}
        validationSchema={setPasswordSchema}>
        {formikProps => (
          <View style={{gap: 12, marginTop: 24}}>
            <View>
              <View style={{position: 'relative', marginBottom: 12}}>
                <Input
                  formikProps={formikProps}
                  formikKey="password"
                  placeholder="*********"
                  value={formikProps.values.password}
                  secureTextEntry={showPassword ? false : true}
                  style={{paddingRight: 80}}
                  label="Password"
                  placeholderTextColor={Colors?.ash}
                />

                <Pressable
                  style={{
                    position: 'absolute',
                    bottom: Platform.OS === 'ios' ? 37 : 45,
                    right: 10,
                  }}
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeLineIcon /> : <EyeIcon />}
                </Pressable>
              </View>

              <View style={{position: 'relative'}}>
                <Input
                  formikProps={formikProps}
                  formikKey="confirmPassword"
                  placeholder="*********"
                  value={formikProps.values.confirmPassword}
                  secureTextEntry={showPassword ? false : true}
                  style={{paddingRight: 80}}
                  label="Confirm Password"
                  placeholderTextColor={Colors?.ash}
                />

                <Pressable
                  style={{
                    position: 'absolute',
                    bottom: Platform.OS === 'ios' ? 37 : 45,
                    right: 10,
                  }}
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeLineIcon /> : <EyeIcon />}
                </Pressable>
              </View>
            </View>
            <View style={{marginLeft: 'auto'}}>
              <Button
                variant="primary"
                isLarge={false}
                isWide={false}
                onPress={() => {
                  formikProps.handleSubmit();
                }}>
                <MediumText
                  style={{color: Colors.white, fontSize: 15 / fontScale}}>
                  Continue
                </MediumText>
                <ArrowRightIcon />
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </CustomView>
  );
}
