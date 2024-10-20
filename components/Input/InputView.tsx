import { View, Text, Pressable, useWindowDimensions } from 'react-native'
import React from 'react'
import { MediumText } from '../styles/styledComponents'
import { Colors } from '../Colors';

type InputViewT = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  onPress: () => void;
};

export default function InputView({label, value, icon, onPress}: InputViewT) {
    const {fontScale} = useWindowDimensions()
  return (
    <View className='space-y-2 mb-5'>
      <MediumText style={{ fontSize: 15 / fontScale }}>{label}</MediumText>
      <Pressable onPress={onPress} style={{borderColor: Colors.ash, borderWidth: 1, borderRadius: 7}} className='p-3 w-[100%] flex-row items-center space-x-2'>
        {icon && icon}
        <MediumText style={{ fontSize: 15 / fontScale }}>{value}</MediumText>
      </Pressable>
    </View>
  );
}