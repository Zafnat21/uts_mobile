// File: src/components/DiaryCard.tsx
// (MODIFIKASI: Hapus visual Favorite)

import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Film } from '../context/EntriesContext';
import { COLORS } from '../../constants/Colors';

export default function DiaryCard(props: Film & { onPress?: () => void }) {
  // HAPUS: 'isFavorite' dari props
  const { title, releaseYear, review, posterUrl, userRating, onPress } = props;

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        gap: 16,
        padding: 12,
        backgroundColor: COLORS.card,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        // HAPUS: borderColor dan borderWidth
      }}
    >
      <Image
        source={{ uri: posterUrl }}
        style={{
          width: 80,
          height: 120,
          borderRadius: 8,
          backgroundColor: COLORS.background,
        }}
      />
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.text }}>
          {title}
          {/* HAPUS: Bintang favorit */}
        </Text>
        <Text style={{ fontSize: 14, color: COLORS.textSecondary, marginBottom: 4 }}>
          {releaseYear}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.star }}>
          {'⭐ ' + userRating}/5
        </Text>
        <Text numberOfLines={2} style={{ fontSize: 14, color: COLORS.text }}>
          {review}
        </Text>
      </View>
    </Pressable>
  );
}