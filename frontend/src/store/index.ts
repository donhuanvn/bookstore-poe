import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './ui-slice'
import bookReducer from './book-slice'
import authReducer from './auth-slice'

const store = configureStore({
  reducer: {
    ui: uiReducer,
    book: bookReducer,
    auth: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
