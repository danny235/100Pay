import React, {PropsWithChildren} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../../components/Colors';
import {
  BoldText,
  Indicator,
  IndicatorsWrappers,
  LightText,
} from '../../components/styles/styledComponents';
import Circle from '../../assets/images/circles.png';

type OnboardingItemT = PropsWithChildren<{
  item: {
    id: number;
    heading: string;
    description: string;
    image: any;
  };
  currentIndex: number;
}>;

export default function OnboardingItem({
  currentIndex,
  item,
}: OnboardingItemT): React.JSX.Element {
  const {height, width, fontScale} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <View
   
      style={{
        width: width,
        paddingHorizontal: 14,
        paddingTop: insets.top,
        height: Platform.OS === 'ios' ? height / 1.14 : height / 1.17,
      }}>
      <ImageBackground
        source={Circle}
        resizeMode="cover"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: height / 1.9,
        }}>
        <Image
          style={{width: '100%', aspectRatio: 1.9 / 5}}
          resizeMode="contain"
          source={item.image}
        />
      </ImageBackground>
      <View></View>
      <View
        style={{
          paddingHorizontal: 0,
          gap: 10,
          paddingVertical: 20,
          width: '100%',
        }}>
        <BoldText
          style={{
            fontSize: 30 / fontScale,
            color: Colors.primary,

            flexShrink: 1,
            lineHeight: 40,
          }}>
          {item.heading}
        </BoldText>
        <LightText
          style={{
            fontSize: 16 / fontScale,
            color: Colors.grayText,
            flexShrink: 1,
            lineHeight: 30,
          }}>
          {item.description}
        </LightText>
      </View>
    </View>
  );
}
