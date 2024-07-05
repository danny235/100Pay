import { View, useWindowDimensions, Image, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import { CameraType, CameraView } from "expo-camera";

type ScanFaceT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function ScanFace({ navigation }: ScanFaceT) {
  const { fontScale } = useWindowDimensions();
  const [percentage, setPercentage] = useState(25);
  const [photos, setPhotos] = useState<string[]>([]);
  const cameraRef = useRef<CameraView>(null);
  const [isCameraReady, setIsCameraReady] = useState(false)
  


  const next = async () => {
    if (percentage === 100) {
      navigation.navigate("AddBank");
      console.log(photos, "test")
      return;
    }
    if (isCameraReady && cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      setPhotos((prevPhotos) => [...prevPhotos, photo.uri]);

      setPercentage((prevPercentage) => prevPercentage + 25);
    }
  };

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
let x
  useEffect(()=> {
    x++
  },[photos])

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
        <View className="w-[240px] h-[240px] rounded-[100%] justify-center items-center absolute top-[11.5px]">
          <View className="flex-1 w-[100%] h-[100%] rounded-[100%] overflow-hidden">
            <CameraView
              ref={cameraRef}
              className="flex-1"
              onCameraReady={() => setIsCameraReady(true)}
              onMountError={(error) => {
                Alert.alert("Camera Error", "Failed to initialize camera.");
              }}
            />
          </View>
        </View>

        <View
          style={{ backgroundColor: Colors.primaryLight }}
          className="w-[50px] h-[50px] rounded-[100%] justify-center items-center"
        >
          <MediumText style={{ color: Colors.primary }}>
            {percentage}%
          </MediumText>
        </View>

        <RegularText
          className="text-center w-[90%]"
          style={{ fontSize: 15 / fontScale, color: Colors.grayText }}
        >
          {speech(percentage)}
        </RegularText>
      </View>

      {/* <View className="flex-row gap-10">
        {photos.length > 0 &&
          photos.map((photo, i) => (
            <Image
              className="transition-all"
              style={{ width: 50, height: 50 }}
              key={i}
              source={{ uri: photo }}
            />
          ))}
      </View> */}
      <View className="mt-auto py-10">
        <Button
          disabled={!isCameraReady}
          onPress={() => next()}
          variant="primary"
        >
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
