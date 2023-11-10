import { Button } from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import { View } from 'react-native';

export default function Profile() {
  const { signOut } = useAuth();
  return (
    <View>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
}
