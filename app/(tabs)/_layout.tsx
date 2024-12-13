// app/(tabs)/_layout.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#f4511e',
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Check In',
          tabBarIcon: ({ color }) => <FontAwesome name="qrcode" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="manual"
        options={{
          title: 'Manual Entry',
          tabBarIcon: ({ color }) => <FontAwesome name="list" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

