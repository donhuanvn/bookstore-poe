import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Book } from "../types";
import type { MatchData } from 'fast-fuzzy'
import fuzzySearch from '../util/fuzzy-searcher'

type BookState = {
  isSubmitting: boolean;
  isLoading: boolean;
  currentPage: number;
  totalAvailableCount: number;
  loadedBooks: Book[];
  searchText: string;
  searchResults: MatchData<Book>[];
  bookForShowDetail: Book | null;
}

const initialBookSlice: BookState = {
  isSubmitting: false,
  isLoading: false,
  currentPage: 1,
  totalAvailableCount: 0, /* Total books in database */
  loadedBooks: [], /* To store books loaded to display at homepage */
  searchText: '',
  searchResults: [],
  bookForShowDetail: null
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
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    replaceLoadedBooks(state, action: PayloadAction<{ books: Book[] }>) {
      state.loadedBooks = [...action.payload.books]
      /* Create a cache trie to allow searching faster. */
      fuzzySearch.cacheBookDataset(state.loadedBooks)
    },
    updateTotalCount(state, action: PayloadAction<number>) {
      state.totalAvailableCount = action.payload
    },
    setSearchText(state, action: PayloadAction<string>) {
      const searchText = action.payload
      let searchResults: MatchData<Book>[] = fuzzySearch.searchBookTitles(searchText)
      return {
        ...state,
        searchText,
        searchResults
      }
    },
    setBookToShowDetail(state, action: PayloadAction<Book>) {
      state.bookForShowDetail = { ...action.payload }
    }
  }
})

export const bookActions = bookSlice.actions
export default bookSlice.reducer
