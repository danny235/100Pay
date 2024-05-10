import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {Colors} from '../Colors';
import {BoldText, LightText} from '../styles/styledComponents';

interface AuthTitleTextProps {
  text: string;
  title: string;
  marginTop?: number;
  icon: ReactNode; // Accept any ReactNode as icon
}

const AuthTitleText: React.FC<AuthTitleTextProps> = ({
  text,
  marginTop,
  title,
  icon,
}) => {
  return (
    <View style={[styles.container, {marginTop: marginTop}]}>
      <View style={styles.iconTextContainer}>
        {icon}
        <View style={styles.titleContainer}>
          <BoldText style={styles.titleText}>{title}</BoldText>
        </View>
      </View>
      <LightText style={styles.text}>{text}</LightText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 12,
    marginVertical: 12,
  },
  titleText: {
    fontSize: 18,
    color: Colors.authTextTitle,
  },
  titleContainer: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.modernBlack,
    borderStyle: 'solid',
    paddingLeft: 10,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 14,
    flexShrink: 1,
    color: Colors.grayText,
  },
});

export default AuthTitleText;
