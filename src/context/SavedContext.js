import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Kaydedilenler telefonda bu anahtar altında JSON olarak durur
const STORAGE_KEY = '@saved_constructors';

const SavedContext = createContext(null);

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Uygulama açılınca kayıtları AsyncStorage'dan oku
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((json) => {
        if (json) setSaved(JSON.parse(json));
      })
      .finally(() => setLoaded(true));
  }, []);

  // Liste her değiştiğinde AsyncStorage'a geri yaz
  // (okuma bitmeden yazarsak eski kayıtları boş diziyle ezeriz, o yüzden loaded kontrolü)
  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }
  }, [saved, loaded]);

  const isSaved = (id) => saved.some((item) => item.id === id);
  const addSaved = (item) => setSaved((prev) => [...prev, item]);
  const removeSaved = (id) => setSaved((prev) => prev.filter((item) => item.id !== id));

  return (
    <SavedContext.Provider value={{ saved, isSaved, addSaved, removeSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

// Ekranlarda: const { saved, isSaved, addSaved, removeSaved } = useSaved();
export function useSaved() {
  return useContext(SavedContext);
}
