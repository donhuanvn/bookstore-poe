import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithWrappers } from '../../util/tests-utils'
import AuthForm from '../AuthForm'
import * as authActions from '../../store/auth-actions'
import { uiActions } from '../../store/ui-slice'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

/* 
  Good tutorials:
    https://redux.js.org/usage/writing-tests
    https://nsblog.hashnode.dev/mocking-an-event-handler
*/

describe('AuthForm', () => {
  describe('For Login mode', () => {
    test('show static text correcly', async () => {
      renderWithWrappers(<AuthForm mode='login' />)
      expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /create a new account/i })).toBeInTheDocument()
      const emailInput = screen.getByLabelText(/e-mail/i)
      const passwordInput = screen.getByLabelText(/password/i)
      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
      expect(emailInput.getAttribute('type')).toBe('email')
      expect(passwordInput.getAttribute('type')).toBe('password')
    })

    test('collect data correcly to submit', async () => {
      const spyLogin = jest.spyOn(authActions, 'login')
      renderWithWrappers(<AuthForm mode='login' />)
      const emailInput = screen.getByLabelText(/e-mail/i) as HTMLInputElement
      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
      const loginBtn = screen.getByRole('button', { name: /login/i })
      await act(async () => {
        userEvent.type(emailInput, 'test@unit.com')
        userEvent.type(passwordInput, 'reallystrongpassword')
        userEvent.click(loginBtn)
      })
      expect(spyLogin).toBeCalledWith('test@unit.com', 'reallystrongpassword')
    })

    test('propagate event of switching mode', async () => {
      const spyShownSignUpForm = jest.spyOn(uiActions, 'showSignUpForm')
      renderWithWrappers(<AuthForm mode='login' />)
      const switchModeBtn = screen.getByRole('button', { name: /create a new account/i })
      await act(async () => {
        userEvent.click(switchModeBtn)
      })
      expect(spyShownSignUpForm).toBeCalledTimes(1)
    })
  })

  describe('For Sign Up mode', () => {
    test('show static test correctly', () => {
      renderWithWrappers(<AuthForm mode='signup' />)
      expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /login an existing account/i })).toBeInTheDocument()
      const emailInput = screen.getByLabelText(/e-mail/i)
      const passwordInput = screen.getByLabelText(/^password/i)
      const confirmPasswordInput = screen.getByLabelText(/re-enter password/i)
      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
      expect(confirmPasswordInput).toBeInTheDocument()
      expect(emailInput.getAttribute('type')).toBe('email')
      expect(passwordInput.getAttribute('type')).toBe('password')
      expect(confirmPasswordInput.getAttribute('type')).toBe('password')
    })

    test('collect data correctly to submit', async () => {
      const spySignup = jest.spyOn(authActions, 'signup')
      renderWithWrappers(<AuthForm mode='signup' />)
      const emailInput = screen.getByLabelText(/e-mail/i) as HTMLInputElement
      const passwordInput = screen.getByLabelText(/^password/i) as HTMLInputElement
      const confirmPasswordInput = screen.getByLabelText(/re-enter password/i) as HTMLInputElement
      const signupBtn = screen.getByRole('button', { name: /sign up/i })
      await act(async () => {
        userEvent.type(emailInput, 'test@unit.com')
        userEvent.type(passwordInput, 'reallystrongpassword')
        userEvent.type(confirmPasswordInput, 'reallystrongpassword')
        userEvent.click(signupBtn)
      })
      expect(spySignup).toBeCalledWith('test@unit.com', 'reallystrongpassword')
    })

    test('prevent submit if password and re-enter password do not match', async () => {
      const spySignup = jest.spyOn(authActions, 'signup')
      renderWithWrappers(<AuthForm mode='signup' />)
      const emailInput = screen.getByLabelText(/e-mail/i) as HTMLInputElement
      const passwordInput = screen.getByLabelText(/^password/i) as HTMLInputElement
      const confirmPasswordInput = screen.getByLabelText(/re-enter password/i) as HTMLInputElement
      const signupBtn = screen.getByRole('button', { name: /sign up/i })
      await act(async () => {
        userEvent.type(emailInput, 'test@unit.com')
        userEvent.type(passwordInput, 'password')
        userEvent.type(confirmPasswordInput, 'password_')
        userEvent.click(signupBtn)
      })
      expect(spySignup).not.toHaveBeenCalled()
    })

    test('propagate event of switching mode', async () => {
      const spyShownLoginForm = jest.spyOn(uiActions, 'showLoginForm')
      renderWithWrappers(<AuthForm mode='signup' />)
      const switchModeBtn = screen.getByRole('button', { name: /login an existing account/i })
      await act(async () => {
        userEvent.click(switchModeBtn)
      })
      expect(spyShownLoginForm).toBeCalledTimes(1)
    })
  })
})
