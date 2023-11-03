import type { TextInputProps } from 'react-native';
import { Text, TextInput, View } from 'react-native';

type Props = TextInputProps & {
  errorMessage?: string;
};
export function Input({ errorMessage, ...rest }: Props) {
  return (
    <View className=" w-full  ">
      <TextInput
        className="mt-5 h-14 w-full rounded-md bg-stone-950  px-4 font-Poppins_400Regular
     text-sm text-white"
        placeholderTextColor="#fff"
        {...rest}
      />
      <Text className="font-Poppins_400Regular text-sm text-red-800">
        {errorMessage}
      </Text>
    </View>
  );
}
