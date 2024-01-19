import { Avatar } from '@components/Avatar';
import { AvatarContact } from '@components/AvatarContact';
import { CardConversation } from '@components/CardConversation';
import { SearchBar } from '@components/SearchBar';
import { TextStyled } from '@components/TextStyled';
import { useAuth } from '@hooks/useAuth';
import useListContacts from '@hooks/useListContacts';
import useHome from '@screens/(app)/hook/useHome';
import { FILE_URL } from '@storage/storageVariables';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const { user } = useAuth();

  const { data: listContacts } = useListContacts();

  const { handleOpenChat, handleOpenProfile, unReadMessages, messagesFilters } =
    useHome();

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
        <LinearGradient
          colors={['#8E2DE2', '#4A00E0']}
          start={[1, 1]}
          end={[0, 1]}
          className="absolute top-44 z-10 mt-3 h-56
        w-full rounded-t-xl "
        >
          <TextStyled className="my-4 pl-6">Contacts</TextStyled>

          <FlatList
            data={listContacts}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="mx-4" key={item.id}>
                <AvatarContact
                  name={item.name}
                  avatar={`${FILE_URL}/${item?.id}/${item?.avatar}`}
                  onPress={() => handleOpenChat(item.id)}
                />
              </View>
            )}
          />
        </LinearGradient>
        <View className="z-20 h-96 w-full flex-col rounded-t-3xl bg-stone-900">
          <TextStyled className="mt-4 pl-6">Recent</TextStyled>
          <FlatList
            data={messagesFilters}
            keyExtractor={(item) => item.collectionId}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: contact }) => (
              <>
                <CardConversation
                  key={contact.id}
                  name={
                    contact.expand.to.id === user.id
                      ? contact.expand.from.name
                      : contact.expand.to.name
                  }
                  lastMessage={contact.text}
                  avatar_url={
                    contact.expand.to.id === user.id
                      ? `${FILE_URL}/${contact?.expand.from.id}/${contact?.expand.from.avatar}`
                      : `${FILE_URL}/${contact?.expand.to.id}/${contact?.expand.to.avatar}`
                  }
                  unreadMessages={unReadMessages(contact.from)}
                  onPress={() =>
                    handleOpenChat(
                      contact.expand.to.id === user.id
                        ? contact.expand.from.id
                        : contact.expand.to.id,
                    )
                  }
                />
              </>
            )}
          />
        </View>
      </View>
    </View>
  );
}
