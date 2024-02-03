import type { IDataMessages, IListMessages } from '@dto/messagesDTO';
import { pb } from '@lib/pocketbase';
import { useQuery } from '@tanstack/react-query';
import groupBy from 'lodash/groupBy';
import type { RecordModel } from 'pocketbase';

import { useAuth } from './useAuth';

export default function useListMessages(receiverId: string) {
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['messages'],
    queryFn: () => fetchDataMessages(receiverId, user?.id as string),
  });
  return {
    data,
    isLoading,
    refetch,
  };
}
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
function messageFilterBetweenTwoUsers(
  array: RecordModel[],
  receiverId: string,
  userId: string,
) {
  return array.filter((message) => {
    const listMessagesUsers =
      (message.from === receiverId && message.to === userId) ||
      (message.from === userId && message.to === receiverId);

    return listMessagesUsers;
  });
}

export async function fetchDataMessages(receiverId: string, userId: string) {
  try {
    let messages: any[] = [];

    const response = await pb.collection('messages').getList(1, 50, {
      sort: 'created',
      expand: 'user',
    });

    messages = messageFilterBetweenTwoUsers(response.items, receiverId, userId);

    const resultChat = messages.map((msg) => ({
      id: msg.id,
      from: msg.from,
      to: msg.to,
      message: msg.text,
      status: msg.status,
      created_at: msg.created,
    }));

    const dataResult = convert(resultChat);
    return dataResult as IDataMessages[];
  } catch (error) {
    console.log(error);
  }
}
