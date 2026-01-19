import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AuthState } from '../../types'
import { STORAGE_KEYS } from '../../constants'
import { getStorageItem, setStorageItem, removeStorageItem } from '../../utils/storage'

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
}

// Load from localStorage on initialization
const loadAuthState = (): AuthState => {
  return getStorageItem<AuthState>(STORAGE_KEYS.AUTH_STATE) ?? initialState
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(),
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true
      state.username = action.payload
      setStorageItem(STORAGE_KEYS.AUTH_STATE, state)
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.username = null
      removeStorageItem(STORAGE_KEYS.AUTH_STATE)
    },
  },
})

export const { login, logout } = authSlice.actions
export type { AuthState }
export default authSlice.reducer
