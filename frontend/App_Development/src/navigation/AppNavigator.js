import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { Home, Calendar, Ticket, QrCode, PlusCircle, User, ScanLine } from 'lucide-react-native';
import { colors } from '../theme/colors';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

// Student Screens
import StudentHomeScreen from '../screens/student/StudentHomeScreen';
import StudentEventsScreen from '../screens/student/StudentEventsScreen';
import StudentMyEventsScreen from '../screens/student/StudentMyEventsScreen';
import EventDetailScreen from '../screens/shared/EventDetailScreen';
import QRPassScreen from '../screens/student/QRPassScreen';

// Admin Screens
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import CreateEventScreen from '../screens/admin/CreateEventScreen';
import ScanAttendanceScreen from '../screens/admin/ScanAttendanceScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Customizing the bottom tab options
const screenOptions = {
  headerStyle: { backgroundColor: colors.surface },
  headerTintColor: colors.textPrimary,
  tabBarStyle: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    paddingBottom: 5,
    height: 60,
  },
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textSecondary,
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const StudentTabs = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen 
      name="Dashboard" 
      component={StudentHomeScreen} 
      options={{
        tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
      }}
    />
    <Tab.Screen 
      name="Events" 
      component={StudentEventsScreen} 
      options={{
        tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />
      }}
    />
    <Tab.Screen 
      name="MyTickets" 
      component={StudentMyEventsScreen} 
      options={{
        title: 'My Tickets',
        tabBarIcon: ({ color, size }) => <Ticket color={color} size={size} />
      }}
    />
  </Tab.Navigator>
);

const AdminTabs = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen 
      name="AdminDashboard" 
      component={AdminHomeScreen} 
      options={{
        title: 'Dashboard',
        tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
      }}
    />
    <Tab.Screen 
      name="CreateEvent" 
      component={CreateEventScreen} 
      options={{
        title: 'New Event',
        tabBarIcon: ({ color, size }) => <PlusCircle color={color} size={size} />
      }}
    />
    <Tab.Screen 
      name="Scan" 
      component={ScanAttendanceScreen} 
      options={{
        title: 'Scan QR',
        tabBarIcon: ({ color, size }) => <ScanLine color={color} size={size} />
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isLoading, userToken, userInfo } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : userInfo?.role === 'admin' ? (
          <Stack.Screen name="AdminRoot" component={AdminTabs} />
        ) : (
          <Stack.Screen name="StudentRoot" component={StudentTabs} />
        )}
        
        {/* Shared Screens that go on top of tabs */}
        <Stack.Screen 
          name="EventDetail" 
          component={EventDetailScreen} 
          options={{ headerShown: true, headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.textPrimary, title: 'Event Details' }}
        />
        <Stack.Screen 
          name="QRPass" 
          component={QRPassScreen}
          options={{ headerShown: true, headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.textPrimary, title: 'My QR Pass' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
