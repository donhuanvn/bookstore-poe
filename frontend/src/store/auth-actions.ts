import { authActions } from "./auth-slice";
import { uiActions } from "./ui-slice";
import { AppDispatch } from ".";
import supabase from "../supabase";

export const login = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authActions.enterProgress())

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return dispatch(authActions.finishProgress({ error: { message: "Unable to login with these information" }, user: undefined /* not logged in */ }))
    }

    dispatch(authActions.finishProgress({ error: null, user: data.user!.email }))
    dispatch(uiActions.hideAll())
  }
}

export const signup = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authActions.enterProgress())

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      return dispatch(authActions.finishProgress({ error: { message: error.message }, user: undefined /* not logged in */ }))
    }

    dispatch(authActions.finishProgress({ error: null, user: data.user!.email }))
    dispatch(uiActions.hideAll()) /* if no error */
  }
}

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return /* Visualize error on the screen */
    }
    dispatch(authActions.reset())
  }
}
