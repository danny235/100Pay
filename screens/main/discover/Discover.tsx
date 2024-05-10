import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';
import CustomView from '../../../components/Views/CustomView';
import {
  ArrowForwardIcon,
  DiscoverIcon,
  LinkIcon,
} from '../../../components/SvgAssets';
import {
  BoldText,
  MediumText,
  RegularText,
} from '../../../components/styles/styledComponents';
import {Colors} from '../../../components/Colors';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../routes/AppStacks';
import {Money4} from 'iconsax-react-native';

type DiscoverT = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function Discover({navigation}: DiscoverT): React.JSX.Element {
  const {fontScale} = useWindowDimensions();
  return (
    <CustomView>
      <View style={{gap: 20, alignItems: 'center', marginVertical: 50}}>
        <DiscoverIcon color={Colors.primary} width={80} height={80} />
        <BoldText style={{fontSize: 20 / fontScale}}>
          Discover Amazing Features
        </BoldText>
      </View>

      <View style={{gap: 20}}>
        <Pressable
          style={styles.discoverCTA}
          onPress={() => navigation.navigate('GenerateLink')}>
          <LinkIcon />
          <View style={{gap: 10, flexShrink: 1}}>
            <MediumText style={{fontSize: 17 / fontScale}}>
              Generate Request Link
            </MediumText>
            <RegularText
              style={{
                fontSize: 13 / fontScale,
                color: Colors.grayText,
                width: '80%',
              }}>
              Generate a link you can send to your client to make payments.
            </RegularText>
          </View>
          <ArrowForwardIcon color={Colors.iconColor} />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Payouts')}
          style={styles.discoverCTA}>
          <Money4 color={Colors.primary} size={24} />
          <View style={{gap: 10, flexShrink: 1}}>
            <MediumText style={{fontSize: 17 / fontScale}}>Payouts</MediumText>
            <RegularText
              style={{
                fontSize: 13 / fontScale,
                color: Colors.grayText,
                width: '80%',
              }}>
              Gain more control over your payouts.
            </RegularText>
          </View>
          <View style={{marginLeft: 'auto'}}>
            <ArrowForwardIcon color={Colors.iconColor} />
          </View>
        </Pressable>

        <Pressable style={styles.discoverCTA}>
          <Money4 color={Colors.primary} size={24} />
          <View style={{gap: 10, flexShrink: 1}}>
            <MediumText style={{fontSize: 17 / fontScale}}>
              Connect QR Code
            </MediumText>
            <RegularText
              style={{
                fontSize: 13 / fontScale,
                color: Colors.grayText,
                width: '80%',
              }}>
              Connect your payment QR Code to your 100Pay account
            </RegularText>
          </View>
          <View style={{marginLeft: 'auto'}}>
            <ArrowForwardIcon color={Colors.iconColor} />
          </View>
        </Pressable>
      </View>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  discoverCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: Colors.memojiBackground,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
});
