/**
 * Application-wide constants
 */

export const STORAGE_KEYS = {
  AUTH_STATE: 'authState',
  ONBOARDING_STATE: 'onboardingState',
} as const

export const ROUTES = {
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  HOME: '/home',
} as const

export const ONBOARDING_STEPS = {
  PERSONAL_PROFILE: 1,
  FAVORITE_SONGS: 2,
  PAYMENT_INFO: 3,
  SUCCESS: 4,
  TOTAL_STEPS: 4,
} as const

export const VALIDATION_LIMITS = {
  MIN_AGE: 1,
  MAX_AGE: 150,
  MAX_SONG_LENGTH: 100,
  CARD_NUMBER_LENGTH: 16,
  CVV_MIN_LENGTH: 3,
  CVV_MAX_LENGTH: 4,
} as const

export const CREDENTIALS = {
  USERNAME: 'user123',
  PASSWORD: 'password123',
} as const
