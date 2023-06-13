import React from "react"

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';

import classes from './BookDetail.module.css'

import type { Book } from '../types';

type BookDetailProps = Book & {
  onManipulate?: (type: "edit" | "delete") => void;
  allowManipulate?: boolean;
}

const BookDetail: React.FC<BookDetailProps> = (props) => {
  // const { allowEdit, allowDelete } = props
  const allowEdit = true
  const allowDelete = true

  const onEditBtnHandler = () => {
    props.onManipulate && props.onManipulate('edit')
  }

  const onDeleteBtnHandler = () => {
    props.onManipulate && props.onManipulate('delete')
  }

  const showControlPanel = allowEdit || allowDelete
  const controlPanel =
    <Grid className={classes['control-panel']} item xs={12}>
      {allowEdit && <Button variant="contained" startIcon={<EditIcon />} onClick={onEditBtnHandler}>Edit</Button>}
      {allowDelete && <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onDeleteBtnHandler}>Delete</Button>}
    </Grid>

  return (
    <div style={{ minHeight: 'calc(100vh - 46px)' }}> {/* This magic number is measured through Inspect Tool */}
      <Grid className={classes.container} container rowSpacing={2}>
        <Grid className={classes['book-title']} item xs={12}>
          {props.title}
        </Grid>
        <Grid className={classes['book-image']} item xs={12}>
          <img aria-label="illustration image" src={props.image} alt='Book Image' />
        </Grid>
        {showControlPanel && controlPanel}
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
