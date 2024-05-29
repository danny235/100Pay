import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import {Colors} from '../Colors';
import {BoldText, MediumText} from '../styles/styledComponents';
import {Button} from '../Button/Button';
import {ArrowRightIcon} from '../SvgAssets';
import { LinearGradient } from "expo-linear-gradient";

interface AlertModalProps {
  show: boolean;
  mainText: string;
  subText: string;
  buttonText: string;
  icon: React.ReactNode;
  onClose?: () => void;
}

export default function AlertModal({
  show,
  mainText,
  subText,
  buttonText,
  icon,
  onClose,
}: AlertModalProps) {
  const {height, fontScale} = useWindowDimensions();
  const centerPosition = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (show) {
      Animated.timing(centerPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(centerPosition, {
        toValue: height / 3444,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
          <Animated.View
            style={[
                styles.modal,
                {
                    transform: [{translateY: centerPosition}],
                    paddingTop: 20
                },
            ]}>
                {/* <LinearGradient
                    style={{width: "100%", height: 100, borderRadius: 10, position: "absolute"}}
                  colors={['rgba(254, 238, 241, 1)', 'rgba(255, 255, 255, 1)']} /> */}
            {icon}
            <View style={{gap: 5}}>
              <BoldText style={{fontSize: 18 / fontScale, textAlign: 'center'}}>
                {mainText}
              </BoldText>
              <MediumText
                style={{
                  fontSize: 15 / fontScale,
                  textAlign: 'center',
                  color: Colors.grayText,
                  paddingHorizontal: 10,
                }}>
                {subText}
              </MediumText>
            </View>
            <View style={{width: "100%", paddingHorizontal: 20, paddingVertical: 20}}>

            <Button
              onPress={onClose}
              variant="primary"
              isLarge={false}
              isWide={true} >
              <MediumText
                style={{color: Colors.white, fontSize: 15 / fontScale}}>
                {buttonText}
              </MediumText>
              <ArrowRightIcon />
            </Button>
            </View>
          </Animated.View>
      
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1, // Ensure backdrop is behind modal
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, 
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modal: {
    backgroundColor: Colors.white,
  
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    zIndex: 3, 
    gap: 15
  },
});
