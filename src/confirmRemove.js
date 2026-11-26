import { Alert } from 'react-native';

// Ek kural 4: Kaydedilenlerden çıkarırken onay sor.
// "Vazgeç" seçilirse hiçbir şey yapılmaz, kayıt kalır.
export default function confirmRemove(name, onConfirm) {
  Alert.alert('Emin misiniz?', `${name} kaydedilenlerden çıkarılacak.`, [
    { text: 'Vazgeç', style: 'cancel' },
    { text: 'Çıkar', style: 'destructive', onPress: onConfirm },
  ]);
}
