import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, PrimaryButton } from '../../components/UI';
import { colors, spacing } from '../../theme/colors';
import api from '../../services/api';

const CreateEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title || !description || !date || !location || !capacity) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await api.post('/events', {
        title,
        description,
        date: new Date(date), // Expecting YYYY-MM-DD string for hackathon simplicity
        location,
        capacity: Number(capacity)
      });
      Alert.alert('Success', 'Event created successfully!', [
        { 
          text: 'OK', 
          onPress: () => {
            setTitle(''); setDescription(''); setDate(''); setLocation(''); setCapacity('');
            navigation.navigate('AdminDashboard');
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Input placeholder="Event Title" value={title} onChangeText={setTitle} />
        <Input placeholder="Description" value={description} onChangeText={setDescription} style={{ height: 100 }} multiline />
        <Input placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
        <Input placeholder="Location" value={location} onChangeText={setLocation} />
        <Input placeholder="Capacity" value={capacity} onChangeText={setCapacity} keyboardType="numeric" />
        
        <PrimaryButton 
          title="Create Event" 
          onPress={handleCreate} 
          isLoading={loading} 
          style={{ marginTop: spacing.l }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.l }
});

export default CreateEventScreen;
