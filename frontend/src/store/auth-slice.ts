import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  user: undefined | string;
  isInProgress: boolean;
  error: any;
}

export type AuthError = {
  message?: string;
  email?: string;
  password?: string;
} | null

/* 
Error-free means to success, and
User undefired means to failure.
*/
type AuthResponse = {
  error: AuthError;
  user: undefined | string;
}

const initialAuthState: AuthState = {
  user: undefined,
  isInProgress: false,
  error: null
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState as AuthState,
  reducers: {
    enterProgress(state) {
      state.isInProgress = true
    },
    finishProgress(state, action: PayloadAction<AuthResponse>) {
      state.isInProgress = false
      state.error = action.payload.error
      state.user = action.payload.user
    },
    logout() {
      return initialAuthState
    }
  }
})

export const authActions = authSlice.actions
export default authSlice.reducer
