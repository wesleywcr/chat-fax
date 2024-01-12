import { Text, TouchableOpacity, View } from 'react-native';

import { Avatar } from './Avatar';

type AvatarProps = {
  name: string;
  onPress: () => void;
  avatar?: string;
};
export function AvatarContact({ name, onPress, avatar }: AvatarProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className="h-16 w-16 items-center  justify-center  rounded-full border-2
     border-purple-500"
      >
        <Avatar avatar={avatar} />
      </View>
      <Text
        className="mt-2 text-center
        font-Poppins_500Medium
        text-sm text-white"
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
