import React, { useState } from "react";
import Form from "./components/Form/Form";
import Note from "./components/Note/Note";
import './App.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [noteId, setNoteId] = useState(1);

  // add function
  const addNote = (note) => {
    if (note) {
      setNotes([...notes, { id: noteId, content: note }]);
      setNoteId(noteId + 1);
      setCurrentNote("");
    } else {
      console.log("Add note");
      alert("Add note");
    }
  };

  // delete function
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <Form currentNote={currentNote} setCurrentNote={setCurrentNote} addNote={addNote} />
      <Note notes={notes} deleteNote={deleteNote} />
    </div>
  );
}

export default App;
