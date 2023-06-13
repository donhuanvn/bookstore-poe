import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithWrappers } from '../../util/tests-utils'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import uiReducer, { uiActions, initialUiState } from '../ui-slice'
import authReducer, { authActions, initialAuthState } from '../auth-slice'
import bookReducer, { bookActions, initialBookState } from '../book-slice'
import type { Book } from '../../types'

const dumpBooks: Book[] = [
  {
    id: 'a2007e26-fcc4-43d2-bf46-a17b01f7eafc',
    creator: 'creator_test@jest.com',
    title: 'The Ultimate Hitchhikers Guide: Five Complete Novels and One Story',
    price: 99.99,
    image: 'https://www.image.com/book1.png',
    authors: ['Test Jest', 'Jest Test'],
    description: 'Molestias voluptates mollitia nemo blanditiis distinctio eum mollitia iure nulla.'
  },
  {
    id: 'ef6d3b5f-1cca-4aad-8c6c-86c0d35731d1',
    creator: 'creator_test_2@jest.com',
    title: 'A Short History of Nearly Everything',
    price: 1000,
    image: 'https://www.image.com/book2.png',
    authors: ['Whitney Koch', 'Jacob Gerlach'],
    description: 'Minima dolorum voluptatem debitis rerum.'
  }
]

describe('redux-store', () => {
  describe("For basic of UI Slice", () => {
    const previousState = initialUiState
    it("when hide all", async () => {
      expect(uiReducer(previousState, uiActions.hideAll())).toEqual(initialUiState)
    })
    it("control forms' visibility correctly", async () => {
      expect(uiReducer(previousState, uiActions.showLoginForm()))
        .toEqual({ ...initialUiState, isLoginFormVisible: true })
      expect(uiReducer(previousState, uiActions.showSignUpForm()))
        .toEqual({ ...initialUiState, isSignUpFormVisible: true })
      expect(uiReducer(previousState, uiActions.showNewBookForm()))
        .toEqual({ ...initialUiState, isNewBookFormVisible: true })
      expect(uiReducer(previousState, uiActions.showEditBookForm()))
        .toEqual({ ...initialUiState, isEditBookFormVisible: true })
    })
  })

  describe('For basic of Authentication Slice', () => {
    const previousState = initialAuthState
    it("when unauthenticated", async () => {
      expect(authReducer(previousState, authActions.reset())).toEqual(initialAuthState)
    })
    it("when logging is in progress", async () => {
      expect(authReducer(previousState, authActions.enterProgress())).toMatchObject({ isInProgress: true })
    })
    it("when logging is fail", async () => {
      const failResponse = { user: undefined, error: { message: 'fail to login' } }
      expect(authReducer(previousState, authActions.finishProgress(failResponse)))
        .toMatchObject({ error: { message: 'fail to login' } })
    })
    it("when logging is success", async () => {
      const successResponse = { user: 'test@test.com', error: null }
      expect(authReducer(previousState, authActions.finishProgress(successResponse)))
        .toMatchObject({ user: 'test@test.com' })
    })
  })

  describe('For basic of Book Slice', () => {
    const previousState = initialBookState
    it("be reactive correctly when loading books", async () => {
      expect(bookReducer(previousState, bookActions.enterLoadingStage())).toMatchObject({ isLoading: true })
      expect(bookReducer(previousState, bookActions.finishLoadingStage())).toMatchObject({ isLoading: false })
    })
    it("be reactive correctly when submitting a new book", async () => {
      expect(bookReducer(previousState, bookActions.enterSubmittingStage())).toMatchObject({ isSubmitting: true })
      expect(bookReducer(previousState, bookActions.finishSubmittingState())).toMatchObject({ isSubmitting: false })
    })
    it("hold the current page number correctly", async () => {
      expect(bookReducer(previousState, bookActions.setCurrentPage(10))).toMatchObject({ currentPage: 10 })
    })
    it("hold the total number of books in the database correctly", async () => {
      expect(bookReducer(previousState, bookActions.updateTotalCount(1000))).toMatchObject({ totalAvailableCount: 1000 })
    })
    it("hold correctly the book shown on the detail page", async () => {
      const dumpBook = dumpBooks[0]
      expect(bookReducer(previousState, bookActions.setBookToShowDetail(dumpBook))).toMatchObject({ bookForShowDetail: dumpBook })
    })
    it("store a bunch of books and be able to search", async () => {
      const firstState = bookReducer(previousState, bookActions.replaceLoadedBooks({books: dumpBooks}))
      expect(firstState).toMatchObject({ loadedBooks: dumpBooks })
      const secondState = bookReducer(firstState, bookActions.setSearchText('Ultimate'))
      expect(secondState).toMatchObject({ searchText: 'Ultimate' })
      expect(secondState.searchResults.length).toBe(1) /* only dumpBooks[0] passed the search text of 'Ultimate' */
    })
  })
  /* 
    test('login action is correctly reactive on UI (via state)', async () => {
  
    })
  
    test('sigup action is correctly reactive on UI (via state)', async () => {
  
    })
  
    test('submit action is correctly reactive on UI (via state)', async () => {
  
    })
  
    test('search books successfully', async () => {
  
    }) */
})
