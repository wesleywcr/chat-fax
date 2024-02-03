import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { TextStyled } from '@components/TextStyled';
import { Controller } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

import useSignIn from './hook/useSignIn';

export default function Login() {
  const { handleSubmit, control, errors, login, signUp } = useSignIn();

  return (
    <View
      className="flex-1 flex-col items-center justify-center
     bg-stone-900 p-4"
    >
      <View className="w-full flex-col items-start justify-start ">
        <TextStyled className="text-2xl">Login</TextStyled>
        <Text className="font-Poppins_400Regular text-sm text-white">
          Please sign in to continue
        </Text>
      </View>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            testID="email-input"
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
            testID="password-input"
            placeholder="Password"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
            secureTextEntry
          />
        )}
      />

      <Button
        testID="submit-button"
        className="mt-10"
        title="LOGIN"
        onPress={handleSubmit(login)}
      />

      <Text className="mt-10 font-Poppins_400Regular text-base text-white ">
        {`Don't have an account?`}
      </Text>
      <TouchableOpacity onPress={() => signUp()}>
        <Text className="font-Poppins_600SemiBold text-base text-blue-600">
          Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
