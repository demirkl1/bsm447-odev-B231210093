import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Button,
  StyleSheet,
} from 'react-native';

import { fetchConstructorStandings } from '../api';
import StandingRow from '../components/StandingRow';

export default function ListScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

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

  // Arama: büyük/küçük harfe duyarsız.
  // Türkçe küçültmede "I" → "ı" olur; takım adları İngilizce olduğu için "ı" → "i" yapıyoruz.
  const normalize = (text) => text.toLocaleLowerCase('tr-TR').replace(/ı/g, 'i');
  const query = normalize(search.trim());
  const filtered = data.filter((item) => normalize(item.name).includes(query));

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
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Takım ara..."
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StandingRow item={item} onPress={() => navigation.navigate('Detay', { item })} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Sonuç bulunamadı</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  error: { color: '#c0392b', fontSize: 16 },
  search: {
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  empty: { textAlign: 'center', marginTop: 24, color: '#888' },
});
