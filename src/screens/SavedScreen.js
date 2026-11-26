import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useSaved } from '../context/SavedContext';
import confirmRemove from '../confirmRemove';
import StandingRow from '../components/StandingRow';

export default function SavedScreen({ navigation }) {
  const { saved, removeSaved } = useSaved();

  if (saved.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="bookmark-outline" size={48} color="#bbb" />
        <Text style={styles.emptyText}>Henüz kayıt yok</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={saved}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <View style={styles.rowMain}>
            <StandingRow item={item} onPress={() => navigation.navigate('Detay', { item })} />
          </View>
          <Pressable
            style={styles.removeButton}
            onPress={() => confirmRemove(item.name, () => removeSaved(item.id))}
          >
            <Ionicons name="trash-outline" size={22} color="#c0392b" />
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: '#f2f2f2' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyText: { fontSize: 16, color: '#888' },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff' },
  rowMain: { flex: 1 },
  removeButton: { paddingHorizontal: 16, paddingVertical: 12 },
});
