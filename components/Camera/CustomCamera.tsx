// CameraComponent.js
import React, { useState, useRef, useEffect, ReactNode } from "react";
import { View, StyleSheet, useWindowDimensions, Animated, Platform, Text } from "react-native";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { Colors } from "../Colors";
import { BlurView } from "expo-blur";
import Webcam, { WebcamProps } from "react-webcam";
import * as ml5 from "ml5";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { updateShowBookAccounts, updateShowFaceAccounts } from "../../features/account/accountSlice";

type CameraT = {
  onPictureTaken?: (photo) => void;
  children: ReactNode
  isVisible: boolean;
};

// TODO: Add these properties to the constant directory
const allowedObjects = ['book', 'paper', 'person', 'tv', 'sheet']

const dimensions = {
  cameraWidth: 500,
  CameraHeight: 1000
}

// TEMP:
const { cameraWidth, CameraHeight } = dimensions

type VideoConstraints = { facingMode?: string; deviceId?: string };

const CustomCamera = ({ onPictureTaken, isVisible, children }: CameraT) => {
  // DECLARE ALL 
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);
  const [devices, setDevices] = React.useState([]);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [restartCamera, setRestartCamera] = useState(false)

  const cameraRef = useRef(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const { fontScale, height, width } = useWindowDimensions();
  const opacity = useRef(new Animated.Value(isVisible ? 1 : 0)).current;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [videoConstraints, setVideoConstraints] = useState<VideoConstraints>({
    facingMode: "environment",
  });

  // Call the recognize end point
  const handleImageUpload = async (imageBlob) => {
    const data = new FormData();
    data.append("image", imageBlob, 'lens_image.png')
    dispatch(updateShowBookAccounts(true))
    // const response = await axios.post("http://localhost:9000/api/v1/payment/transfer/send-funds/scan-image", data, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    console.log(imageBlob)
    // dispatch(updateShowFaceAccounts(true))
    // if (response.success) {
    //   // navigate("/dashboard/send-funds", { state: { data: response.data }, replace: true });
    // }
  };


  const handleCapturedImage = (blob: Blob) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (file) => {
      setCapturedImage(file.target.result);
    };
    // Sending the blob directly as an image file
    handleImageUpload(blob);
  };

  useEffect(() => {
    const getBackCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        // Check if facingMode is supported
        const supportsFacingMode = videoDevices.some((device) =>
          device.label.toLowerCase().includes("environment")
        );

        if (!supportsFacingMode) {
          // Find a device with 'back' or 'rear' label as fallback
          const backCamera = videoDevices.find(
            (device) =>
              device.label.toLowerCase().includes("back") ||
              device.label.toLowerCase().includes("rear")
          );

          if (backCamera) {
            setVideoConstraints({ deviceId: backCamera.deviceId });
          } else {
            console.error("Back camera not found");
          }
        }
      } catch (error) {
        console.error("Error enumerating devices: ", error);
      }
    };

    getBackCamera();
  }, []);

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
      webcamRef.current.video.width = cameraWidth;
      webcamRef.current.video.height = CameraHeight;
      canvasRef.current.width = cameraWidth;
      canvasRef.current.height = CameraHeight;

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
          if (results && results.length) {
            console.log(results)
            for (let all of results) {
              if (allowedObjects.includes(all.label)) {
                const ctx = canvasRef.current.getContext('2d');
                // ctx.clearRect(0, 0, width, height);
                // ctx.drawImage(webcamRef.current.video, 0, 0, width, height);
                canvasRef.current.toBlob(handleCapturedImage);
                clearInterval(detectionInterval)
              }
            }
          }
        });
      } catch (e) {
        console.log(e);
        clearInterval(detectionInterval)
      }
    };

    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    }

  }, [width, height, restartCamera]);

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
        // position: "absolute",
        height: height / 2,
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
              ref={webcamRef}
              style={styles.camera}
              videoConstraints={videoConstraints}
            />
            <canvas style={styles.camera} ref={canvasRef} />
          </>
        ) : (
          <CameraView ref={cameraRef} style={StyleSheet.absoluteFillObject} />
        )}

        <BlurView
          style={styles.blurView}
          tint="dark"
          intensity={30}
          experimentalBlurMethod="dimezisBlurView"
        />
      </View>

      <View style={{ position: 'absolute', left: 0, right: 0 }}>
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
    overflow: "hidden",
  },
});

export default CustomCamera;
