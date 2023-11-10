import { Image, Text, View } from 'react-native';

import { Status } from './Status';

type IMessageProps = {
  message: string;
};

export function Received({ message }: IMessageProps) {
  // const {colorSchema} = useColorScheme();
  return (
    <View className="mt-8 w-auto flex-col ">
      <View className=" flex-row items-center">
        <Image
          className="mr-3 h-8 w-8 rounded-full"
          source={{
            uri: 'https://img.freepik.com/fotos-premium/pessoas-mulheres-negocios-e-conceito-de-retrato-rosto-de-jovem-sorridente-feliz_380164-121867.jpg',
          }}
        />
        <View className="h-auto w-52 flex-row items-center justify-start rounded-t-xl rounded-br-xl  bg-stone-900">
          <Text className="w-auto p-4 text-justify font-Poppins_400Regular text-sm text-white">
            {message}
          </Text>
        </View>
      </View>
      <View className="mt-1 items-end justify-end pr-2">
        <Status />
      </View>
    </View>
  );
}
