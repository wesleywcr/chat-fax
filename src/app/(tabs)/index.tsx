import { Avatar } from 'components/Avatar';
import { CardConversation } from 'components/CardConversation';
import { SearchBar } from 'components/SearchBar';
import { TextStyled } from 'components/TextStyled';
import { router } from 'expo-router';
import useListContacts from 'hooks/useListContacts';
import { View } from 'react-native';

export default function Home() {
  const { data: listContacts } = useListContacts();

  function handleOpenChat() {
    router.push('/(app)/chat/chat');
  }
  return (
    <View className="flex-1 flex-col  justify-between bg-black">
      <View className="h-full flex-col justify-between ">
        <View className="px-5">
          <View className="mt-10 flex-row items-center justify-between">
            <TextStyled>Mensagens</TextStyled>
            <Avatar />
          </View>
          <SearchBar />
        </View>

        <View className="h-96 w-full flex-col rounded-3xl bg-stone-900">
          <TextStyled className="mt-4 pl-6">Chat</TextStyled>
          {listContacts?.map((contact) => (
            <CardConversation
              key={contact.id}
              name={contact.name}
              onPress={() => handleOpenChat()}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
