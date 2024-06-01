import uuid4 from 'uuid4'
import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { content: 'reducer defines how redux store works', important: true, id: 1},
    { content: 'state of store can contain any data', important: false, id: 2}
  ]

// slice reducers
const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload
      state.push({
        content,
        important: false,
        id: uuid4()
      })
    },
    toggleImportanceOf(state, action) {
      return state.map(note =>
        note.id !== action.payload
          ? note
          : {...note, important: !note.important}
      )
    },
  }
})

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer