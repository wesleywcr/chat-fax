import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import colors from 'tailwindcss/colors';

type IStatusProps = {
  hours: string;
  statusVisualization: 'sent' | 'viewed' | 'none';
};

export function Status({ hours, statusVisualization }: IStatusProps) {
  return (
    <View className=" flex-row items-center ">
      {statusVisualization === 'sent' && (
        <Ionicons name="checkmark" size={21} color={colors.gray['100']} />
      )}
      {statusVisualization === 'viewed' && (
        <Ionicons name="checkmark-done" size={24} color={colors.green['800']} />
      )}
      {statusVisualization === 'none' && <></>}

      <Text
        className=" w-auto text-justify
      font-Poppins_400Regular text-sm text-gray-100"
      >
        {hours}
      </Text>
    </View>
  );
}
