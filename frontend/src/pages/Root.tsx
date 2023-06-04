import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";

import { Outlet } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"
import Backdrop from '@mui/material/Backdrop';
import AuthForm from "../components/AuthForm";
import NewBookForm from "../components/NewBookForm";
import { RootState } from "../store";

function RootLayout() {
  const dispatch = useDispatch()

  const showLoginForm = useSelector<RootState, boolean>(state => state.ui.isLoginFormVisible)
  const showSignupForm = useSelector<RootState, boolean>(state => state.ui.isSignUpFormVisible)
  const showNewBookForm = useSelector<RootState, boolean>(state => state.ui.isNewBookFormVisible) 

  const showBackdrop = showLoginForm || showSignupForm || showNewBookForm

  let authForm = <></>
  if (showLoginForm) {
    authForm = <AuthForm mode='login' />
  } else if (showSignupForm) {
    authForm = <AuthForm mode='signup' />
  }

  let newBookForm = <></>
  if (showNewBookForm) {
    newBookForm = <NewBookForm />
  }

  const backdropHandler = () => {
    dispatch(uiActions.hideAll())
  }

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
        onDoubleClick={backdropHandler}
      >
        <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
          {authForm}
          {newBookForm}
        </div>
      </Backdrop>
    </>
  )
}

export default RootLayout
