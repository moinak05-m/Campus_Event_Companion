import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { CameraView, Camera } from "expo-camera";
import { colors, spacing, typography } from '../../theme/colors';
import api from '../../services/api';

const ScanAttendanceScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setLoading(true);
    // Data is the registrationId
    try {
      const response = await api.post('/registration/attendance', { registrationId: data });
      Alert.alert('Success', 'Attendance marked successfully!', [{ text: 'Scan Again', onPress: () => setScanned(false) }]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Invalid QR or already marked', [{ text: 'Scan Again', onPress: () => setScanned(false) }]);
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text style={{ color: colors.textPrimary }}>Requesting for camera permission</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text style={{ color: colors.textPrimary }}>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan QR Pass</Text>
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned || loading ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.overlay}>
          <View style={styles.targetBox} />
        </View>
      </View>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} color={colors.primary} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.l, justifyContent: 'center' },
  title: { ...typography.title, textAlign: 'center', marginBottom: spacing.xl },
  cameraContainer: { width: '100%', aspectRatio: 1, overflow: 'hidden', borderRadius: 20, marginBottom: spacing.l },
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  targetBox: { width: 200, height: 200, borderWidth: 2, borderColor: colors.primary, backgroundColor: 'transparent' }
});

export default ScanAttendanceScreen;
