import { bookActions } from "./book-slice";
import { uiActions } from "./ui-slice";
import { AppDispatch } from ".";
import type { Book } from "../types";
import type { RootState } from ".";
import supabase from "../supabase";

export const fetchAllBooks = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(bookActions.enterLoadingStage())
    // await new Promise(resolve => setTimeout(resolve, 2000));
    const { data, error } = await supabase
      .from('books')
      .select('*')

    if (error || !data) { // Should toast an error
      dispatch(bookActions.replaceLoadedBooks({ books: [] }))
      dispatch(bookActions.updateTotalCount(0))
    }
    dispatch(bookActions.replaceLoadedBooks({ books: data as Book[] }))
    dispatch(bookActions.updateTotalCount(data!.length))
    dispatch(bookActions.finishLoadingStage())

    /* Update out-dated dependency data in the state. */
    const oldDetailedBook = getState().book.bookForShowDetail
    if (oldDetailedBook !== null) {
      const newlyLoadedBook = (data as Book[]).find(b => b.id === oldDetailedBook.id)
      newlyLoadedBook && dispatch(bookActions.setBookToShowDetail(newlyLoadedBook))
    }
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
      .from('books')
      .insert([
        {
          creator,
          title: newBook.title,
          price: newBook.price,
          image: newBook.image,
          authors: newBook.authors,
          description: newBook.description
        }
      ])

    if (error) {
      /* Should show this error on the screen.  */
      console.log(error)
      return dispatch(bookActions.finishSubmittingState())
    }

    dispatch(bookActions.finishSubmittingState())
    dispatch(uiActions.hideAll()) /* no error */
    dispatch(fetchAllBooks()) /* expecting to update all books on the homepage */
  }
}

export const submitUpdatedBook = (updatedBook: Book) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(bookActions.enterSubmittingStage())

    const { error } = await supabase
      .from('books')
      .update({
        title: updatedBook.title,
        price: updatedBook.price,
        image: updatedBook.image,
        authors: updatedBook.authors,
        description: updatedBook.description
      })
      .eq('id', updatedBook.id)

    if (error) {
      /* Should show this error on the screen.  */
      console.log(error)
      return dispatch(bookActions.finishSubmittingState())
    }

    dispatch(bookActions.finishSubmittingState())
    dispatch(uiActions.hideAll()) /* no error */
    dispatch(fetchAllBooks()) /* expecting to update all books on the homepage */
  }
}

export const deleteBook = (bookId: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId)

    if (error) {
      /* Should show this error on the screen.  */
      console.log(error)
    }

    dispatch(fetchAllBooks()) /* expecting to update all books on the homepage */
  }
}
