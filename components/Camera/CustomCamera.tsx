// CameraComponent.js
import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, useWindowDimensions, Animated } from "react-native";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { Colors } from "../Colors";
import { RegularText } from "../styles/styledComponents";
import { Button } from "../Button/Button";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { BlurView } from "expo-blur";

const TensorCamera = cameraWithTensors(CameraView);

type CameraT = {
  onPictureTaken?: (photo) => void;
  isVisible: boolean
};

const CustomCamera = ({ onPictureTaken, isVisible }: CameraT) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const { fontScale, height } = useWindowDimensions();

  const opacity = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      //   const blurredImage = await ImageManipulator.manipulateAsync(
      //     photo.uri,
      //     [{ blur: 10 }],
      //     { format: ImageManipulator.SaveFormat.JPEG }
      //   );
      onPictureTaken(photo.uri);
    }
  };

  const handleCameraStream = (images, updatePreview, gl) => {
    const loop = async () => {
      console.log("readyyyyy");
      if (model) {
        const nextImageTensor = images.next().value;
        if (nextImageTensor) {
          const predictions = await model.detect(nextImageTensor);
          setPredictions(predictions);

          requestAnimationFrame(loop);
          console.log(predictions, "from line 127");
        }
      }
    };
    loop();
    console.log("Test from stream");
  };

  useEffect(() => {
    (async () => {
      requestPermission();
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      await tf.ready();
      const loadedModel = await cocossd.load();
      setModel(loadedModel);
    })();
  }, [Camera]);

//   if (hasPermission === null) {
//     return (
//       <View style={{ flex: 1, backgroundColor: Colors.white }}>
//         <View
//           style={{
//             justifyContent: "center",
//             alignItems: "center",
//             flex: 1,
//             backgroundColor: Colors.white,
//             gap: 10,
//           }}
//         >
//           <RegularText
//             style={{
//               fontSize: 20 / fontScale,
//               textAlign: "center",
//             }}
//           >
//             No camera device please grant access!
//           </RegularText>
//           <Button
//             isLarge={false}
//             isWide={false}
//             variant="primary"
//             onPress={requestPermission}
//           >
//             <RegularText
//               style={{
//                 fontSize: 15 / fontScale,
//                 textAlign: "center",
//                 color: Colors.white,
//               }}
//             >
//               Grant access
//             </RegularText>
//           </Button>
//         </View>
//       </View>
//     );
//   }

//   if (hasPermission === false)
//     return (
//       <View style={{ flex: 1, backgroundColor: Colors.white }}>
//         <View
//           style={{
//             justifyContent: "center",
//             alignItems: "center",
//             flex: 1,
//             backgroundColor: Colors.white,
//             gap: 10,
//           }}
//         >
//           <RegularText
//             style={{
//               fontSize: 20 / fontScale,
//               textAlign: "center",
//             }}
//           >
//             No camera device please grant access!
//           </RegularText>
//           <Button
//             isLarge={false}
//             isWide={false}
//             variant="primary"
//             onPress={requestPermission}
//           >
//             <RegularText
//               style={{
//                 fontSize: 15 / fontScale,
//                 textAlign: "center",
//                 color: Colors.white,
//               }}
//             >
//               Grant access
//             </RegularText>
//           </Button>
//         </View>
//       </View>
//     );

  return (
    <Animated.View
      style={{
        position: "absolute",
        height: "40%",
        width: "100%",
        top: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        opacity,
      }}
    >
      <View style={styles.cameraWrapper}>
        <TensorCamera
          ref={cameraRef}
          style={styles.camera}
          onCameraReady={() => console.log("camera ready")}
          facing={"back"}
          cameraTextureWidth={1920}
          cameraTextureHeight={1080}
          resizeWidth={152}
          resizeHeight={200}
          resizeDepth={1}
          onReady={handleCameraStream}
          autorender={true}
          useCustomShadersToResize={false}
        />
      </View>
      <BlurView
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          overflow: "hidden",
        }}
        tint="dark"
        intensity={30}
        experimentalBlurMethod="dimezisBlurView"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.white,
    gap: 10,
  },

  container: {
    position: "absolute",
    height: "40%",
    width: "100%",
    top: 0,
    overflow: "hidden",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cameraWrapper: {
    flex: 1,
    overflow: "hidden",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  camera: {
    flex: 1,
  },
  blurView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default CustomCamera;
