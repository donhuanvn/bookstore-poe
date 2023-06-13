import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithWrappers } from '../../util/tests-utils'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { initialUiState } from '../../store/ui-slice'
import { initialBookState } from '../../store/book-slice'
import RootLayout from '../Root'
import supabase from '../../supabase'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const dumpBook = {
  id: 'a2007e26-fcc4-43d2-bf46-a17b01f7eafc',
  creator: 'creator_test@jest.com',
  title: 'The Ultimate Hitchhikers Guide: Five Complete Novels and One Story',
  price: 99.99,
  image: 'https://www.image.com/book.png',
  authors: ['Test Jest', 'Jest Test'],
  description: 'Molestias voluptates mollitia nemo blanditiis distinctio eum mollitia iure nulla.'
}

describe('Root', () => {
  describe('Show forms on the backdrop correctly', () => {
    test('sign-up form', async () => {
      renderWithWrappers(<RootLayout />, { preloadedState: { ui: { ...initialUiState, isSignUpFormVisible: true } } })
      expect(screen.getByTestId('backdrop-for-forms')).toBeVisible()
      expect(screen.getByTestId('sign-up form')).toBeInTheDocument()
    })
    test('log-in form', async () => {
      renderWithWrappers(<RootLayout />, { preloadedState: { ui: { ...initialUiState, isLoginFormVisible: true } } })
      expect(screen.getByTestId('backdrop-for-forms')).toBeVisible()
      expect(screen.getByTestId('log-in form')).toBeInTheDocument()
    })
    test('new-book form', async () => {
      renderWithWrappers(<RootLayout />, { preloadedState: { ui: { ...initialUiState, isNewBookFormVisible: true } } })
      expect(screen.getByTestId('backdrop-for-forms')).toBeVisible()
      expect(screen.getByTestId('new-book form')).toBeInTheDocument()
    })
    test('edit-book form', async () => {
      renderWithWrappers(<RootLayout />, {
        preloadedState: {
          ui: { ...initialUiState, isEditBookFormVisible: true },
          book: { ...initialBookState, bookForShowDetail: dumpBook }
        }
      })
      expect(screen.getByTestId('backdrop-for-forms')).toBeVisible()
      expect(screen.getByTestId('edit-book form')).toBeInTheDocument()
    })
  })

  test('exit the backdrop with double-click on it (outside its form)', async () => {
    renderWithWrappers(<RootLayout />, { preloadedState: { ui: { ...initialUiState, isSignUpFormVisible: true } } })
    const backDropElement = screen.getByTestId('backdrop-for-forms')
    await act(async () => {
      userEvent.dblClick(backDropElement)
    })
    expect(screen.getByTestId('backdrop-for-forms')).not.toBeVisible()
  })

  test('automatically re-login if the previous session is still valid', async () => {
    jest.mock('../../supabase')
    // @ts-ignore: ignore type error of this assignment.
    supabase.auth.getUser = jest.fn(async () => ({ data: { user: { email: 'test@test.com' } }, error: null }))
    await act(async () => {
      /* Placed here due to including a redux state change. */
      renderWithWrappers(<RootLayout />)
    })
    expect(screen.getByText(/test\@test\.com/i)).toBeInTheDocument()
  })
})
