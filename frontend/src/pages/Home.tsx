import React, { useEffect } from "react"
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

type BookWithSearchMatch = Book & {
  titleSearchMatch?: { index: number; length: number };
}

function HomePage() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const isLoading = useSelector<RootState, boolean>(({ book }) => book.isLoading)
  const searchText = useSelector<RootState, string>(({ book }) => book.searchText)
  const currentPage = useSelector<RootState, number>(({ book }) => book.currentPage)
  /* Total books avaliable in the DB */
  const bookCount = useSelector<RootState, number>(({ book }) => book.totalAvailableCount)
  /* Books currently display on the screen and the number of books filtered by current search text. */
  const [shownBooks, filteredBookCount] =
    useSelector<RootState, [BookWithSearchMatch[], number]>(({ book }) => {
      const { searchText, searchResults, loadedBooks, totalAvailableCount, currentPage } = book
      const start = (currentPage - 1) * NUMBER_BOOK_TO_SHOW
      const end = start + NUMBER_BOOK_TO_SHOW
      /* Show books form search results if having search. */
      if (searchText.trim().length > 0) {
        const filteredBooks = searchResults.map(sr => ({ ...sr.item, titleSearchMatch: { ...sr.match } }))
        return [filteredBooks.slice(start, end), filteredBooks.length]
      } else {
        return [loadedBooks.slice(start, end), totalAvailableCount]
      }
    })

  useEffect(() => {
    document.title = "Bookstore PoE (Nhuan Do)"
    if (bookCount === 0) {
      dispatch(fetchAllBooks())
    }
  }, [])

  const paginationHandler = (_event: React.ChangeEvent<unknown>, pageIndex: number) => {
    if (pageIndex !== currentPage) {
      dispatch(bookActions.setCurrentPage(pageIndex))
    }
  }

  const searchHandler = (newSearchText: string) => {
    // console.log(newSearchText !== '' ? newSearchText : 'Cleared search text')
    dispatch(bookActions.setSearchText(newSearchText))
  }

  const selectBookForDetailHandler = (id: string) => {
    const selectedBook = shownBooks.find(b => b.id === id)
    if (selectedBook) {
      dispatch(bookActions.setBookToShowDetail(selectedBook))
      navigate('book-detail')
    }
  }

  return (
    <>
      <SearchBar onSearchChange={searchHandler} searchText={searchText} />
      <BooksList books={shownBooks} onSelectBook={selectBookForDetailHandler} />
      <div className={classes['pagination-container']} >
        <Pagination
          className={classes['pagination']}
          count={Math.ceil(filteredBookCount / NUMBER_BOOK_TO_SHOW)}
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
