import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventCard } from '../../components/UI';
import { colors, spacing, typography } from '../../theme/colors';
import api from '../../services/api';

const StudentEventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchEvents();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>All Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <EventCard 
            event={item} 
            onPress={() => navigation.navigate('EventDetail', { event: item })}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        contentContainerStyle={{ padding: spacing.l }}
        ListEmptyComponent={<Text style={styles.emptyText}>No events available.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { ...typography.title, paddingHorizontal: spacing.l, paddingTop: spacing.m },
  emptyText: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl }
});

export default StudentEventsScreen;
