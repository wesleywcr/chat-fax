/* eslint-disable @typescript-eslint/no-use-before-define */
import type { ILastMessages } from '@dto/messagesDTO';
import { pb } from '@lib/pocketbase';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from './useAuth';

export default function useLastMessages() {
  const { user } = useAuth();

  return useQuery<ILastMessages[] | undefined>({
    queryKey: ['last-messages', user?.id],
    queryFn: () => fetchLastDataMessages(user?.id as string),
  });
}

async function fetchLastDataMessages(id: string) {
  try {
    const response = await pb.collection('messages').getFullList({
      sort: '-created',
      expand: 'from',
      filter: `to='${id}'`,
    });

    return response as ILastMessages[];
  } catch (error) {
    console.log(error);
  }
}
