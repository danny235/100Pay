import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, { useEffect } from 'react';
import CustomView from '../../components/Views/CustomView';
import {
  BoldText,
  LightText,
  MediumText,
} from '../../components/styles/styledComponents';
import {Colors} from '../../components/Colors';
import {AddIcon, ArrowForwardIcon} from '../../components/SvgAssets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Header from '../../components/headers/AuthHeader';

interface RootAuthI {
  navigation: NavigationProp<any>;
}

export default function RootAuth({navigation}: RootAuthI) {
  const {fontScale} = useWindowDimensions();
   
  return (
    <CustomView>
      <Header />
      <View style={{marginTop: 50, gap: 20}}>
        <BoldText style={{fontSize: 17 / fontScale, flexShrink: 1}}>
          Welcome to the 100pay experience
        </BoldText>
        <LightText style={{fontSize: 14 / fontScale, flexShrink: 1}}>
          Join us to take part in the best digital payment experience ever
          created.
        </LightText>

        <Pressable
          style={styles.clickBox}
          onPress={() => navigation.navigate('CreateAccount')}>
          <View style={styles.textWrapper}>
            <BoldText style={{fontSize: 15 / fontScale, flexShrink: 1}}>
              Create Your Account
            </BoldText>
            <LightText style={{fontSize: 12 / fontScale, flexShrink: 1}}>
              Don’t have an account? create one now
            </LightText>
          </View>
          <View style={styles.coloredWrapper}>
            <MediumText
              style={{
                fontSize: 12 / fontScale,
                color: Colors.primary,
              }}>
              Create
            </MediumText>
            <AddIcon />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('SignIn')}
          style={styles.clickBox}>
          <View style={styles.textWrapper}>
            <BoldText style={{fontSize: 15 / fontScale, flexShrink: 1}}>
              Sign in to your account
            </BoldText>
            <LightText style={{fontSize: 11 / fontScale, flexShrink: 1}}>
              Continue your amazing payment experience
            </LightText>
          </View>
          <View style={styles.coloredWrapper}>
            <MediumText
              style={{
                fontSize: 12 / fontScale,
                color: Colors.primary,
              }}>
              Sign in
            </MediumText>
            <ArrowForwardIcon />
          </View>
        </Pressable>
      </View>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  clickBox: {
    borderWidth: 1,
    borderColor: Colors.ash,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
  },
  textWrapper: {
    gap: 10,
    width: '70%',
  },
  coloredWrapper: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 14,
    borderRadius: 50,
    justifyContent: 'center',
    paddingVertical: 7,
  },
});
