import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import type { TextInputProps } from 'react-native';
import { TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from 'tailwindcss/colors';

type BarInputProps = TextInputProps & {
  onSend: () => void;
  characterCount?: number;
};
export function BarInput({ onSend, characterCount, ...rest }: BarInputProps) {
  return (
    <View
      className="h-24  w-full flex-row items-center rounded-t-3xl
     bg-black  px-8 py-6"
    >
      <AntDesign name="pluscircle" size={30} color="#0050EF" />
      <View
        className="mx-4 h-10 w-64 flex-row  items-center
       rounded-full  bg-stone-950 px-4"
      >
        <TextInput className=" w-48 text-white" {...rest} />
        <MaterialCommunityIcons
          name="emoticon-happy-outline"
          size={24}
          color="#333333"
        />
      </View>
      {characterCount !== undefined && characterCount > 0 ? (
        <TouchableOpacity onPress={onSend}>
          <MaterialCommunityIcons name="send" size={24} color="#0050EF" />
        </TouchableOpacity>
      ) : (
        <MaterialCommunityIcons
          name="microphone-outline"
          size={24}
          color={colors.stone[950]}
        />
      )}
    </View>
  );
}
