import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from 'react-native';

import { fetchConstructorStandings } from '../api';
import StandingRow from '../components/StandingRow';

export default function ListScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchConstructorStandings();
      setData(result);
    } catch (e) {
      setError('Bağlantı yok veya veri alınamadı.');
    } finally {
      setLoading(false);
    }
  }

  // Ekran ilk açıldığında bir kez veri çek
  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Tekrar dene" onPress={loadData} />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <StandingRow item={item} onPress={() => navigation.navigate('Detay', { item })} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  error: { color: '#c0392b', fontSize: 16 },
});
