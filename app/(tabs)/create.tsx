// File: app/(tabs)/create.tsx
// (MODIFIKASI: Menggunakan 'useFocusEffect' untuk 'membersihkan' form)

import React, { useState, useCallback } from 'react';
import { View, TextInput, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router'; // Pastikan 'useFocusEffect' di-import
import { useEntries } from '../../src/context/EntriesContext';
import { COLORS } from '../../constants/Colors';

export default function CreateEntryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  // Kita cek 'params.id' di dalam 'useFocusEffect' saja
  
  const { addFilm, getById, updateFilm } = useEntries();
  
  // Inisialisasi state KOSONG
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [review, setReview] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [userRating, setUserRating] = useState(0); 
  const [currentFilmId, setCurrentFilmId] = useState<number | null>(null);

  // Gunakan 'useFocusEffect' untuk mereset state
  useFocusEffect(
    useCallback(() => {
      // Cek 'params' terbaru SETIAP KALI halaman ini fokus
      const paramsId = params.id ? Number(params.id) : null;
      const film = paramsId ? getById(paramsId) : null;
      
      setCurrentFilmId(paramsId); // Simpan ID saat ini

      if (film) {
        // Mode Edit: Isi form
        setTitle(film.title);
        setReleaseYear(film.releaseYear);
        setReview(film.review);
        setPosterUrl(film.posterUrl);
        setUserRating(film.userRating);
      } else {
        // Mode Tambah: Pastikan form KOSONG
        setTitle('');
        setReleaseYear('');
        setReview('');
        setPosterUrl('');
        setUserRating(0);
      }
    }, [params.id, getById]) // 'Dengarkan' perubahan pada 'params.id'
  );

  const canSave = title.trim().length > 0 && review.trim().length > 0 && userRating > 0;

  const save = () => {
    if (!canSave) return;
    
    const filmData = {
      title: title.trim(),
      releaseYear: releaseYear.trim() || 'N/A',
      review: review.trim(),
      posterUrl: posterUrl.trim() || 'https://via.placeholder.com/300x450.png?text=No+Image',
      userRating: userRating,
    };

    if (currentFilmId) { // Gunakan 'currentFilmId' dari state
      updateFilm(currentFilmId, filmData);
    } else {
      addFilm(filmData);
    }
    
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text style={{ fontWeight: '700', fontSize: 20, color: COLORS.text, marginBottom: 10 }}>
        {currentFilmId ? 'Edit Film' : 'Tambah Film Baru'}
      </Text>
      
      <TextInput
        placeholder="Judul Film"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Tahun Rilis (Contoh: 2024)"
        value={releaseYear}
        onChangeText={setReleaseYear}
        style={styles.input}
      />
      <TextInput
        placeholder="URL Poster Film"
        value={posterUrl}
        onChangeText={setPosterUrl}
        style={styles.input}
      />
      
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 16, color: COLORS.textSecondary, marginLeft: 4 }}>
          Rating Anda: {userRating > 0 ? `${userRating}/5` : ''}
        </Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} onPress={() => setUserRating(star)}>
              <Text style={{ fontSize: 36, color: star <= userRating ? COLORS.star : '#C0C0C0' }}>
                ⭐
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      
      <TextInput
        placeholder="Tulis review singkat..."
        value={review}
        onChangeText={setReview}
        multiline
        style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
      />
      
      <Pressable
        onPress={save}
        disabled={!canSave}
        style={{
          backgroundColor: canSave ? COLORS.primary : '#BDBDBD',
          padding: 12,
          borderRadius: 12,
          opacity: canSave ? 1 : 0.6,
          marginTop: 10,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>
          {currentFilmId ? 'Simpan Perubahan' : 'Simpan Film'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    padding: 10,
    backgroundColor: COLORS.card,
    fontSize: 16,
  },
};