/* eslint-disable @typescript-eslint/no-use-before-define */
import type { IListContacts } from '@dto/userDTO';
import { pb } from '@lib/pocketbase';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from './useAuth';

export default function useListContacts() {
  const { user } = useAuth();

  return useQuery<IListContacts[] | undefined>({
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
    return response as IListContacts[];
  } catch (error) {
    console.log(error);
  }
}
