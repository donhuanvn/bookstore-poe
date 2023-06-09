import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';
import type { AuthError } from '../store/auth-slice';
import { login, signup } from '../store/auth-actions';

import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import classes from './AuthForm.module.css'
import { RootState, AppDispatch } from '../store';

type AuthFormProps = {
  mode: 'login' | 'signup';
}


const AuthForm: React.FC<AuthFormProps> = (props) => {
  const dispatch: AppDispatch = useDispatch()
  const isProcessing = useSelector<RootState, boolean>(({ auth }) => auth.isInProgress)
  const error = useSelector<RootState, AuthError>(({ auth }) => auth.error)

  const [errorConfirmPassword, setErrorConfirmPassword] = useState<boolean>(false)

  const loginEmailRef = useRef<HTMLInputElement>(null)
  const loginPasswordRef = useRef<HTMLInputElement>(null)
  const signupEmailRef = useRef<HTMLInputElement>(null)
  const signupPasswordRef = useRef<HTMLInputElement>(null)
  const signupReenterPasswordRef = useRef<HTMLInputElement>(null)


  const switchToSignUpFormHandler = () => {
    dispatch(uiActions.showSignUpForm())
  }

  const switchToLoginFormHandler = () => {
    dispatch(uiActions.showLoginForm())
  }

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const enteredEmail = loginEmailRef.current!.value
    const enteredPassword = loginPasswordRef.current!.value

    // console.log("Login info:", enteredEmail, enteredPassword)
    dispatch(login(enteredEmail, enteredPassword))
  }

  const signUpHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const enteredEmail = signupEmailRef.current!.value
    const enteredPassword = signupPasswordRef.current!.value
    const enteredReenterPass = signupReenterPasswordRef.current!.value

    // console.log("Sign Up info:", enteredEmail, enteredPassword, enteredReenterPass)

    if (enteredReenterPass !== enteredPassword) {
      setErrorConfirmPassword(true)
    } else {
      setErrorConfirmPassword(false)
      dispatch(signup(enteredEmail, enteredPassword))
    }
  }

  let signupForm = (
    <form className={classes.form} action="#" onSubmit={signUpHandler}>
      <TextField
        fullWidth
        required
        id="email"
        type="email"
        label="E-mail"
        inputRef={signupEmailRef}
        error={!!error && !!error.email}
        helperText={error && error.email ? error.email : ''}
      />
      <TextField
        fullWidth
        required
        id="password"
        label="Password"
        type="password"
        inputRef={signupPasswordRef}
        error={!!error && !!error.password}
        helperText={error && error.password ? error.password : ''}
      />
      <TextField
        fullWidth
        required
        id="reenter-password"
        label="Re-enter Password"
        type="password"
        inputRef={signupReenterPasswordRef}
        error={errorConfirmPassword}
        helperText={errorConfirmPassword ? 'Passwords do NOT match' : ''}
      />
      <div className={classes['button-group']}>
        <Button variant="text" className={classes['btn-switch-mode']} onClick={switchToLoginFormHandler}>Login an existing account</Button>
        <Button variant="contained" className={classes['btn-submit']} type="submit">Sign Up</Button>
      </div>
    </form>
  )

  let loginForm = (
    <form className={classes.form} action="#" onSubmit={loginHandler}>
      <TextField
        fullWidth
        required
        id="email"
        type="email"
        label="E-mail"
        inputRef={loginEmailRef}
        error={!!error && !!error.email}
        helperText={error && error.email ? error.email : ''}
      />
      <TextField
        fullWidth
        required
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        inputRef={loginPasswordRef}
        error={!!error && !!error.password}
        helperText={error && error.password ? error.password : ''}
      />
      <div className={classes['button-group']}>
        <Button variant="text" className={classes['btn-switch-mode']} onClick={switchToSignUpFormHandler}>Create a new account</Button>
        <Button variant="contained" className={classes['btn-submit']} type="submit">Login</Button>
      </div>
    </form>
  )

  return (
    <div className={classes.container}>
      <h1>{props.mode === 'signup' ? "Sign Up" : "Login"}</h1>

      {error && error.message && <div className={classes.error}>{error.message}</div>}

      {props.mode === 'signup' ? signupForm : loginForm}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isProcessing}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default AuthForm
