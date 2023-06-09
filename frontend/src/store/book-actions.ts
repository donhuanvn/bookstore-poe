import { bookActions } from "./book-slice";
import { uiActions } from "./ui-slice";
import { AppDispatch } from ".";
import type { Book } from "../types";
import type { RootState } from ".";
import supabase from "../supabase";

export const fetchAllBooks = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(bookActions.enterLoadingStage())
    // await new Promise(resolve => setTimeout(resolve, 2000));
    const { data, error } = await supabase
      .from('Books')
      .select('*')

    if (error || !data) { // Should toast an error
      dispatch(bookActions.replaceLoadedBooks({ books: [] }))
      dispatch(bookActions.updateTotalCount(0))
    }
    dispatch(bookActions.replaceLoadedBooks({ books: data as Book[] }))
    dispatch(bookActions.updateTotalCount(data!.length))
    dispatch(bookActions.finishLoadingStage())
  }
}

export const submitNewBook = (newBook: Book) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(bookActions.enterSubmittingStage())

    let creator = ''
    {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        throw "Unable to add a new book when login has not been completed yet"
      }
      if (!data.user.email) {
        throw "Email of user logged in is not found"
      }
      creator = data.user.email
    }

    const { data, error } = await supabase
      .from('Books')
      .insert([
        {
          creator: await supabase.auth.getUser(),
          title: newBook.title,
          price: newBook.price,
          image: newBook.image,
          authors: newBook.authors,
          description: newBook.description
        }
      ])

    if (error) {
      /* Should show this error on the screen.  */
      return dispatch(bookActions.finishSubmittingState())
    }

    dispatch(bookActions.finishSubmittingState())
    dispatch(uiActions.hideAll()) /* no error */
    dispatch(fetchAllBooks()) /* expecting to update all books on the homepage */
  }
}
