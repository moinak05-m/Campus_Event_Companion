import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { colors, spacing, typography } from '../../theme/colors';
import { LogOut, Trash2 } from 'lucide-react-native';
import api from '../../services/api';

const AdminHomeScreen = ({ navigation }) => {
  const { userInfo, logout } = useContext(AuthContext);
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

  const handleDelete = (id) => {
    Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/events/${id}`);
            fetchEvents();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete event');
          }
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Welcome, {userInfo?.name}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <LogOut color={colors.error} size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.deleteBtn}>
              <Trash2 color={colors.error} size={20} />
            </TouchableOpacity>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        contentContainerStyle={{ padding: spacing.l }}
        ListEmptyComponent={<Text style={styles.emptyText}>No events created yet.</Text>}
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
  card: { backgroundColor: colors.surface, padding: spacing.m, borderRadius: 12, marginBottom: spacing.m, flexDirection: 'row', alignItems: 'center' },
  cardTitle: { ...typography.subtitle, marginBottom: spacing.xs },
  cardDate: { ...typography.caption, color: colors.secondary },
  deleteBtn: { padding: spacing.s },
  emptyText: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl }
});

export default AdminHomeScreen;
