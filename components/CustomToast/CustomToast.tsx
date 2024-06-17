import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../Colors';
import { RegularText } from '../styles/styledComponents';
import { CloseCircle, TickCircle, Warning2 } from 'iconsax-react-native';
type ToastType = "success" | "error" | "info" | "string";
interface CustomToastProps {
  message: string;
  type: ToastType | string; // Indicates the type of the toast message
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({message, type, onClose}) => {
  const [isVisible, setIsVisible] = useState(true);
  const insets = useSafeAreaInsets();

  const animation = new Animated.Value(-30); // Initial position outside the screen

  useEffect(() => {
    const showAnimation = Animated.timing(animation, {
      toValue: 30,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });

    const hideAnimation = Animated.timing(animation, {
      toValue: -30,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });

    if (message) {
      setIsVisible(true);
      showAnimation.start(() => {
        setTimeout(() => {
          hideAnimation.start(() => {
            onClose()
            setIsVisible(false);
          });
        }, 3000); // Hide after 3 seconds
      });
    } else {
      hideAnimation.start(() => {
        setIsVisible(false);
        onClose()
      });
    }
  }, [message]);

  if (!isVisible) {
    return null; // Hide component when there is no message
  }

  let iconComponent; // Define a variable to hold the icon component based on type
  switch (type) {
    case "success":
      iconComponent = <TickCircle color={Colors.success700} variant="TwoTone" />;
      break;
    case "error":
      iconComponent = <CloseCircle color={Colors.error5} variant="TwoTone" />;
      break;
    case "info":
      iconComponent = <Warning2 size="32" color="#FF8A65" variant="TwoTone" />;
      break;
    default:
      iconComponent = null; // Handle the default case if needed
      break;
  }

  return (
    <View style={styles.outerContainer}>
      <Animated.View
        className="shadow-md"
        style={[
          styles.container,
          {
            transform: [{ translateY: animation }],
          },
        ]}
      >
        {iconComponent}
        <RegularText style={styles.message}>{message}</RegularText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    padding: 10, // Add padding here
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 2,
    alignItems: "center", // Center the toast horizontally
  },
  container: {
    backgroundColor: Colors.whiteShade,
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10
  },
  message: {
    color: "black",
    borderLeftColor: Colors.ash,
    borderLeftWidth: 1,
    paddingLeft: 10,
  },
});

export default CustomToast;
