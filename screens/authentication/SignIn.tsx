import {Formik} from 'formik';
import React, {useState} from 'react';
import {ActivityIndicator, Platform, Pressable, View, useWindowDimensions} from 'react-native';
import * as yup from 'yup';
import {Button} from '../../components/Button/Button';
import {Colors} from '../../components/Colors';
import {ArrowRightIcon, EyeIcon, EyeLineIcon} from '../../components/SvgAssets';
import CustomView from '../../components/Views/CustomView';
import {
  BoldText,
  MediumText,
  RegularText,
} from '../../components/styles/styledComponents';
import {NavigationProp} from '@react-navigation/native';
import Input from '../../components/Input';
import Header from '../../components/headers/AuthHeader';
import { logInUserRequest } from '../../apis/auth/loginuser';
import { useDispatch } from 'react-redux';
import { addToken, toggleIsLoggedIn } from '../../features/user/userSlice';

const loginSchema = yup.object().shape({
  email: yup.string().required().label('Email').email(),
  password: yup
    .string()
    .required()
    .label('Password')
    .min(8, 'Seems a bit short'),
});

interface RootAuthI {
  navigation: NavigationProp<any>;
}

export default function SignIn({navigation}: RootAuthI): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {fontScale} = useWindowDimensions();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  return (
    <CustomView>
      <Header />
      <BoldText
        style={{
          fontSize: 18 / fontScale,
          marginBottom: 32,
          color: Colors.black,
        }}>
        Sign In To Your Account
      </BoldText>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, actions) => {
          console.log(values);

          setLoading(true); // Set loading to true when login process starts
          try {
            const {message, token, status} = await logInUserRequest(values);
            console.log(message, token, status);
            if(token) {
              dispatch(toggleIsLoggedIn(true))
              dispatch(addToken(token))
            }
            // Handle success, maybe set token to AsyncStorage or Redux store
          } catch (error) {
            console.log('Login error:', error);
            // Handle error, maybe display error message to the user
          } finally {
            setLoading(false); // Set loading to false when login process completes
          }
        }}
        validationSchema={loginSchema}>
        {formikProps => (
          <View style={{gap: 12}}>
            <View>
              <Input
                placeholder="johndoe@example.com"
                formikProps={formikProps}
                formikKey="email"
                value={formikProps.values.email}
                autoCapitalize="none"
                keyboardType="email-address"
                label="Email"
                placeholderTextColor={Colors?.ash}
              />

              <View style={{position: 'relative'}}>
                <Input
                  formikProps={formikProps}
                  formikKey="password"
                  placeholder="•••••••••••"
                  value={formikProps.values.password}
                  secureTextEntry={showPassword ? false : true}
                  style={{paddingRight: 80}}
                  label="Password"
                  placeholderTextColor={Colors?.ash}
                />

                <Pressable
                  style={{
                    position: 'absolute',
                    top: Platform.OS === 'ios' ? 40 : 48,
                    right: 10,
                  }}
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeLineIcon /> : <EyeIcon />}
                </Pressable>
              </View>
              <Pressable
                onPress={() => navigation.navigate('ForgotPassword')}
                style={{marginLeft: 'auto'}}>
                <RegularText
                  style={{fontSize: 15 / fontScale, color: Colors.primary}}>
                  Forgot password?
                </RegularText>
              </Pressable>
            </View>
            <View style={{marginLeft: 'auto', marginTop: 'auto'}}>
              {/* <View style={{flexDirection: 'row', gap: 5}}>
                <MediumText fontSize={15 / fontScale}>
                  Don't have an account?
                </MediumText>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <MediumText
                    style={{color: COLORS.tomato}}
                    fontSize={15 / fontScale}>
                    Sign up
                  </MediumText>
                </TouchableOpacity>
              </View> */}
              <Button
                variant="primary"
                isLarge={false}
                isWide={false}
                isLoading={loading}
                onPress={() => {
                  formikProps.handleSubmit();
                }}>
                <MediumText
                  style={{color: Colors.white, fontSize: 15 / fontScale}}>
                  Continue
                </MediumText>
                {loading ? <ActivityIndicator color={Colors.white} /> : (

                <ArrowRightIcon />
                )}
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </CustomView>
  );
}
