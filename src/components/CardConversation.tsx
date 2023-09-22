import { Text, View } from 'react-native';

import { Avatar } from './Avatar';

export function CardConversation() {
  return (
    <View
      className="mt-2 h-24 w-full  flex-row items-center justify-between rounded-3xl
     bg-black px-4"
    >
      <View className="flex-row justify-start ">
        <Avatar />
        <View className="flex-col items-center justify-center pl-3">
          <Text className="font-Poppins_600SemiBold text-base text-white">
            Salina Deuza
          </Text>
          <Text className="font-Poppins_500Medium text-xs text-white">
            Olá, tudo bom?
          </Text>
        </View>
      </View>
      <View className="h-8 w-8 items-center justify-center rounded-md bg-blue-600">
        <Text className="font-Poppins_500Medium text-sm text-white">5</Text>
      </View>
    </View>
  );
}
