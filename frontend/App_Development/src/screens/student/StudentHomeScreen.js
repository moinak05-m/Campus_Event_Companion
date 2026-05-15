import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { EventCard } from '../../components/UI';
import { colors, spacing, typography } from '../../theme/colors';
import { LogOut } from 'lucide-react-native';
import api from '../../services/api';

const StudentHomeScreen = ({ navigation }) => {
  const { userInfo, logout } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      // Show only next 3 upcoming events
      setEvents(response.data.slice(0, 3));
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
    fetchEvents();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {userInfo?.name}</Text>
          <Text style={styles.subtitle}>Welcome to Campus Events</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <LogOut color={colors.error} size={24} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Upcoming Events</Text>
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
        contentContainerStyle={{ paddingHorizontal: spacing.l }}
        ListEmptyComponent={<Text style={styles.emptyText}>No upcoming events found.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.l },
  greeting: { ...typography.title },
  subtitle: { ...typography.body },
  logoutBtn: { padding: spacing.s, backgroundColor: colors.surface, borderRadius: 50 },
  sectionTitle: { ...typography.subtitle, marginHorizontal: spacing.l, marginBottom: spacing.m },
  emptyText: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl }
});

export default StudentHomeScreen;
