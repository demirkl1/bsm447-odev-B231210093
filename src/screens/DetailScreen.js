import { View, Text, StyleSheet } from 'react-native';

export default function DetailScreen({ route }) {
  // Kayıt navigasyon parametresiyle gelir (global değişken yok)
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Sıra: {item.position}</Text>
      <Text>Puan: {item.points}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  title: { fontSize: 22, fontWeight: 'bold' },
});
