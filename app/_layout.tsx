import '../global.css';

import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import { MyTheme } from '~/themes/MyLightTheme';
import { MyDarkTheme } from '~/themes/MyDarkTheme';

const queryClient = new QueryClient();

export default function Layout() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? MyDarkTheme : MyTheme}>
      <StatusBar style={colorScheme === 'dark' ? 'inverted' : 'light'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </BottomSheetModalProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
