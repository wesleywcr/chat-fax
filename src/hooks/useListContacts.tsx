import type { IListContacts } from '@dto/contactsDTO';
import { pb } from '@lib/pocketbase';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from './useAuth';

export default function useListContacts() {
  const { user } = useAuth();

  return useQuery<IListContacts[] | undefined>({
    queryKey: ['receiver', user?.id],
    queryFn: () => fetchDataContacts(user?.id as string),
  });
}

async function fetchDataContacts(id: string) {
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
