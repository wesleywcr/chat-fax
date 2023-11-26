import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import colors from 'tailwindcss/colors';

import { TextStyled } from './TextStyled';

type ScreenHeaderProps = {
  title: string;
  isGoBack?: boolean;
};
export function ScreenHeader({ title, isGoBack }: ScreenHeaderProps) {
  const { goBack } = useNavigation();
  return (
    <View className="h-20 w-full   bg-stone-800">
      <View
        className="mt-5 w-full flex-1 flex-row items-center justify-start
   px-5"
      >
        {isGoBack && (
          <TouchableOpacity
            className="h-8 w-8 items-center justify-center"
            onPress={() => goBack()}
          >
            <Feather name="chevron-left" size={30} color={colors.blue[600]} />
          </TouchableOpacity>
        )}

        <TextStyled className="flex-1 items-center pr-8 text-center">
          {title}
        </TextStyled>
      </View>
    </View>
  );
}
