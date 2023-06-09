import React from "react"

import Grid from '@mui/material/Grid';

import classes from './BookDetail.module.css'

import type { Book } from '../types';

type BookDetailProps = Book

const BookDetail: React.FC<BookDetailProps> = (props) => {
  return (
    <div style={{ minHeight: 'calc(100vh - 46px)' }}> {/* This magic number is measured through Inspect Tool */}
      <Grid className={classes.container} container rowSpacing={2}>
        <Grid className={classes['book-title']} item xs={12}>
          {props.title}
        </Grid>
        <Grid className={classes['book-image']} item xs={12}>
          <img src={props.image} alt='Book Image' />
        </Grid>
        <Grid className={classes.label} item xs={4}>
          Price:
        </Grid>
        <Grid className={classes['book-price']} item xs={8}>
          ${props.price}
        </Grid>
        <Grid className={classes.label} item xs={4}>
          Authors:
        </Grid>
        <Grid className={classes['book-authors']} item xs={8}>
          {props.authors.join(', ')}
        </Grid>
        <Grid className={classes.label} item xs={4}>
          Description:
        </Grid>
        <Grid className={classes['book-description']} item xs={8}>
          {props.description}
        </Grid>
      </Grid>
    </div>

  )
}

export default BookDetail
