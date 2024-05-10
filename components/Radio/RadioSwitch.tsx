import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Svg, {Rect, Path} from 'react-native-svg';
import { ActiveRadioIcon, InActiveRadioIcon } from '../SvgAssets';


interface RadioSwitchProps {
 isActive: boolean
}

const RadioSwitch: React.FC<RadioSwitchProps> = ({
 isActive
}) => {


  
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={{alignItems: 'center'}}>
        {isActive ? (
          <ActiveRadioIcon />
        ) : (
          <InActiveRadioIcon />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RadioSwitch;
