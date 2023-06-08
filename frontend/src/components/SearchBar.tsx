import React, { useEffect, useState } from 'react'
import { OutlinedInput, InputAdornment } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import classes from './SearchBar.module.css'

type SearchBarProps = {
  searchText: string;
  onSearchChange: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [text, setText] = useState<string>('')

  // Update the local state relevant to the outside when it changed.
  useEffect(() => {
    // console.log("Update the local state from the outside")
    setText(props.searchText)
  }, [props.searchText])

  // Deboucing typing
  useEffect(() => {
    // console.log("Handling side effect for deboucing.")
    const identifier = setTimeout(() => {
      // console.log("Submit new search text to the parent component.")
      if (text !== props.searchText) { // just a double-check
        props.onSearchChange(text)
      }
    }, 2000)

    return () => {
      // console.log("CLEANUP")
      clearTimeout(identifier)
    }
  }, [text])

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const clearHandler = () => {
    if (props.searchText != '') { // just a double-check
      props.onSearchChange('')
    }
  }

  return (
    <div className={classes.container}>
      <OutlinedInput
        className={classes.searchbar}
        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
        endAdornment={<InputAdornment position="end" onClick={clearHandler} className={classes['btn-clear']}><CloseIcon /></InputAdornment>}
        placeholder="Search..."
        value={text}
        onChange={changeHandler}
      />
    </div>
  )
}

export default SearchBar
