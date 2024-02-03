import type { IProfile } from '@dto/authDTO';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/useAuth';
import { pb } from '@lib/pocketbase';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { profileSchema } from '@schemas/profile';
import {
  convertDateFormatted,
  convertDateFormattedToDate,
  convertDateStringFormatted,
} from '@utils/convertDate';
import { formattedPhone } from '@utils/formattedPhone';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useListContacts() {
  const { user, getUserInfo } = useAuth();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IProfile>({
    resolver: zodResolver(profileSchema),
  });
  const [show, setShow] = useState(false);
  const [photoIsLoading, setPhotoIsloading] = useState(false);

  async function handlePickImage() {
    try {
      setPhotoIsloading(true);
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!photoSelected.canceled) {
        const fileUri = photoSelected.assets[0].uri;

        const formData = new FormData();

        formData.append('avatar', {
          uri: fileUri,
          type: `image/*`,
          name: fileUri.split('/').pop(),
        } as any);

        await pb.collection('users').update(user.id, formData);
        getUserInfo(user.id);
      }
    } catch (error: any) {
      console.error('Error1', error.originalError);
    } finally {
      setPhotoIsloading(false);
    }
  }

  async function handleUpdateProfile(data: IProfile) {
    try {
      const dataForm = {
        ...data,
        phone: data.phone.replace(/\D/g, ''),
        dateOfBirth: convertDateFormattedToDate(data.dateOfBirth),
      };

      await pb.collection('users').update(user.id, dataForm);
      getUserInfo(user.id);
      router.back();
    } catch (error: any) {
      console.error('Error', error.originalError.data);
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

  function showMode() {
    setShow(true);
  }

  useEffect(() => {
    setValue('name', user.name);
    setValue('username', user.username);
    setValue('dateOfBirth', convertDateStringFormatted(user.dateOfBirth));
    setValue('phone', formattedPhone(user.phone));
  }, [setValue, user.username, user.name, user.dateOfBirth, user.phone]);
  return {
    photoIsLoading,
    show,
    handleSubmit,
    errors,
    control,
    showMode,
    handleSelectedDate,
    handlePickImage,
    handleUpdateProfile,
  };
}
