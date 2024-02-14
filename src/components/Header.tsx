import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

type IHeaderProps = {
  name: string;
  status: string;
};

export function Header({ name, status }: IHeaderProps) {
  return (
    <View className="h-24  w-full flex-row items-center justify-between px-4">
      <TouchableOpacity onPress={() => router.replace('/')}>
        <Feather name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <View className="flex-col items-center">
        <Text className="font-Poppins_600SemiBold text-2xl text-white">
          {name}
        </Text>
        <Text className="font-Poppins_500Medium text-xs text-white">
          {status}
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
