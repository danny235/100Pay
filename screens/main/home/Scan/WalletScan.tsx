import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Modal,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ScanCorners from "../../../../assets/images/scanCorners.png";
import { Colors } from "../../../../components/Colors";
import { ScanRedIcon } from "../../../../components/SvgAssets";
import CustomView from "../../../../components/Views/CustomView";
import CustomHeader from "../../../../components/headers/CustomHeaders";
import {
  BoldText,
  RegularText,
} from "../../../../components/styles/styledComponents";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { Button } from "../../../../components/Button/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../../routes/AppStacks";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onScan: (code: string) => void;
};

function WalletScan({ isVisible, onClose, onScan }: Props) {
  const { fontScale, height } = useWindowDimensions();
  const [flashOn, setFlashOn] = useState(false);
  const [isInitialised, setIsInitialised] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>();
  const inset = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      requestPermission();
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={Colors.primary} size={40} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <CustomHeader
          text="Scan wallet"
          icon={<ScanRedIcon color={Colors.primary} />}
          onPress={onClose}
        />
        <View style={styles.permissionContent}>
          <RegularText
            style={{ fontSize: 20 / fontScale, textAlign: "center" }}
          >
            No camera device. Please grant access!
          </RegularText>
          <Button
            isLarge={false}
            isWide={false}
            variant="primary"
            onPress={requestPermission}
          >
            <RegularText style={styles.buttonText}>Grant access</RegularText>
          </Button>
        </View>
      </View>
    );
  }

  return (
    <Modal visible={isVisible} transparent={false} animationType="slide">
      <CustomView>
        {Platform.OS !== "web" && (
          <CameraView
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={(scanningResult) =>{
               onScan(scanningResult?.data)
               onClose()
            }}
            ref={cameraRef}
            style={StyleSheet.absoluteFillObject}
          />
        )}

        <View style={styles.overlay}>
          <LinearGradient
            colors={["rgba(17, 24, 39, 1)", "rgba(17, 24, 39, 0)"]}
          >
            <CustomHeader
              text="Scan wallet"
              icon={<ScanRedIcon color={Colors.white} />}
              onPress={onClose}
              textColor={Colors.white}
              style={{ paddingTop: inset.top }}
            />

            <View style={styles.scanHeader}>
              <BoldText style={styles.boldText}>Scan to pay</BoldText>
              <RegularText style={styles.regularText}>
                Point the camera over the sheet to make payment.
              </RegularText>
            </View>
          </LinearGradient>

          <View
            style={{
              paddingHorizontal: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImageBackground
              source={ScanCorners}
              resizeMode="cover"
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
                  height: height / 3,
                }}
              />
            </ImageBackground>
          </View>
        </View>
      </CustomView>
    </Modal>
  );
}

export default WalletScan;

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.white,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  permissionContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.white,
    gap: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.white,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scanHeader: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  boldText: {
    fontSize: 20,
    textAlign: "center",
    color: Colors.white,
  },
  regularText: {
    fontSize: 13,
    textAlign: "center",
    color: Colors.grayText,
  },
  scanContainer: {
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  scanImageBackground: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
  },
  scanArea: {
    width: "100%",
    backgroundColor: Colors.white,
    opacity: 0.1,
    borderRadius: 20,
    height: 150,
  },
});
