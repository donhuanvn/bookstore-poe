import { bookActions } from "./book-slice";
import { uiActions } from "./ui-slice";
import { AppDispatch } from ".";
import { fetchBook, fetchBookCount, fetchBooks } from "../util/dump-books";
import type { Book } from "../util/types";
import type { RootState } from ".";

export const fetchBooksWithRange = (start: number, count: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(bookActions.enterLoadingStage())

    let booksResponse: Book[] = await fetchBooks(start, count)
    dispatch(bookActions.replaceLoadedBooks({ startIndex: start, books: booksResponse }))

    let countResponse: number = await fetchBookCount()
    dispatch(bookActions.updateTotalCount(countResponse))

    dispatch(bookActions.finishLoadingStage())
  }
}

export const submitNewBook = (newBook: Book) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(bookActions.enterSubmittingStage())
    // submit to the server
    // handle response from the server
    await new Promise(resolve => setTimeout(resolve, 5000));
    dispatch(bookActions.finishSubmittingState())
    dispatch(uiActions.hideAll()) /* if no error */
  }
}
