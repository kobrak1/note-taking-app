import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : 'not important'} </strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => {
    if(state.filterNote === 'ALL') {
      return state.notes
    }
    return state.filterNote === 'IMPORTANT'
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
  })

  console.log('notes:', notes)

  return (
    <ul>
      {notes.map(note => 
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      )}
    </ul>
  )
}

export default Notes