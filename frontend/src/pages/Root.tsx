import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { authActions } from "../store/auth-slice";
import type { RootState, AppDispatch } from "../store";
import supabase from "../supabase";

import { Outlet } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"
import Backdrop from '@mui/material/Backdrop';
import AuthForm from "../components/AuthForm";
import NewBookForm from "../components/NewBookForm";

function RootLayout() {
  const dispatch: AppDispatch = useDispatch()

  const showLoginForm = useSelector<RootState, boolean>(state => state.ui.isLoginFormVisible)
  const showSignupForm = useSelector<RootState, boolean>(state => state.ui.isSignUpFormVisible)
  const showNewBookForm = useSelector<RootState, boolean>(state => state.ui.isNewBookFormVisible)

  const showBackdrop = showLoginForm || showSignupForm || showNewBookForm

  useEffect(() => {
    const checkAndLoginAuto = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data && data.user && data.user.email) {
        dispatch(authActions.finishProgress({ error: null, user: data.user!.email })) /* Finish the automatically login process */
      }
    }
    checkAndLoginAuto()
  }, [])

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
        <div style={{backgroundColor: "rgb(0,0,0,0.2)" ,color: "gray", position: "absolute", bottom: "10px", left: "10px"}}>
          Double click to turn off the backdrop
        </div>
        <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
          {showLoginForm && <AuthForm mode='login' />}
          {showSignupForm && <AuthForm mode='signup' />}
          {showNewBookForm && <NewBookForm />}
        </div>
      </Backdrop>
    </>
  )
}

export default RootLayout
