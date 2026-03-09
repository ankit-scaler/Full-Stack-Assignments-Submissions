import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/auth';
import LoginScreen from './src/screens/LoginScreen';
import OtpScreen from './src/screens/OtpScreen';
import SessionScreen from './src/screens/SessionScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#4361ee' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Sign In' }}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{ title: 'Verify OTP' }}
        />
        <Stack.Screen
          name="Session"
          component={SessionScreen}
          options={{ title: 'My Session', headerLeft: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}