import { Feather } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';
import colors from 'tailwindcss/colors';

import { Status } from './Status';

type IMessageProps = {
  message: string;
  hours: string;
  avatar_url?: string;
};

export function Received({ message, hours, avatar_url }: IMessageProps) {
  return (
    <View className="mt-8 w-auto flex-col ">
      <View className=" flex-row items-center">
        {avatar_url ? (
          <Image
            className="mr-3 h-8 w-8 rounded-full"
            source={{
              uri: `${avatar_url}`,
            }}
          />
        ) : (
          <View
            className="mr-3 h-8 w-8 items-center justify-center
           rounded-full bg-blue-950"
          >
            <Feather name="user" size={22} color={colors.white} />
          </View>
        )}

        <View
          className="h-auto w-52 flex-row items-center justify-start
        rounded-t-xl rounded-br-xl  bg-stone-900 "
        >
          <Text
            className="w-auto p-4 text-justify font-Poppins_400Regular
          text-sm text-white"
          >
            {message}
          </Text>
        </View>
      </View>
      <View className="mt-1 items-end justify-end pr-2">
        <Status hours={hours} statusVisualization="none" />
      </View>
    </View>
  );
}
