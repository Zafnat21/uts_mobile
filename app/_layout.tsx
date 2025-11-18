import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EntriesProvider } from '../src/context/EntriesContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <EntriesProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="detail/[id]" options={{ title: 'Detail' }} />
        </Stack>
      </EntriesProvider>
    </SafeAreaProvider>
  );
}
