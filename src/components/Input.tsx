import { Feather } from '@expo/vector-icons';
import type { TextInputProps } from 'react-native';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from 'tailwindcss/colors';

type Props = TextInputProps & {
  errorMessage?: string;
  type?: 'date' | 'none';
  onPressIcon?: () => void;
};
export function Input({ errorMessage, type, onPressIcon, ...rest }: Props) {
  return (
    <View
      className="mt-10 h-14 w-full rounded-md bg-stone-950
    px-4 "
    >
      <View className=" flex-row  items-center  justify-between ">
        <TextInput
          className="h-14 w-5/6 font-Poppins_400Regular text-sm  text-white"
          placeholderTextColor="#fff"
          {...rest}
        />
        {type === 'date' && (
          <TouchableOpacity
            className="flex-row  items-center"
            onPress={onPressIcon}
          >
            <Feather name="calendar" size={24} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
      <Text className="font-Poppins_400Regular text-sm text-red-800">
        {errorMessage}
      </Text>
    </View>
  );
}
