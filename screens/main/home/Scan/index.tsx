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
import { LinearGradient } from "expo-linear-gradient";
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
import { Button } from "../../../../components/Button/Button";
import { I3DRotate } from "iconsax-react-native";

import Webcam from "react-webcam";
import * as ml5 from "ml5";

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

const allowedObjects = ['book', 'paper', 'person', 'tv', 'sheet']
const dimensions = {
  width: 800,
  height: 500
}


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

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isUnfocused, setIsUnfocused] = useState(false)
  const [capturedImage, setCapturedImage] = useState();

  const [facing, setFacing] = useState<string | any>("back");

  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const squishFixRef = useRef(false);


  const toggleCamera = () => {
    setFlashOn(!flashOn);
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  useEffect(() => {
    let detectionInterval;

    const modelLoaded = () => {
      webcamRef.current.video.width = width;
      webcamRef.current.video.height = height;
      canvasRef.current.width = width;
      canvasRef.current.height = height;


      detectionInterval = setInterval(() => {
        detect();
      }, 200);
    };

    const objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    const detect = () => {
      if (webcamRef.current.video.readyState !== 4) {
        console.warn('Video not ready yet');
        return;
      }

      try {
        objectDetector.detect(webcamRef.current.video, (err, results) => {
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, width, height);
          if (results && results.length) {
            console.log(results)
            if (results.length > 1) {
              setIsUnfocused(true)
            }
            else {
              setIsUnfocused(false)
              for (let all of results) {
                if (allowedObjects.includes(all.label)) {
                  ctx.drawImage(webcamRef.current.video, 0, 0, width, height);
                  // canvasRef.current.toBlob(handleCapturedImage);
                }
              }
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    };

    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    }

  }, [width, height]);


  useEffect(() => {
    (async () => {
      requestPermission()
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      // await tf.ready();
      // const loadedModel = await cocossd.load();
      // setModel(loadedModel);
    })();
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
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <CustomHeader
          text="Lens that sheet"
          icon={<ScanRedIcon color={Colors.primary} />}
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: Colors.white,
            gap: 10
          }}
        >
          <RegularText
            style={{
              fontSize: 20 / fontScale,
              textAlign: "center",
            }}
          >
            No camera device please grant access!
          </RegularText>
          <Button isLarge={false} isWide={false} variant="primary" onPress={requestPermission}>
            <RegularText
              style={{
                fontSize: 15 / fontScale,
                textAlign: "center",
                color: Colors.white
              }}
            >Grant access</RegularText>
          </Button>
        </View>
      </View>
    );

  return (
    <CustomView>

      {
        Platform.OS === "web"
          ? <>
            <Webcam ref={webcamRef} className="webcam" />
            <canvas ref={canvasRef} className="canvas" />
          </>
          : <CameraView ref={cameraRef} style={StyleSheet.absoluteFillObject} />
      }

      <View
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Overlay */}
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <LinearGradient
            colors={["rgba(17, 24, 39, 1)", "rgba(17, 24, 39, 0)"]}
          >
            <CustomHeader
              text="Lens sheet"
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
                Lens that sheet to pay
              </BoldText>
              <RegularText
                style={{
                  fontSize: 13 / fontScale,
                  textAlign: "center",
                  color: Colors.grayText,
                }}
              >
                Point the camera over the sheet to make payment.
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
                width: "100%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: Colors.white,
                  opacity: 0.1,
                  borderRadius: 20,
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
            <Pressable
              onPress={toggleCameraFacing}
              style={[styles.ctaBtns, {}]}
            >
              <I3DRotate size={34} color={Colors.white} variant="TwoTone" />
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
