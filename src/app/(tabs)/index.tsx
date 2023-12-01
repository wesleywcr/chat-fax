import { Avatar } from '@components/Avatar';
import { CardConversation } from '@components/CardConversation';
import { SearchBar } from '@components/SearchBar';
import { TextStyled } from '@components/TextStyled';
import { useAuth } from '@hooks/useAuth';
import useListContacts from '@hooks/useListContacts';
import { pb } from '@lib/pocketbase';
import { FILE_URL } from '@storage/storageVariables';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export default function Home() {
  const { user } = useAuth();
  const isLogged = pb.authStore.isValid;
  console.log('isLogged ', isLogged);
  const { data: listContacts } = useListContacts();

  function handleOpenChat(id: string) {
    router.push(`chat/${id}`);
  }

  function handleOpenProfile() {
    router.push(`/profile`);
  }
  return (
    <View className="flex-1 flex-col  justify-between bg-black">
      <View className="h-full flex-col justify-between ">
        <View className="px-5">
          <View className="mt-10 flex-row items-center justify-between">
            <TextStyled>Messages</TextStyled>
            <TouchableOpacity onPress={() => handleOpenProfile()}>
              <Avatar avatar={user.avatar} />
            </TouchableOpacity>
          </View>
          <SearchBar />
        </View>

        <View className="h-96 w-full flex-col rounded-t-3xl bg-stone-900">
          <TextStyled className="mt-4 pl-6">Recent</TextStyled>

          {listContacts?.map((contact) => (
            <CardConversation
              key={contact.id}
              name={contact.name}
              lastMessage="ola tudo bem?"
              avatar_url={`${FILE_URL}/${contact?.id}/${contact?.avatar}`}
              unreadMessages={5}
              onPress={() => handleOpenChat(contact.id)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
