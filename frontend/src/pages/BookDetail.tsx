import Grid from '@mui/material/Grid';

import classes from './BookDetail.module.css'

function BookDetailPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 46px)' }}> {/* This magic number is measured through Inspect Tool */}
      <Grid className={classes.container} container rowSpacing={2}>
        <Grid className={classes['book-title']} item xs={12}>
          The store of the sea
        </Grid>
        <Grid className={classes['book-image']} item xs={12}>
          <img src="book.png" alt='Book Image' />
        </Grid>
        <Grid className={classes.label} item xs={4}>
          Price:
        </Grid>
        <Grid className={classes['book-price']} item xs={8}>
          $100
        </Grid>
        <Grid className={classes.label} item xs={4}>
          Authors:
        </Grid>
        <Grid className={classes['book-authors']} item xs={8}>
          Nhuan Do-Ngoc, Ngoc-Nhuan Do
        </Grid>
        <Grid className={classes.label} item xs={4}>
          Description:
        </Grid>
        <Grid className={classes['book-description']} item xs={8}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        </Grid>
      </Grid>
    </div>
  )
}

export default BookDetailPage
