import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { TextStyled } from '@components/TextStyled';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formattedPhone } from '@utils/formattedPhone';
import { Controller } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
    formatInputDate,
    goBack,
  } = useSignUp();

  return (
    <ScrollView className="flex-1  bg-stone-900">
      <TouchableOpacity
        className="mb-6 mt-11 flex-row  items-start justify-start pl-4"
        onPress={() => goBack()}
      >
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <View className="flex-col items-center justify-center  p-4">
        <View className=" w-full flex-col items-start justify-start ">
          <TextStyled>Create Account</TextStyled>
        </View>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              testID="name-input"
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
          name="username"
          render={({ field: { onChange, value } }) => (
            <Input
              testID="username-input"
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
              testID="phone-input"
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
              testID="dateOfBirth-input"
              type="date"
              onPressIcon={() => showMode()}
              placeholder="Date of birth"
              onChangeText={(text) => {
                const formattedDate = formatInputDate(text);
                onChange(formattedDate);
              }}
              keyboardType="numeric"
              maxLength={10}
              value={value}
              errorMessage={errors.dateOfBirth?.message}
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
              testID="password-input"
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
              testID="passwordConfirm-input"
              placeholder="Confirm password"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.passwordConfirm?.message}
              secureTextEntry
            />
          )}
        />

        <Button
          testID="submit-button"
          className="mt-10"
          title="SIGN UP"
          onPress={handleSubmit(signUp)}
        />
        <Text className="mt-10 font-Poppins_400Regular text-base text-white ">
          Already have a account?
        </Text>
        <TouchableOpacity className="mb-10 " onPress={() => goBack()}>
          <Text className="font-Poppins_600SemiBold text-base text-blue-600">
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
