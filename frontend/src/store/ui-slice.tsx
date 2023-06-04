import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  isNewBookFormVisible: boolean;
  isLoginFormVisible: boolean;
  isSignUpFormVisible: boolean;
}

const initialUiState: UiState = {
  isNewBookFormVisible: false,
  isLoginFormVisible: false,
  isSignUpFormVisible: false
}

const uiSlice = createSlice({
  name: 'user-interface',
  initialState: initialUiState as UiState,
  reducers: {
    showNewBookForm(state) {
      state.isNewBookFormVisible = true
      state.isLoginFormVisible = false
      state.isSignUpFormVisible = false
    },
    showLoginForm(state) {
      state.isNewBookFormVisible = false
      state.isLoginFormVisible = true
      state.isSignUpFormVisible = false
    },
    showSignUpForm(state) {
      state.isNewBookFormVisible = false
      state.isLoginFormVisible = false
      state.isSignUpFormVisible = true
    },
    hideAll(state) {
      return initialUiState
    }
  }
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer
