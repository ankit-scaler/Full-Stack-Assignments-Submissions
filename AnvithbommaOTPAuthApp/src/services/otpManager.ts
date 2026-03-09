import { OTPRecord } from '../types/auth';

const otpStore = new Map<string, OTPRecord>();

export const generateOTP = (email: string): OTPRecord => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const now = Date.now();
  const record: OTPRecord = {
    code,
    email,
    createdAt: now,
    expiresAt: now + 60000,
    attempts: 0,
    isValid: true,
  };
  otpStore.set(email, record);
  console.log(`[DEBUG] OTP for ${email}: ${code}`);
  return record;
};

export const validateOTP = (
  email: string,
  inputCode: string
): { success: boolean; error?: string } => {
  const record = otpStore.get(email);

  if (!record || !record.isValid) {
    return { success: false, error: 'No OTP found. Please request a new one.' };
  }

  if (Date.now() > record.expiresAt) {
    record.isValid = false;
    return { success: false, error: 'OTP has expired. Please request a new one.' };
  }

  if (record.attempts >= 3) {
    record.isValid = false;
    return { success: false, error: 'Maximum attempts exceeded. Please request a new one.' };
  }

  if (record.code !== inputCode) {
    record.attempts += 1;
    const remaining = 3 - record.attempts;
    if (remaining === 0) {
      record.isValid = false;
      return { success: false, error: 'Incorrect OTP. No attempts remaining.' };
    }
    return { success: false, error: `Incorrect OTP. ${remaining} attempt(s) remaining.` };
  }

  record.isValid = false;
  return { success: true };
};

export const getOTPRecord = (email: string): OTPRecord | null => {
  return otpStore.get(email) || null;
};

export const clearOTP = (email: string): void => {
  otpStore.delete(email);
};
