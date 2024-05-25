import { View, Text, Image } from 'react-native'
import React from 'react'
import Logo from "../../assets/images/paytoken.png"

type LogoT = {
    width?: number,
    height?: number
}

export default function PayLogo({width=40, height=40}: LogoT) {
  return (
    <Image source={Logo} style={{width, height, borderRadius: width}} />
  )
}