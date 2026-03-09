import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/auth';
import { useSessionTimer } from '../hooks/useSessionTimer';
import { clearOTP } from '../services/otpManager';
import { logLogout } from '../services/analytics';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Session'>;
  route: RouteProp<RootStackParamList, 'Session'>;
};

const SessionScreen = ({ navigation, route }: Props) => {
  const { email, loginTime } = route.params;
  const { elapsed, formatted } = useSessionTimer(loginTime);

  const loginTimeString = new Date(loginTime).toLocaleTimeString();

  const handleLogout = () => {
    logLogout(email, elapsed);
    clearOTP(email);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {email.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Login Time</Text>
          <Text style={styles.value}>{loginTimeString}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Session Duration</Text>
          <Text style={styles.timerValue}>{formatted}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4361ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },
  welcome: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  timerValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4361ee',
  },
  logoutButton: {
    marginTop: 24,
    width: '100%',
    backgroundColor: '#e63946',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SessionScreen;