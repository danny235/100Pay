import React, { useEffect, useRef } from "react";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import {
  StyledPath1,
  StyledPath2,
  StyledPath3,
  StyledPath5,
} from "../styles/styledComponents";
import { Animated, Easing, View } from "react-native";
import { Colors } from "../Colors";

interface Props {
  width?: number;
  height?: number;
  color?: string;
  onPress?: () => void;
}

export const ArrowRightIcon = ({
  width = 20,
  height = 20,
  color = "#ffffff",
  onPress,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M12.0254 4.94165L17.0837 9.99998L12.0254 15.0583"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M2.91602 10H16.941"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const AddIcon = ({
  width = 20,
  height = 20,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        opacity="0.4"
        d="M5 10H15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 15V5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ArrowForwardIcon = ({
  width = 20,
  height = 20,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.42578 16.5999L12.8591 11.1666C13.5008 10.5249 13.5008 9.4749 12.8591 8.83324L7.42578 3.3999"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const MailIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = "#F20831",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const PhoneIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = "#F20831",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M18.5 9C18.5 8.4 18.03 7.48 17.33 6.73C16.69 6.04 15.84 5.5 15 5.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M22 9C22 5.13 18.87 2 15 2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const CircleIcon = ({ width = 20, height = 20, color = "#9CA3AF" }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M9.58268 17.5C13.9549 17.5 17.4993 13.9555 17.4993 9.58329C17.4993 5.21104 13.9549 1.66663 9.58268 1.66663C5.21043 1.66663 1.66602 5.21104 1.66602 9.58329C1.66602 13.9555 5.21043 17.5 9.58268 17.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3327 18.3333L16.666 16.6666"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const CheckVerify = ({ width = 20, height = 20, color = "#9CA3AF" }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 50 51"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M24.9993 46.3333C36.4577 46.3333 45.8327 36.9583 45.8327 25.5C45.8327 14.0416 36.4577 4.66663 24.9993 4.66663C13.541 4.66663 4.16602 14.0416 4.16602 25.5C4.16602 36.9583 13.541 46.3333 24.9993 46.3333Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.34"
        d="M16.1465 25.5L22.0423 31.3958L33.8548 19.6041"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const BackSpaceIcon = ({ onPress, color = "#F20831" }: Props) => {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      onPress={onPress}
    >
      <Path
        opacity="0.4"
        d="M10.9477 20.5H17.6677C20.4277 20.5 22.6677 18.26 22.6677 15.5V9C22.6677 6.24 20.4277 4 17.6677 4H10.9477C9.53766 4 8.19766 4.59 7.24766 5.64L3.71766 9.52C2.30766 11.07 2.30766 13.43 3.71766 14.98L7.24766 18.86C8.19766 19.91 9.53766 20.5 10.9477 20.5Z"
        fill="#6B7280"
      />
      <Path
        d="M15.258 12.25L17.198 10.31C17.488 10.02 17.488 9.53997 17.198 9.24997C16.908 8.95997 16.428 8.95997 16.138 9.24997L14.198 11.19L12.258 9.24997C11.968 8.95997 11.488 8.95997 11.198 9.24997C10.908 9.53997 10.908 10.02 11.198 10.31L13.138 12.25L11.198 14.19C10.908 14.48 10.908 14.96 11.198 15.25C11.348 15.4 11.538 15.47 11.728 15.47C11.918 15.47 12.108 15.4 12.258 15.25L14.198 13.31L16.138 15.25C16.288 15.4 16.478 15.47 16.668 15.47C16.858 15.47 17.048 15.4 17.198 15.25C17.488 14.96 17.488 14.48 17.198 14.19L15.258 12.25Z"
        fill="#6B7280"
      />
    </Svg>
  );
};

export const NigeriaFlag = ({ width = 24, height = 24 }: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Defs>
        <ClipPath id="clip0_3185_559">
          <Rect y={0.5} width={21} height={15} rx={29} fill="white" />
        </ClipPath>
      </Defs>
      <Rect y={0.5} width={21} height={15} rx={29} fill="white" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.5H7V15.5H0V0.5ZM14 0.5H21V15.5H14V0.5Z"
        fill="#0A6A30"
      />
    </Svg>
  );
};

export const ArrowBackwardIcon = ({
  width = 24,
  height = 24,
  color = "#6B7280",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const EyeLineIcon = ({
  width = 24,
  height = 24,
  color = "#6B7280",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M12.1092 7.8916L7.89258 12.1083C7.35091 11.5666 7.01758 10.8249 7.01758 9.99993C7.01758 8.34993 8.35091 7.0166 10.0009 7.0166C10.8259 7.0166 11.5676 7.34994 12.1092 7.8916Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.8499 4.8084C13.3915 3.7084 11.7249 3.1084 9.99987 3.1084C7.0582 3.1084 4.31654 4.84173 2.4082 7.84173C1.6582 9.01673 1.6582 10.9917 2.4082 12.1667C3.06654 13.2001 3.8332 14.0917 4.66654 14.8084"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M7.01758 16.2751C7.96758 16.6751 8.97591 16.8917 10.0009 16.8917C12.9426 16.8917 15.6842 15.1584 17.5926 12.1584C18.3426 10.9834 18.3426 9.0084 17.5926 7.8334C17.3176 7.40006 17.0176 6.99173 16.7092 6.6084"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M12.9242 10.5833C12.7076 11.7583 11.7492 12.7166 10.5742 12.9333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.89102 12.1084L1.66602 18.3334"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3324 1.66675L12.1074 7.89175"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ForgotPasswordIcon = ({
  width = 24,
  height = 24,
  color = "#F20831",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        opacity="0.4"
        d="M11.02 19.5H7.5C6.88 19.5 6.33 19.48 5.84 19.41C3.21 19.12 2.5 17.88 2.5 14.5V9.5C2.5 6.12 3.21 4.88 5.84 4.59C6.33 4.52 6.88 4.5 7.5 4.5H10.96"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.0195 4.5H16.4995C17.1195 4.5 17.6695 4.52 18.1595 4.59C20.7895 4.88 21.4995 6.12 21.4995 9.5V14.5C21.4995 17.88 20.7895 19.12 18.1595 19.41C17.6695 19.48 17.1195 19.5 16.4995 19.5H15.0195"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 2V22"
        stroke="#EF4444"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M11.0941 12H11.1031"
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M7.09412 12H7.1031"
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const EyeIcon = ({
  width = 24,
  height = 24,
  color = "#6B7280",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        opacity="0.4"
        d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const HomeIcon = ({
  width = 24,
  height = 24,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
        fill={color}
      />
    </Svg>
  );
};

export const DiscoverIcon = ({
  width = 24,
  height = 24,
  color = "#9CA3AF",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.8011 2.1L7.87107 4.59C6.42107 4.95 4.95107 6.42 4.59107 7.87L2.10107 17.8C1.35107 20.8 3.19107 22.65 6.20107 21.9L16.1311 19.42C17.5711 19.06 19.0511 17.58 19.4111 16.14L21.9011 6.2C22.6511 3.2 20.8011 1.35 17.8011 2.1Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const SettingsIcon = ({
  width = 24,
  height = 24,
  color = "#9CA3AF",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        opacity="0.34"
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const NotifictionIcon = ({
  width = 24,
  height = 24,
  color = "#6B7280",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        opacity="0.4"
        d="M12 6.43994V9.76994"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M12.0189 2C8.33892 2 5.35892 4.98 5.35892 8.66V10.76C5.35892 11.44 5.07892 12.46 4.72892 13.04L3.45892 15.16C2.67892 16.47 3.21892 17.93 4.65892 18.41C9.43892 20 14.6089 20 19.3889 18.41C20.7389 17.96 21.3189 16.38 20.5889 15.16L19.3189 13.04C18.9689 12.46 18.6889 11.43 18.6889 10.76V8.66C18.6789 5 15.6789 2 12.0189 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        opacity="0.4"
        d="M15.3319 18.8201C15.3319 20.6501 13.8319 22.1501 12.0019 22.1501C11.0919 22.1501 10.2519 21.7701 9.65187 21.1701C9.05187 20.5701 8.67188 19.7301 8.67188 18.8201"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </Svg>
  );
};

export const CopyIcon = ({ width = 16, height = 16, color = "#9CA3AF" }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
      <Path
        d="M8 6.45V8.55C8 10.3 7.3 11 5.55 11H3.45C1.7 11 1 10.3 1 8.55V6.45C1 4.7 1.7 4 3.45 4H5.55C7.3 4 8 4.7 8 6.45Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M11 3.45V5.55C11 7.3 10.3 8 8.55 8H8V6.45C8 4.7 7.3 4 5.55 4H4V3.45C4 1.7 4.7 1 6.45 1H8.55C10.3 1 11 1.7 11 3.45Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const WalletIcon = ({
  width = 20,
  height = 20,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        opacity="0.4"
        d="M10.832 9.29175H5.83203"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M1.66797 9.2917V5.4417C1.66797 3.7417 3.04297 2.3667 4.74297 2.3667H9.4263C11.1263 2.3667 12.5013 3.42503 12.5013 5.12503"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.568 10.1667C14.1513 10.5667 13.9513 11.1833 14.118 11.8166C14.3263 12.5916 15.093 13.0833 15.893 13.0833H16.668V14.2917C16.668 16.1333 15.1763 17.625 13.3346 17.625H5.0013C3.15964 17.625 1.66797 16.1333 1.66797 14.2917V8.45833C1.66797 6.61667 3.15964 5.125 5.0013 5.125H13.3346C15.168 5.125 16.668 6.625 16.668 8.45833V9.66663H15.768C15.3013 9.66663 14.8763 9.84999 14.568 10.1667Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3329 10.5168V12.2334C18.3329 12.7001 17.9495 13.0834 17.4745 13.0834H15.8662C14.9662 13.0834 14.1412 12.4251 14.0662 11.5251C14.0162 11.0001 14.2162 10.5084 14.5662 10.1668C14.8745 9.85011 15.2995 9.66675 15.7662 9.66675H17.4745C17.9495 9.66675 18.3329 10.0501 18.3329 10.5168Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ArrowDownIcon = ({
  width = 16,
  height = 16,
  color = "#9CA3AF",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        opacity="0.4"
        d="M10.3218 8.82004L7.79512 5.45337H4.05512C3.41512 5.45337 3.09512 6.2267 3.54845 6.68004L7.00179 10.1334C7.55512 10.6867 8.45512 10.6867 9.00845 10.1334L10.3218 8.82004Z"
        fill={color}
      />
      <Path
        d="M10.3736 8.05896L8.79336 5.95337H11.9463C12.1394 5.95337 12.2402 6.18875 12.1044 6.32815L10.3736 8.05896Z"
        fill={color}
        stroke={color}
      />
    </Svg>
  );
};

export const ArrowFrontIcon = ({
  width = 16,
  height = 16,
  color = "#6B7280",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        opacity="0.4"
        d="M8.81979 5.67993L5.45312 8.2066V11.9466C5.45312 12.5866 6.22646 12.9066 6.67979 12.4533L10.1331 8.99993C10.6865 8.4466 10.6865 7.5466 10.1331 6.99326L8.81979 5.67993Z"
        fill={color}
      />
      <Path
        d="M5.45312 4.05328V8.20662L8.81979 5.67995L6.67979 3.53995C6.22646 3.09328 5.45312 3.41328 5.45312 4.05328Z"
        fill={color}
      />
    </Svg>
  );
};

export const PayIcon = ({
  width = 20,
  height = 20,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G opacity="0.4">
        <Path
          d="M10.832 9.16658L17.6654 2.33325"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M18.332 5.66675V1.66675H14.332"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Path
        d="M9.16797 1.66675H7.5013C3.33464 1.66675 1.66797 3.33341 1.66797 7.50008V12.5001C1.66797 16.6667 3.33464 18.3334 7.5013 18.3334H12.5013C16.668 18.3334 18.3346 16.6667 18.3346 12.5001V10.8334"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const RecieveIcon = ({
  width = 20,
  height = 20,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G opacity="0.4">
        <Path
          d="M18.3333 1.66675L11.5 8.50008"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.832 5.1416V9.1666H14.857"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Path
        d="M9.16797 1.66675H7.5013C3.33464 1.66675 1.66797 3.33341 1.66797 7.50008V12.5001C1.66797 16.6667 3.33464 18.3334 7.5013 18.3334H12.5013C16.668 18.3334 18.3346 16.6667 18.3346 12.5001V10.8334"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ScanIcon = ({
  width = 24,
  height = 24,
  color = "#9CA3AF",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 2H17.5C19.99 2 22 4.01 22 6.5V9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 16V17.5C22 19.99 19.99 22 17.5 22H16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 22H6.5C4.01 22 2 19.99 2 17.5V15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G opacity="0.4">
        <Path
          d="M17 9.5V14.5C17 16.5 16 17.5 14 17.5H10C8 17.5 7 16.5 7 14.5V9.5C7 7.5 8 6.5 10 6.5H14C16 6.5 17 7.5 17 9.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19 12H5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export const ScanRedIcon = ({
  width = 24,
  height = 24,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        opacity="0.4"
        d="M2.30964 8.33341C1.9513 8.33341 1.66797 8.05008 1.66797 7.69175V5.76675C1.66797 3.50841 3.50964 1.66675 5.76797 1.66675H7.69297C8.0513 1.66675 8.33464 1.95008 8.33464 2.30841C8.33464 2.66675 8.0513 2.95008 7.69297 2.95008H5.76797C4.20964 2.95008 2.9513 4.21675 2.9513 5.76675V7.69175C2.9513 8.05008 2.65964 8.33341 2.30964 8.33341Z"
        fill={color}
      />
      <Path
        opacity="0.4"
        d="M17.693 8.33341C17.343 8.33341 17.0513 8.05008 17.0513 7.69175V5.76675C17.0513 4.20841 15.7846 2.95008 14.2346 2.95008H12.3096C11.9513 2.95008 11.668 2.65841 11.668 2.30841C11.668 1.95841 11.9513 1.66675 12.3096 1.66675H14.2346C16.493 1.66675 18.3346 3.50841 18.3346 5.76675V7.69175C18.3346 8.05008 18.0513 8.33341 17.693 8.33341Z"
        fill={color}
      />
      <Path
        d="M14.2336 18.3333H13.0753C12.7253 18.3333 12.4336 18.05 12.4336 17.6917C12.4336 17.3417 12.7169 17.05 13.0753 17.05H14.2336C15.7919 17.05 17.0503 15.7833 17.0503 14.2333V13.0833C17.0503 12.7333 17.3336 12.4417 17.6919 12.4417C18.0419 12.4417 18.3336 12.725 18.3336 13.0833V14.2333C18.3336 16.4917 16.4919 18.3333 14.2336 18.3333Z"
        fill={color}
      />
      <Path
        d="M7.69297 18.3334H5.76797C3.50964 18.3334 1.66797 16.4917 1.66797 14.2334V12.3084C1.66797 11.9501 1.9513 11.6667 2.30964 11.6667C2.66797 11.6667 2.9513 11.9501 2.9513 12.3084V14.2334C2.9513 15.7917 4.21797 17.0501 5.76797 17.0501H7.69297C8.04297 17.0501 8.33464 17.3334 8.33464 17.6917C8.33464 18.0501 8.0513 18.3334 7.69297 18.3334Z"
        fill={color}
      />
      <Path
        d="M15.3849 9.3584H14.2516H5.75156H4.61823C4.2599 9.3584 3.97656 9.65007 3.97656 10.0001C3.97656 10.3501 4.2599 10.6417 4.61823 10.6417H5.75156H14.2516H15.3849C15.7432 10.6417 16.0266 10.3501 16.0266 10.0001C16.0266 9.65007 15.7432 9.3584 15.3849 9.3584Z"
        fill={color}
      />
      <Path
        d="M5.75 11.6167V11.8917C5.75 13.275 6.86667 14.3917 8.25 14.3917H11.75C13.1333 14.3917 14.25 13.275 14.25 11.8917V11.6167C14.25 11.5167 14.175 11.4417 14.075 11.4417H5.925C5.825 11.4417 5.75 11.5167 5.75 11.6167Z"
        fill={color}
      />
      <Path
        opacity="0.4"
        d="M13.7494 8.0584H6.25061C6.27701 6.97445 7.15952 6.1084 8.25 6.1084H11.75C12.8405 6.1084 13.723 6.97445 13.7494 8.0584Z"
        fill={color}
        stroke={color}
      />
    </Svg>
  );
};

export const ScanWhiteIcon = ({
  width = 45,
  height = 45,
  color = "white",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 40 40" fill="none">
      <Path
        opacity="0.4"
        d="M4.61536 16.6666C3.8987 16.6666 3.33203 16.0999 3.33203 15.3833V11.5333C3.33203 7.01659 7.01536 3.33325 11.532 3.33325H15.382C16.0987 3.33325 16.6654 3.89992 16.6654 4.61659C16.6654 5.33325 16.0987 5.89992 15.382 5.89992H11.532C8.41536 5.89992 5.8987 8.43325 5.8987 11.5333V15.3833C5.8987 16.0999 5.31536 16.6666 4.61536 16.6666Z"
        fill={color}
      />
      <Path
        opacity="0.4"
        d="M35.382 16.6666C34.682 16.6666 34.0987 16.0999 34.0987 15.3833V11.5333C34.0987 8.41659 31.5654 5.89992 28.4654 5.89992H24.6154C23.8987 5.89992 23.332 5.31659 23.332 4.61659C23.332 3.91659 23.8987 3.33325 24.6154 3.33325H28.4654C32.982 3.33325 36.6654 7.01659 36.6654 11.5333V15.3833C36.6654 16.0999 36.0987 16.6666 35.382 16.6666Z"
        fill={color}
      />
      <Path
        d="M28.4672 36.6666H26.1505C25.4505 36.6666 24.8672 36.1 24.8672 35.3833C24.8672 34.6833 25.4339 34.1 26.1505 34.1H28.4672C31.5839 34.1 34.1005 31.5666 34.1005 28.4666V26.1666C34.1005 25.4666 34.6672 24.8833 35.3839 24.8833C36.0839 24.8833 36.6672 25.45 36.6672 26.1666V28.4666C36.6672 32.9833 32.9839 36.6666 28.4672 36.6666Z"
        fill={color}
      />
      <Path
        d="M15.382 36.6666H11.532C7.01536 36.6666 3.33203 32.9833 3.33203 28.4666V24.6166C3.33203 23.8999 3.8987 23.3333 4.61536 23.3333C5.33203 23.3333 5.8987 23.8999 5.8987 24.6166V28.4666C5.8987 31.5833 8.43203 34.0999 11.532 34.0999H15.382C16.082 34.0999 16.6654 34.6666 16.6654 35.3833C16.6654 36.0999 16.0987 36.6666 15.382 36.6666Z"
        fill={color}
      />
      <Path
        d="M30.7659 18.7166H28.4992H11.4992H9.23255C8.51589 18.7166 7.94922 19.2999 7.94922 19.9999C7.94922 20.6999 8.51589 21.2832 9.23255 21.2832H11.4992H28.4992H30.7659C31.4825 21.2832 32.0492 20.6999 32.0492 19.9999C32.0492 19.2999 31.4825 18.7166 30.7659 18.7166Z"
        fill={color}
      />
      <Path
        d="M11.5 23.2333V23.7833C11.5 26.55 13.7333 28.7833 16.5 28.7833H23.5C26.2667 28.7833 28.5 26.55 28.5 23.7833V23.2333C28.5 23.0333 28.35 22.8833 28.15 22.8833H11.85C11.65 22.8833 11.5 23.0333 11.5 23.2333Z"
        fill={color}
      />
      <Path
        opacity="0.4"
        d="M11.5 16.7666V16.2166C11.5 13.4499 13.7333 11.2166 16.5 11.2166H23.5C26.2667 11.2166 28.5 13.4499 28.5 16.2166V16.7666C28.5 16.9666 28.35 17.1166 28.15 17.1166H11.85C11.65 17.1166 11.5 16.9666 11.5 16.7666Z"
        fill={color}
      />
    </Svg>
  );
};

export const GalleryIcon = ({
  width = 35,
  height = 35,
  color = "white",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 36 36" fill="none">
      <Path
        opacity="0.4"
        d="M32.2839 12.1897V21.071L29.9068 19.0293C28.7693 18.0522 26.9318 18.0522 25.7943 19.0293L19.7276 24.2355C18.5901 25.2126 16.7526 25.2126 15.6151 24.2355L15.1193 23.8272C14.0839 22.923 12.4359 22.8355 11.2693 23.623L4.09427 28.4355L3.93385 28.5522C3.39427 27.3855 3.11719 26.0001 3.11719 24.4105V12.1897C3.11719 6.88138 6.28177 3.7168 11.5901 3.7168H23.8109C29.1193 3.7168 32.2839 6.88138 32.2839 12.1897Z"
        fill={color}
      />
      <Path
        d="M13.3224 15.9375C15.2393 15.9375 16.7932 14.3836 16.7932 12.4667C16.7932 10.5498 15.2393 8.99585 13.3224 8.99585C11.4055 8.99585 9.85156 10.5498 9.85156 12.4667C9.85156 14.3836 11.4055 15.9375 13.3224 15.9375Z"
        fill={color}
      />
      <Path
        d="M32.2836 21.0709V24.4104C32.2836 29.7188 29.119 32.8834 23.8107 32.8834H11.5898C7.87109 32.8834 5.18776 31.3229 3.93359 28.5521L4.09401 28.4354L11.269 23.6229C12.4357 22.8354 14.0836 22.9229 15.119 23.8271L15.6148 24.2354C16.7523 25.2125 18.5898 25.2125 19.7273 24.2354L25.794 19.0292C26.9315 18.0521 28.769 18.0521 29.9065 19.0292L32.2836 21.0709Z"
        fill={color}
      />
    </Svg>
  );
};

export const BulbRedIcon = ({
  width = 35,
  height = 35,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 35 35" fill="none">
      <Path
        opacity="0.3"
        d="M28.0141 9.27496C26.4974 6.21246 23.5661 3.95204 20.1682 3.20829C16.6099 2.42079 12.9641 3.26662 10.1786 5.51245C7.37865 7.7437 5.78906 11.0833 5.78906 14.6562C5.78906 18.4333 8.04948 22.3854 11.462 24.675V25.8854C11.4474 26.2937 11.4328 26.9208 11.9286 27.4312C12.4391 27.9562 13.1974 28.0145 13.7953 28.0145H21.2766C22.0641 28.0145 22.662 27.7958 23.0703 27.3875C23.6245 26.8187 23.6099 26.0895 23.5953 25.6958V24.675C28.1161 21.627 30.9599 15.1958 28.0141 9.27496Z"
        fill={color}
      />
      <Path
        d="M22.2544 32.0834C22.1669 32.0834 22.0648 32.0688 21.9773 32.0397C19.0461 31.2084 15.969 31.2084 13.0378 32.0397C12.4982 32.1855 11.9294 31.8793 11.7836 31.3397C11.6232 30.8001 11.944 30.2313 12.4836 30.0855C15.7794 29.1522 19.2503 29.1522 22.5461 30.0855C23.0857 30.2459 23.4065 30.8001 23.2461 31.3397C23.1003 31.7918 22.6919 32.0834 22.2544 32.0834Z"
        fill={color}
      />
      <Path
        d="M17.4986 20.1978C17.309 20.1978 17.1194 20.1541 16.959 20.052C16.434 19.7457 16.259 19.0749 16.5506 18.5645L17.7902 16.4061H16.5652C15.8361 16.4061 15.2381 16.0853 14.9173 15.5457C14.5965 14.9916 14.6256 14.3207 14.9902 13.6791L16.5506 10.9666C16.8569 10.4416 17.5277 10.2666 18.0381 10.5582C18.5631 10.8645 18.7381 11.5353 18.4465 12.0457L17.2069 14.2186H18.4319C19.1611 14.2186 19.759 14.5395 20.0798 15.0791C20.4006 15.6332 20.3715 16.3041 20.0069 16.9457L18.4465 19.6582C18.2423 20.0082 17.8777 20.1978 17.4986 20.1978Z"
        fill={color}
      />
    </Svg>
  );
};

export const BulbIcon = ({
  width = 35,
  height = 35,
  color = "white",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 36 36" fill="none">
      <Path
        opacity="0.4"
        d="M28.2172 10.0752C26.7005 7.01275 23.7693 4.75233 20.3714 4.00858C16.813 3.22108 13.1672 4.06691 10.3818 6.31275C7.58177 8.544 5.99219 11.8836 5.99219 15.4565C5.99219 19.2336 8.2526 23.1857 11.6651 25.4752V26.6857C11.6505 27.094 11.6359 27.7211 12.1318 28.2315C12.6422 28.7565 13.4005 28.8148 13.9984 28.8148H21.4797C22.2672 28.8148 22.8651 28.5961 23.2734 28.1877C23.8276 27.619 23.813 26.8898 23.7984 26.4961V25.4752C28.3193 22.4273 31.163 15.9961 28.2172 10.0752Z"
        fill={color}
      />
      <Path
        d="M22.4537 32.8832C22.3662 32.8832 22.2641 32.8686 22.1766 32.8395C19.2453 32.0082 16.1682 32.0082 13.237 32.8395C12.6974 32.9853 12.1287 32.6791 11.9828 32.1395C11.8224 31.5999 12.1432 31.0311 12.6828 30.8853C15.9787 29.952 19.4495 29.952 22.7453 30.8853C23.2849 31.0457 23.6057 31.5999 23.4453 32.1395C23.2995 32.5916 22.8912 32.8832 22.4537 32.8832Z"
        fill={color}
      />
      <Path
        d="M17.6978 20.9981C17.5082 20.9981 17.3186 20.9544 17.1582 20.8523C16.6332 20.546 16.4582 19.8752 16.7499 19.3648L17.9894 17.2064H16.7644C16.0353 17.2064 15.4374 16.8856 15.1165 16.346C14.7957 15.7919 14.8249 15.121 15.1894 14.4794L16.7499 11.7669C17.0561 11.2419 17.7269 11.0669 18.2374 11.3585C18.7624 11.6648 18.9374 12.3356 18.6457 12.846L17.4061 15.0189H18.6311C19.3603 15.0189 19.9582 15.3398 20.279 15.8794C20.5999 16.4335 20.5707 17.1044 20.2061 17.746L18.6457 20.4585C18.4415 20.8085 18.0769 20.9981 17.6978 20.9981Z"
        fill={color}
      />
    </Svg>
  );
};

export const PaySIcon = ({
  width = 33,
  height = 19,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 16" fill="none">
      <Path
        d="M21.7222 5.31413C20.4749 5.31413 19.3936 7.00897 19.2294 8.9752C19.1271 10.2013 19.6311 10.987 20.388 10.987C21.6508 10.987 22.7282 9.32252 22.8981 7.32592C22.9947 6.10936 22.4927 5.31413 21.7222 5.31413Z"
        fill="#F20831"
      />
      <Path
        d="M28.2294 0H4.6724C4.07631 0.0205398 3.50459 0.237627 3.04926 0.616319C2.59394 0.995011 2.28149 1.51328 2.16222 2.0877L0.0343618 13.7276C-0.176107 14.8815 0.602048 15.8153 1.77218 15.8153H25.3292C25.9253 15.7947 26.497 15.5777 26.9524 15.199C27.4077 14.8203 27.7201 14.302 27.8394 13.7276L29.9634 2.0877C30.1816 0.93567 29.4015 0 28.2294 0ZM6.6033 13.069H5.29608C4.83459 13.069 4.62412 12.8109 4.74191 12.3421L6.45269 5.14524H4.88094C4.41945 5.14524 4.20898 4.88712 4.34221 4.41834L4.5353 3.67625C4.57644 3.46718 4.69185 3.27928 4.86092 3.14613C5.02999 3.01297 5.24171 2.94323 5.45828 2.94935H9.09803C9.57497 2.94935 9.76999 3.20747 9.63675 3.67625L7.54172 12.3364C7.50069 12.5489 7.38334 12.7397 7.21107 12.8742C7.03881 13.0087 6.82311 13.0778 6.6033 13.069ZM25.6807 7.12286C25.3872 10.634 22.8886 13.2512 19.8261 13.2512C18.573 13.2512 17.5979 12.7388 17.0167 11.8581C17.5406 10.9251 17.8886 9.9066 18.0439 8.85185C17.7666 9.7366 17.3123 10.558 16.7077 11.2679C16.2022 11.8799 15.5658 12.3749 14.8436 12.7177C14.1214 13.0605 13.3312 13.2426 12.5293 13.2512C10.2971 13.2512 8.9397 11.6323 9.14437 9.18019C9.43787 5.66906 11.9519 3.05184 14.9989 3.05184C16.2617 3.05184 17.2387 3.55858 17.8161 4.43921C17.2878 5.37443 16.9371 6.39634 16.7811 7.45499C17.6153 4.84536 19.7701 3.05184 22.2938 3.05184C24.5433 3.05184 25.8873 4.65557 25.6807 7.12286Z"
        fill="#F20831"
      />
      <Path
        d="M14.4276 5.31413C13.1802 5.31413 12.0989 7.00897 11.9348 8.9752C11.8324 10.2013 12.3364 10.987 13.0933 10.987C14.3561 10.987 15.4336 9.32252 15.6035 7.32592C15.7 6.10936 15.1961 5.31413 14.4276 5.31413Z"
        fill="#F20831"
      />
    </Svg>
  );
};

export const SecuritySafeIcon = ({
  width = 100,
  height = 100,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100" fill="none">
      <Path
        d="M87.125 46.3333C87.125 66.7083 72.3334 85.7916 52.1251 91.3749C50.7501 91.7499 49.25 91.7499 47.875 91.3749C27.6666 85.7916 12.875 66.7083 12.875 46.3333V28.0416C12.875 24.6249 15.4584 20.7499 18.6667 19.4582L41.875 9.95837C47.0833 7.83337 52.9583 7.83337 58.1666 9.95837L81.375 19.4582C84.5417 20.7499 87.1667 24.6249 87.1667 28.0416L87.125 46.3333Z"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G opacity="0.4">
        <Path
          d="M50.0013 52.0834C54.6037 52.0834 58.3346 48.3524 58.3346 43.75C58.3346 39.1476 54.6037 35.4167 50.0013 35.4167C45.3989 35.4167 41.668 39.1476 41.668 43.75C41.668 48.3524 45.3989 52.0834 50.0013 52.0834Z"
          stroke={color}
          strokeWidth="5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M50 52.0834V64.5834"
          stroke={color}
          strokeWidth="5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export const PasswordCheckIcon = ({
  width = 25,
  height = 25,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G clip-path="url(#clip0_4292_10706)">
        <Path
          opacity="0.4"
          d="M9.18203 16.25H6.2487C5.73203 16.25 5.2737 16.2333 4.86536 16.175C2.6737 15.9333 2.08203 14.9 2.08203 12.0833V7.91667C2.08203 5.1 2.6737 4.06667 4.86536 3.825C5.2737 3.76667 5.73203 3.75 6.2487 3.75H9.13203"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.5156 3.75H13.749C14.2656 3.75 14.724 3.76667 15.1323 3.825C17.324 4.06667 17.9156 5.1 17.9156 7.91667V12.0833C17.9156 14.9 17.324 15.9333 15.1323 16.175C14.724 16.2333 14.2656 16.25 13.749 16.25H12.5156"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.5 1.66663V18.3333"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          opacity="0.4"
          d="M9.24412 10H9.25161"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          opacity="0.4"
          d="M5.91209 10H5.91957"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4292_10706">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const TickCircleIcon = ({
  width = 25,
  height = 25,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10.0013 18.3333C14.5846 18.3333 18.3346 14.5833 18.3346 9.99996C18.3346 5.41663 14.5846 1.66663 10.0013 1.66663C5.41797 1.66663 1.66797 5.41663 1.66797 9.99996C1.66797 14.5833 5.41797 18.3333 10.0013 18.3333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.34"
        d="M6.45703 10.0001L8.81536 12.3584L13.5404 7.64172"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ActiveRadioIcon = ({
  width = 25,
  height = 25,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Rect x="0.5" y="0.5" width="19" height="19" rx="9.5" fill="white" />
      <Rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#F20831" />
      <Path
        d="M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10Z"
        fill="#F20831"
      />
    </Svg>
  );
};

export const InActiveRadioIcon = ({
  width = 25,
  height = 25,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Rect x="0.5" y="0.5" width="19" height="19" rx="9.5" fill="white" />
      <Rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#E5E7EB" />
    </Svg>
  );
};

export const NairaIcon = ({
  width = 25,
  height = 25,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width="23" height="21" viewBox="0 0 23 21" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.10442 12.75V9.25H0V6.75H3.10442V0H10.9476L12.5496 6.75H15.8534V0H19.9156V6.75H23V9.25H19.9156V12.75H23V15.25H19.9156V21H12.0725L10.7077 15.25H7.1666V21H3.10442V15.25H0V12.75H3.10442ZM7.1666 12.75H10.1144L9.28367 9.25H7.1666V12.75ZM14.5671 15.25L15.291 18.3H15.8534V15.25H14.5671ZM15.8534 12.75H13.9737L13.143 9.25H15.8534V12.75ZM8.69031 6.75H7.1666V2.7H7.72906L8.69031 6.75Z"
        fill="#16A34A"
      />
    </Svg>
  );
};

export const LinkIcon = ({
  width = 29,
  height = 29,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 26 26" fill="none">
      <Path
        d="M16.2383 18.9584H17.8741C21.1458 18.9584 23.8324 16.2826 23.8324 13.0001C23.8324 9.72842 21.1566 7.04175 17.8741 7.04175H16.2383"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.7513 7.04175H8.1263C4.8438 7.04175 2.16797 9.71758 2.16797 13.0001C2.16797 16.2717 4.8438 18.9584 8.1263 18.9584H9.7513"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M8.66797 13H17.3346"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const MoneyIcon = ({
  width = 29,
  height = 29,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
      <Path
        d="M19.832 23.9166H8.16536C4.66536 23.9166 2.33203 22.1666 2.33203 18.0833V9.91659C2.33203 5.83325 4.66536 4.08325 8.16536 4.08325H19.832C23.332 4.08325 25.6654 5.83325 25.6654 9.91659V18.0833C25.6654 22.1666 23.332 23.9166 19.832 23.9166Z"
        stroke="#F20831"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 17.5C15.933 17.5 17.5 15.933 17.5 14C17.5 12.067 15.933 10.5 14 10.5C12.067 10.5 10.5 12.067 10.5 14C10.5 15.933 12.067 17.5 14 17.5Z"
        stroke="#F20831"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M9.91667 7H8.16667C6.55667 7 5.25 8.30667 5.25 9.91667V11.6667"
        stroke="#F20831"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M18.082 7H19.832C21.442 7 22.7487 8.30667 22.7487 9.91667V11.6667"
        stroke="#F20831"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M9.91667 20.9999H8.16667C6.55667 20.9999 5.25 19.6933 5.25 18.0833V16.3333"
        stroke="#F20831"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M18.082 20.9999H19.832C21.442 20.9999 22.7487 19.6933 22.7487 18.0833V16.3333"
        stroke="#F20831"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const AssetIcon = ({
  width = 25,
  height = 26,
  color = "#9CA3AF",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
      <Path
        d="M8.0008 22.5H16.0008C20.0208 22.5 20.7408 20.89 20.9508 18.93L21.7008 10.93C21.9708 8.49 21.2708 6.5 17.0008 6.5H7.0008C2.7308 6.5 2.0308 8.49 2.3008 10.93L3.0508 18.93C3.2608 20.89 3.9808 22.5 8.0008 22.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 6.5V5.7C8 3.93 8 2.5 11.2 2.5H12.8C16 2.5 16 3.93 16 5.7V6.5"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 13.5V14.5C14 14.51 14 14.51 14 14.52C14 15.61 13.99 16.5 12 16.5C10.02 16.5 10 15.62 10 14.53V13.5C10 12.5 10 12.5 11 12.5H13C14 12.5 14 12.5 14 13.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.65 11.5C19.34 13.18 16.7 14.18 14 14.52"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.61914 11.77C4.86914 13.31 7.40914 14.24 9.99914 14.53"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const AssetFilledIcon = ({
  width = 25,
  height = 25,
  color = "#9CA3AF",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M17.5739 5.81676C16.8656 5.03343 15.6822 4.64176 13.9656 4.64176H13.7656V4.60843C13.7656 3.20843 13.7656 1.4751 10.6322 1.4751H9.36556C6.23222 1.4751 6.23222 3.21676 6.23222 4.60843V4.6501H6.03222C4.30722 4.6501 3.13223 5.04176 2.42389 5.8251C1.59889 6.74176 1.62389 7.9751 1.70723 8.81676L1.71556 8.8751L1.77635 9.51338C1.79061 9.66315 1.87136 9.79853 1.99736 9.88076C2.19941 10.0126 2.50915 10.2114 2.69889 10.3168C2.81556 10.3918 2.94056 10.4584 3.06556 10.5251C4.49056 11.3084 6.05723 11.8334 7.64889 12.0918C7.72389 12.8751 8.06556 13.7918 9.89056 13.7918C11.7156 13.7918 12.0739 12.8834 12.1322 12.0751C13.8322 11.8001 15.4739 11.2084 16.9572 10.3418C17.0072 10.3168 17.0406 10.2918 17.0822 10.2668C17.4024 10.0858 17.7343 9.8641 18.0389 9.64542C18.1521 9.56415 18.2243 9.43801 18.2397 9.29951L18.2489 9.21676L18.2906 8.8251C18.2989 8.7751 18.2989 8.73343 18.3072 8.6751C18.3739 7.83343 18.3572 6.68343 17.5739 5.81676ZM10.9072 11.5251C10.9072 12.4084 10.9072 12.5418 9.88222 12.5418C8.85722 12.5418 8.85722 12.3834 8.85722 11.5334V10.4834H10.9072V11.5251ZM7.42389 4.64176V4.60843C7.42389 3.19176 7.42389 2.66676 9.36556 2.66676H10.6322C12.5739 2.66676 12.5739 3.2001 12.5739 4.60843V4.6501H7.42389V4.64176Z"
        fill={color}
      />
      <Path
        d="M17.2589 11.509C17.613 11.3417 18.0202 11.6223 17.9848 12.0123L17.6992 15.1583C17.5242 16.8249 16.8409 18.5249 13.1742 18.5249H6.82422C3.15755 18.5249 2.47422 16.8249 2.29922 15.1666L2.02851 12.1888C1.99347 11.8033 2.39179 11.5233 2.74482 11.6819C3.70402 12.113 5.31603 12.8064 6.35201 13.0854C6.51602 13.1295 6.64917 13.2476 6.72357 13.4003C7.23777 14.4555 8.32696 15.0166 9.89088 15.0166C11.4394 15.0166 12.5419 14.4339 13.058 13.3755C13.1326 13.2227 13.2656 13.1047 13.4297 13.0603C14.5315 12.7618 16.2528 11.9845 17.2589 11.509Z"
        fill={color}
      />
    </Svg>
  );
};

export const EditIcon = ({
  width = 19,
  height = 18,
  color = "#6B7280",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 16" fill="none">
      <Path
        opacity="0.4"
        d="M7.83203 1.33331H6.4987C3.16536 1.33331 1.83203 2.66665 1.83203 5.99998V9.99998C1.83203 13.3333 3.16536 14.6666 6.4987 14.6666H10.4987C13.832 14.6666 15.1654 13.3333 15.1654 9.99998V8.66665"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.1933 2.01332L5.93992 7.26665C5.73992 7.46665 5.53992 7.85999 5.49992 8.14665L5.21325 10.1533C5.10659 10.88 5.61992 11.3867 6.34659 11.2867L8.35325 11C8.63325 10.96 9.02659 10.76 9.23325 10.56L14.4866 5.30665C15.3933 4.39999 15.8199 3.34665 14.4866 2.01332C13.1533 0.679985 12.0999 1.10665 11.1933 2.01332Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M10.4414 2.76666C10.8881 4.36 12.1347 5.60666 13.7347 6.06"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const TransactionIcon = ({
  width = 27,
  height = 28,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
      <Path
        d="M20 8.75V18.5C20 21.5 18.21 22.5 16 22.5H8C5.79 22.5 4 21.5 4 18.5V8.75C4 5.5 5.79 4.75 8 4.75C8 5.37 8.24997 5.93 8.65997 6.34C9.06997 6.75 9.63 7 10.25 7H13.75C14.99 7 16 5.99 16 4.75C18.21 4.75 20 5.5 20 8.75Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 4.75C16 5.99 14.99 7 13.75 7H10.25C9.63 7 9.06997 6.75 8.65997 6.34C8.24997 5.93 8 5.37 8 4.75C8 3.51 9.01 2.5 10.25 2.5H13.75C14.37 2.5 14.93 2.75 15.34 3.16C15.75 3.57 16 4.13 16 4.75Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M8 12.5H12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M8 16.5H16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ReferralIcon = ({
  width = 27,
  height = 28,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
      <G opacity="0.4">
        <Path
          d="M18.5 20H14.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.5 22V18"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Path
        opacity="0.4"
        d="M12.1586 11.37C12.0586 11.36 11.9386 11.36 11.8286 11.37C9.44863 11.29 7.55863 9.34 7.55863 6.94C7.54863 4.49 9.53863 2.5 11.9886 2.5C14.4386 2.5 16.4286 4.49 16.4286 6.94C16.4286 9.34 14.5286 11.29 12.1586 11.37Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9891 22.31C10.1691 22.31 8.35906 21.85 6.97906 20.93C4.55906 19.31 4.55906 16.67 6.97906 15.06C9.72906 13.22 14.2391 13.22 16.9891 15.06"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const CSServiceIcon = ({
  width = 27,
  height = 28,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
      <Path
        d="M5.48155 18.99V16.07C5.48155 15.1 6.24155 14.23 7.32155 14.23C8.29155 14.23 9.16155 14.99 9.16155 16.07V18.88C9.16155 20.83 7.54154 22.45 5.59154 22.45C3.64154 22.45 2.02153 20.82 2.02153 18.88V12.72C1.91153 7.09997 6.35154 2.54999 11.9715 2.54999C17.5915 2.54999 22.0215 7.09999 22.0215 12.61V18.77C22.0215 20.72 20.4016 22.34 18.4516 22.34C16.5016 22.34 14.8815 20.72 14.8815 18.77V15.96C14.8815 14.99 15.6415 14.12 16.7215 14.12C17.6915 14.12 18.5615 14.88 18.5615 15.96V18.99"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M15.5309 9.61999H14.7209C14.5009 9.61999 14.2909 9.75 14.1909 9.94L13.4409 11.44C13.3309 11.66 13.0209 11.66 12.9109 11.44L11.071 7.77002C10.961 7.56002 10.6609 7.55001 10.5509 7.76001L9.71094 9.30999C9.61094 9.49999 9.41095 9.61999 9.19095 9.61999H8.46094"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const RateIcon = ({
  width = 27,
  height = 28,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
      <Path
        d="M17.1984 22.5C19.8494 22.5 21.9984 20.351 21.9984 17.7C21.9984 15.049 19.8494 12.9 17.1984 12.9C14.5475 12.9 12.3984 15.049 12.3984 17.7C12.3984 20.351 14.5475 22.5 17.1984 22.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.9902 17.76H15.4102"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.1992 16.01V19.6"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M22 9.19C22 11.16 21.49 12.9 20.69 14.41C19.81 13.48 18.57 12.9 17.2 12.9C14.55 12.9 12.4 15.05 12.4 17.7C12.4 18.93 12.87 20.05 13.63 20.9C13.26 21.07 12.92 21.21 12.62 21.31C12.28 21.43 11.72 21.43 11.38 21.31C8.48 20.32 2 16.19 2 9.19C2 6.1 4.49 3.59998 7.56 3.59998C9.37 3.59998 10.99 4.48002 12 5.83002C13.01 4.48002 14.63 3.59998 16.44 3.59998C19.51 3.59998 22 6.1 22 9.19Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const InfoIcon = ({
  width = 27,
  height = 28,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
      <Path
        opacity="0.4"
        d="M21.25 12.5C21.25 17.6086 17.1086 21.75 12 21.75C6.89137 21.75 2.75 17.6086 2.75 12.5C2.75 7.39137 6.89137 3.25 12 3.25C17.1086 3.25 21.25 7.39137 21.25 12.5Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M12.25 13.5C12.25 13.6339 12.1339 13.75 12 13.75C11.8661 13.75 11.75 13.6339 11.75 13.5V8.5C11.75 8.36614 11.8661 8.25 12 8.25C12.1339 8.25 12.25 8.36614 12.25 8.5V13.5Z"
        stroke={color}
      />
      <Path
        d="M12.92 16.12C12.87 16 12.8 15.89 12.71 15.79C12.61 15.7 12.5 15.63 12.38 15.58C12.14 15.48 11.86 15.48 11.62 15.58C11.5 15.63 11.39 15.7 11.29 15.79C11.2 15.89 11.13 16 11.08 16.12C11.03 16.24 11 16.37 11 16.5C11 16.63 11.03 16.76 11.08 16.88C11.13 17.01 11.2 17.11 11.29 17.21C11.39 17.3 11.5 17.37 11.62 17.42C11.74 17.47 11.87 17.5 12 17.5C12.13 17.5 12.26 17.47 12.38 17.42C12.5 17.37 12.61 17.3 12.71 17.21C12.8 17.11 12.87 17.01 12.92 16.88C12.97 16.76 13 16.63 13 16.5C13 16.37 12.97 16.24 12.92 16.12Z"
        fill={color}
      />
    </Svg>
  );
};

export const FilterIcon = ({
  width = 18,
  height = 18,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M3.59896 1.3999H12.399C13.1323 1.3999 13.7323 1.9999 13.7323 2.73324V4.1999C13.7323 4.73324 13.399 5.3999 13.0656 5.73324L10.199 8.26657C9.79896 8.5999 9.53229 9.26657 9.53229 9.7999V12.6666C9.53229 13.0666 9.26563 13.5999 8.93229 13.7999L7.99896 14.3999C7.13229 14.9332 5.93229 14.3332 5.93229 13.2666V9.73324C5.93229 9.26657 5.66563 8.66657 5.39896 8.33324L2.86563 5.66657C2.53229 5.33324 2.26562 4.73324 2.26562 4.33324V2.7999C2.26562 1.9999 2.86563 1.3999 3.59896 1.3999Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M7.28667 1.3999L4 6.66657"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const SelectIcon = ({
  width = 22,
  height = 22,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        opacity="0.4"
        d="M1.66797 8.12502C1.3263 8.12502 1.04297 7.84169 1.04297 7.50002V5.41669C1.04297 3.00002 3.00964 1.04169 5.41797 1.04169H7.5013C7.84297 1.04169 8.1263 1.32502 8.1263 1.66669C8.1263 2.00835 7.84297 2.29169 7.5013 2.29169H5.41797C3.69297 2.29169 2.29297 3.69169 2.29297 5.41669V7.50002C2.29297 7.84169 2.00964 8.12502 1.66797 8.12502Z"
        fill={color}
      />
      <Path
        d="M18.3333 8.12502C17.9917 8.12502 17.7083 7.84169 17.7083 7.50002V5.41669C17.7083 3.69169 16.3083 2.29169 14.5833 2.29169H12.5C12.1583 2.29169 11.875 2.00835 11.875 1.66669C11.875 1.32502 12.1583 1.04169 12.5 1.04169H14.5833C16.9917 1.04169 18.9583 3.00002 18.9583 5.41669V7.50002C18.9583 7.84169 18.675 8.12502 18.3333 8.12502Z"
        fill={color}
      />
      <Path
        opacity="0.4"
        d="M14.582 18.9583H13.332C12.9904 18.9583 12.707 18.675 12.707 18.3333C12.707 17.9916 12.9904 17.7083 13.332 17.7083H14.582C16.307 17.7083 17.707 16.3083 17.707 14.5833V13.3333C17.707 12.9916 17.9904 12.7083 18.332 12.7083C18.6737 12.7083 18.957 12.9916 18.957 13.3333V14.5833C18.957 17 16.9904 18.9583 14.582 18.9583Z"
        fill={color}
      />
      <Path
        d="M7.5013 18.9583H5.41797C3.00964 18.9583 1.04297 17 1.04297 14.5833V12.5C1.04297 12.1583 1.3263 11.875 1.66797 11.875C2.00964 11.875 2.29297 12.1583 2.29297 12.5V14.5833C2.29297 16.3083 3.69297 17.7083 5.41797 17.7083H7.5013C7.84297 17.7083 8.1263 17.9917 8.1263 18.3333C8.1263 18.675 7.84297 18.9583 7.5013 18.9583Z"
        fill={color}
      />
      <Path
        d="M7.5 4.375H5.83333C4.88333 4.375 4.375 4.875 4.375 5.83333V7.5C4.375 8.45833 4.88333 8.95833 5.83333 8.95833H7.5C8.45 8.95833 8.95833 8.45833 8.95833 7.5V5.83333C8.95833 4.875 8.45 4.375 7.5 4.375Z"
        fill={color}
      />
      <Path
        opacity="0.4"
        d="M14.168 4.375H12.5013C11.5513 4.375 11.043 4.875 11.043 5.83333V7.5C11.043 8.45833 11.5513 8.95833 12.5013 8.95833H14.168C15.118 8.95833 15.6263 8.45833 15.6263 7.5V5.83333C15.6263 4.875 15.118 4.375 14.168 4.375Z"
        fill={color}
      />
      <Path
        opacity="0.4"
        d="M5.83333 11.5417H7.5C7.89146 11.5417 8.11012 11.6438 8.23261 11.7658C8.35473 11.8874 8.45833 12.1055 8.45833 12.5V14.1667C8.45833 14.5612 8.35473 14.7793 8.23261 14.9009C8.11012 15.0229 7.89146 15.125 7.5 15.125H5.83333C5.44187 15.125 5.22321 15.0229 5.10072 14.9009C4.9786 14.7793 4.875 14.5612 4.875 14.1667V12.5C4.875 12.1055 4.9786 11.8874 5.10072 11.7658C5.22321 11.6438 5.44187 11.5417 5.83333 11.5417Z"
        fill={color}
        stroke={color}
      />
      <Path
        d="M14.168 11.0417H12.5013C11.5513 11.0417 11.043 11.5417 11.043 12.5V14.1667C11.043 15.125 11.5513 15.625 12.5013 15.625H14.168C15.118 15.625 15.6263 15.125 15.6263 14.1667V12.5C15.6263 11.5417 15.118 11.0417 14.168 11.0417Z"
        fill={color}
      />
    </Svg>
  );
};

export const AddCircleIcon = ({
  width = 22,
  height = 22,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10.0013 18.3333C14.5846 18.3333 18.3346 14.5833 18.3346 9.99996C18.3346 5.41663 14.5846 1.66663 10.0013 1.66663C5.41797 1.66663 1.66797 5.41663 1.66797 9.99996C1.66797 14.5833 5.41797 18.3333 10.0013 18.3333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G opacity="0.4">
        <Path
          d="M6.66797 10H13.3346"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10 13.3333V6.66663"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export const CursorDownIcon = ({
  width = 22,
  height = 22,
  color = "#6B7280",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M16.5984 7.45831L11.1651 12.8916C10.5234 13.5333 9.47344 13.5333 8.83177 12.8916L3.39844 7.45831"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const CursorUpIcon = ({
  width = 22,
  height = 22,
  color = "#6B7280",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M16.5984 12.5417L11.1651 7.10833C10.5234 6.46666 9.47344 6.46666 8.83177 7.10833L3.39844 12.5417"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ShareIcon = ({
  width = 22,
  height = 22,
  color = "#6B7280",
}: Props) => {
  return (
    <Svg width={width} height="20" viewBox="0 0 21 20" fill="none">
      <Path
        d="M7.9987 9.58333C7.9987 10.7339 7.06596 11.6667 5.91536 11.6667C4.76477 11.6667 3.83203 10.7339 3.83203 9.58333C3.83203 8.43274 4.76477 7.5 5.91536 7.5C7.06596 7.5 7.9987 8.43274 7.9987 9.58333Z"
        stroke="white"
        strokeWidth="1.5"
      />
      <Path
        opacity="0.5"
        d="M12.4339 14.0012L8 11.0748"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        opacity="0.5"
        d="M12.5159 5.69971L8.08203 8.62606"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M16.3346 15.4167C16.3346 16.5673 15.4019 17.5 14.2513 17.5C13.1007 17.5 12.168 16.5673 12.168 15.4167C12.168 14.2661 13.1007 13.3334 14.2513 13.3334C15.4019 13.3334 16.3346 14.2661 16.3346 15.4167Z"
        stroke="white"
        strokeWidth="1.5"
      />
      <Path
        d="M16.3346 4.58333C16.3346 5.73393 15.4019 6.66667 14.2513 6.66667C13.1007 6.66667 12.168 5.73393 12.168 4.58333C12.168 3.43274 13.1007 2.5 14.2513 2.5C15.4019 2.5 16.3346 3.43274 16.3346 4.58333Z"
        stroke="white"
        strokeWidth="1.5"
      />
    </Svg>
  );
};

export const QRIcon = ({
  width = 22,
  height = 22,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G clip-path="url(#clip0_5290_10227)">
        <Path
          opacity="0.4"
          d="M1.66797 8.12499C1.3263 8.12499 1.04297 7.84166 1.04297 7.49999V5.41666C1.04297 2.99999 3.00964 1.04166 5.41797 1.04166H7.5013C7.84297 1.04166 8.1263 1.32499 8.1263 1.66666C8.1263 2.00832 7.84297 2.29166 7.5013 2.29166H5.41797C3.69297 2.29166 2.29297 3.69166 2.29297 5.41666V7.49999C2.29297 7.84166 2.00964 8.12499 1.66797 8.12499Z"
          fill="#F20831"
        />
        <Path
          d="M18.3333 8.12499C17.9917 8.12499 17.7083 7.84166 17.7083 7.49999V5.41666C17.7083 3.69166 16.3083 2.29166 14.5833 2.29166H12.5C12.1583 2.29166 11.875 2.00832 11.875 1.66666C11.875 1.32499 12.1583 1.04166 12.5 1.04166H14.5833C16.9917 1.04166 18.9583 2.99999 18.9583 5.41666V7.49999C18.9583 7.84166 18.675 8.12499 18.3333 8.12499Z"
          fill="#F20831"
        />
        <Path
          opacity="0.4"
          d="M14.582 18.9583H13.332C12.9904 18.9583 12.707 18.675 12.707 18.3333C12.707 17.9916 12.9904 17.7083 13.332 17.7083H14.582C16.307 17.7083 17.707 16.3083 17.707 14.5833V13.3333C17.707 12.9916 17.9904 12.7083 18.332 12.7083C18.6737 12.7083 18.957 12.9916 18.957 13.3333V14.5833C18.957 17 16.9904 18.9583 14.582 18.9583Z"
          fill="#F20831"
        />
        <Path
          d="M7.5013 18.9583H5.41797C3.00964 18.9583 1.04297 17 1.04297 14.5833V12.5C1.04297 12.1583 1.3263 11.875 1.66797 11.875C2.00964 11.875 2.29297 12.1583 2.29297 12.5V14.5833C2.29297 16.3083 3.69297 17.7083 5.41797 17.7083H7.5013C7.84297 17.7083 8.1263 17.9917 8.1263 18.3333C8.1263 18.675 7.84297 18.9583 7.5013 18.9583Z"
          fill="#F20831"
        />
        <Path
          d="M7.5 4.375H5.83333C4.88333 4.375 4.375 4.875 4.375 5.83333V7.5C4.375 8.45833 4.88333 8.95833 5.83333 8.95833H7.5C8.45 8.95833 8.95833 8.45833 8.95833 7.5V5.83333C8.95833 4.875 8.45 4.375 7.5 4.375Z"
          fill="#F20831"
        />
        <Path
          opacity="0.4"
          d="M14.168 4.375H12.5013C11.5513 4.375 11.043 4.875 11.043 5.83333V7.5C11.043 8.45833 11.5513 8.95833 12.5013 8.95833H14.168C15.118 8.95833 15.6263 8.45833 15.6263 7.5V5.83333C15.6263 4.875 15.118 4.375 14.168 4.375Z"
          fill="#F20831"
        />
        <Path
          opacity="0.4"
          d="M7.5 11.0417H5.83333C4.88333 11.0417 4.375 11.5417 4.375 12.5V14.1667C4.375 15.125 4.88333 15.625 5.83333 15.625H7.5C8.45 15.625 8.95833 15.125 8.95833 14.1667V12.5C8.95833 11.5417 8.45 11.0417 7.5 11.0417Z"
          fill="#F20831"
        />
        <Path
          d="M14.168 11.0417H12.5013C11.5513 11.0417 11.043 11.5417 11.043 12.5V14.1667C11.043 15.125 11.5513 15.625 12.5013 15.625H14.168C15.118 15.625 15.6263 15.125 15.6263 14.1667V12.5C15.6263 11.5417 15.118 11.0417 14.168 11.0417Z"
          fill="#F20831"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_5290_10227">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const ProfileIcon = ({
  width = 22,
  height = 22,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        opacity="0.4"
        d="M10.1341 9.05829C10.0508 9.04996 9.95078 9.04996 9.85911 9.05829C7.87578 8.99163 6.30078 7.36663 6.30078 5.36663C6.30078 3.32496 7.95078 1.66663 10.0008 1.66663C12.0424 1.66663 13.7008 3.32496 13.7008 5.36663C13.6924 7.36663 12.1174 8.99163 10.1341 9.05829Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.96563 12.1334C3.94896 13.4834 3.94896 15.6834 5.96563 17.025C8.25729 18.5584 12.0156 18.5584 14.3073 17.025C16.324 15.675 16.324 13.475 14.3073 12.1334C12.024 10.6084 8.26562 10.6084 5.96563 12.1334Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const CoinIcon = ({
  width = 22,
  height = 22,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        opacity="0.4"
        d="M15.4154 10.5416V13.625C15.4154 16.225 12.9904 18.3333 9.9987 18.3333C7.00703 18.3333 4.58203 16.225 4.58203 13.625V10.5416C4.58203 13.1416 7.00703 15 9.9987 15C12.9904 15 15.4154 13.1416 15.4154 10.5416Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.4154 6.37496C15.4154 7.13329 15.207 7.83329 14.8404 8.43329C13.9487 9.89996 12.1154 10.8333 9.9987 10.8333C7.88203 10.8333 6.0487 9.89996 5.15703 8.43329C4.79037 7.83329 4.58203 7.13329 4.58203 6.37496C4.58203 5.07496 5.19036 3.89996 6.16536 3.04996C7.14869 2.19163 8.4987 1.66663 9.9987 1.66663C11.4987 1.66663 12.8487 2.19163 13.832 3.04163C14.807 3.89996 15.4154 5.07496 15.4154 6.37496Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.4154 6.37496V10.5416C15.4154 13.1416 12.9904 15 9.9987 15C7.00703 15 4.58203 13.1416 4.58203 10.5416V6.37496C4.58203 3.77496 7.00703 1.66663 9.9987 1.66663C11.4987 1.66663 12.8487 2.19163 13.832 3.04163C14.807 3.89996 15.4154 5.07496 15.4154 6.37496Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const LinkHookIcon = ({
  width = 22,
  height = 22,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M2.7263 10C2.06797 9.20833 1.66797 8.19167 1.66797 7.08333C1.66797 4.56667 3.7263 2.5 6.2513 2.5H10.418C12.9346 2.5 15.0013 4.56667 15.0013 7.08333C15.0013 9.6 12.943 11.6667 10.418 11.6667H8.33464"
        stroke="#F20831"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.4"
        d="M17.275 10C17.9333 10.7917 18.3333 11.8084 18.3333 12.9167C18.3333 15.4334 16.275 17.5 13.75 17.5H9.58333C7.06667 17.5 5 15.4334 5 12.9167C5 10.4 7.05833 8.33337 9.58333 8.33337H11.6667"
        stroke="#F20831"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ArrowUpIcon = ({
  width = 17,
  height = 17,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 15 15" fill="none">
      <Path
        d="M11.6768 8.7374L9.67056 6.73115L8.44556 5.4999C7.92682 4.98115 7.08306 4.98115 6.56431 5.4999L3.32681 8.7374C2.90181 9.1624 3.20806 9.8874 3.80181 9.8874H7.30806H11.2018C11.8018 9.8874 12.1018 9.1624 11.6768 8.7374Z"
        fill={color}
      />
    </Svg>
  );
};

export const StarIcon = ({
  width = 17,
  height = 17,
  color = "#F59E0B",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        opacity="0.3"
        d="M3.82494 10.6666C3.89828 10.34 3.76495 9.87331 3.53161 9.63998L1.91161 8.01998C1.40495 7.51331 1.20495 6.97331 1.35161 6.50665C1.50495 6.03998 1.97828 5.71998 2.68495 5.59998L4.76495 5.25331C5.06495 5.19998 5.43161 4.93331 5.57161 4.65998L6.71828 2.35998C7.05161 1.69998 7.50495 1.33331 7.99828 1.33331C8.49161 1.33331 8.94495 1.69998 9.27828 2.35998L10.4249 4.65998C10.5116 4.83331 10.6916 4.99998 10.8849 5.11331L3.70495 12.2933C3.61161 12.3866 3.45161 12.3 3.47828 12.1666L3.82494 10.6666Z"
        fill={color}
      />
      <Path
        d="M12.4672 9.64001C12.2272 9.88001 12.0939 10.34 12.1739 10.6667L12.6339 12.6733C12.8272 13.5067 12.7072 14.1333 12.2939 14.4333C12.1272 14.5533 11.9272 14.6133 11.6939 14.6133C11.3539 14.6133 10.9539 14.4867 10.5139 14.2267L8.56052 13.0667C8.25385 12.8867 7.74719 12.8867 7.44052 13.0667L5.48719 14.2267C4.74719 14.66 4.11385 14.7333 3.70719 14.4333C3.55385 14.32 3.44052 14.1667 3.36719 13.9667L11.4739 5.86001C11.7805 5.55335 12.2139 5.41335 12.6339 5.48668L13.3072 5.60001C14.0139 5.72001 14.4872 6.04001 14.6405 6.50668C14.7872 6.97335 14.5872 7.51335 14.0805 8.02001L12.4672 9.64001Z"
        fill={color}
      />
    </Svg>
  );
};

export const DotIcon = ({
  width = 6,
  height = 7,
  color = "#F20831",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 5 6" fill="none">
      <Rect y="0.5" width="5" height="5" rx="2.5" fill={color} />
    </Svg>
  );
};

export const DoubleArrowForward = ({
  width = 19,
  height = 18,
  color = "#6B7280",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 18" fill="none">
      <Path
        opacity="0.4"
        d="M10.5492 6.38989L6.76172 9.23239V13.4399C6.76172 14.1599 7.63172 14.5199 8.14172 14.0099L12.0267 10.1249C12.6492 9.50239 12.6492 8.48989 12.0267 7.86739L10.5492 6.38989Z"
        fill={color}
      />
      <Path
        d="M9.78814 6.33598L7.26172 8.23205V4.55995C7.26172 4.28687 7.59369 4.14603 7.78977 4.3376L9.78814 6.33598Z"
        fill={color}
        stroke={color}
      />
    </Svg>
  );
};

export const GreenNairaIcon = ({
  width = 23,
  height = 22,
  color = "#16A34A",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 23 22" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.10442 13.25V9.75H0V7.25H3.10442V0.5H10.9476L12.5496 7.25H15.8534V0.5H19.9156V7.25H23V9.75H19.9156V13.25H23V15.75H19.9156V21.5H12.0725L10.7077 15.75H7.1666V21.5H3.10442V15.75H0V13.25H3.10442ZM7.1666 13.25H10.1144L9.28367 9.75H7.1666V13.25ZM14.5671 15.75L15.291 18.8H15.8534V15.75H14.5671ZM15.8534 13.25H13.9737L13.143 9.75H15.8534V13.25ZM8.69031 7.25H7.1666V3.2H7.72906L8.69031 7.25Z"
        fill={color}
      />
    </Svg>
  );
};

export const GearIcon = ({
  width = 20,
  height = 20,
  color = "#D1D5DB",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
      <Path
        d="M15.4369 12.1438C16.4479 10.0339 16.4567 7.89958 15.4633 5.77794C15.3939 5.6303 15.4252 5.45529 15.5376 5.33699L17.3874 3.39818C17.54 3.23881 17.5341 2.98558 17.3738 2.83403L15.0439 0.610707C14.8845 0.458184 14.6313 0.464051 14.4797 0.623419L12.7325 2.4537C12.6133 2.57885 12.4265 2.61307 12.272 2.53779C10.1357 1.49652 7.97008 1.48576 5.81813 2.5065C5.67049 2.57689 5.49353 2.54659 5.37522 2.43317L3.48921 0.633195C3.32984 0.480672 3.07661 0.486538 2.92507 0.646883L0.702719 2.97776C0.550195 3.13713 0.556062 3.38938 0.716408 3.5419L2.51443 5.25877C2.6386 5.37707 2.67379 5.56284 2.59949 5.7183C1.58266 7.82919 1.57191 9.96647 2.5682 12.091C2.63762 12.2387 2.60731 12.4147 2.4939 12.533L0.520864 14.6008C0.36834 14.7602 0.374207 15.0134 0.533575 15.165L2.86249 17.3893C3.02186 17.5418 3.27509 17.5359 3.42664 17.3766L5.29798 15.4172C5.41727 15.2921 5.60401 15.2579 5.75947 15.3332C7.90262 16.3803 10.0702 16.3901 12.2212 15.3615C12.3698 15.2901 12.5468 15.3204 12.6651 15.4339L14.6909 17.3658C14.8503 17.5184 15.1025 17.5125 15.255 17.3531L17.4784 15.0252C17.6309 14.8658 17.625 14.6126 17.4657 14.461L15.522 12.6044C15.3978 12.486 15.3626 12.3003 15.4369 12.1458V12.1438ZM9.01722 12.2436H9.01135C7.18889 12.2406 5.70862 10.7526 5.71156 8.92618C5.71254 8.04428 6.0606 7.2142 6.69025 6.58749C7.31306 5.96859 8.13336 5.62932 9.00255 5.62932H9.0182C10.8407 5.63812 12.3219 7.12132 12.3209 8.93596C12.3209 9.82079 11.9748 10.6528 11.3471 11.2786C10.7233 11.9014 9.89618 12.2436 9.01722 12.2436Z"
        fill={color}
      />
    </Svg>
  );
};

interface LogoProps {
  className?: string;
}

export const RedGear: React.FC<LogoProps> = ({ className }) => {
  return (
    <Svg
      width="15"
      height="16"
      viewBox="0 0 12 11"
      fill="none"
      className="animate-spin absolute inset-x-[5px] inset-y-[5px]"
    >
      <Path
        d="M9.99318 7.26749C10.6242 5.95059 10.6297 4.61844 10.0097 3.29422C9.96632 3.20207 9.98585 3.09284 10.056 3.019L11.2106 1.80889C11.3058 1.70942 11.3021 1.55137 11.2021 1.45678L9.74786 0.0690981C9.64839 -0.0260993 9.49034 -0.0224379 9.39575 0.0770312L8.30525 1.2194C8.2308 1.29751 8.11425 1.31887 8.01783 1.27188C6.68445 0.621976 5.33277 0.615262 3.98963 1.25235C3.89749 1.29629 3.78704 1.27737 3.7132 1.20659L2.53604 0.0831338C2.43658 -0.0120636 2.27852 -0.00840204 2.18394 0.0916773L0.796861 1.54649C0.701663 1.64596 0.705325 1.8034 0.805404 1.8986L1.92764 2.97018C2.00514 3.04402 2.0271 3.15996 1.98073 3.25699C1.34608 4.5745 1.33936 5.90848 1.9612 7.23453C2.00453 7.32668 1.98561 7.43652 1.91482 7.51036L0.683356 8.80102C0.588159 8.90049 0.59182 9.05854 0.691289 9.15313L2.14488 10.5414C2.24435 10.6366 2.4024 10.633 2.49699 10.5335L3.66499 9.31057C3.73944 9.23246 3.85599 9.2111 3.95302 9.25809C5.29067 9.91166 6.64357 9.91776 7.9861 9.27579C8.07885 9.23124 8.18931 9.25016 8.26315 9.32094L9.52756 10.5268C9.62703 10.622 9.78447 10.6183 9.87967 10.5188L11.2674 9.06586C11.3626 8.9664 11.3589 8.80834 11.2594 8.71376L10.0463 7.55491C9.96877 7.48107 9.9468 7.36513 9.99318 7.26871V7.26749ZM5.98634 7.32973H5.98268C4.84519 7.3279 3.92129 6.39912 3.92312 5.25919C3.92373 4.70875 4.14098 4.19066 4.53397 3.79949C4.92269 3.41321 5.43468 3.20146 5.97719 3.20146H5.98695C7.12444 3.20695 8.04895 4.13269 8.04834 5.26529C8.04834 5.81756 7.83232 6.33687 7.44054 6.72743C7.05121 7.11615 6.53495 7.32973 5.98634 7.32973Z"
        fill="#F20831"
      />
    </Svg>
  );
};

export const RedSquare: React.FC<LogoProps> = ({ className }) => {
  return (
    <Svg
      width="25"
      height="25"
      viewBox="0 0 21 21"
      fill="none"
      className="relative"
    >
      <Path
        d="M20.9756 3.00157V5.85078C20.9756 5.9887 20.8639 6.09976 20.7266 6.09976H19.5733C19.4353 6.09976 19.3243 5.98808 19.3243 5.85078V3.18953C19.3243 2.48104 18.7445 1.90192 18.0367 1.90192H15.3748C15.2369 1.90192 15.1258 1.79025 15.1258 1.65294V0.498978C15.1258 0.361064 15.2375 0.25 15.3748 0.25H18.2246C19.7441 0.25 20.9756 1.48207 20.9756 3.00157ZM6.82596 0.498978V1.65294C6.82596 1.79086 6.71428 1.90192 6.57698 1.90192H3.9145C3.20357 1.90192 2.62751 2.47799 2.62751 3.18892V5.85078C2.62751 5.9887 2.51583 6.09976 2.37853 6.09976H1.22456C1.08665 6.09976 0.975586 5.98808 0.975586 5.85078V3.00157C0.975586 1.48207 2.20766 0.25 3.72716 0.25H6.57637C6.71428 0.25 6.82596 0.361674 6.82596 0.498978ZM6.82596 18.8464V20.0004C6.82596 20.1383 6.71428 20.2494 6.57698 20.2494H3.4794C2.09843 20.2494 0.975586 19.1266 0.975586 17.7468V14.6474C0.975586 14.5095 1.08726 14.3984 1.22456 14.3984H2.37853C2.51644 14.3984 2.62751 14.5101 2.62751 14.6474V17.3086C2.62751 18.0202 3.20418 18.5963 3.91511 18.5963H6.57637C6.71428 18.5963 6.82535 18.7079 6.82535 18.8452L6.82596 18.8464ZM20.7266 14.399C20.8645 14.399 20.9756 14.5107 20.9756 14.648V17.7474C20.9756 19.1272 19.8521 20.25 18.4718 20.25H15.3736C15.2357 20.25 15.1246 20.1383 15.1246 20.001V18.8471C15.1246 18.7091 15.2363 18.5981 15.3736 18.5981H18.285C18.8574 18.5981 19.3237 18.1325 19.3237 17.5595V14.6486C19.3237 14.5107 19.4353 14.3996 19.5726 14.3996L20.7266 14.399Z"
        fill="#F20831"
      />
    </Svg>
  );
};

export const PaylenseText: React.FC<LogoProps> = ({ className }) => {
  return (
    <Svg
      width="85"
      height="36"
      viewBox="0 0 69 17"
      fill="none"
      className="animate-pulse"
    >
      <Path
        d="M0.386488 0.923437H5.21049C6.61449 0.923437 7.67649 1.25344 8.39649 1.91344C9.11649 2.56144 9.47649 3.51544 9.47649 4.77544V5.67544C9.47649 6.88744 9.11049 7.81744 8.37849 8.46544C7.65849 9.10144 6.60249 9.41944 5.21049 9.41944H2.56449V7.78144H4.65249C5.55249 7.78144 6.20649 7.59544 6.61449 7.22344C7.03449 6.83944 7.24449 6.25744 7.24449 5.47744V4.95544C7.24449 4.11544 7.03449 3.50944 6.61449 3.13744C6.20649 2.75344 5.55249 2.56144 4.65249 2.56144H2.15049L2.67249 2.02144V13.5234H0.386488V0.923437ZM17.0809 10.1574V7.43944C17.0809 6.70744 16.8649 6.17344 16.4329 5.83744C16.0129 5.50144 15.3409 5.33344 14.4169 5.33344C13.8409 5.33344 13.2649 5.41144 12.6889 5.56744C12.1129 5.72344 11.5729 5.94544 11.0689 6.23344L10.7449 4.63144C11.1049 4.43944 11.5249 4.27144 12.0049 4.12744C12.4849 3.97144 12.9829 3.85144 13.4989 3.76744C14.0269 3.68344 14.5249 3.64144 14.9929 3.64144C16.4689 3.64144 17.5729 3.95944 18.3049 4.59544C19.0489 5.21944 19.4209 6.16744 19.4209 7.43944V13.5234H17.6749L17.0809 10.1574ZM13.9849 13.6854C12.8809 13.6854 12.0169 13.4394 11.3929 12.9474C10.7689 12.4554 10.4569 11.7714 10.4569 10.8954V10.4814C10.4569 9.60544 10.7689 8.92144 11.3929 8.42944C12.0289 7.93744 12.9169 7.69144 14.0569 7.69144C15.2569 7.69144 16.2049 7.93144 16.9009 8.41144C17.5969 8.87944 17.9449 9.54544 17.9449 10.4094V10.8594C17.9449 11.7474 17.5909 12.4434 16.8829 12.9474C16.1869 13.4394 15.2209 13.6854 13.9849 13.6854ZM14.6329 12.4254C15.3649 12.4254 15.9469 12.2694 16.3789 11.9574C16.8109 11.6454 17.0269 11.2314 17.0269 10.7154V10.4994C17.0269 10.0074 16.8229 9.62344 16.4149 9.34744C16.0069 9.07144 15.4369 8.93344 14.7049 8.93344C14.0329 8.93344 13.5109 9.06544 13.1389 9.32944C12.7669 9.58144 12.5809 9.98944 12.5809 10.5534V10.7694C12.5809 11.2974 12.7609 11.7054 13.1209 11.9934C13.4809 12.2814 13.9849 12.4254 14.6329 12.4254ZM23.0289 16.5474L24.5049 12.8934L24.2889 14.0994L20.2389 3.80344H22.5249L25.3509 11.2194H25.4229L28.0869 3.80344H30.3729L25.3869 16.9794L23.0289 16.5474ZM33.8835 0.203437V13.5234H31.5975V0.203437H33.8835ZM40.728 13.6854C39.72 13.6854 38.856 13.5174 38.136 13.1814C37.428 12.8454 36.888 12.3534 36.516 11.7054C36.144 11.0574 35.958 10.2774 35.958 9.36544V7.96144C35.958 7.06144 36.156 6.28744 36.552 5.63944C36.948 4.99144 37.518 4.49944 38.262 4.16344C39.006 3.81544 39.894 3.64144 40.926 3.64144C42.498 3.64144 43.704 4.04944 44.544 4.86544C45.396 5.68144 45.822 6.83944 45.822 8.33944V9.27544H37.812V8.05144H44.022L43.68 8.51944V7.83544C43.68 7.04344 43.44 6.42544 42.96 5.98144C42.48 5.52544 41.814 5.29744 40.962 5.29744C40.11 5.29744 39.444 5.52544 38.964 5.98144C38.484 6.43744 38.244 7.07344 38.244 7.88944V9.61744C38.244 10.4214 38.472 11.0454 38.928 11.4894C39.396 11.9334 40.05 12.1554 40.89 12.1554C41.622 12.1554 42.216 12.0054 42.672 11.7054C43.128 11.4054 43.416 10.9914 43.536 10.4634L45.696 10.6074C45.444 11.5914 44.886 12.3534 44.022 12.8934C43.158 13.4214 42.06 13.6854 40.728 13.6854ZM55.0793 8.06944C55.0793 7.13344 54.8993 6.45544 54.5393 6.03544C54.1793 5.60344 53.6033 5.38744 52.8113 5.38744C51.9113 5.38744 51.2153 5.70544 50.7233 6.34144C50.2433 6.96544 50.0033 7.87744 50.0033 9.07744L49.1393 10.4274V9.22144C49.1393 7.42144 49.5293 6.04144 50.3093 5.08144C51.1013 4.12144 52.2293 3.64144 53.6933 3.64144C54.9533 3.64144 55.8773 3.97744 56.4653 4.64944C57.0653 5.32144 57.3653 6.37144 57.3653 7.79944V13.5234H55.0793V8.06944ZM47.7173 3.80344H49.4633L50.0033 6.84544V13.5234H47.7173V3.80344ZM63.6396 13.6854C62.1996 13.6854 61.1076 13.4394 60.3636 12.9474C59.6196 12.4554 59.1636 11.6874 58.9956 10.6434L61.3536 10.5534C61.4256 11.1414 61.6416 11.5734 62.0016 11.8494C62.3736 12.1254 62.9076 12.2634 63.6036 12.2634C64.2636 12.2634 64.7736 12.1554 65.1336 11.9394C65.4936 11.7114 65.6736 11.3934 65.6736 10.9854C65.6736 10.6254 65.5536 10.3554 65.3136 10.1754C65.0856 9.98344 64.7796 9.83944 64.3956 9.74344C64.0116 9.63544 63.5856 9.54544 63.1176 9.47344C62.6616 9.40144 62.1996 9.31144 61.7316 9.20344C61.2756 9.09544 60.8556 8.93944 60.4716 8.73544C60.0876 8.51944 59.7756 8.23744 59.5356 7.88944C59.3076 7.52944 59.1936 7.05544 59.1936 6.46744C59.1936 5.54344 59.5656 4.84144 60.3096 4.36144C61.0656 3.88144 62.1816 3.64144 63.6576 3.64144C64.5576 3.64144 65.3196 3.74944 65.9436 3.96544C66.5796 4.16944 67.0776 4.48744 67.4376 4.91944C67.8096 5.33944 68.0436 5.86744 68.1396 6.50344L65.7816 6.59344C65.7456 6.08944 65.5476 5.70544 65.1876 5.44144C64.8396 5.17744 64.3476 5.04544 63.7116 5.04544C63.0516 5.04544 62.5416 5.16544 62.1816 5.40544C61.8336 5.63344 61.6596 5.95744 61.6596 6.37744C61.6596 6.73744 61.7736 7.01344 62.0016 7.20544C62.2416 7.39744 62.5536 7.54744 62.9376 7.65544C63.3216 7.75144 63.7416 7.83544 64.1976 7.90744C64.6656 7.97944 65.1276 8.06944 65.5836 8.17744C66.0396 8.28544 66.4596 8.44144 66.8436 8.64544C67.2276 8.84944 67.5396 9.13144 67.7796 9.49144C68.0196 9.85144 68.1396 10.3254 68.1396 10.9134C68.1396 11.8254 67.7556 12.5154 66.9876 12.9834C66.2316 13.4514 65.1156 13.6854 63.6396 13.6854Z"
        fill="#ffffff"
      />
    </Svg>
  );
};

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <View className="flex gap-3 items-center">
      <View className="relative flex items-center flex-row">
        <RedSquare />
        <RedGear />
      </View>
      <PaylenseText />
    </View>
  );
};

export const LogoLod: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Svg
      width="100px"
      data-name="Layer 2"
      viewBox="0 0 70.67 37.25"
      className={`${className}`}
    >
      <G data-name="Layer 1">
        <Path d="M66.5 0H11.01c-1.4.05-2.75.56-3.82 1.45A6.123 6.123 0 005.1 4.92L.08 32.34c-.5 2.72 1.34 4.92 4.09 4.92h55.49c1.4-.05 2.75-.56 3.82-1.45a6.123 6.123 0 002.09-3.47l5-27.42C71.08 2.21 69.25 0 66.49 0z" />
        <Path d="M11.47 9.78L19.54 9.78 14.47 29.78" />
        <Path d="M21.47 28.78s16 4 21.5-11.5 23-4 10.5 8.5c-4.03 4.03-14.09 1.14-13.5-5.5.37-4.11.5-8.5-4.5-9.5-6.86-1.37-15 5-7 21" />
        <Path d="M51.17 12.52c-2.94 0-5.49 3.99-5.87 8.62-.24 2.89.95 4.74 2.73 4.74 2.97 0 5.51-3.92 5.91-8.62.23-2.87-.96-4.74-2.77-4.74zM66.5 0H11.01c-1.4.05-2.75.56-3.82 1.45A6.123 6.123 0 005.1 4.92L.08 32.34c-.5 2.72 1.34 4.92 4.09 4.92h55.49c1.4-.05 2.75-.56 3.82-1.45a6.123 6.123 0 002.09-3.47l5-27.42C71.08 2.21 69.25 0 66.49 0zM15.55 30.79h-3.08c-1.09 0-1.58-.61-1.31-1.71l4.03-16.95h-3.7c-1.09 0-1.58-.61-1.27-1.71l.45-1.75c.1-.49.37-.94.77-1.25.4-.31.9-.48 1.41-.46h8.57c1.12 0 1.58.61 1.27 1.71l-4.93 20.4c-.1.5-.37.95-.78 1.27-.41.32-.91.48-1.43.46zm44.94-14.01c-.69 8.27-6.58 14.44-13.79 14.44-2.95 0-5.25-1.21-6.62-3.28 1.23-2.2 2.05-4.6 2.42-7.08a16.17 16.17 0 01-3.15 5.69 12.89 12.89 0 01-4.39 3.42c-1.7.81-3.56 1.24-5.45 1.26-5.26 0-8.46-3.81-7.97-9.59.69-8.27 6.61-14.44 13.79-14.44 2.97 0 5.28 1.19 6.64 3.27a20.66 20.66 0 00-2.44 7.1C41.49 11.42 46.57 7.2 52.52 7.2c5.3 0 8.46 3.78 7.98 9.59zm-26.5-4.26c-2.94 0-5.49 3.99-5.87 8.62-.24 2.89.95 4.74 2.73 4.74 2.97 0 5.51-3.92 5.91-8.62.23-2.87-.96-4.74-2.77-4.74z" />
      </G>
    </Svg>
  );
};
