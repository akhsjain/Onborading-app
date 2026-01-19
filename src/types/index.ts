/**
 * Shared TypeScript type definitions
 */

export interface PersonalProfile {
  name: string
  age: string
  email: string
  profilePicture: string | null
}

export interface PaymentInfo {
  cardNumber: string
  expiryDate: string
  cvv: string
}

export interface AuthState {
  isAuthenticated: boolean
  username: string | null
}

export interface OnboardingState {
  currentStep: number
  isCompleted: boolean
  step1: PersonalProfile | null
  step2: string[]
  step3: PaymentInfo | null
}
