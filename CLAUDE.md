@AGENTS.md

# BSM447 Dönem Ödevi — F1 2024 Takımlar Puan Durumu

> Bu dosya projenin yol haritasıdır. Kaynak: `~/Downloads/BSM447_Donem_Odevi.pdf` (18 sayfa).
> **Bu dosyadaki ödev şartları, AGENTS.md'deki genel Expo önerileriyle çelişirse bu dosya geçerlidir.**

## Kimlik
| | |
|---|---|
| Öğrenci no | **B231210093** (1. öğretim) |
| Konu | **K15 · Formula 1 Puan Durumu · Jolpica F1 (Ergast)** |
| Varyant | **d · 2024 takımlar** |
| Ek kural | **4 · Silerken onay** |
| Teslim | **15 Aralık 2026 Salı 23.59**, OBİS'e `B231210093_BSM447.zip` |
| Kontrol günü | Son hane **3 (tek)** → **17 Aralık 2026 Perşembe**, kendi ders saatinde, 5 dk |
| GitHub deposu | `bsm447-odev-B231210093`, **public** |

Başka konu veya varyantla yapılan uygulama **değerlendirilmez**. Hep 2024 **takımlar** (constructors) üzerinde çalış, pilotlar (drivers) değil.

---

## API
```
GET https://api.jolpi.ca/ergast/f1/2024/constructorstandings/
```
- Veri **uygulama çalışırken** `fetch` ile çekilmeli. JSON'u projeye kopyalamak **yasak**.
- Liste şu yolda: `MRData.StandingsTable.StandingsLists[0].ConstructorStandings`. Toplam 10 takım var.
- Bir kaydın yapısı. **Sayılar string olarak geliyor**, `Number()` ile çevrilmeli:
```json
{
  "position": "1", "positionText": "1", "points": "666", "wins": "6",
  "Constructor": {
    "constructorId": "mclaren",
    "url": "https://en.wikipedia.org/wiki/McLaren",
    "name": "McLaren",
    "nationality": "British"
  }
}
```

### Konu kartı (K15) gereksinimleri
| | |
|---|---|
| **Listede** | sıra (`position`), ad (`Constructor.name`), puan (`points`) |
| **Detayda** | galibiyet (`wins`), uyruk (`Constructor.nationality`), takım (`Constructor.name`), lidere puan farkı |
| **Anahtar** | `Constructor.constructorId` (bu değer `keyExtractor` için kullanılacak) |
| **Konuya özel beklenti** | 1) Her satırda lidere puan farkı `−x` biçiminde gösterilir (lider puanı − takım puanı; liderde fark yok veya "Lider"). 2) İlk üç sıraya **altın / gümüş / bronz** rozet verilir. |

### Ek kural 4 — Silerken onay
Kaydedilenlerden çıkarırken **"Emin misiniz?"** diye sorulmalı. **"Vazgeç"** seçilirse kayıt yerinde kalmalı.
Bu onay hem Kaydedilenler ekranındaki silme işleminde hem de Detay'daki "Kaydedilenlerden çıkar" düğmesinde uygulanmalı. `Alert.alert(başlık, mesaj, [{text:'Vazgeç', style:'cancel'}, {text:'Sil', style:'destructive', onPress}])` kullanılabilir.

---

## Mimari
- **Expo SDK 58** (blank şablon), **JavaScript**.
- **Navigasyon: React Navigation.** Expo Router **kullanılmaz**, çünkü ödev açıkça Stack + Bottom Tab ve `route.params` istiyor.
  - Kök: `NativeStackNavigator`
    - `Tabs` (Bottom Tab): **Liste** · **Kaydedilenler**
    - `Detay`: Stack'te sekmelerin üstünde açılır. Kaydı `navigation.navigate('Detay', { item })` ile alır, ekranda `route.params.item` olarak okunur. **Global değişken kullanılmaz.**
- **Kalıcı veri:** `@react-native-async-storage/async-storage`. Kaydedilenler JSON dizisi olarak tek bir anahtarda tutulur, örneğin `@saved_constructors`.
- Kaydedilenler durumu iki sekme arasında paylaşılır. Bunun için basit bir React Context (`SavedContext`) kullanılır: açılışta AsyncStorage'dan yüklenir, her değişiklikte geri yazılır.

### Önerilen dosya yapısı
```
App.js                      # NavigationContainer + SavedProvider
src/
  api.js                    # fetchConstructorStandings() → normalize edilmiş dizi
  context/SavedContext.js   # saved, isSaved, addSaved, removeSaved (AsyncStorage)
  navigation/RootNavigator.js
  screens/ListScreen.js     # fetch+useEffect, FlatList, TextInput arama
  screens/DetailScreen.js   # route.params, Kaydet/Çıkar (onaylı)
  screens/SavedScreen.js    # kayıtlı takımlar, silerken onay
  components/StandingRow.js # sıra, ad, puan, −fark, madalya rozeti
```
Normalize edilmiş kayıt şu biçimde olacak: `{ id, position, name, nationality, points, wins, url, gap }`. Burada `gap = leaderPoints - points`.

