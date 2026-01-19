import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  username: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
}

// Load from localStorage on initialization
const loadAuthState = (): AuthState => {
  try {
    const stored = localStorage.getItem('authState')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading auth state:', error)
  }
  return initialState
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(),
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true
      state.username = action.payload
      localStorage.setItem('authState', JSON.stringify(state))
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.username = null
      localStorage.removeItem('authState')
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
