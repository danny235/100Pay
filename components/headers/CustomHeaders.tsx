import React from 'react';
import {View, Pressable, useWindowDimensions} from 'react-native';
import { MediumText } from '../styles/styledComponents';
import { Colors } from '../Colors';
import { ArrowBackwardIcon } from '../SvgAssets';


interface Props {
  text: string;
  subTextComponent?: React.ReactNode;
  icon: React.ReactNode;
  textColor?: string;
  onPress: () => void;
}

const CustomHeader: React.FC<Props> = ({text, subTextComponent, icon, textColor=Colors.iconColor,onPress}) => {
    const {fontScale} = useWindowDimensions()
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingVertical: 20,
      }}>
      <Pressable onPress={onPress}>
        <ArrowBackwardIcon color={textColor} />
      </Pressable>
      
      <View
        style={{
          borderRightColor: Colors.ash,
          borderRightWidth: 1,
          paddingRight: 6,
        }}>
        {icon}
      </View>
      <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>

      <MediumText
        style={{fontSize: 17 / fontScale, color: textColor}}>
        {text}
      </MediumText>
      {subTextComponent}
      </View>
    </View>
  );
};

export default CustomHeader;
