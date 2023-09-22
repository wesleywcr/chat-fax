import { Image, View } from 'react-native';

export function Avatar() {
  return (
    <View>
      <Image
        className="h-12 w-12 rounded-full"
        source={{
          uri: 'https://img.freepik.com/fotos-premium/pessoas-mulheres-negocios-e-conceito-de-retrato-rosto-de-jovem-sorridente-feliz_380164-121867.jpg',
        }}
      />
    </View>
  );
}
