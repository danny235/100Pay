import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {addCommas} from '../../utils';
import {Colors} from '../Colors';
import RadioSwitch from '../Radio/RadioSwitch';
import {WalletIcon} from '../SvgAssets';
import {
  BoldText,
  LightText,
  MediumText,
  RegularText,
} from '../styles/styledComponents';
import {currencyItems} from './CurrencyItem';
import { updateAccountBalanceType } from '../../features/user/userSlice';

interface CustomBackdropProps {
  animatedIndex: Animated.SharedValue<number>;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const CustomBackdrop: React.FC<CustomBackdropProps> = ({
  animatedIndex,
  style,
  onPress,
}) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity style={style} onPress={onPress} />
    </Animated.View>
  );
};

interface Props {
  onHide: () => void;
}

export default function ChooseAccountBalance({onHide}: Props) {
  const {accountBalanceType} = useSelector((state: RootState) => state.user);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapTo, setSnapTo] = useState(['38%', '50%']);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    onHide();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const {fontScale} = useWindowDimensions();
  const dispatch = useDispatch();

  useEffect(() => {
    handlePresentModalPress();
    return () => {
        handlePresentModalClose()
    }
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enableContentPanningGesture={false}
        enablePanDownToClose={false}
        handleIndicatorStyle={{
          borderWidth: 3,
          borderColor: Colors.ash,
          width: '20%',
        }}
        backdropComponent={({animatedIndex, style}) => (
          <CustomBackdrop
            onPress={handlePresentModalClose}
            animatedIndex={animatedIndex}
            style={style}
          />
        )}
        animateOnMount={true}>
        <View style={{paddingVertical: 20, gap: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 30,
              paddingHorizontal: 20,
            }}>
            <View style={{}}>
              <WalletIcon />
            </View>
            <BoldText style={{fontSize: 19 / fontScale}}>
              My Account Balance
            </BoldText>
          </View>
          <LightText style={{fontSize: 16 / fontScale, paddingHorizontal: 20}}>
            Select the balance you want to display on the home screen:
          </LightText>

          <View style={styles.paymentMethodContainer}>
            {currencyItems.map(item => (
              <Pressable
                onPress={() => dispatch(updateAccountBalanceType(item.type))}
                style={styles.accountItem}
                key={item.type}>
                <View style={{paddingHorizontal: 20}}>{item.icon}</View>
                <View
                  style={[
                    styles.bottomBorderWrapper,
                    {borderBottomWidth: item.type === 'pay-token' ? 0 : 1},
                  ]}>
                  <View style={{paddingHorizontal: 20,}}>
                    <BoldText style={{fontSize: 15 / fontScale}}>
                      {item.primaryText}
                    </BoldText>
                    <RegularText
                      style={{
                        fontSize: 13 / fontScale,
                        color: Colors.grayText,
                      }}>
                      {item.secondaryText}
                    </RegularText>
                  </View>

                  <View style={{alignItems: 'flex-end', marginLeft: "auto"}}>
                    <BoldText style={{fontSize: 15 / fontScale}}>
                      {item.type === 'pay-token'
                        ? ` ≈ ${addCommas(item.amountDollars)}.00 $Pay`
                        : `₦ ${addCommas(item.amountNaira)}.00`}
                    </BoldText>
                    <RegularText
                      style={{
                        fontSize: 13 / fontScale,
                        color: Colors.grayText,
                      }}>
                      {item.type === 'naira'
                        ? ` ≈ ${addCommas(item.amountDollars)}.00 $Pay`
                        : `₦ ${addCommas(item.amountNaira)}.00`}
                    </RegularText>
                  </View>
                  <View style={{paddingHorizontal: 10}}>
                    <RadioSwitch isActive={accountBalanceType === item.type} />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  paymentMethodContainer: {
    gap: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  bottomBorderWrapper: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ash,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    flexGrow: 70
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
});
