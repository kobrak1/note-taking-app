import { useState, useRef } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');
  const inputRef = useRef(null);

    // add new note
    const addNote = (e) => {
      e.preventDefault();
      createNote({
          content: newNote,
          important: true,
      }) 
      setNewNote('')
    }

    return (
      <div>
        <h2>Create a new note</h2>
  
        <form onSubmit={addNote}>
          <input
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            ref={inputRef}
          />
          <button type="submit">save</button>
        </form>
      </div>
    )
  }

  export default NoteForm