### Kod kuralları
- Kod basit ve okunabilir olmalı. **Her satır sözlü olarak açıklanabilmeli** (kontrolde soruluyor). Gereksiz soyutlama ve kütüphane eklenmemeli.
- Arama **büyük/küçük harfe duyarsız** olmalı (`toLocaleLowerCase('tr-TR')` ile karşılaştırma).
- `FlatList` içinde `keyExtractor={item => item.id}` olmalı.
- Paket eklemek için her zaman `npx expo install <paket>` kullanılır. Paketler **Expo Go ile uyumlu** olmalı, native modül gerektiren paket eklenmemeli.
- Yükleniyor durumu (`ActivityIndicator`) ve hata durumu ("Bağlantı yok" + "Tekrar dene") baştan eklenmeli. Ek 3'teki görev 20 ve 21 için hazırlık olur.

---

## Yol haritası ve commit planı
Commit kuralları:
- **En az 10 commit, en az 10 farklı günde**, 5 Kasım ile 15 Aralık arasında.
- Mesaj yapılan işi anlatmalı. "update" veya "asd" gibi mesajlar sayılmaz.
- Commit tarihi **değiştirilmez**. 15 Aralık 23.59'dan sonraki commit'ler sayılmaz.

Aşağıdaki plan 12 güne yayılmış, böylece 2 günlük pay var.

| # | Tarih | İş | Örnek commit mesajı |
|---|---|---|---|
| 1 | 18 Kas | Expo iskeleti, bağımlılıklar, CLAUDE.md | `Expo projesi ve navigasyon bağımlılıkları kuruldu` |
| 2 | 20 Kas | Stack + Bottom Tab iskeleti, boş 3 ekran | `Stack ve alt sekme navigasyonu eklendi` |
| 3 | 23 Kas | `api.js` ve Liste: fetch + useEffect + FlatList, yükleniyor/hata | `Takım puan durumu API'den çekilip listeleniyor` |
| 4 | 25 Kas | Arama kutusu (harf duyarsız) | `Arama kutusu ile liste süzme çalışıyor` |
| 5 | 27 Kas | Detay ekranı, `route.params`, başlıkta takım adı | `Detay ekranı route.params ile takımı gösteriyor` |
| 6 | 30 Kas | SavedContext + AsyncStorage, Kaydet/Çıkar düğmesi | `Kaydetme AsyncStorage ile kalıcı hale getirildi` |
| 7 | 2 Ara | Kaydedilenler ekranı + **silerken onay (ek kural 4)** | `Kaydedilenlerden çıkarırken onay soruluyor` |
| 8 | 4 Ara | **Konuya özel:** lidere fark `−x`, altın/gümüş/bronz rozet | `Lidere puan farkı ve ilk üç rozeti eklendi` |
| 9 | 6 Ara | `app.json` uygulama adı ve kendi simgesi (`icon`, adaptive icon) | `Uygulama adı ve simgesi güncellendi` |
| 10 | 8 Ara | Görsel düzen, boş Kaydedilenler durumu, küçük iyileştirmeler | `Boş kaydedilenler durumu ve stil düzenlemeleri` |
| 11 | 10 Ara | `eas build -p android --profile preview`, APK linki, README | `README, ekran görüntüleri ve APK bağlantısı eklendi` |
| 12 | 12–14 Ara | Ek 3 provası sırasında çıkan düzeltmeler, zip hazırlığı | `Ek 3 provasında bulunan hatalar düzeltildi` |

### Teslim kontrol listesi
- [ ] `npx expo-doctor` temiz çıkıyor. SDK telefondaki Expo Go ile uyumlu.
- [ ] `app.json` içinde kendi `name` ve `icon` değerleri var.
- [ ] `.gitignore` içinde `node_modules/` ve `.expo/` var.
- [ ] GitHub deposu `bsm447-odev-B231210093` public. ≥10 commit ve ≥10 farklı gün var.
- [ ] `README.md` şunları içeriyor:
  - öğrenci no
  - konu ve varyant (K15-d)
  - ek kural (4)
  - kalıcı veri yöntemi (AsyncStorage)
  - 3 ekran görüntüsü
  - APK bağlantısı
  - en fazla 1 dakikalık ekran kaydı bağlantısı
- [ ] APK `eas build -p android --profile preview` ile üretildi ve telefona kuruldu.
- [ ] OBİS'e `B231210093_BSM447.zip` yüklendi. İçinde `node_modules` ve `.expo` yok. **Son tarih 15 Aralık 23.59.**

### Kontrol günü (17 Aralık) — 5 dakika
Yanında olması gerekenler:
- Uygulamanın kurulu olduğu Android telefon
- VS Code'da proje açık ve `npx expo start` ile çalışan bilgisayar
- Şarj aleti

Telefon ile bilgisayar aynı ağda olmalı. Olmazsa `npx expo start --tunnel` kullanılır.

