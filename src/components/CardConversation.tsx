import { Text, TouchableOpacity, View } from 'react-native';

import { Avatar } from './Avatar';

type ChatProps = {
  name: string;
  lastMessage: string;
  unreadMessages: number;
  onPress: () => void;
  avatar_url?: string;
};
export function CardConversation({
  name,
  lastMessage,
  unreadMessages,
  avatar_url,
  onPress,
}: ChatProps) {
  return (
    <TouchableOpacity
      className="mt-2 h-24 w-full  flex-row items-center justify-between rounded-3xl
     bg-black px-4"
      onPress={onPress}
    >
      <View className="flex-row justify-start ">
        <Avatar avatar={avatar_url} />
        <View className="ml-3 flex-col items-start justify-center pl-3">
          <Text
            className="text-left font-Poppins_600SemiBold
          text-base text-white"
          >
            {name}
          </Text>
          <Text className="text-left font-Poppins_500Medium text-xs text-white">
            {lastMessage}
          </Text>
        </View>
      </View>
      {unreadMessages > 0 && (
        <View className="h-8 w-8 items-center justify-center rounded-md bg-blue-600">
          <Text className="font-Poppins_500Medium text-sm text-white">
            {unreadMessages}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
