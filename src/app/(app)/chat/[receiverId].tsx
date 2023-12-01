/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */

import { BarInput } from '@components/BarInput';
import { Header } from '@components/Header';
import { Received } from '@components/messages/Received';
import { Sent } from '@components/messages/Sent';
import type { ChatDTO } from '@dto/chatDTO';
import { useAuth } from '@hooks/useAuth';
import useListMessages from '@hooks/useListMessages';
import useShowUser from '@hooks/useShowUser';
import { pb } from '@lib/pocketbase';
import { FILE_URL } from '@storage/storageVariables';
import { convertDateToDay, convertDateToHours } from '@utils/convertDate';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SectionList, Text, View } from 'react-native';

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
    // formState: { errors },
  } = useForm<ChatDTO>();

  const { user } = useAuth();

  const listRef = useRef(null);

  const { receiverId } = useLocalSearchParams();
  console.log('receiverId', receiverId);
  const { data: listMsg, isLoading, refetch } = useListMessages();
  const { data: receiver } = useShowUser(String(receiverId));
  // console.log('list', listMsg);
  // console.log('receiver', receiver?.avatar);

  const scrollToBottom = () => {
    const lastSection = data[data.length - 1];
    const lastItemIndex = lastSection.data.length - 1;

    listRef.current.scrollToLocation({
      sectionIndex: data.length - 1,
      itemIndex: lastItemIndex,
      animated: true,
    });
  };

  useFocusEffect(
    useCallback(() => {
      const fetchNewMessages = async () => {
        try {
          await pb.collection('messages').subscribe('*', (e) => {
            console.log('action', e);
            refetch();
          });
          console.log('subscribed');
        } catch (error: any) {
          console.error('Error Subscribe', error.originalError);
        }
      };

      fetchNewMessages();

      return async () => {
        try {
          await pb.collection('messages').unsubscribe('*');
          console.log('unsubscribed');
        } catch (error: any) {
          console.log('error unsubscribed', error.originalError);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  async function handleSendMessage(data: ChatDTO) {
    try {
      const form = {
        text: data.text,
        user: user.id,
        status: 1,
        from: user.id,
        to: receiverId,
      };

      await pb.collection('messages').create(form);
      reset();
    } catch (error: any) {
      console.error('Error', error.originalError.data);
    }
  }
  if (listMsg === undefined || receiver === undefined) {
    return <Text>Falha</Text>;
  }
  function renderMessages(data: IListMessages) {
    if (data.from !== user.id) {
      return (
        <View className="w-full  items-start  ">
          <Received
            message={data.message}
            hours={convertDateToHours(data.created_at)}
            avatar_url={`${FILE_URL}/${receiver?.id}/${receiver?.avatar}`}
          />
        </View>
      );
    }
    return (
      <Sent
        message={data.message}
        status={data.status === 1 ? 'sent' : 'viewed'}
        hours={convertDateToHours(data.created_at)}
      />
    );
  }

  return (
    <View className="flex-1 flex-col  justify-between bg-black">
      <Header name={receiver.name ?? ''} status="online" />

      <View
        className="h-full w-full flex-col justify-between rounded-3xl
         bg-stone-950 pb-24"
      >
        <SectionList
          ref={listRef}
          sections={listMsg as IDataMessages[]}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            isLoading ? <Text>Carregando</Text> : <Text>Erro ao carregar</Text>
          }
          renderSectionHeader={({ section: { title } }) => (
            <View className="mt-5 self-center rounded-md bg-gray-700 px-1 py-2">
              <Text className="text-center text-white">
                {convertDateToDay(title)}
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="flex-col  items-end  p-7">
              {renderMessages(item)}
            </View>
          )}
        />

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
