import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithWrappers } from '../../util/tests-utils'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import MainNavigation from '../MainNavigation'
import { uiActions } from '../../store/ui-slice'
import * as authActions from '../../store/auth-actions'

describe('MainNavigation', () => {
  describe('For not authenticated client', () => {
    const initialAuthState = { user: undefined, isInProgress: false, error: null }

    beforeEach(async () => {
      renderWithWrappers(<MainNavigation />, { preloadedState: { auth: initialAuthState } })
    })

    test('the button "Add a New Book" must be not rendered', async () => {
      expect(screen.queryByText(/add a new book/i)).not.toBeInTheDocument()
    })

    test('the buttons "Sign Up" and "Login" must be presented', async () => {
      expect(screen.getByText(/sign up/i)).toBeInTheDocument()
      expect(screen.getByText(/login/i)).toBeInTheDocument()
    })

    test('trigger to show forms "Sign Up" correctly', async () => {
      const spyTriggerForm = jest.spyOn(uiActions, 'showSignUpForm')
      await act(async () => { userEvent.click(screen.getByText(/sign up/i)) })
      expect(spyTriggerForm).toBeCalledTimes(1)
    })

    test('trigger to show forms "Login" correctly', async () => {
      const spyTriggerForm = jest.spyOn(uiActions, 'showLoginForm')
      await act(async () => { userEvent.click(screen.getByText(/login/i)) })
      expect(spyTriggerForm).toBeCalledTimes(1)
    })
  })

  describe('For logged in user', () => {
    const initialAuthState = { user: 'authenticateduser@bookstore.com', isInProgress: false, error: null }

    beforeEach(async () => {
      renderWithWrappers(<MainNavigation />, { preloadedState: { auth: initialAuthState } })
    })

    test('the button "Add a New Book" must be shown', async () => {
      expect(screen.getByText(/add a new book/i)).toBeInTheDocument()
    })

    test('the buttons "Sign Up" and "Login" must be hiden', async () => {
      expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/login/i)).not.toBeInTheDocument()
    })

    test('the button "Logout" and email of the logged-in user must be presented', async () => {
      expect(screen.getByText(/logout/i)).toBeInTheDocument()
      expect(screen.getByText(/authenticateduser\@bookstore\.com/i)).toBeVisible()
    })

    test('trigger to show forms "Add a New Book" correctly', async () => {
      const spyTriggerForm = jest.spyOn(uiActions, 'showNewBookForm')
      await act(async () => { userEvent.click(screen.getByText(/add a new book/i)) })
      expect(spyTriggerForm).toBeCalledTimes(1)
    })

    test('trigger to logout successfully', async () => {
      const spyTriggerForm = jest.spyOn(authActions, 'logout')
      await act(async () => {
        userEvent.click(screen.getByText(/logout/i))
      })
      expect(spyTriggerForm).toBeCalledTimes(1)
    })
  })
})
