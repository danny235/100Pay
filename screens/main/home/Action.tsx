import React from 'react';
import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Colors} from '../../../components/Colors';
import {PayIcon, RecieveIcon} from '../../../components/SvgAssets';
import {MediumText} from '../../../components/styles/styledComponents';

interface ActionProps {
  onPayPress: () => void;
  onRecievePress: () => void;
}

export default function Action({onPayPress, onRecievePress}: ActionProps): React.JSX.Element {
  const {fontScale} = useWindowDimensions();

  return (
    <View style={{gap: 20, flexDirection: 'row'}}>
      <Pressable onPress={onPayPress} style={styles.btn}>
        <PayIcon />
        <MediumText style={{fontSize: 15 / fontScale, color: Colors.balanceBlack}}>
          Pay
        </MediumText>
      </Pressable>
      <Pressable onPress={onRecievePress} style={styles.btn}>
        <RecieveIcon />
        <MediumText style={{fontSize: 15 / fontScale, color: Colors.balanceBlack}}>
          Recieve
        </MediumText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.whiteShade,
    flexBasis: '40%',
    flexGrow: 1,
    paddingVertical: 14,
    gap: 10,
  },
});
