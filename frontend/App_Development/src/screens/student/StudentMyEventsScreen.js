import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../theme/colors';
import { QrCode } from 'lucide-react-native';
import api from '../../services/api';

const StudentMyEventsScreen = ({ navigation }) => {
  const [registrations, setRegistrations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMyEvents = async () => {
    try {
      const response = await api.get('/registration/my-events');
      setRegistrations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMyEvents();
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMyEvents();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => {
    const event = item.event;
    if (!event) return null;

    return (
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{event.title}</Text>
          <Text style={styles.cardDate}>{new Date(event.date).toLocaleDateString()}</Text>
          <Text style={[styles.status, item.attended ? styles.statusAttended : styles.statusPending]}>
            {item.attended ? 'Attended' : 'Registered'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.qrButton} 
          onPress={() => navigation.navigate('QRPass', { registrationId: item._id, event })}
        >
          <QrCode color={colors.primary} size={32} />
          <Text style={styles.qrText}>Show QR</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>My Tickets</Text>
      <FlatList
        data={registrations}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        contentContainerStyle={{ padding: spacing.l }}
        ListEmptyComponent={<Text style={styles.emptyText}>You haven't registered for any events yet.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { ...typography.title, paddingHorizontal: spacing.l, paddingTop: spacing.m },
  card: { backgroundColor: colors.surface, padding: spacing.m, borderRadius: 12, marginBottom: spacing.m, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderLeftWidth: 4, borderLeftColor: colors.secondary },
  cardInfo: { flex: 1 },
  cardTitle: { ...typography.subtitle, marginBottom: spacing.xs },
  cardDate: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.xs },
  status: { ...typography.caption, fontWeight: 'bold' },
  statusAttended: { color: colors.success },
  statusPending: { color: colors.secondary },
  qrButton: { alignItems: 'center', justifyContent: 'center', padding: spacing.s, backgroundColor: 'rgba(108, 99, 255, 0.1)', borderRadius: 8 },
  qrText: { ...typography.caption, color: colors.primary, marginTop: spacing.xs },
  emptyText: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl }
});

export default StudentMyEventsScreen;
