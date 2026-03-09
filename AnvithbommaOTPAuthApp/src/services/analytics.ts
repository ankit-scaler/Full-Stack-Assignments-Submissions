import NetInfo from '@react-native-community/netinfo';

const logEvent = async (event: string, data?: object): Promise<void> => {
  try {
    const netState = await NetInfo.fetch();
    console.log(`[Analytics] ${event}`, {
      ...data,
      isConnected: netState.isConnected,
      connectionType: netState.type,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.log(`[Analytics] ${event} (network info unavailable)`, data);
  }
};

export const logOTPGenerated = (email: string): void => {
  logEvent('OTP_GENERATED', { email });
};

export const logOTPSuccess = (email: string): void => {
  logEvent('OTP_VALIDATION_SUCCESS', { email });
};

export const logOTPFailure = (email: string, reason: string): void => {
  logEvent('OTP_VALIDATION_FAILURE', { email, reason });
};

export const logLogout = (email: string, durationSeconds: number): void => {
  logEvent('LOGOUT', { email, durationSeconds });
};