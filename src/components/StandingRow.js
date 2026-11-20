import { Pressable, View, Text, StyleSheet } from 'react-native';

// Listedeki tek satır: sıra, takım adı, puan
export default function StandingRow({ item, onPress }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Text style={styles.position}>{item.position}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={styles.points}>{item.points} P</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  position: { width: 32, fontSize: 18, fontWeight: 'bold' },
  info: { flex: 1 },
  name: { fontSize: 16 },
  points: { fontSize: 16, fontWeight: '600' },
});
