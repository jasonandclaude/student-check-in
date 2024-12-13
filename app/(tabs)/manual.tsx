// app/(tabs)/manual.tsx
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';

export default function ManualScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manual Check-In</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});