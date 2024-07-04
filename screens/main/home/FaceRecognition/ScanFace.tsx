import { View, useWindowDimensions, Image } from "react-native";
import React, { useState } from "react";
import FaceImg from "../../../../assets/images/face.png";
import CustomView from "../../../../components/Views/CustomView";
import {
  BoldText,
  MediumText,
  RegularText,
} from "../../../../components/styles/styledComponents";
import { Button } from "../../../../components/Button/Button";
import { ArrowRight, Scan, ScanBarcode } from "iconsax-react-native";
import { Colors } from "../../../../components/Colors";
import CustomHeader from "../../../../components/headers/CustomHeaders";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../routes/AppStacks";
import ProgressCircle from "../../../../components/ProgressCircle/ProgressCircle";

type ScanFaceT = {
    navigation: NativeStackNavigationProp<RootStackParamList>
}

export default function ScanFace({navigation}: ScanFaceT) {
  const { fontScale } = useWindowDimensions();
  const [percentage, setPercentage] = useState(25)
  const next = () => {
    if(percentage === 100) {
      navigation.navigate("MainTabs", {
        screen: "Dashboard",
        params: {
          screen: "GenerateLink",
          initial: true,
        },
      });
      return
    }
    setPercentage((prevPercentage) => prevPercentage + 25);
  }

  const speech = (percentage) => {
    switch (percentage) {
      case 25:
        return "Take a photo with your eyes open.";
      case 50:
        return "Take a photo with your eyes closed.";
      case 75:
        return "Take a photo while smiling.";
      case 100:
        return "Now let's go to the next step 😊.";
      default:
        return "Invalid percentage.";
    }
  };
  return (
    <CustomView>
      <CustomHeader
        onPress={() => navigation.goBack()}
        icon={<Scan color={Colors.primary} variant="TwoTone" />}
        text="Scan Face"
      />
      <View className="justify-center items-center gap-10 mt-20 relative">
        <ProgressCircle
          percentage={percentage}
          circleSize={263}
          firstStrokeColor={Colors.primaryLight}
          secondStrokeColor={Colors.primary}
        />
        <View
          style={{ backgroundColor: Colors.ash }}
          className="w-[250px] h-[250px] rounded-[100%] justify-center items-center absolute top-1.5"
        >
          <Image
            style={{ width: 126, height: 158 }}
            source={FaceImg}
            className="w-[90%] h-[90%]"
          />
        </View>

        <View
          style={{ backgroundColor: Colors.primaryLight }}
          className="w-[50px] h-[50px] rounded-[100%] justify-center items-center"
        >
          <MediumText style={{ color: Colors.primary }}>{percentage}%</MediumText>
        </View>

        <RegularText
          className="text-center w-[90%]"
          style={{ fontSize: 15 / fontScale, color: Colors.grayText }}

        >
            {speech(percentage)}
          
        </RegularText>
      </View>

      <View className="mt-auto py-10">
        <Button onPress={()=> next()} variant="primary">
          <MediumText
            className="text-white"
            style={{ fontSize: 15 / fontScale }}
          >
            {percentage === 100 ? "Finish" : "Snap"}
          </MediumText>
          <ArrowRight variant="TwoTone" size={24} />
        </Button>
      </View>
    </CustomView>
  );
}
