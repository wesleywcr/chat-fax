import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function Status() {
  return (
    <View className=" flex-row items-center ">
      <Ionicons name="checkmark-done" size={24} color="#15803D" />
      <Text
        className=" w-auto text-justify
      font-Poppins_400Regular text-sm text-white"
      >
        5:22
      </Text>
    </View>
  );
}
