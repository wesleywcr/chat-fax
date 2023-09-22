import { StyledComponent } from 'nativewind';
import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';
import { Text } from 'react-native';

type TextStyledProps = TextProps & {
  children: ReactNode;
};
export function TextStyled({ children, ...rest }: TextStyledProps) {
  return (
    <StyledComponent component={Text} {...rest}>
      <Text className="font-Poppins_700Bold text-xl  text-white">
        {children}
      </Text>
    </StyledComponent>
  );
}
