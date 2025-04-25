import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function SettingsScreen() {
  const { setColorScheme } = useColorScheme();
  const [selectedIndex, setSelectedIndex] = useState<ThemeOptions>('system');

  const toggleColorScheme = (themeValue: ThemeOptions) => {
    setColorScheme(themeValue);
    setSelectedIndex(themeValue);
  };

  const getButtonClassName = (buttonScheme: ThemeOptions) => {
    const baseClasses = 'py-3 px-5 rounded-lg mx-2 flex-1 items-center';
    const isSelected = selectedIndex === buttonScheme;
    const selectedClasses = 'bg-primary';
    const idleClasses = 'bg-secondary border border-neutral';

    return `${baseClasses} ${isSelected ? selectedClasses : idleClasses}`;
  };

  const getTextClassName = (buttonScheme: ThemeOptions) => {
    const baseClasses = 'text-base font-medium';
    const isSelected = selectedIndex === buttonScheme;
    const selectedClasses = 'text-accent';
    const idleClasses = 'text-primary';

    return `${baseClasses} ${isSelected ? selectedClasses : idleClasses}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-4">
        <Text className="mb-5 text-xl font-semibold text-text">Appearance</Text>
        <View className="rounded-lg bg-secondary p-4">
          <Text className="mb-3 text-base text-neutral">Select Theme</Text>
          <View className="flex-row justify-between gap-2">
            {(['light', 'dark', 'system'] as ThemeOptions[]).map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => toggleColorScheme(option)}
                className={getButtonClassName(option)}
                activeOpacity={0.7}>
                <Text className={getTextClassName(option)}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
