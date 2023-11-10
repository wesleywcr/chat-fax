/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
//
// Subscribe to realtime messages
// unsubscribe = await pb
//   .collection('messages')
//   .subscribe('*', async ({ action, record }) => {
//     if (action === 'create') {
//       // Fetch associated user
//       const userChat = await pb.collection('users').getOne(record.user);
//       console.log('userChat', userChat);
//       record.expand = { userChat };
//       // setMessagesChat((prevMessages) => [...prevMessages, record]);
//     }
//     if (action === 'delete') {
//       setMessagesChat((prevMessages) =>
//         prevMessages.filter((m) => m.id !== record.id),
//       );
//     }
//   });
import { BarInput } from 'components/BarInput';
import { Header } from 'components/Header';
import { Received } from 'components/messages/Received';
import { Sent } from 'components/messages/Sent';
import type { ChatDTO } from 'dto/chatDTO';
import { useFocusEffect } from 'expo-router';
import { useAuth } from 'hooks/useAuth';
import useListMessages from 'hooks/useListMessages';
import { pb } from 'lib/pocketbase';
import groupBy from 'lodash/groupBy';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';

type IDataMessages = {
  title: string;
  data: IListMessages[];
};
type IListMessages = {
  id: string;
  from: string;
  to: string;
  message: string;
  status: number;
  created_at: string;
};

export default function Chat() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ChatDTO>();

  const { user } = useAuth();
  // const [listMsg, setListMsg] = useState<IDataMessages[]>([]);
  // const [messagesChat, setMessagesChat] = useState<IListMessages[]>([]);

  function convert(array: IListMessages[]) {
    const groupList = Object.values(
      groupBy(array, function (n: IListMessages) {
        return n.created_at.substr(0, 10);
      }),
    );

    const data = [] as IDataMessages[];
    groupList.map((msg) => {
      const section = {
        title: String(msg[0]?.created_at),
        data: [...msg],
      };

      data.push(section);
    });
    return data;
  }
  const { data: listMsg, isLoading, refetch } = useListMessages();
  console.log('list', listMsg);
  async function result() {
    let messages: any[] = [];

    const resultList = await pb.collection('messages').getList(1, 50, {
      sort: 'created',
      expand: 'user',
    });
    messages = resultList.items;
    const resultChat = messages.map((msg) => ({
      id: msg.id,
      from: msg.from,
      to: msg.to,
      message: msg.text,
      status: msg.status,
      created_at: msg.created,
    }));
    const dataResult = convert(resultChat);
    console.log('dataResult', dataResult);
    //  setListMsg(dataResult);
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          await pb.collection('messages').subscribe('*', (e) => {
            console.log('event', e);
            refetch();
          });

          console.log('subscribed');
        } catch (error) {
          console.error('error subscribed', error);
        }
      };

      fetchData();

      return async () => {
        try {
          await pb.collection('messages').unsubscribe('*');
          console.log('unsubscribed');
        } catch (error: any) {
          console.log('error unsubscribed', error.originalError);
        }
      };
    }, []),
  );

  async function handleSendMessage(data: ChatDTO) {
    try {
      const form = {
        text: data.text,
        user: user.id,
        status: 1,
        from: user.id,
        to: 'hopy65w99rwu7bz',
      };

      await pb.collection('messages').create(form);
      reset();
    } catch (error: any) {
      console.log('Error', error);
    }
  }

  // async function unsubscribe() {
  //   pb.collection('messages').unsubscribe('*');
  // }
  // async function sendMessage(data: IChatDTO) {
  //   const createdMessage = await pb.collection('messages').create(data);
  // }

  //  const [msg, setMsg] = useState<IDataMessages[]>([]);
  if (listMsg === undefined) {
    return <Text>Falha</Text>;
  }
  function renderMessages(data: IListMessages) {
    if (data.from !== user.id) {
      return (
        <View className="w-full  items-start  ">
          <Received message={data.message} />
        </View>
      );
    }
    return <Sent message={data.message} />;
  }

  return (
    <View className="flex-1 flex-col  justify-between bg-black">
      <Header />

      <View
        className="h-full w-full flex-col justify-between rounded-3xl
         bg-stone-950 pb-24"
      >
        <SectionList
          sections={listMsg as IDataMessages[]}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            isLoading ? <Text>Carregando</Text> : <Text>Erro ao carregar</Text>
          }
          renderSectionHeader={({ section: { title } }) => (
            <View className="mt-5 self-center rounded-md bg-gray-700 px-1 py-2">
              <Text className="text-center text-white">{title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="flex-col  items-end  p-7 ">
              {renderMessages(item)}
            </View>
          )}
        />

        <TouchableOpacity onPress={() => result()}>
          <Text className="text-lg text-white">Chat</Text>
        </TouchableOpacity>
        <Controller
          control={control}
          name="text"
          render={({ field: { onChange, value } }) => (
            <BarInput
              value={value}
              onChangeText={onChange}
              characterCount={value?.length}
              onSend={handleSubmit(handleSendMessage)}
              onSubmitEditing={handleSubmit(handleSendMessage)}
              returnKeyType="send"
            />
          )}
        />
      </View>
    </View>
  );
}
