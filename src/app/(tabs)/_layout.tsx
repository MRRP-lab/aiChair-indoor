import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="camera-tracker" options={{ title: 'Guide Following' }} />
      <Tabs.Screen name="bar" options={{ title: 'Bar' }} />
    </Tabs>
  );
}