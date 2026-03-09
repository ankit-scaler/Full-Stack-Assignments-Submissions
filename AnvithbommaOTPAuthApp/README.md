# OTPAuthApp

A passwordless authentication app built with React Native (Expo) and TypeScript.

## Setup
```bash
git clone <your-repo-url>
cd OTPAuthApp
npm install
npx expo start
```
Scan QR code with Expo Go app on your phone.

## 1. OTP Logic and Expiry Handling

- A 6-digit OTP is generated locally using `Math.random()`
- OTP is stored with a `createdAt` and `expiresAt` timestamp (60 seconds)
- Expiry is checked by comparing `Date.now() > expiresAt` on every validation attempt
- Maximum 3 attempts allowed per OTP
- Generating a new OTP completely replaces the old record and resets attempt count
- All OTP logic lives in `src/services/otpManager.ts`, fully separated from UI

## 2. Data Structures

Used `Map<string, OTPRecord>` to store OTPs:
```typescript
interface OTPRecord {
  code: string;
  email: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
  isValid: boolean;
}
```

**Why Map?**
- O(1) lookup, insert and delete by email key
- OTP is stored per email, not globally
- Easy to clear a single user's OTP on logout
- Prevents one user's OTP from affecting another

## 3. External SDK — React Native NetInfo

**Why NetInfo?**
- Simple to integrate with clear documentation
- Provides real network context (wifi/cellular/offline) with every log
- Makes analytics more meaningful — you can see if failures happened offline

**What is logged:**
- `OTP_GENERATED` — when OTP is created
- `OTP_VALIDATION_SUCCESS` — on successful login
- `OTP_VALIDATION_FAILURE` — on wrong/expired OTP with reason
- `LOGOUT` — with session duration in seconds

All logs include `isConnected`, `connectionType` and `timestamp`.

## 4. GPT vs Self

**GPT helped with:**
- Initial folder structure suggestion
- Navigation boilerplate in App.tsx
- TypeScript type syntax for useRef and generics

**I understood and implemented:**
- OTP state machine logic (expiry via timestamps, attempt counting, per-email storage)
- Timer cleanup using useRef to prevent memory leaks
- useSessionTimer custom hook design so timer never resets on re-render
- NetInfo integration by reading the official docs
- Navigation stack reset on logout to prevent back navigation to Session screen

## Project Structure
```
src/
├── screens/
│   ├── LoginScreen.tsx      # Email input
│   ├── OtpScreen.tsx        # OTP input with countdown
│   └── SessionScreen.tsx    # Session timer and logout
├── hooks/
│   └── useSessionTimer.ts   # Custom hook for live session timer
├── services/
│   ├── otpManager.ts        # All OTP logic (generate, validate, clear)
│   └── analytics.ts         # NetInfo event logging
├── types/
│   └── auth.ts              # TypeScript interfaces
```