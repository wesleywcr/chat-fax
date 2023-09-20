import { StyledComponent } from 'nativewind';
import { Text, TouchableOpacity } from 'react-native';

export function Button({ ...rest }) {
  return (
    <StyledComponent component={TouchableOpacity} {...rest}>
      <TouchableOpacity
        className="h-14 items-center
      justify-center rounded-md bg-blue-600"
      >
        <Text className="font-bold text-white">Enviar</Text>
      </TouchableOpacity>
    </StyledComponent>
  );
}
