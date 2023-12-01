/* eslint-disable array-callback-return */
import { pb } from '@lib/pocketbase';
import { useQuery } from '@tanstack/react-query';
import groupBy from 'lodash/groupBy';

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
export default function useListMessages() {
  return useQuery<any[]>({
    queryKey: ['messages'],
    queryFn: () => fetchDataMessages(),
    // enabled: !!receiver,
  });
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

async function fetchDataMessages() {
  try {
    let messages: any[] = [];

    const response = await pb.collection('messages').getList(1, 50, {
      sort: 'created',
      expand: 'user',
    });
    messages = response.items;
    const resultChat = messages.map((msg) => ({
      id: msg.id,
      from: msg.from,
      to: msg.to,
      message: msg.text,
      status: msg.status,
      created_at: msg.created,
    }));
    const dataResult = convert(resultChat);
    return dataResult as any;
  } catch (error) {
    console.log(error);
  }
}
