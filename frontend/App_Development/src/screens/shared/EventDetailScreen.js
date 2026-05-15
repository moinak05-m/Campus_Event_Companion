import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { PrimaryButton } from '../../components/UI';
import { colors, spacing, typography } from '../../theme/colors';
import api from '../../services/api';

const EventDetailScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await api.post(`/registration/register/${event._id}`);
      Alert.alert('Success', 'You have successfully registered for this event!', [
        { text: 'OK', onPress: () => navigation.navigate('MyTickets') }
      ]);
    } catch (error) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>{new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.text}>{event.location}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.text}>{event.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Capacity</Text>
        <Text style={styles.text}>{event.capacity} people</Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          title="Register Now" 
          onPress={handleRegister} 
          isLoading={loading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.l, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.xl },
  title: { ...typography.title, color: colors.primary, marginBottom: spacing.s },
  date: { ...typography.subtitle, color: colors.secondary },
  section: { marginBottom: spacing.l, backgroundColor: colors.surface, padding: spacing.m, borderRadius: 12 },
  sectionTitle: { ...typography.subtitle, marginBottom: spacing.s },
  text: { ...typography.body, lineHeight: 24 },
  footer: { marginTop: spacing.xl }
});

export default EventDetailScreen;
