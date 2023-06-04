import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button';

import classes from './NewBookForm.module.css'

const NewBookForm = () => {
  return (
    <div className={classes.container}>
      <h1>Add a New Book</h1>
      <form className={classes.form} action="#">
        <TextField
          fullWidth
          required
          id="title"
          label="Title"
        />
        <TextField
          fullWidth
          required
          id="price"
          label="Price"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          fullWidth
          required
          id="image"
          label="Image"
        />
        <TextField
          fullWidth
          id="authors"
          label="Authors"
        />
        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
        />
        <div className={classes['button-group']}>
          <Button variant="contained" className={classes['btn-submit']} type="submit">Save</Button>
        </div>
      </form>
    </div>
  )
}

export default NewBookForm
