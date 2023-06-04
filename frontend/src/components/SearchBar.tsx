import { OutlinedInput, InputAdornment } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import classes from './SearchBar.module.css'

function SearchBar() {
  return (
    <div className={classes.container}>
      <OutlinedInput
          className={classes.searchbar}
          startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
          endAdornment={<InputAdornment position="end"><CloseIcon /></InputAdornment>}
          placeholder="Search..."
        />
    </div>
  )
}

export default SearchBar
