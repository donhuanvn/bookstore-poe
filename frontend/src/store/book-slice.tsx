import { createSlice } from "@reduxjs/toolkit";

const initialBookSlice = {
  loadedBooks: [], /* To store books loaded to display at homepage */
  total: 0 /* Total books in database */
}

const bookSlice = createSlice({
  name: 'book',
  initialState: initialBookSlice,
  reducers: {

  }
})

export const bookActions = bookSlice.actions
export default bookSlice.reducer
