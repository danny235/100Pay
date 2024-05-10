import { NavigationProp } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
// import {
//   ImagePickerResponse,
//   OptionsCommon,
//   launchImageLibrary,
// } from "react-native-image-picker";
import { LinearGradient } from "expo-linear-gradient";
// import {
//   Camera,
//   useCameraDevice,
//   useCameraPermission,
//   useCodeScanner,
// } from 'react-native-vision-camera';
import ScanCorners from "../../../../assets/images/scanCorners.png";
import { Colors } from "../../../../components/Colors";
import {
  BulbIcon,
  BulbRedIcon,
  GalleryIcon,
  ScanRedIcon,
} from "../../../../components/SvgAssets";
import CustomView from "../../../../components/Views/CustomView";
import CustomHeader from "../../../../components/headers/CustomHeaders";
import {
  BoldText,
  RegularText,
} from "../../../../components/styles/styledComponents";
import { RootStackParamList } from "../../../../routes/AppStacks";
import { CameraView, Camera, useCameraPermissions, CameraNativeProps } from "expo-camera";

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

function Scan({ navigation }: Props) {
  // const [hasPermission, setHasPermission] = useState<boolean>(false);
  // const {hasPermission, requestPermission} = useCameraPermission();
  const { fontScale, height, width } = useWindowDimensions();
  const [flashOn, setFlashOn] = useState(false);
  const [isInitialised, setIsInitialised] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>()
  // const device = useCameraDevice('back', {
  //   physicalDevices: [
  //     'ultra-wide-angle-camera',
  //     'wide-angle-camera',
  //     'telephoto-camera',
  //   ],
  // });
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const squishFixRef = useRef(false);

  // const options: OptionsCommon = {
  //   mediaType: 'photo',
  //   includeExtra: true,
  // };

  // const codeScanner = useCodeScanner({
  //   codeTypes: ['qr', 'ean-13'],
  //   onCodeScanned: codes => {
  //     console.log(
  //       `Scanned ${codes.length} ${JSON.stringify(codes[0].value)} ${typeof JSON.stringify(codes[0].value)}  codes!`,
  //     );
  //     (navigation as any).replace('SendPayment');
  //   },
  // });

  // const initCallback = useCallback(() => {
  //   if (isCameraInitialized && !squishFixRef.current) {
  //     squishFixRef.current = true;
  //     setTimeout(() => {
  //       setIsActive(true);
  //     }, 150);
  //     setIsActive(false);
  //   }
  //   setIsCameraInitialized(true);
  // }, [isCameraInitialized]);

  const toggleCamera = () => {
    setFlashOn(!flashOn);
  };

  // const launchGallery = async () => {
  //   // You can also use as a promise without 'callback':
  //   const result: ImagePickerResponse = await launchImageLibrary(options);
  //   console.log(result.assets, 'from line 82');
  // };

  const handleCameraError = (e: any) => {
    console.log("error", e);
  };

   const handleBarCodeScanned = ({ type, data }) => {
     setScanned(true);
     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
   };
  // useEffect(() => {
  //   (async () => {
  //     if(hasPermission) return
  //     requestPermission()
  //   })();
  // }, []);

  useEffect(() => {
    

    Camera.getCameraPermissionsAsync();
  }, [Camera]);

   if (!permission) {
     // Camera permissions are still loading
     return (
       <View
         style={{
           justifyContent: "center",
           alignItems: "center",
           flex: 1,
           backgroundColor: Colors.white,
         }}
       >
         <ActivityIndicator color={Colors.primary} size={40} />
       </View>
     );
   }

  if (!permission.granted)
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.white
      }}>
      <RegularText
        style={{
          fontSize: 20 / fontScale,
          textAlign: 'center',
        }}>
        No camera device please grant access!
      </RegularText>
    </View>
  );

  return (
    <CustomView>
      {Platform.OS === "web" ? (
        <iframe allow="microphone; camera;">
          <CameraView
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            ref={cameraRef}
            enableTorch={flashOn}
            flash={flashOn ? "on" : "off"}
            onBarcodeScanned={handleBarCodeScanned}
            onMountError={handleCameraError}
            style={StyleSheet.absoluteFillObject}
          />
        </iframe>
      ) : (
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          ref={cameraRef}
          enableTorch={true}
          flash={flashOn ? "on" : "off"}
          onBarcodeScanned={({ data }) => console.log(data)}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {/* <Camera
        style={StyleSheet.absoluteFillObject}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
        torch={flashOn ? 'on' : 'off'}
        onError={handleCameraError}
      /> */}

      <View
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Overlay */}
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <LinearGradient
            colors={["rgba(17, 24, 39, 1)", "rgba(17, 24, 39, 0)"]}
          >
            <CustomHeader
              text="Scan QR code"
              icon={<ScanRedIcon color={Colors.white} />}
              onPress={() => navigation.goBack()}
              textColor={Colors.white}
            />

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginVertical: 20,
                paddingHorizontal: 20,
              }}
            >
              <BoldText
                style={{
                  fontSize: 20 / fontScale,
                  textAlign: "center",
                  color: Colors.white,
                }}
              >
                Scan code to pay
              </BoldText>
              <RegularText
                style={{
                  fontSize: 13 / fontScale,
                  textAlign: "center",
                  color: Colors.grayText,
                }}
              >
                Point the camera to the QR code or load picture with the QR code
                from your gallery to continue.
              </RegularText>
            </View>
          </LinearGradient>

          <View style={{ paddingHorizontal: 30 }}>
            <ImageBackground
              source={ScanCorners}
              resizeMode="contain"
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: height / 2,
                marginVertical: 20,
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: Colors.white,
                  opacity: 0.1,
                  borderRadius: 10,
                  height: height / 2.8,
                }}
              />
            </ImageBackground>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 30,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 70,
            }}
          >
            <Pressable style={[styles.ctaBtns, {}]}>
              <GalleryIcon />
            </Pressable>

            <Pressable
              style={[
                styles.ctaBtns,
                { backgroundColor: flashOn ? Colors.white : "rgba(0,0,0,0.7)" },
              ]}
              onPress={toggleCamera}
            >
              {!flashOn ? <BulbIcon /> : <BulbRedIcon />}
            </Pressable>
          </View>
        </View>
      </View>
    </CustomView>
  );
}

export default Scan;

const styles = StyleSheet.create({
  ctaBtns: {
    backgroundColor: "rgba(0,0,0,0.7)",
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});