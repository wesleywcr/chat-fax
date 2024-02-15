import type { ISignUp } from '@dto/authDTO';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/useAuth';
import { pb } from '@lib/pocketbase';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { signUpSchema } from '@schemas/auth';
import {
  convertDateFormatted,
  convertDateFormattedToDate,
} from '@utils/convertDate';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useSignUp() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });
  const { signIn } = useAuth();
  const [show, setShow] = useState(false);

  async function signUp(form: ISignUp) {
    try {
      const data = {
        password: form.password,
        email: form.email,
        passwordConfirm: form.password,
        username: form.username,
        phone: form.phone.replace(/\D/g, ''),
        dateOfBirth: convertDateFormattedToDate(form.dateOfBirth),
        name: form.name,
      };

      await pb.collection('users').create(data);
      const formData = {
        email: form.email,
        password: form.password,
      };
      await signIn(formData);
      router.push('/(tabs)/');
    } catch (err: any) {
      console.error(err.originalError);
    }
  }
  const handleSelectedDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate === undefined) {
      return selectedDate;
    }
    const currentDate = convertDateFormatted(selectedDate);
    setShow(false);
    setValue('dateOfBirth', currentDate);
  };
  function formatInputDate(inputDate: string) {
    const cleanedInput = inputDate.replace(/\D/g, '');

    const formatted = cleanedInput.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    setValue('dateOfBirth', formatted);
    return formatted;
  }
  function goBack() {
    router.push('/login');
  }

  function showMode() {
    setShow(true);
  }
  return {
    signUp,
    handleSubmit,
    control,
    errors,
    show,
    showMode,
    handleSelectedDate,
    formatInputDate,
    setValue,
    goBack,
  };
}
