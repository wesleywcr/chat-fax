import { Avatar } from '@components/Avatar';
import { ScreenHeader } from '@components/ScreenHeader';
import { TextStyled } from '@components/TextStyled';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import { FILE_URL } from '@storage/storageVariables';
import { router } from 'expo-router';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const { signOut, user, deleteAccount } = useAuth();

  function handleOpenUpdateProfile() {
    router.push(`updateProfile`);
  }

  async function handleDeleteAccount() {
    Alert.alert('Do you want to delete your account?', '', [
      {
        text: 'Cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          deleteAccount(user.id);
        },
      },
    ]);
  }

  return (
    <View className="flex-1 bg-stone-800">
      <ScreenHeader title="Profile" />
      <View className="flex-1 rounded-t-xl bg-black">
        <View className=" px-4">
          <View
            className="mt-10 h-36  items-center justify-center rounded-md
          bg-stone-950"
          >
            <Avatar avatar={`${FILE_URL}/${user?.id}/${user?.avatar}`} />
            <TextStyled className="mt-2">{user.name}</TextStyled>
            <Text className="font-Poppins_400Regular  text-sm italic  text-white">
              @{user.username}
            </Text>
          </View>
          <View className="mt-10">
            <TouchableOpacity
              onPress={() => handleOpenUpdateProfile()}
              className="my-4 flex-row items-center"
            >
              <View
                className="h-10 w-10 items-center justify-center
        rounded-full bg-blue-600"
              >
                <FontAwesome5 name="user-edit" size={20} color="#fff" />
              </View>

              <Text
                className="ml-5  font-Poppins_600SemiBold text-lg
         text-white"
              >
                Update profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={signOut}
              className="my-4 flex-row items-center"
            >
              <View
                className="h-10 w-10 items-center justify-center
        rounded-full bg-blue-600"
              >
                <Feather name="log-out" size={24} color="#fff" />
              </View>

              <Text
                className="ml-5  font-Poppins_600SemiBold text-lg
         text-white"
              >
                Logout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteAccount()}
              className="my-4 flex-row items-center"
            >
              <View
                className="h-10 w-10 items-center justify-center rounded-full
           bg-red-600"
              >
                <Feather name="trash" size={24} color="#fff" />
              </View>

              <Text className="ml-5  font-Poppins_600SemiBold text-lg  text-white">
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
