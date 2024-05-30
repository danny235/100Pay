// CameraComponent.js
import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, useWindowDimensions, Animated, Platform } from "react-native";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { Colors } from "../Colors";
import { RegularText } from "../styles/styledComponents";
import { Button } from "../Button/Button";
import { BlurView } from "expo-blur";
import Webcam, { WebcamProps } from "react-webcam";
import * as ml5 from "ml5";

type CameraT = {
  onPictureTaken?: (photo) => void;
  isVisible: boolean;
};

const allowedObjects = ['book', 'paper', 'person', 'tv', 'sheet']
const dimensions = {
  width: 800,
  height: 500
}

const CustomCamera = ({ onPictureTaken, isVisible }: CameraT) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [devices, setDevices] = React.useState([]);

  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const getBackCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        const backCamera = videoDevices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("rear") ||
            device.label.toLowerCase().includes("environment")
        );

        if (backCamera) {
          setDeviceId(backCamera.deviceId);
        } else {
          console.error("Back camera not found");
        }
      } catch (error) {
        console.error("Error enumerating devices: ", error);
      }
    };

    getBackCamera();
  }, []);

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isUnfocused, setIsUnfocused] = useState(false)
  const [capturedImage, setCapturedImage] = useState();

  const cameraRef = useRef(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const { fontScale, height, width } = useWindowDimensions();

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
      requestPermission();
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [Camera, cameraRef]);

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
        {Platform.OS === "web" ? (
          <>
            <Webcam
              style={styles.camera}
              ref={webcamRef}
              className="webcam"
              videoConstraints={{ deviceId }}
            />
            <canvas ref={canvasRef} className="canvas" />
          </>
        ) : (
          <CameraView ref={cameraRef} style={StyleSheet.absoluteFillObject} />
        )}
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
