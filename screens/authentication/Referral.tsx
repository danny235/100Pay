import {Formik} from 'formik';
import React, {useState} from 'react';
import {Pressable, View, useWindowDimensions} from 'react-native';
import * as yup from 'yup';
import {Button} from '../../components/Button/Button';
import {Colors} from '../../components/Colors';
import {ArrowRightIcon, MailIcon} from '../../components/SvgAssets';
import CustomView from '../../components/Views/CustomView';
import {MediumText} from '../../components/styles/styledComponents';
import {NavigationProp} from '@react-navigation/native';
import Input from '../../components/Input';
import Header from '../../components/headers/AuthHeader';
import AuthTitleText from '../../components/headers/AuthTitleText';
import { Icon, ProfileAdd } from 'iconsax-react-native';

const loginSchema = yup.object().shape({
  invitationCode: yup.string().label('invitationCode'),
});

interface RootAuthI {
  navigation: NavigationProp<any>;
}

export default function Referral({navigation}: RootAuthI): React.JSX.Element {
  const {fontScale} = useWindowDimensions();

  return (
    <CustomView>
      <Header />

      <AuthTitleText
        text="Enter the code of the person that invited you."
        title="Invitation"
        icon={<ProfileAdd variant="TwoTone" color={Colors.primary} size={24} />}
        marginTop={24}
      />

      <Formik
        initialValues={{
          invitationCode: '',
        }}
        onSubmit={async (values, actions) => {
          console.log('Form values:', values);
          navigation.navigate('SetPassword');
        }}
        validationSchema={loginSchema}>
        {formikProps => (
          <View style={{gap: 12, marginTop: 24}}>
            <View>
              <Input
                placeholder="ID: P1234GH6"
                formikProps={formikProps}
                formikKey="invitationCode"
                value={formikProps.values.invitationCode}
                autoCapitalize="none"
                label="Invitation Code"
                placeholderTextColor={Colors?.grayText}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: "auto"}}>
              <Button
                variant="secondary"
                isLarge={false}
                isWide={false}
                style={{width: '48.5%'}}
                onPress={() => {
                  navigation.navigate('SetPassword');
                }}>
                <MediumText
                  style={{color: Colors.black, fontSize: 15 / fontScale}}>
                  Skip
                </MediumText>
              </Button>
              <Button
                variant="primary"
                isLarge={false}
                isWide={false}
                style={{width: '48.5%'}}
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
