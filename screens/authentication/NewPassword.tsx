import React, {useState} from 'react';
import {
  View,
  Pressable,
  useWindowDimensions,
  Modal,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button} from '../../components/Button/Button';
import {Colors} from '../../components/Colors';
import {
  ArrowRightIcon,
  CheckVerify,
  EyeIcon,
  EyeLineIcon,
  ForgotPasswordIcon,
} from '../../components/SvgAssets';
import CustomView from '../../components/Views/CustomView';
import {
  BoldText,
  LightText,
  MediumText,
} from '../../components/styles/styledComponents';
import Input from '../../components/Input';
import Header from '../../components/headers/AuthHeader';
import AuthTitleText from '../../components/headers/AuthTitleText';
import {NavigationProp} from '@react-navigation/native';
const AuthMemoji = require('../../assets/images/AuthMemoji.png');

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

export default function NewPassword({
  navigation,
}: RootAuthI): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSuccessModalVisible, setSuccessModalVisible] =
    useState<boolean>(false); // State for success modal visibility
  const [isImageModalVisible, setImageModalVisible] = useState<boolean>(false); // State for image modal visibility
  const {fontScale} = useWindowDimensions();

  const toggleSuccessModal = () => {
    setSuccessModalVisible(!isSuccessModalVisible);
  };

  const toggleImageModal = () => {
    setImageModalVisible(!isImageModalVisible);
    setSuccessModalVisible(false);
  };

  return (
    <CustomView>
      <Header />

      <AuthTitleText
        text="Enter & confirm your new password here."
        title="Enter New Password"
        icon={<ForgotPasswordIcon />}
        marginTop={24}
      />

      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, actions) => {
          console.log(values);
          toggleSuccessModal(); // Show success modal
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

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSuccessModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <View
              style={{
                flex: 1,
                gap: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CheckVerify color={'red'} width={50} height={50} />
              <View>
                <BoldText
                  style={{
                    fontFamily: 'SpaceGrotesk-Medium',
                    textAlign: 'center',
                    fontSize: 18 / fontScale,
                    color: Colors?.authTextTitle,
                    marginTop: 12,
                    marginBottom: 4,
                  }}>
                  All Set
                </BoldText>
                <Pressable onPress={toggleSuccessModal}>
                  <LightText
                    style={{
                      fontFamily: 'SpaceGrotesk-Medium',
                      textAlign: 'center',
                      fontSize: 14 / fontScale,
                      color: Colors?.grayText,
                    }}>
                    You have successfully reset your password, login to continue
                  </LightText>
                </Pressable>
              </View>

              <Button
                variant="primary"
                isLarge={false}
                isWide={true}
                onPress={() => {
                  toggleSuccessModal();
                  toggleImageModal();
                }}>
                <MediumText
                  style={{color: Colors.white, fontSize: 15 / fontScale}}>
                  Continue
                </MediumText>
                <ArrowRightIcon />
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isImageModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.popups}>
            <View
              style={{
                flex: 1,
                gap: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={AuthMemoji} style={{width: 140, height: 130}} />
              <View>
                <BoldText
                  style={{
                    fontFamily: 'SpaceGrotesk-Medium',
                    textAlign: 'center',
                    fontSize: 18 / fontScale,
                    color: Colors?.authTextTitle,
                    marginBottom: 4,
                  }}>
                  Welcome Ikenna
                </BoldText>
                <LightText
                  style={{
                    fontFamily: 'SpaceGrotesk-Medium',
                    textAlign: 'center',
                    fontSize: 14 / fontScale,
                    color: Colors?.grayText,
                  }}>
                  Your account has successfully been created and your now ready
                  to go!{' '}
                </LightText>
              </View>

              <Button
                variant="primary"
                isLarge={false}
                isWide={true}
                onPress={() => {
                  toggleSuccessModal();
                  toggleImageModal();
                }}>
                <MediumText
                  style={{color: Colors.white, fontSize: 15 / fontScale}}>
                  Continue
                </MediumText>
                <ArrowRightIcon />
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(55, 65, 81, 0.30)',
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    padding: 16,
  },
  popup: {
    zIndex: 44,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    gap: 24,
    margin: 12,
    height: 260,
  },
  popups: {
    zIndex: 44,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    gap: 24,
    margin: 12,
    height: 340,
  },
});
