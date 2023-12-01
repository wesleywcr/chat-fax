import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { TextStyled } from '@components/TextStyled';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formattedPhone } from '@utils/formattedPhone';
import { Controller } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import useSignUp from './hook/useSignUp';

export default function SignUp() {
  const {
    signUp,
    handleSubmit,
    control,
    errors,
    show,
    showMode,
    handleSelectedDate,
  } = useSignUp();
  return (
    <ScrollView className="flex-1  bg-stone-900">
      <View className="my-10  flex-col items-center justify-center  p-4">
        <TextStyled>Register</TextStyled>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Name"
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
          name="username"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Username"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Phone"
              value={value}
              maxLength={15}
              keyboardType="numeric"
              onChangeText={(text: string) => onChange(formattedPhone(text))}
              errorMessage={errors.phone?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field: { onChange, value } }) => (
            <Input
              type="date"
              onPressIcon={() => showMode()}
              placeholder="Date of birth"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="date"
            is24Hour
            onChange={(event, date) => handleSelectedDate(event, date)}
          />
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Password"
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
              placeholder="Confirm password"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.passwordConfirm?.message}
              secureTextEntry
            />
          )}
        />

        <Button
          className=" mt-10"
          title="Register"
          onPress={handleSubmit(signUp)}
        />
      </View>
    </ScrollView>
  );
}
