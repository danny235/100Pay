import React from "react";
import { Modal, View, StyleSheet, Image } from "react-native";
import { Logo, LogoLod } from "../SvgAssets";
import LogoImg from "../../assets/images/100PayLogo.png";

const Loader = ({ visible }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View className=" animate-pulse" style={styles.loaderContainer}>
          <Image
            className=" animate-pulse"
            source={LogoImg}
            style={{ width: "80%", height: 45 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loaderContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
