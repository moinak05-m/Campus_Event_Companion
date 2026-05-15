import React from 'react';
import { TouchableOpacity, Text, TextInput, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors, spacing, typography } from '../theme/colors';

export const PrimaryButton = ({ title, onPress, isLoading, style, disabled }) => (
  <TouchableOpacity 
    style={[styles.button, style, disabled && { opacity: 0.5 }]} 
    onPress={onPress}
    disabled={isLoading || disabled}
  >
    {isLoading ? (
      <ActivityIndicator color={colors.textPrimary} />
    ) : (
      <Text style={styles.buttonText}>{title}</Text>
    )}
  </TouchableOpacity>
);

export const Input = ({ value, onChangeText, placeholder, secureTextEntry, style, keyboardType }) => (
  <TextInput
    style={[styles.input, style]}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={colors.textSecondary}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
  />
);

export const EventCard = ({ event, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{event.title}</Text>
    <Text style={styles.cardDate}>{new Date(event.date).toLocaleDateString()}</Text>
    <Text style={styles.cardLocation}>{event.location}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    padding: spacing.m,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.m,
    fontSize: 16,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.m,
    borderRadius: 12,
    marginBottom: spacing.m,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    elevation: 2,
  },
  cardTitle: {
    ...typography.subtitle,
    marginBottom: spacing.xs,
  },
  cardDate: {
    ...typography.caption,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  cardLocation: {
    ...typography.body,
  }
});
