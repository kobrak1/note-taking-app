import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/noteService'

// slice reducers
const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    // add new notes
    createNote(state, action) {
      state.push(action.payload)
    },
    // toggle between 'important' and 'not imporant' buttons
    toggleImportanceOf(state, action) {
      return state.map(note =>
        note.id !== action.payload
          ? note
          : {...note, important: !note.important}
      )
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

// get all notes from the db
export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

// create a note and post it to the db
export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer