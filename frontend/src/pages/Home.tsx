import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchBooksWithRange } from "../store/book-actions"
import { bookActions } from "../store/book-slice"
import type { AppDispatch, RootState } from "../store"
import type { Book } from "../util/types"

import { useNavigate } from "react-router-dom"

import SearchBar from "../components/SearchBar"
import BooksList from "../components/BooksList"
import Pagination from '@mui/material/Pagination'

import classes from './Home.module.css'

const NUMBER_BOOK_TO_SHOW = 12

function HomePage() {
  const navigate = useNavigate()

  const dispatch: AppDispatch = useDispatch()
  const isLoadingBooks: boolean = useSelector<RootState, boolean>(({ book }) => book.isLoading)
  const currentStartIndex: number = useSelector<RootState, number>(({ book }) => book.startIndex)
  const books: Book[] = useSelector<RootState, Book[]>(({ book }) => book.loadedBooks)
  const total: number = useSelector<RootState, number>(({ book }) => book.totalAvailableCount)
  const searchText: string = useSelector<RootState, string>(({ book }) => book.searchText)

  const currentPage = Math.floor(currentStartIndex / NUMBER_BOOK_TO_SHOW) + 1

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooksWithRange(0, NUMBER_BOOK_TO_SHOW))
    }
  }, [])

  const paginationHandler = (_event: React.ChangeEvent<unknown>, pageIndex: number) => {
    if (pageIndex !== currentPage) {
      const start = (pageIndex - 1) * NUMBER_BOOK_TO_SHOW
      const count = NUMBER_BOOK_TO_SHOW
      console.log(`Fetch books from ${start} with ${count} books`)
      dispatch(fetchBooksWithRange(start, count))
    }
  }

  const searchHandler = (newSearchText: string) => {
    console.log(newSearchText !== '' ? newSearchText : 'Cleared search text')
    dispatch(bookActions.setSearchText(newSearchText))
  }

  const selectBookForDetailHandler = (bookId: string) => {
    dispatch(bookActions.chooseBookForShowingDetail(bookId))
    navigate('book-detail')
  }

  return (
    <>
      <SearchBar onSearchChange={searchHandler} searchText={searchText} />
      <BooksList books={books} onSelectBook={selectBookForDetailHandler}/>
      <div className={classes['pagination-container']} >
        <Pagination
          className={classes['pagination']}
          count={Math.ceil(total / NUMBER_BOOK_TO_SHOW)}
          color="secondary"
          page={currentPage}
          onChange={paginationHandler}
          disabled={isLoadingBooks}
        />
      </div>
    </>
  )
}

export async function loader() {
  // console.log("Home Loader run!")

  return []
}

export default HomePage
