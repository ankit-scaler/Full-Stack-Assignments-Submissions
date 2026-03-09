import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/auth';
import { validateOTP, generateOTP, getOTPRecord } from '../services/otpManager';
import { logOTPSuccess, logOTPFailure, logOTPGenerated } from '../services/analytics';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Otp'>;
  route: RouteProp<RootStackParamList, 'Otp'>;
};

const OtpScreen = ({ navigation, route }: Props) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isExpired, setIsExpired] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    setTimeLeft(60);
    setIsExpired(false);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleVerify = () => {
    if (!otp.trim() || otp.length !== 6) {
      setError('Please enter the 6-digit OTP.');
      return;
    }
    if (isExpired) {
      setError('OTP has expired. Please resend.');
      return;
    }

    const result = validateOTP(email, otp.trim());

    if (result.success) {
      logOTPSuccess(email);
      navigation.navigate('Session', { email, loginTime: Date.now() });
    } else {
      logOTPFailure(email, result.error || 'Unknown error');
      setError(result.error || 'Invalid OTP.');
    }
  };

  const handleResend = () => {
    generateOTP(email);
    logOTPGenerated(email);
    setOtp('');
    setError('');
    startTimer();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>Sent to {email}</Text>

        <View style={styles.timerContainer}>
          <Text style={[styles.timer, isExpired && styles.timerExpired]}>
            {isExpired ? 'OTP Expired' : `Expires in ${timeLeft}s`}
          </Text>
          <View style={styles.timerBar}>
            <View
              style={[
                styles.timerFill,
                { width: `${(timeLeft / 60) * 100}%` },
                isExpired && styles.timerFillExpired,
              ]}
            />
          </View>
        </View>

        <TextInput
          style={[styles.input, isExpired && styles.inputDisabled]}
          placeholder="6-digit OTP"
          placeholderTextColor="#999"
          value={otp}
          onChangeText={(text) => {
            setOtp(text);
            setError('');
          }}
          keyboardType="numeric"
          maxLength={6}
          editable={!isExpired}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, isExpired && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={isExpired}
        >
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  timerContainer: {
    marginBottom: 20,
  },
  timer: {
    fontSize: 14,
    color: '#4361ee',
    fontWeight: '600',
    marginBottom: 6,
  },
  timerExpired: {
    color: '#e63946',
  },
  timerBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
  },
  timerFill: {
    height: 4,
    backgroundColor: '#4361ee',
    borderRadius: 2,
  },
  timerFillExpired: {
    backgroundColor: '#e63946',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 22,
    color: '#1a1a2e',
    backgroundColor: '#fafafa',
    textAlign: 'center',
    letterSpacing: 8,
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    color: '#aaa',
  },
  error: {
    color: '#e63946',
    fontSize: 13,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#4361ee',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
  },
  resendText: {
    color: '#4361ee',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OtpScreen;