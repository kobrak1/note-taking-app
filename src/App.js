import React, { useState } from 'react'


function App() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState('')
  const [noteId, setNoteId] = useState(1)

  const addNote = (note) => {
    if(note) {
      setNotes([...notes, {id: noteId, content: note }])
      setNoteId(noteId + 1)
      setCurrentNote('')
    } else {
      console.log('Add note')
      alert('Add note')
    }
  }

  const deleteNote = (id) => {
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
  }

  return (
    <div className='App'>
      <form action="#">
        <input 
        type="text"
        value={currentNote}
        onChange={e => setCurrentNote(e.target.value)}
        placeholder='Add note...' />
        <input 
        type="submit"
        value={'Add'}
        onClick={() => addNote(currentNote)} />
      </form>
      <div>
        <ul>
          {notes.map((e, index) => <li 
            key={index} 
            style={{listStyleType:'none'}}>
              <div>
                <span>
                  {e.id}-{e.content}
                </span>
                <button onClick={() => deleteNote(e.id)}>Delete</button>
              </div>
            </li> )}
        </ul>
      </div>
    </div>
  )
}

export default App
