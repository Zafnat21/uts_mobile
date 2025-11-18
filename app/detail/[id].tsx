// File: app/detail/[id].tsx
// (MODIFIKASI: Ganti tombol Favorite -> Edit)

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { COLORS } from '../../constants/Colors';
import { useEntries } from '../../src/context/EntriesContext';

export default function DetailScreen() {
  const router = useRouter();
  const { id, title } = useLocalSearchParams<{ id: string; title?: string }>();
  
  // HAPUS: toggleFavorite
  const { getById, deleteFilm } = useEntries();

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

  // TAMBAH: Fungsi untuk Edit
  const handleEdit = () => {
    // Arahkan ke halaman create, kirim 'id' sebagai parameter
    router.push({
      pathname: '/(tabs)/create',
      params: { id: film.id },
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: title ?? film.title }} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12, backgroundColor: COLORS.background, flexGrow: 1 }}>
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
          {/* GANTI: Tombol Favorite -> Tombol Edit */}
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

// GANTI: 'favoriteButton' styles -> 'editButton' styles
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
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center'
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.star,
    textAlign: 'center'
  },
  review: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
    marginTop: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  editButton: { // Ganti nama
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.card,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  editButtonText: { // Ganti nama
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  deleteButton: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.danger,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
};