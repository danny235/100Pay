import React, { useEffect } from "react";
import { View, Platform } from "react-native";
import { Circle, Svg, G } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../components/Colors";

interface ProgressCircleProps {
  percentage: number;
  firstStrokeColor?: string;
  secondStrokeColor?: string;
  circleSize?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage,
  firstStrokeColor = Colors.ash,
  secondStrokeColor = Colors.primary,
  circleSize = 50,
}) => {
  const size = circleSize;
  const strokeWidth = 5;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(percentage, { duration: 250 });
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference - (circumference * progress.value) / 100;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${center}, ${center}`}>
          <Circle
            stroke={firstStrokeColor}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            animatedProps={animatedProps}
            stroke={secondStrokeColor}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            fill="none"
          />
        </G>
      </Svg>
    </View>
  );
};

export default ProgressCircle;
