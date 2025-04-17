import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Oops!',
          headerStyle: { backgroundColor: '#1A3C34' },
          headerTintColor: '#F5F0E1',
        }}
      />
      <View className={styles.container}>
        <Text className={styles.title}>This screen doesn't exist.</Text>
        <Link href="/" className={styles.link}>
          <Text className={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
const styles = {
  container: `items-center flex-1 justify-center p-5 bg-secondary`,
  title: `text-xl font-bold text-primary`,
  link: `mt-4 pt-4`,
  linkText: `text-base text-accent`,
};
