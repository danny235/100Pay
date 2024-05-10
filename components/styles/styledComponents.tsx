import { Platform, Pressable, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Colors } from "../Colors";
import React from "react";

type IndicatorT = {
    isActive: boolean
}

const PrimaryButton = styled(Pressable)`
    border-radius: 8px;
    background-color: ${Colors.primary};
    color: ${Colors.white};
    width: 100%;
    align-items: center;
    justify-content: center;
    aspect-ratio: 2 / 0.3;
    flex-direction: row;
    gap: 5px;
`;

const IndicatorsWrappers = styled.View`
    width: 100%;
    position: absolute;
    flex-direction: row;
    top: ${Platform.OS === "ios" ? "63%" : "56%"};
    gap: 5px;
    left: 16px;
`

const Indicator = styled.View<IndicatorT>`
    background-color: ${({isActive})=>(isActive ? Colors.primary : Colors.primaryLight)};
    width: ${({isActive})=> (isActive ? "15px" :"8px")};
    border-radius: 10px;
    height: 8px;
`;

const BoldText = styled.Text`
  font-family: ${Platform.OS === 'ios'
    ? 'SpaceGrotesk-Bold'
    : 'SpaceGroteskBold'};
  color: ${Colors.balanceBlack};
`;

const RegularText = styled.Text`
  font-family: ${Platform.OS === 'ios'
    ? 'SpaceGrotesk-Regular'
    : 'SpaceGroteskRegular'};
  color: ${Colors.balanceBlack};
`;

const LightText = styled.Text`
  font-family: ${Platform.OS === 'ios'
    ? 'SpaceGrotesk-Light'
    : 'SpaceGroteskLight'};
  color: ${Colors.balanceBlack};
`;

const MediumText = styled.Text`
    font-family: ${ Platform.OS === "ios" ? "SpaceGrotesk-Medium" : "SpaceGroteskMedium"};
    color: ${Colors.balanceBlack}
`;

const SemiBoldText = styled.Text`
    font-family: ${ Platform.OS === "ios" ? "SpaceGrotesk-SemiBold" : "SpaceGroteskSemiBold"};
    color: ${Colors.balanceBlack}
`;

const BorderPressable = styled.Pressable<{error?: boolean}>`
  border: 1px solid ${({error}) => (error ? 'red' : Colors.ash)};
  background-color: ${Colors.white};
  border-radius: 7px;
  padding: 14px;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;



export {
    PrimaryButton,
    IndicatorsWrappers,
    Indicator,
    BoldText,
    RegularText,
    LightText,
    MediumText,
    SemiBoldText,
    BorderPressable
}