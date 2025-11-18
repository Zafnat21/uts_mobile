// File: app/(tabs)/index.tsx

import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, TextInput, View } from 'react-native';
import type { ListRenderItem } from 'react-native';
import DiaryCard from '../../src/components/DiaryCard';
import { useEntries } from '../../src/context/EntriesContext';
import type { Film } from '../../src/context/EntriesContext';
import useDebounce from '../../src/hooks/useDebounce';
import { COLORS } from '../../constants/Colors';

export default function HomeScreen() {
  const router = useRouter();
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
    <View style={{ flex: 1, padding: 16, gap: 12, backgroundColor: COLORS.background }}>
      <TextInput
        placeholder="Cari film, review..."
        value={q}
        onChangeText={setQ}
        style={{
          borderWidth: 1,
          borderColor: '#CCC',
          borderRadius: 12,
          padding: 10,
          backgroundColor: COLORS.card,
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