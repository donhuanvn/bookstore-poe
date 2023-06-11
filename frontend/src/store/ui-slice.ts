import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  isNewBookFormVisible: boolean;
  isEditBookFormVisible: boolean;
  isLoginFormVisible: boolean;
  isSignUpFormVisible: boolean;
}

const initialUiState: UiState = {
  isNewBookFormVisible: false,
  isEditBookFormVisible: false,
  isLoginFormVisible: false,
  isSignUpFormVisible: false
}

const uiSlice = createSlice({
  name: 'user-interface',
  initialState: initialUiState as UiState,
  reducers: {
    showNewBookForm(state) {
      return {...initialUiState, isNewBookFormVisible: true}
    },
    showEditBookForm(state) {
      return {...initialUiState, isEditBookFormVisible: true}
    },
    showLoginForm(state) {
      return {...initialUiState, isLoginFormVisible: true}
    },
    showSignUpForm(state) {
      return {...initialUiState, isSignUpFormVisible: true}
    },
    hideAll(state) {
      return initialUiState
    }
  }
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer
