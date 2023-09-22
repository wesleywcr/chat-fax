import { Feather } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

export function SearchBar() {
  return (
    <View
      className="mt-8 h-12 w-full flex-row items-center
    justify-start rounded-3xl bg-stone-900 px-4"
    >
      <TextInput
        className="bg-transparent font-Poppins_500Medium
        text-sm text-white"
        placeholder="Pesquisar"
      >
        <Feather name="search" size={24} color="white" />
      </TextInput>
    </View>
  );
}
