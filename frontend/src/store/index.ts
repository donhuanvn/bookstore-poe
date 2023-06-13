import { configureStore, combineReducers} from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'

import uiReducer from './ui-slice'
import bookReducer from './book-slice'
import authReducer from './auth-slice'


const rootReducer = combineReducers({
  ui: uiReducer,
  book: bookReducer,
  auth: authReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
