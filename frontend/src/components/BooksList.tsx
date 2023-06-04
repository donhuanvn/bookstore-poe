import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination'
import BookItem from './BookItem';

import classes from './BooksList.module.css'

const DUMP_BOOKS = [
  { id: '1', title: 'The story of the sea', price: '100', image: 'book.png' },
  { id: '2', title: 'The story of the sea', price: '100', image: 'book.png' },
  { id: '3', title: 'The story of the sea', price: '100', image: 'book.png' },
  { id: '4', title: 'The story of the sea', price: '100', image: 'book.png' },
  { id: '5', title: 'The story of the sea', price: '100', image: 'book.png' },
  { id: '6', title: 'The story of the sea', price: '100', image: 'book.png' },
]


function BooksList() {
  return (
    <>
      <Grid className={classes.container} container spacing={2}>
        {DUMP_BOOKS.map((book) => (
          <Grid item xs={4} sm={4} lg={3}> {/* 3 columns for small screen, 4 colums for big screen */}
            <BookItem {...book} />
          </Grid>
        ))}
      </Grid>
      <div className={classes['pagination-container']} >
        <Pagination className={classes['pagination']} count={10} color="secondary" />
      </div>
    </>
  )
}

export default BooksList
