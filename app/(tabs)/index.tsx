// File: app/(tabs)/index.tsx
// (FIXED: Search Bar turun ke bawah biar gak ketutup Poni HP)

import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, TextInput, View } from 'react-native';
// 1. IMPORT library Safe Area
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../../constants/Colors';
import DiaryCard from '../../src/components/DiaryCard';
import type { Film } from '../../src/context/EntriesContext';
import { useEntries } from '../../src/context/EntriesContext';
import useDebounce from '../../src/hooks/useDebounce';

export default function HomeScreen() {
  const router = useRouter();
  
  // 2. AMBIL data jarak aman (insets)
  const insets = useSafeAreaInsets();

  const { films } = useEntries();
  const [q, setQ] = useState('');
  const qDebounced = useDebounce(q, 250);

  const data = useMemo<Film[]>(() => {
    const s = qDebounced.trim().toLowerCase();
    if (!s) return films;
    return films.filter(
      (e) =>
        e.title.toLowerCase().includes(s) ||
        e.review.toLowerCase().includes(s) ||
        e.releaseYear.toLowerCase().includes(s)
    );
  }, [films, qDebounced]);

  const openDetail = useCallback(
    (it: { id: number; title: string }) => {
      router.push({ pathname: '/detail/[id]', params: { id: String(it.id), title: it.title } });
    },
    [router]
  );

  const renderItem: ListRenderItem<Film> = useCallback(
    ({ item }) => <DiaryCard {...item} onPress={() => openDetail(item)} />,
    [openDetail]
  );

  const listRef = useRef<FlatList<Film>>(null);

  return (
    <View 
      style={{ 
        flex: 1, 
        backgroundColor: COLORS.background,
        gap: 12,
        // 3. ATUR PADDING DENGAN SAFE AREA
        paddingHorizontal: 16, // Kanan-Kiri tetap 16
        paddingBottom: 16,     // Bawah 16
        paddingTop: insets.top + 16, // Atas = Tinggi Poni + 16px (Jarak Aman!)
      }}
    >
      <TextInput
        placeholder="Cari film, review..."
        placeholderTextColor="#999" // Tambahin biar jelas di dark mode (opsional)
        value={q}
        onChangeText={setQ}
        style={{
          borderWidth: 1,
          borderColor: '#CCC',
          borderRadius: 12,
          padding: 10,
          backgroundColor: COLORS.card,
          color: COLORS.text, // Pastikan teks ketikan warnanya bener
        }}
      />
      <FlatList<Film>
        ref={listRef}
        data={data}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 8 }}
      />
    </View>
  );
}