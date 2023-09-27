import { View } from 'react-native';

import { BarInput } from '../components/BarInput';
import { Header } from '../components/Header';
import { Received } from '../components/messages/Received';
import { Sent } from '../components/messages/Sent';

export function Chat() {
  return (
    <View className="flex-1 flex-col  justify-between bg-black">
      <Header />

      <View
        className="h-full w-full flex-col justify-between rounded-3xl    bg-stone-950
       pb-24"
      >
        <View className="flex-col  items-end  p-7 ">
          <Sent />
          <View className="w-full  items-start  ">
            <Received />
          </View>
        </View>
        <BarInput />
      </View>
    </View>
  );
}
