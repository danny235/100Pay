import * as Clipboard from "expo-clipboard";
import { NavigationProp } from "@react-navigation/native";
import React, { useRef } from "react";
import { Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";
// import Share from "react-native-share";
import * as Sharing from "expo-sharing";
import ViewShot, { captureRef } from "react-native-view-shot";
import { Button } from "../../../../components/Button/Button";
import { Colors } from "../../../../components/Colors";
import { useToast } from "../../../../components/CustomToast/ToastContext";
import { CopyIcon, QRIcon, ShareIcon } from "../../../../components/SvgAssets";
import CustomView from "../../../../components/Views/CustomView";
import CustomHeader from "../../../../components/headers/CustomHeaders";
import {
  BoldText,
  LightText,
  MediumText,
} from "../../../../components/styles/styledComponents";
import { RootStackParamList } from "../../../../routes/AppStacks";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

type GenerateCodeT = {
  navigation: NavigationProp<RootStackParamList>;
};

type ShareOptions = {
  url: string;
  message: string;
};

export default function GeneratedCode({ navigation }: GenerateCodeT) {
  const { fontScale } = useWindowDimensions();
  const code = "234gh6";
  const { showToast } = useToast();
  const { userApps, activeUserApp, userAppsError, userAppsLoading, token } =
    useSelector((state: RootState) => state.user);
  const qrRef = useRef<ViewShot>(null);
  let logoFromFile = require("../../../../assets/images/payLogo.png");

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`${activeUserApp?.referralCode}`);
    showToast("Copied successfully");
  };

  const onSharePress = async () => {
    try {
      if (qrRef.current) {
        const uri = await captureRef(qrRef, {
          format: "png",
          quality: 0.8,
        });
        // console.log("Image saved to", uri);

        const options: Sharing.SharingOptions = {
          dialogTitle: `Hey, this is my 100Pay ID: ${`${activeUserApp?.referralCode}`}`,
        };

        Sharing.shareAsync(uri, options);

        // Share.open(options)
        //   .then(() => {
        //     console.log('Shared successfully');
        //   })
        //   .catch((error: Error) => {
        //     console.error('Error while sharing:', error);
        //   });
      } else {
        console.error("qrRef is not attached to a ViewShot component");
      }
    } catch (error) {
      console.error("Oops, snapshot failed", error);
    }
  };

  return (
    <CustomView>
      <CustomHeader
        text="Payment ID Details"
        icon={<QRIcon />}
        onPress={() => navigation.goBack()}
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
          }}
        >
          Scan code to pay
        </BoldText>
        <LightText
          style={{
            fontSize: 13 / fontScale,
            textAlign: "center",
            color: Colors.grayText,
          }}
        >
          Sender should point their camera to this QR code to make payments.
        </LightText>
      </View>

      <ViewShot ref={qrRef}>
        <View style={styles.qrContainer}>
          <QRCode size={280} value={code} />
        </View>
      </ViewShot>

      <View
        style={[
          styles.qrContainer,
          {
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 10,
            paddingVertical: 15,
            marginVertical: 20,
            paddingHorizontal: 13,
          },
        ]}
      >
        <MediumText
          style={{
            fontSize: 14 / fontScale,
            borderRightColor: Colors.ash,
            borderRightWidth: 1,
            paddingRight: 10,
          }}
        >
          100Pay ID
        </MediumText>
        <LightText
          style={{
            fontSize: 15 / fontScale,
          }}
        >
          {activeUserApp?.referralCode}
        </LightText>
        <Pressable style={{ marginLeft: "auto" }} onPress={copyToClipboard}>
          <CopyIcon height={25} width={25} />
        </Pressable>
      </View>

      <LightText style={{ fontSize: 15 / fontScale }}>
        Alternatively you can copy your 100Pay ID and paste to the sender
      </LightText>

      <Button
        variant="primary"
        isLarge={false}
        isWide={true}
        style={{
          marginTop: "auto",
          marginBottom: 30,
        }}
        onPress={onSharePress}
      >
        <MediumText style={{ color: Colors.white, fontSize: 15 / fontScale }}>
          Share
        </MediumText>
        <ShareIcon />
      </Button>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  qrContainer: {
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    padding: 30,
    backgroundColor: Colors.white,
  },
});
