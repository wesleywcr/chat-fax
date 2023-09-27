import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

export function BarInput() {
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
        <TextInput className=" w-48 text-white" />
        <MaterialCommunityIcons
          name="emoticon-happy-outline"
          size={24}
          color="#333333"
        />
      </View>

      <MaterialCommunityIcons
        name="microphone-outline"
        size={24}
        color="#333333"
      />
    </View>
  );
}
