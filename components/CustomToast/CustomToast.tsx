import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../Colors';

interface CustomToastProps {
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({message}) => {
  const [isVisible, setIsVisible] = useState(true);
  const insets = useSafeAreaInsets();
  const animation = new Animated.Value(-100); // Initial position outside the screen

  useEffect(() => {
    const showAnimation = Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });

    const hideAnimation = Animated.timing(animation, {
      toValue: -100,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });

    if (message) {
      setIsVisible(true);
      showAnimation.start(() => {
        setTimeout(() => {
          hideAnimation.start(() => {
            setIsVisible(false);
          });
        }, 3000); // Hide after 3 seconds
      });
    } else {
      hideAnimation.start(() => {
        setIsVisible(false);
      });
    }
  }, [message]);

  if (!isVisible) {
    return null; // Hide component when there is no message
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          transform: [{translateY: animation}],
        },
      ]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 5,
    elevation: 4,
  },
  message: {
    color: 'black',
  },
});

export default CustomToast;
