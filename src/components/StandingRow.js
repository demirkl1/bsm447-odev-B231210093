import { Pressable, View, Text, StyleSheet } from 'react-native';

// İlk üç sıra için altın / gümüş / bronz renkler
const MEDAL_COLORS = { 1: '#D4AF37', 2: '#C0C0C0', 3: '#CD7F32' };

// Listedeki tek satır: sıra (rozet), takım adı, lidere fark, puan
export default function StandingRow({ item, onPress }) {
  const medalColor = MEDAL_COLORS[item.position];

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={[styles.badge, medalColor && { backgroundColor: medalColor }]}>
        <Text style={[styles.position, medalColor && styles.medalText]}>{item.position}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.gap}>{item.gap === 0 ? 'Lider' : `−${item.gap}`}</Text>
      </View>

      <Text style={styles.points}>{item.points} P</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#eee',
  },
  position: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  medalText: { color: '#fff' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '500' },
  gap: { fontSize: 13, color: '#888', marginTop: 2 },
  points: { fontSize: 16, fontWeight: '600' },
});
