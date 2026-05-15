import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { colors, spacing, typography } from '../../theme/colors';

const QRPassScreen = ({ route }) => {
  const { registrationId, event } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>{new Date(event.date).toLocaleDateString()}</Text>
        <Text style={styles.location}>{event.location}</Text>
        
        <View style={styles.qrContainer}>
          <QRCode
            value={registrationId}
            size={250}
            color={colors.background}
            backgroundColor={colors.textPrimary}
          />
        </View>
        
        <Text style={styles.instructions}>Show this QR code at the entrance to verify your attendance.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', padding: spacing.l },
  card: { backgroundColor: colors.surface, padding: spacing.xl, borderRadius: 20, alignItems: 'center', width: '100%', elevation: 5 },
  title: { ...typography.title, color: colors.primary, textAlign: 'center', marginBottom: spacing.xs },
  date: { ...typography.subtitle, color: colors.textSecondary, marginBottom: spacing.xs },
  location: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.xl },
  qrContainer: { padding: spacing.m, backgroundColor: colors.textPrimary, borderRadius: 16, marginBottom: spacing.xl },
  instructions: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' }
});

export default QRPassScreen;
