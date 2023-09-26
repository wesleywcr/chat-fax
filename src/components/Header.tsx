import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function Header() {
  return (
    <View className="h-24 w-full  flex-row items-center justify-between px-4">
      <Feather name="arrow-left" size={24} color="#fff" />
      <View className="flex-col items-center">
        <Text className="font-Poppins_600SemiBold text-2xl text-white">
          Salina Gomez
        </Text>
        <Text className="font-Poppins_500Medium text-xs text-white">
          online
        </Text>
      </View>
      <View className="flex-row">
        <Feather
          name="phone"
          size={24}
          color="#0050EF"
          style={{ marginRight: 16 }}
        />
        <Feather name="video" size={24} color="#0050EF" />
      </View>
    </View>
  );
}
