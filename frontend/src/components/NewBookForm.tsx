import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import type { Book } from '../types';
import { submitNewBook, submitUpdatedBook } from '../store/book-actions';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import validator from 'validator';

import classes from './NewBookForm.module.css'

type NewBookFormProps = {
  editingBook?: Book;
}

const NewBookForm: React.FC<NewBookFormProps> = (props) => {
  const titleInputRef = useRef<HTMLInputElement>(null)
  const priceInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const authorsInputRef = useRef<HTMLInputElement>(null)
  const descriptionInputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState<string>('')
  const [titleError, setTitleError] = useState<string>('')
  const [priceError, setPriceError] = useState<string>('')
  const [imageError, setImageError] = useState<string>('')
  const [authorsError, setAuthorsError] = useState<string>('')
  const [descriptionError, setDescriptionError] = useState<string>('')

  const dispatch: AppDispatch = useDispatch()
  const isSubmitting = useSelector<RootState, boolean>(({ book }) => book.isSubmitting)

  useEffect(() => {
    if (!!props.editingBook) {
      titleInputRef.current!.value = props.editingBook!.title
      priceInputRef.current!.value = props.editingBook!.price.toString()
      imageInputRef.current!.value = props.editingBook!.image
      authorsInputRef.current!.value = props.editingBook!.authors.join(', ')
      descriptionInputRef.current!.value = props.editingBook!.description
    }
  }, [])

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    const enteredTitle = titleInputRef.current!.value
    const enteredPrice = priceInputRef.current!.value
    const enteredImage = imageInputRef.current!.value
    const enteredAuthors = authorsInputRef.current!.value
    const enteredDescription = descriptionInputRef.current!.value

    let hasError = false

    if (!validator.isLength(enteredTitle, { max: 150 })) {
      hasError = true
      setTitleError('Title is too long')
    } else {
      setTitleError('')
    }

    if (!validator.isFloat(enteredPrice, { min: 5.0 })) {
      hasError = true
      setPriceError('Price must be a number and at least $5')
    } else {
      setPriceError('')
    }

    if (!validator.isURL(enteredImage) && !validator.isBase64(enteredImage)) {
      hasError = true
      setImageError('Image must be an URL or a string of base-64 format')
    } else {
      setImageError('')
    }

    if (!hasError) {
      const bookData = {
        id: '',
        creator: '',
        title: enteredTitle,
        price: parseFloat(enteredPrice),
        image: enteredImage,
        authors: enteredAuthors.split(', '),
        description: enteredDescription
      }

      if (!props.editingBook) {
        dispatch(submitNewBook(bookData))
      } else {
        dispatch(submitUpdatedBook({ ...bookData, id: props.editingBook.id }))
      }
    }
  }

  return (
    <div className={classes.container}>
      <h1>{!!props.editingBook ? "Edit The Book" : "Add a New Book"}</h1>
      <form className={classes.form} action="#" onSubmit={submitHandler} data-testid={!!props.editingBook ? "edit-book form" : "new-book form"}>
        <TextField
          fullWidth
          required
          id="title"
          label="Title"
          inputRef={titleInputRef}
          error={!!titleError}
          helperText={titleError}
        />
        <TextField
          fullWidth
          required
          id="price"
          label="Price"
          type="number"
          inputProps={{ step: 0.01 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          inputRef={priceInputRef}
          error={!!priceError}
          helperText={priceError}
        />
        <TextField
          fullWidth
          required
          id="image"
          label="Image"
          inputRef={imageInputRef}
          error={!!imageError}
          helperText={imageError}
        />
        <TextField
          fullWidth
          id="authors"
          label="Authors"
          inputRef={authorsInputRef}
          error={!!authorsError}
          helperText={authorsError}
        />
        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
          inputRef={descriptionInputRef}
          error={!!descriptionError}
          helperText={descriptionError}
        />
        <div className={classes['button-group']}>
          <Button variant="contained" className={classes['btn-submit']} type="submit">Save</Button>
        </div>
      </form>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default NewBookForm
