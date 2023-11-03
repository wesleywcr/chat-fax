import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { TextStyled } from 'components/TextStyled';
import type { ISignUp } from 'dto/authDTO';
import { router } from 'expo-router';
import { useAuth } from 'hooks/useAuth';
import { pb } from 'lib/pocketbase';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { signUpSchema } from 'schemas/auth';

export default function SignUp() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });
  const { signIn } = useAuth();

  async function signUp(form: ISignUp) {
    try {
      const data = {
        password: form.password,
        email: form.email,
        passwordConfirm: form.password,
        name: form.name,
      };
      console.log('data', data);
      await pb.collection('users').create(data);
      const formData = {
        email: form.email,
        password: form.password,
      };
      await signIn(formData);
      router.push('/(tabs)/');
    } catch (err: any) {
      console.error(err.originalError);
      // console.error(err);
    }
  }

  return (
    <View className="flex-1 flex-col items-center justify-center bg-stone-900 p-4">
      <TextStyled>Cadastro</TextStyled>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Nome"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.name?.message}
          />
        )}
      />
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
      <Controller
        control={control}
        name="passwordConfirm"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Confirmar senha"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.passwordConfirm?.message}
            secureTextEntry
          />
        )}
      />

      <Button
        className=" mt-10"
        title="Cadastrar"
        onPress={handleSubmit(signUp)}
      />
    </View>
  );
}
