import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../store/ui-slice'
import { authActions } from '../store/auth-slice'

import { Link } from 'react-router-dom'
import classes from './MainNavigation.module.css'
import { RootState } from '../store'

function MainNavigation() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector<RootState, undefined | string>(({ auth }) => auth.user)

  const addNewBookHandler = () => {
    dispatch(uiActions.showNewBookForm())
  }

  const signupHandler = () => {
    dispatch(uiActions.showSignUpForm())
  }

  const loginHandler = () => {
    dispatch(uiActions.showLoginForm())
  }

  const logoutHandler = () => {
    dispatch(authActions.logout())
  }

  let authListItem = (
    <li>
      <Link to="#" onClick={signupHandler}>Sign up</Link> or <Link to="#" onClick={loginHandler}>Login</Link>
    </li>
  )
  if (loggedInUser !== undefined) {
    authListItem = (
      <li>
        {loggedInUser} <Link to="#" onClick={logoutHandler}>Logout</Link>
      </li>
    )
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <img src='logo512.png' alt='Bookstore logo!' />
        <span>Online Book Store</span>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="#" onClick={addNewBookHandler}>Add New Book</Link>
          </li>
          {authListItem}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
