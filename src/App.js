import React, { useEffect, useState } from "react";
import Form from "./components/Form/Form";
import Note from "./components/Note/Note";
import "./App.css";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ThemeContext from "./context/context";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [noteId, setNoteId] = useState(1);
  const [theme, setTheme] = useState("light");

  //useEffect
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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

  const data = {
    theme,
    setTheme
  }

  return (
    <ThemeContext.Provider value={data}>
      <div className="App">
        <ThemeSwitcher />
        <Form
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          addNote={addNote}
        />
        <Note notes={notes} deleteNote={deleteNote} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
