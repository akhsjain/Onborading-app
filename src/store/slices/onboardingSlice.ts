import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

interface OnboardingState {
  currentStep: number
  isCompleted: boolean
  step1: PersonalProfile | null
  step2: string[] // favorite songs
  step3: PaymentInfo | null
}

const initialState: OnboardingState = {
  currentStep: 1,
  isCompleted: false,
  step1: null,
  step2: [],
  step3: null,
}

// Load from localStorage on initialization
const loadOnboardingState = (): OnboardingState => {
  try {
    const stored = localStorage.getItem('onboardingState')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading onboarding state:', error)
  }
  return initialState
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: loadOnboardingState(),
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
      localStorage.setItem('onboardingState', JSON.stringify(state))
    },
    updateStep1: (state, action: PayloadAction<PersonalProfile>) => {
      state.step1 = action.payload
      localStorage.setItem('onboardingState', JSON.stringify(state))
    },
    updateStep2: (state, action: PayloadAction<string[]>) => {
      state.step2 = action.payload
      localStorage.setItem('onboardingState', JSON.stringify(state))
    },
    updateStep3: (state, action: PayloadAction<PaymentInfo>) => {
      state.step3 = action.payload
      localStorage.setItem('onboardingState', JSON.stringify(state))
    },
    completeOnboarding: (state) => {
      state.isCompleted = true
      localStorage.setItem('onboardingState', JSON.stringify(state))
    },
    resetOnboarding: (state) => {
      state.currentStep = 1
      state.isCompleted = false
      state.step1 = null
      state.step2 = []
      state.step3 = null
      localStorage.removeItem('onboardingState')
    },
  },
})

export const {
  setCurrentStep,
  updateStep1,
  updateStep2,
  updateStep3,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions
export default onboardingSlice.reducer
