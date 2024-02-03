import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="chat/[receiverId]" options={{ animation: 'fade' }} />
    </Stack>
  );
}
