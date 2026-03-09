export interface OTPRecord {
  code: string;
  email: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
  isValid: boolean;
}

export interface SessionData {
  email: string;
  loginTime: number;
}

export type RootStackParamList = {
  Login: undefined;
  Otp: { email: string };
  Session: { email: string; loginTime: number };
};