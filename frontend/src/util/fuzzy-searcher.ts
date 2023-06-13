import { Searcher, MatchData } from 'fast-fuzzy'
import type { Book } from '../types'

let fuzzySearcher: null | Searcher<Book, { keySelector: (book: Book) => string }> = null

const cacheBookDataset = (books: Book[]) => {
  // console.log("Cache a book dataset")
  fuzzySearcher = new Searcher(
    books,
    { keySelector: book => book.title }
  )
}

const searchBookTitles = (searchTerm: string) => {
  if (!fuzzySearcher) return [] as MatchData<Book>[]
  return fuzzySearcher.search(searchTerm, {returnMatchData: true})
}

export default {
  searchBookTitles,
  cacheBookDataset
}
