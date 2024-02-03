import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { useAuth } from '@hooks/useAuth';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FILE_URL } from '@storage/storageVariables';
import { formattedPhone } from '@utils/formattedPhone';
import { Controller } from 'react-hook-form';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'tailwindcss/colors';

import useUpdateProfile from './hook/useUpdateProfile';

export default function UpdateProfile() {
  const { user } = useAuth();

  const {
    photoIsLoading,
    show,
    handleSubmit,
    errors,
    control,
    showMode,
    handleSelectedDate,
    handlePickImage,
    handleUpdateProfile,
  } = useUpdateProfile();
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-black">
      <View className="mb-12 bg-stone-800">
        <ScreenHeader title="Profile" isGoBack />
        <View className="h-full flex-1 rounded-t-xl bg-black">
          <View className="px-4">
            <View
              className="mt-10 h-36  items-center justify-center rounded-md
           bg-stone-950"
            >
              {photoIsLoading ? (
                <ActivityIndicator size={24} color={colors.blue['600']} />
              ) : (
                <Avatar avatar={`${FILE_URL}/${user?.id}/${user?.avatar}`} />
              )}

              <Text
                className="pt-2
              font-Poppins_400Regular text-xs italic  text-gray-200"
              >
                {user.email}
              </Text>
              <TouchableOpacity>
                <Text
                  className="mt-2  font-Poppins_600SemiBold text-base text-white"
                  onPress={() => handlePickImage()}
                >
                  Change photo
                </Text>
              </TouchableOpacity>
            </View>
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
                  onChangeText={(text: string) =>
                    onChange(formattedPhone(text))
                  }
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
                value={new Date(user.dateOfBirth)}
                mode="date"
                is24Hour
                onChange={(event, date) => handleSelectedDate(event, date)}
              />
            )}

            <Button
              title="Update"
              className="mt-10"
              onPress={handleSubmit(handleUpdateProfile)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
