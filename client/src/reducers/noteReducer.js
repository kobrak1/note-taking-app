import { createSlice } from '@reduxjs/toolkit'

// slice reducers
const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    // add new notes
    createNote(state, action) {
      const content = action.payload
      state.push(content)
    },
    // toggle between 'important' and 'not imporant' buttons
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