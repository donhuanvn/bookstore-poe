import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Book } from "../util/types";

type BookState = {
  isSubmitting: boolean;
  isLoading: boolean;
  totalAvailableCount: number;
  startIndex: number;
  loadedBooks: Book[];
  searchText: string;
  chosenBookForDetail: Book | null;
}

const initialBookSlice: BookState = {
  isSubmitting: false,
  isLoading: false,
  totalAvailableCount: 0, /* Total books in database */
  startIndex: 0,
  loadedBooks: [], /* To store books loaded to display at homepage */
  searchText: '',
  chosenBookForDetail: null
}

const bookSlice = createSlice({
  name: 'book',
  initialState: initialBookSlice as BookState,
  reducers: {
    enterSubmittingStage(state) {
      state.isSubmitting = true
    },
    finishSubmittingState(state) {
      state.isSubmitting = false
    },
    enterLoadingStage(state) {
      state.isLoading = true;
    },
    finishLoadingStage(state) {
      state.isLoading = false
    },
    replaceLoadedBooks(state, action: PayloadAction<{ startIndex: number, books: Book[] }>) {
      state.startIndex = action.payload.startIndex
      state.loadedBooks = action.payload.books
    },
    updateTotalCount(state, action: PayloadAction<number>) {
      state.totalAvailableCount = action.payload
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload
    },
    chooseBookForShowingDetail(state, action: PayloadAction<string>) {
      const chosenBook = state.loadedBooks.find(b => b.id === action.payload)
      if (chosenBook) {
        state.chosenBookForDetail = {...chosenBook}
      }
    }
  }
})

export const bookActions = bookSlice.actions
export default bookSlice.reducer
