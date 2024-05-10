import React, {ReactNode} from 'react';
import {SafeAreaView} from 'react-native';
import {Colors} from '../Colors';
import {View} from 'react-native';

interface SafeAreaViewHeaderProps {
  children: ReactNode;
}

export default function SafeAreaViewHeader({
  children,
}: SafeAreaViewHeaderProps) {
  return (
    <SafeAreaView
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: Colors.white}}>
      <View style={{padding: 16}}>{children}</View>
    </SafeAreaView>
  );
}
