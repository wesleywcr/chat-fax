import { Text, View } from 'react-native';

import { Status } from './Status';

type IMessageProps = {
  message: string;
  hours: string;
  status: 'sent' | 'viewed';
};

export function Sent({ message, hours, status }: IMessageProps) {
  return (
    <View className="mt-8 w-auto flex-col ">
      <View
        className="h-auto w-52 flex-row items-center justify-start
    rounded-t-xl rounded-bl-xl bg-blue-600"
      >
        <Text
          className="w-auto p-4 text-justify font-Poppins_400Regular
      text-sm text-white"
        >
          {message}
        </Text>
      </View>
      <View className="mt-1 items-end justify-end pr-2">
        <Status hours={hours} statusVisualization={status} />
      </View>
    </View>
  );
}
