import type { ILastMessages } from '@dto/messagesDTO';
import { pb } from '@lib/pocketbase';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from './useAuth';

export default function useLastMessages() {
  const { user } = useAuth();

  return useQuery<ILastMessages[] | undefined>({
    queryKey: ['last-messages', user?.id],
    queryFn: () => fetchLastDataMessages(),
  });
}

async function fetchLastDataMessages() {
  try {
    const response = await pb.collection('messages').getFullList(3, {
      sort: '-created',
      expand: `to,from`,
    });

    return response as ILastMessages[];
  } catch (error) {
    console.log(error);
  }
}
