import React from 'react';
import Grid from '@mui/material/Grid';
import BookItem from './BookItem';

import classes from './BooksList.module.css'

/* const DUMP_BOOKS = [
  { id: '1', title: 'The story of the sea', price: 100, image: 'book.png' },
  { id: '2', title: 'The story of the sea', price: 100, image: 'book.png' },
  { id: '3', title: 'The story of the sea', price: 100, image: 'book.png' },
  { id: '4', title: 'The story of the sea', price: 100, image: 'book.png' },
  { id: '5', title: 'The story of the sea', price: 100, image: 'book.png' },
  { id: '6', title: 'The story of the sea', price: 100, image: 'book.png' },
]
 */
type DisplayedBook = {
  id: string;
  title: string;
  image: string;
  price: number;
}

type BooksListProps = {
  books: DisplayedBook[];
  onSelectBook: (id: string) => void;
}

const BooksList: React.FC<BooksListProps> = (props) => {
  const onChooseBookHandler = (id: string) => {
    props.onSelectBook(id)
  }

  return (
    <Grid className={classes.container} container spacing={2}>
      {props.books.length === 0 && <Grid item xs={12}>
        <div className={classes['no-book-indicator']}>Not any book to show!</div>
      </Grid>}
      {props.books.map((book) => (
        <Grid item xs={4} sm={4} lg={3} key={book.id}> {/* 3 columns for small screen, 4 colums for big screen */}
          <BookItem {...book} onChoose={onChooseBookHandler} />
        </Grid>
      ))}
    </Grid>
  )
}

export default BooksList
