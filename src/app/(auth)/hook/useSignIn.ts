import type { ISignIn } from '@dto/authDTO';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/useAuth';
import { signInSchema } from '@schemas/auth';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';

export default function useSignIn() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignIn>({
    resolver: zodResolver(signInSchema),
  });
  const { signIn } = useAuth();

  async function login(data: ISignIn) {
    try {
      await signIn(data);
      router.replace('/(tabs)/');
    } catch (error) {
      console.error('Error', error);
    }
  }
  async function signUp() {
    router.push('/signUp');
  }
  return {
    handleSubmit,
    control,
    errors,
    login,
    signUp,
  };
}
