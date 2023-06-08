import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { Book } from '../util/types';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import classes from './BookDetail.module.css'



function BookDetailPage() {
  const navigate = useNavigate()

  const book: Book | null = useSelector<RootState, Book | null>(({ book }) => book.chosenBookForDetail)

  useEffect(() => {
    if (!!!book) {
      navigate('/')
    }
  }, [])

  /* React Router need a little time to navigate. This line to prevent from unexpected errors. */
  if (!!!book) { return <div></div> }

  return (
    <div style={{ minHeight: 'calc(100vh - 46px)' }}> {/* This magic number is measured through Inspect Tool */}
      <Grid className={classes.container} container rowSpacing={2}>
        <Grid className={classes['book-title']} item xs={12}>
          {book!.title}
        </Grid>
        <Grid className={classes['book-image']} item xs={12}>
          <img src={book!.image} alt='Book Image' />
        </Grid>
        <Grid className={classes.label} item xs={4}>
          Price:
        </Grid>
        <Grid className={classes['book-price']} item xs={8}>
          ${book!.price}
        </Grid>
        <Grid className={classes.label} item xs={4}>
          Authors:
        </Grid>
        <Grid className={classes['book-authors']} item xs={8}>
          {book!.authors.join(', ')}
        </Grid>
        <Grid className={classes.label} item xs={4}>
          Description:
        </Grid>
        <Grid className={classes['book-description']} item xs={8}>
          {book!.description}
        </Grid>
      </Grid>
    </div>
  )
}

export default BookDetailPage
