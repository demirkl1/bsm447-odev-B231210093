import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useSaved } from '../context/SavedContext';
import confirmRemove from '../confirmRemove';

// Etiket ↔ değer biçiminde tek bilgi satırı
function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function DetailScreen({ route }) {
  // Kayıt navigasyon parametresiyle gelir (global değişken yok)
  const { item } = route.params;
  const { isSaved, addSaved, removeSaved } = useSaved();
  const saved = isSaved(item.id);

  function handleSavePress() {
    if (saved) {
      confirmRemove(item.name, () => removeSaved(item.id));
    } else {
      addSaved(item);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.position}>{item.position}. sıra</Text>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.points}>{item.points} puan</Text>
      </View>

      <View style={styles.card}>
        <InfoRow label="Takım" value={item.name} />
        <InfoRow label="Uyruk" value={item.nationality} />
        <InfoRow label="Galibiyet" value={item.wins} />
        <InfoRow
          label="Lidere puan farkı"
          value={item.gap === 0 ? 'Lider' : `−${item.gap}`}
        />
      </View>

      <Pressable
        style={[styles.button, saved && styles.buttonRemove]}
        onPress={handleSavePress}
      >
        <Text style={styles.buttonText}>
          {saved ? 'Kaydedilenlerden çıkar' : 'Kaydet'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16, backgroundColor: '#f2f2f2', flexGrow: 1 },
  header: { alignItems: 'center', paddingVertical: 16 },
  position: { fontSize: 14, color: '#888' },
  title: { fontSize: 26, fontWeight: 'bold', marginVertical: 4 },
  points: { fontSize: 18, fontWeight: '600' },
  card: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: { fontSize: 16, color: '#666' },
  value: { fontSize: 16, fontWeight: '600' },
  button: {
    backgroundColor: '#1e6fd9',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonRemove: { backgroundColor: '#c0392b' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
