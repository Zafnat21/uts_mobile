// File: app/(tabs)/_layout.tsx
// (MODIFIKASI: Menambahkan 'tabBarIcon' untuk HAPUS PANAH & ganti logo)

import { Tabs, useRouter } from 'expo-router';
import { COLORS } from '../../constants/Colors';
// 1. IMPORT library ikonnya
import { Ionicons } from '@expo/vector-icons'; 

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: COLORS.card,
        },
        // 2. (OPSIONAL) Kalau mau HILANGKAN TULISAN "Home" & "Tambah Film"
        //    dan cuma nampilin ikon, uncomment (hapus //) baris di bawah:
        // tabBarShowLabel: false, 
      }}
    >
      {/* ============ TAB HOME (index) ============ */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // 3. PASANG IKON DI SINI (Ini akan gantiin panah)
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* ============ TAB TAMBAH FILM (create) ============ */}
      <Tabs.Screen
        name="create"
        options={{
          title: 'Tambah Film',
          // 4. PASANG IKON DI SINI JUGA (Ini akan gantiin panah)
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push('/(tabs)/create');
          },
        }}
      />
    </Tabs>
  );
}