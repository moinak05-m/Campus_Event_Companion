import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { Input, PrimaryButton } from '../../components/UI';
import { colors, spacing, typography } from '../../theme/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to Campus Event Companion</Text>
        </View>

        <View style={styles.form}>
          <Input 
            placeholder="Email Address" 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address"
          />
          <Input 
            placeholder="Password" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
          />
          <PrimaryButton 
            title="Login" 
            onPress={handleLogin} 
            isLoading={loading} 
            style={{ marginTop: spacing.m }}
          />
        </View>

        <View style={styles.footer}>
          <Text style={{ color: colors.textSecondary }}>Don't have an account? </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { flex: 1, padding: spacing.l, justifyContent: 'center' },
  header: { marginBottom: spacing.xl },
  title: { ...typography.title, marginBottom: spacing.xs },
  subtitle: { ...typography.body },
  form: { marginBottom: spacing.xl },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  link: { color: colors.primary, fontWeight: 'bold' }
});

export default LoginScreen;
