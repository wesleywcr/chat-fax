import type { UserDTO } from '@dto/userDTO';
import { pb } from '@lib/pocketbase';
import { useQuery } from '@tanstack/react-query';

export default function useShowUser(id: string) {
  return useQuery({
    queryKey: ['showUser'],
    queryFn: () => fetchShowUser(id),
  });
}

async function fetchShowUser(id: string) {
  try {
    const response = await pb.collection('users').getOne(id);
    return response as UserDTO;
  } catch (error) {
    console.log(error);
  }
}
