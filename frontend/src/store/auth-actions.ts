import { authActions } from "./auth-slice";
import { uiActions } from "./ui-slice";
import { AppDispatch } from ".";

export const login = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authActions.enterProgress())
    // send request to server,
    // wait for response
    await new Promise(resolve => setTimeout(resolve, 5000));
    // handle response
    dispatch(authActions.finishProgress({ error: null, user: email }))
    dispatch(uiActions.hideAll())
  }
}

export const signup = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authActions.enterProgress())
    // send request to server,
    // wait for response
    await new Promise(resolve => setTimeout(resolve, 5000));
    // handle response
    // dispatch(authActions.finishProgress({ error: null, user: email }))
    dispatch(authActions.finishProgress({ error: null, user: email }))
    dispatch(uiActions.hideAll()) /* if no error */
  }
}
