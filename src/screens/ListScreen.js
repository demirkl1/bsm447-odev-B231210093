import { View, Text, Button, StyleSheet } from 'react-native';

// GEÇİCİ: API bağlanana kadar navigasyonu denemek için örnek kayıt
const ORNEK = { id: 'mclaren', position: 1, name: 'McLaren', points: 666 };

export default function ListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Liste ekranı (API sonraki adımda bağlanacak)</Text>
      <Button
        title="Örnek detayı aç"
        onPress={() => navigation.navigate('Detay', { item: ORNEK })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});