Kontrolün bölümleri:
1. **Uygulama turu.** Uygulama kapatılıp açılır, kayıtların durduğu gösterilir.
2. **GitHub.** Hocanın seçtiği bir commit kodda gösterilip anlatılır.
3. **Canlı değişiklik.** Ek 3'ten kurayla bir görev çekilir. 2,5 dakikada, **destek almadan** yapılıp telefonda gösterilir.

---

## Ek 3 — Canlı değişiklik görevleri (önceden prova edilmeli)
Her biri ayrı bir dalda veya geçici olarak denenmeli ve 2,5 dakikanın altında yapılabilir hale gelmeli. Çekilen görev ek kural 4 ile aynı işe denk gelirse yeniden çekilir.

**Görünüm**
1. Zebra satırlar: satırlar sırayla iki farklı arka plan rengi alır.
2. Başlık ve alt satır: başlığın boyutu ve rengi değişir, altına API'den gelen ikinci bir alan küçük ve gri yazılır (ör. uyruk).
3. Yuvarlak görsel ve gölge: bu konuda görsel yok, bu yüzden adın baş harfini gösteren bir daire konur ve karta gölge verilir.
4. Uzun başlığı kısalt: tek satıra sığmayan başlık "…" ile biter (`numberOfLines={1}`).
5. İki sütunlu bilgi: Detayda en az üç bilgi "Etiket ↔ değer" biçiminde gösterilir.
6. Boş Kaydedilenler: ortada bir simge ve "Henüz kayıt yok" yazısı.

**State**
7. Beğeni sayacı: Detayda ♥ düğmesi olur, her basışta yanındaki sayı artar.
8. Liste / ızgara: bir düğmeyle 1 ve 2 sütun arasında geçilir (`numColumns`; değişince `key` de değişmeli).
9. Aramayı temizle: arama kutusunun yanında ✕ düğmesi olur, basınca kutu boşalır ve tüm liste görünür.
10. Görselleri gizle: bir `Switch` görselleri gizler; görsel yoksa alt satırı gizler.
11. Devamını göster: uzun metin önce 3 satır görünür, "Devamını göster / Gizle" ile açılır.
12. Kaydet düğmesinin durumu: kayıt zaten kaydedilmişse düğmede "Kaydedildi ✓" yazar ve rengi değişir; tekrar basınca kayıttan çıkar.

**Liste**
13. Ters sıra: listeyi ters çeviren bir düğme eklenir; asıl veri bozulmamalı (`[...data].reverse()`).
14. Sıra numarası: satır başında 1., 2., 3. … yazar.
15. Başlıkta toplam: listenin üstünde "Toplam N kayıt" yazar ve arama yapınca güncellenir.
16. Ayraç çizgisi: satırlar arasında ince gri çizgi olur (`ItemSeparatorComponent`).
17. Sonuç bulunamadı: arama sonuç vermezse bu yazı çıkar (`ListEmptyComponent`).
18. A→Z sıralama: bir düğmeyle liste ada göre A→Z sıralanır.

**API**
19. Parametre değiştir: hocanın söylediği değer adrese yazılır (ör. yıl 2023, `driverstandings`) ve yeni veri listede görünür. Bunun için URL `api.js` içinde tek bir sabitte tutulmalı.
20. Yükleniyor göstergesi: ortada dönen gösterge ve "Yükleniyor..." yazısı.
21. Hata mesajı: internet yokken uygulama çökmez, "Bağlantı yok" ve "Tekrar dene" çıkar.
22. Yeni alan: Detaya API'den gelen ama henüz gösterilmeyen bir alan eklenir (ör. `positionText`, `Constructor.url`).

**Navigasyon**
23. Başlıkta kaydın adı: Detayın üst başlığı takım adı olur (`navigation.setOptions({ title })` veya `options={({route}) => ...}`).
24. Kaydedilenlerden detaya: Kaydedilenler'deki bir kayda dokununca aynı Detay ekranı açılır.
25. Hakkında ekranı: ad, numara ve sürümü gösteren yeni ekran; menüden veya sekmeden açılır.
26. Sekme etiketi ve simgesi: bir sekmenin `tabBarLabel` ve `tabBarIcon` değerleri değişir.

**Kalıcı veri**
27. Tümünü sil: Kaydedilenler'e "Tümünü sil" düğmesi eklenir; onaydan sonra siler, uygulama yeniden açılınca da boş kalır.
28. Kayıt tarihi: kaydederken `savedAt` saklanır ve "31.10.2026 14:05" biçiminde gösterilir.
29. Son aramayı hatırla: arama metni AsyncStorage'a yazılır, açılışta kutuya geri gelir.
30. Kaydedilenleri sırala: en son kaydedilen en üstte görünür.

---

## Genel kurallar (hatırlatma)
- Kopya: başka bir öğrenciyle aynı kod çıkarsa iki ödev de 0 alır. Kod öğrencinin kendisine ait ve açıklanabilir olmalı.
- API kalıcı olarak çalışmazsa README'deki ekran kaydı değerlendirilir. Bu yüzden ekran kaydını erken çek.
- Kontrole gelmeyen 0 alır. OBİS'e yüklemeyen kontrole alınmaz.
