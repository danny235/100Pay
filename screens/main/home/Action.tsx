import React from "react";
import { Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { Colors } from "../../../components/Colors";
import { PayIcon, RecieveIcon } from "../../../components/SvgAssets";
import { MediumText } from "../../../components/styles/styledComponents";
import { ExportSquare, Import, ImportSquare, Scan } from "iconsax-react-native";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

interface ActionProps {
  onPayPress: () => void;
  onRecievePress: () => void;
  onScanPress: () => void;
}

export default function Action({
  onPayPress,
  onRecievePress,
  onScanPress,
}: ActionProps): React.JSX.Element {
  const { fontScale } = useWindowDimensions();
  const { showCamera } = useSelector((state: RootState) => state.user);

  return (
    <View
      style={{ gap: 20, flexDirection: "row", justifyContent: "space-around" }}
    >
      <Pressable onPress={onPayPress} style={styles.btn}>
        <ExportSquare variant="TwoTone" color={Colors.white} />
        <MediumText style={{ fontSize: 15 / fontScale, color: Colors.white }}>
          Pay
        </MediumText>
      </Pressable>
      <Pressable onPress={onRecievePress} style={styles.btn}>
        <ImportSquare variant="TwoTone" color={Colors.white} />
        <MediumText style={{ fontSize: 15 / fontScale, color: Colors.white }}>
          Recieve
        </MediumText>
      </Pressable>
      <Pressable
        onPress={onScanPress}
        style={[
          styles.btn,
          {
            backgroundColor: showCamera
              ? Colors.white
              : "rgba(255, 255, 255, 0.2)",
              flexBasis: "auto"
          },
        ]}
      >
        <Scan
          variant="TwoTone"
          color={showCamera ? "rgba(75, 85, 99, 1)" : Colors.white}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexBasis: "35%",
    paddingVertical: 14,
    gap: 10,
  },
});
