// app/(tabs)/index.tsx
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Text, View } from '@/components/Themed';
import { checkInStudent } from '../src/lib/api';

export default function CheckInScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        handleCode(codes[0].value);
      }
    }
  });

  useEffect(() => {
    Camera.requestCameraPermission().then(status => {
      setHasPermission(status === 'granted');
    });
  }, []);

  const handleCode = async (data: string) => {
    try {
      const result = await checkInStudent(data);
      console.log('Check-in successful:', result);
    } catch (error) {
      console.error('Check-in failed:', error);
    }
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No camera available</Text>
      </View>
    );
  }

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      codeScanner={codeScanner}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});