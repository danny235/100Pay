import {ComponentProps} from 'react';
import styled from 'styled-components/native';
import {Colors} from '../Colors';
import { PressableProps, TouchableOpacityProps } from 'react-native';

type ButtonProps = {
  variant: 'primary' | 'secondary';
  isLarge?: boolean;
  isLoading?: boolean;
  isWide?: boolean;
} & PressableProps;

const StyledButton = styled.Pressable<ButtonProps>`
  background-color: ${({variant}) =>
    variant === 'primary' ? Colors.primary : Colors.lightAsh};
  color: ${({variant}) =>
    variant === 'primary' ? Colors.white : Colors.primary};
  padding: ${({isLarge}) => (isLarge ? '15px' : '9px')};
  
  width: ${({isWide}) => (isWide ? '100%' : null)};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: row;
  opacity: ${({isLoading}) => isLoading ? "0.5" : "1"};
`;

export function Button({
  variant = 'primary',
  isLarge = false,
  isLoading = false,
  isWide = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
    
      disabled={isLoading}
      variant={variant}
      isLarge={isLarge}
      isWide={isWide}
      isLoading={isLoading}
      {...props}
    />
  );
}
