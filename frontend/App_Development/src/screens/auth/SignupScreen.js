import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { Input, PrimaryButton } from '../../components/UI';
import { colors, spacing, typography } from '../../theme/colors';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await signup(name, email, password, role);
    } catch (error) {
      Alert.alert('Signup Failed', error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Campus Event Companion</Text>
        </View>

        <View style={styles.form}>
          <Input placeholder="Full Name" value={name} onChangeText={setName} />
          <Input placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          
          <View style={styles.roleContainer}>
            <TouchableOpacity 
              style={[styles.roleBtn, role === 'student' && styles.roleBtnActive]}
              onPress={() => setRole('student')}
            >
              <Text style={styles.roleText}>Student</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.roleBtn, role === 'admin' && styles.roleBtnActive]}
              onPress={() => setRole('admin')}
            >
              <Text style={styles.roleText}>Admin</Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton title="Sign Up" onPress={handleSignup} isLoading={loading} style={{ marginTop: spacing.m }} />
        </View>

        <View style={styles.footer}>
          <Text style={{ color: colors.textSecondary }}>Already have an account? </Text>
          <Text style={styles.link} onPress={() => navigation.goBack()}>Login</Text>
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
  roleContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.m },
  roleBtn: { flex: 1, padding: spacing.m, alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 8, marginHorizontal: 5 },
  roleBtnActive: { backgroundColor: colors.surface, borderColor: colors.primary },
  roleText: { color: colors.textPrimary, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  link: { color: colors.primary, fontWeight: 'bold' }
});

export default SignupScreen;
