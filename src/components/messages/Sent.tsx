import { Text, View } from 'react-native';

import { Status } from './Status';

export function Sent() {
  return (
    <View className="mt-8 w-auto flex-col ">
      <View
        className="h-auto w-52 flex-row items-center justify-end
    rounded-t-xl rounded-bl-xl bg-blue-600"
      >
        <Text
          className="w-auto p-4 text-justify font-Poppins_400Regular
      text-sm text-white"
        >
          Olá como está?
        </Text>
      </View>
      <View className="mt-1 items-end justify-end pr-2">
        <Status />
      </View>
    </View>
  );
}
