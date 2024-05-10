import React from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';
import {ArrowBackwardIcon} from '../SvgAssets';
import PayLogo from '../../assets/images/payLogo.png';
import {Colors} from '../Colors';
import {useNavigation} from '@react-navigation/native';

const Header: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowBackwardIcon color={Colors.black} />
      </Pressable>
      <Image
        resizeMode="contain"
        source={PayLogo}
        style={{
          width: '24%',
          aspectRatio: 2.4 / 0.9,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      />

      <ArrowBackwardIcon color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingTop: 12,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconContainer: {
    flexDirection: 'row',
  },
});

export default Header;
