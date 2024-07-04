import { View, useWindowDimensions, Image } from "react-native";
import React from "react";
import FaceImg from "../../../../assets/images/face.png";
import CustomView from "../../../../components/Views/CustomView";
import {
  BoldText,
  MediumText,
  RegularText,
} from "../../../../components/styles/styledComponents";
import { Button } from "../../../../components/Button/Button";
import { ArrowRight } from "iconsax-react-native";
import { Colors } from "../../../../components/Colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../routes/AppStacks";

type FaceInfoT = {
    navigation: NativeStackNavigationProp<RootStackParamList>
}

export default function FaceInfo({navigation}: FaceInfoT) {
  const { fontScale } = useWindowDimensions();
  return (
    <CustomView>
      <View className="justify-center items-center gap-10 mt-20">
        <BoldText className="text-center" style={{ fontSize: 23 / fontScale }}>
          Set up Facial Recognition
        </BoldText>
        <View style={{backgroundColor: Colors.ash}} className="w-[263px] h-[263px] rounded-[100%] justify-center items-center">
          <Image style={{width: 126, height: 158}} source={FaceImg} className="w-[90%] h-[90%]" />
        </View>
        <RegularText
          className="text-center w-[90%]"
          style={{ fontSize: 15 / fontScale, color: Colors.grayText }}
        >
          Face recognition will enable other people fill up your bank details
          immediately they scan your face.
        </RegularText>
      </View>

      <View className="mt-auto py-10">
        <Button onPress={()=> navigation.navigate("ScanFace")} variant="primary">
          <MediumText
            className="text-white"
            style={{ fontSize: 15 / fontScale }}
          >
            Scan Face
          </MediumText>
          <ArrowRight variant="TwoTone" size={24} />
        </Button>
      </View>
    </CustomView>
  );
}
