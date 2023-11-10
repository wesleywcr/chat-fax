import { Text, TouchableOpacity, View } from 'react-native';

import { Avatar } from './Avatar';

type ChatProps = {
  onPress: () => void;
  name: string;
};
export function CardConversation({ name, onPress }: ChatProps) {
  return (
    <TouchableOpacity
      className="mt-2 h-24 w-full  flex-row items-center justify-between rounded-3xl
     bg-black px-4"
      onPress={onPress}
    >
      <View className="flex-row justify-start ">
        <Avatar />
        <View className="flex-col items-center justify-center pl-3">
          <Text
            className="text-left font-Poppins_600SemiBold
          text-base text-white"
          >
            {name}
          </Text>
          <Text className="font-Poppins_500Medium text-xs text-white">
            Olá, tudo bom?
          </Text>
        </View>
      </View>
      <View className="h-8 w-8 items-center justify-center rounded-md bg-blue-600">
        <Text className="font-Poppins_500Medium text-sm text-white">5</Text>
      </View>
    </TouchableOpacity>
  );
}
