import type { ISignIn } from '@dto/authDTO';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/useAuth';
import { signInSchema } from '@schemas/auth';
import { useRouter } from 'expo-router';
// import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';

export default function useSignIn() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignIn>({
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();
  const { signIn } = useAuth();

  async function login(data: ISignIn) {
    try {
      await signIn(data);
      router.push('/(tabs)/');
      showMessage({
        message: 'Successfully!!',
        description: 'Login done successfully',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Authentication failed!!',
        description: 'Check email and password fields',
        type: 'danger',
      });
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
