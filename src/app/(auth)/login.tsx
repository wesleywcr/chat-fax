import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { TextStyled } from 'components/TextStyled';
import type { ISignIn } from 'dto/authDTO';
import { router } from 'expo-router';
import { useAuth } from 'hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { signInSchema } from 'schemas/auth';

export default function Login() {
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

  return (
    <View
      className="flex-1 flex-col items-center justify-center
     bg-stone-900 p-4"
    >
      <TextStyled>Login</TextStyled>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Senha"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
            secureTextEntry
          />
        )}
      />

      <Button className=" mt-10" title="Entrar" onPress={handleSubmit(login)} />
      <Button
        className="mt-10 border-2 border-blue-500 bg-transparent"
        title="Cadastro"
        onPress={() => signUp()}
      />
    </View>
  );
}
