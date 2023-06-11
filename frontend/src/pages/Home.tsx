import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllBooks } from "../store/book-actions"
import { bookActions } from "../store/book-slice"
import type { AppDispatch, RootState } from "../store"
import type { Book } from "../types"

import { useNavigate } from "react-router-dom"

import SearchBar from "../components/SearchBar"
import BooksList from "../components/BooksList"
import Pagination from '@mui/material/Pagination'

import classes from './Home.module.css'

const NUMBER_BOOK_TO_SHOW = 12

function HomePage() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const shownBooks = useSelector<RootState, Book[]>(({ book }) => {
    const start = (currentPage - 1) * NUMBER_BOOK_TO_SHOW
    const end = start + NUMBER_BOOK_TO_SHOW
    return book.loadedBooks.slice(start, end)
  })
  const bookCount = useSelector<RootState, number>(({ book }) => book.totalAvailableCount) /* Total books avaliable in the DB */
  const searchText = useSelector<RootState, string>(({ book }) => book.searchText)
  const isLoading = useSelector<RootState, boolean>(({ book }) => book.isLoading)

  useEffect(() => {
    document.title = "Bookstore PoE (Nhuan Do)"
    if (bookCount === 0) {
      dispatch(fetchAllBooks())
    }
  }, [])

  const paginationHandler = (_event: React.ChangeEvent<unknown>, pageIndex: number) => {
    if (pageIndex !== currentPage) {
      setCurrentPage(pageIndex)
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
      <BooksList books={shownBooks} onSelectBook={selectBookForDetailHandler} />
      <div className={classes['pagination-container']} >
        <Pagination
          className={classes['pagination']}
          count={Math.ceil(bookCount / NUMBER_BOOK_TO_SHOW)}
          color="secondary"
          page={currentPage}
          onChange={paginationHandler}
          disabled={isLoading}
        />
      </div>
    </>
  )
}

export async function loader() {
  console.log("Home Loader run!")

  return []
}

export default HomePage
