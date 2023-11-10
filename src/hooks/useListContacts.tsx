/* eslint-disable @typescript-eslint/no-use-before-define */
import { useQuery } from '@tanstack/react-query';
import { pb } from 'lib/pocketbase';

import { useAuth } from './useAuth';

export default function useListContacts() {
  const { user } = useAuth();

  return useQuery<any[]>({
    queryKey: ['receiver', user?.id],
    queryFn: () => fetchDataContats(user?.id as string),
  });
}

async function fetchDataContats(id: string) {
  try {
    const response = await pb.collection('users').getFullList(200, {
      sort: 'created',
      filter: `id!='${id}'`,
    });
    return response as any;
  } catch (error) {
    console.log(error);
  }
}
