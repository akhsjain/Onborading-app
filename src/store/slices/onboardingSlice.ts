import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { OnboardingState, PersonalProfile, PaymentInfo } from '../../types'
import { STORAGE_KEYS, ONBOARDING_STEPS } from '../../constants'
import { getStorageItem, setStorageItem, removeStorageItem } from '../../utils/storage'

const initialState: OnboardingState = {
  currentStep: ONBOARDING_STEPS.PERSONAL_PROFILE,
  isCompleted: false,
  step1: null,
  step2: [],
  step3: null,
}

// Load from localStorage on initialization
const loadOnboardingState = (): OnboardingState => {
  return getStorageItem<OnboardingState>(STORAGE_KEYS.ONBOARDING_STATE) ?? initialState
}

// Helper function to persist state to localStorage
const persistState = (state: OnboardingState): void => {
  setStorageItem(STORAGE_KEYS.ONBOARDING_STATE, state)
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: loadOnboardingState(),
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
      persistState(state)
    },
    updateStep1: (state, action: PayloadAction<PersonalProfile>) => {
      state.step1 = action.payload
      persistState(state)
    },
    updateStep2: (state, action: PayloadAction<string[]>) => {
      state.step2 = action.payload
      persistState(state)
    },
    updateStep3: (state, action: PayloadAction<PaymentInfo>) => {
      state.step3 = action.payload
      persistState(state)
    },
    completeOnboarding: (state) => {
      state.isCompleted = true
      persistState(state)
    },
    resetOnboarding: (state) => {
      state.currentStep = ONBOARDING_STEPS.PERSONAL_PROFILE
      state.isCompleted = false
      state.step1 = null
      state.step2 = []
      state.step3 = null
      removeStorageItem(STORAGE_KEYS.ONBOARDING_STATE)
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

export type { OnboardingState, PersonalProfile, PaymentInfo }
export default onboardingSlice.reducer
