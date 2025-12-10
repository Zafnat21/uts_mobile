// File: app/detail/[id].tsx
// (FIXED: Menambahkan Safe Area di bawah biar tombol gak ketutup navigasi HP)

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
// 1. IMPORT library Safe Area
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../../constants/Colors';
import { useEntries } from '../../src/context/EntriesContext';

export default function DetailScreen() {
  const router = useRouter();
  const { id, title } = useLocalSearchParams<{ id: string; title?: string }>();
  const { getById, deleteFilm } = useEntries();
  
  // 2. AMBIL data jarak aman (insets) dari HP user
  const insets = useSafeAreaInsets();

  const film = getById(id!);

  if (!film) return <Text style={{ padding: 16 }}>Film tidak ditemukan</Text>;

  const handleDelete = () => {
    Alert.alert(
      'Hapus Film',
      `Anda yakin ingin menghapus "${film.title}" dari koleksi?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            deleteFilm(film.id);
            router.back();
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push({
      pathname: '/(tabs)/create',
      params: { id: film.id },
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: title ?? film.title }} />
      <ScrollView 
        contentContainerStyle={{ 
          padding: 16, 
          gap: 12, 
          backgroundColor: COLORS.background, 
          flexGrow: 1,
          // 3. TAMBAHKAN padding bawah otomatis + 20px biar lega
          paddingBottom: insets.bottom + 20 
        }}
      >
        <Image
          source={{ uri: film.posterUrl }}
          style={styles.poster}
        />
        <Text style={styles.title}>
          {film.title} ({film.releaseYear})
        </Text>
        <Text style={styles.rating}>
          {'⭐ ' + film.userRating}/5
        </Text>
        <Text style={styles.review}>
          {film.review}
        </Text>

        <View style={{ flex: 1 }} />
        
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handleEdit}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>
              ✏️ Edit
            </Text>
          </Pressable>
          <Pressable
            onPress={handleDelete}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Hapus</Text>
          </Pressable>
        </View>
        
      </ScrollView>
    </>
  );
}

const styles = {
  poster: {
    width: '80%',
    aspectRatio: 2 / 3,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as '700', // Fix tipe data font weight
    color: COLORS.text,
    textAlign: 'center' as 'center'
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold' as 'bold',
    color: COLORS.star,
    textAlign: 'center' as 'center'
  },
  review: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
    marginTop: 8
  },
  buttonContainer: {
    flexDirection: 'row' as 'row',
    gap: 12,
    marginTop: 20,
  },
  editButton: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.card,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  editButtonText: {
    color: COLORS.primary,
    textAlign: 'center' as 'center',
    fontWeight: 'bold' as 'bold'
  },
  deleteButton: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.danger,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center' as 'center',
    fontWeight: 'bold' as 'bold'
  },
};