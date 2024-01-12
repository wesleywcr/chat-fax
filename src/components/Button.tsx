import type { TouchableOpacityProps } from 'react-native';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};
export function Button({ title, isLoading, ...rest }: ButtonProps) {
  return (
    <View className="w-full">
      <TouchableOpacity
        className="h-14 w-full items-center
      justify-center rounded-md bg-blue-600"
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator testID="activity-indicator" color="#000" />
        ) : (
          <Text className="font-bold text-white">{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
