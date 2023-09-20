import { Text, TouchableOpacity, View } from 'react-native';

import { Button } from './src/components/Button';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-red-950">
      <TouchableOpacity className="h-14 w-full items-center  justify-center bg-slate-950">
        <Text className="font-bold text-white">Enviar</Text>
      </TouchableOpacity>
      <Button />
    </View>
  );
}
