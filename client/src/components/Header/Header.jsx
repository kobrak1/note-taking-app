import React, { useState } from "react";

const Header = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('');

  // the function that handle submits
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log('button clicked', e.target);
    setNewNote('')
  }

  return (
    <section>
      <ul className="notes">
        {notes.map((item, index) => (
          <li key={index}> {item.content} </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">Save</button>
      </form>
    </section>
  );
};

export default Header;
