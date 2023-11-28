import { Feather } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import colors from 'tailwindcss/colors';

type AvatarProps = {
  avatar?: string;
};
export function Avatar({ avatar }: AvatarProps) {
  return (
    <View>
      {avatar?.slice(-3) === 'png' || avatar?.slice(-4) === 'jpeg' ? (
        <Image
          className="h-12 w-12 rounded-full"
          source={{
            uri: avatar,
          }}
          alt="Foto do usuário"
        />
      ) : (
        <View
          className="mr-3 h-12 w-12 items-center justify-center
         rounded-full bg-blue-950"
        >
          <Feather name="user" size={26} color={colors.white} />
        </View>
      )}
    </View>
  );
}
