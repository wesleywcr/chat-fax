import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color="#000" size={30} />
    </View>
  );
}
