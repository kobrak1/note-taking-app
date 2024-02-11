import React, { useRef, useState } from "react";
import NotesForm from "./NotesForm/NotesForm";
import Notes from "./Notes/Notes";
import noteService from "../../services/services";
import "./Content.scss";

const Content = ({ data }) => {
  const [notes, setNotes] = useState(data);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const inputRef = useRef(null);

  // the variable that keeps the notes value in condition of showAll state
  const notesToShow = showAll ? notes : notes.filter((item) => item.important);

  // the function that handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("button clicked", e.target);

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    // POST request with fetch api
    fetch("http://localhost:3001/notes", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(noteObject.content && noteObject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error while posting data!");
        }
        return response.json();
      })
      .then(noteObject.content && setNotes([...notes, noteObject]))
      .then((data) => console.log("Response data:", data))
      .catch((error) => {
        console.error("Error:", error);
      });

    setNewNote("");

    //focus on input field right after save button clicked
    inputRef.current.focus();
  };

  // handle important notes
  const handleImportant = () => {
    setShowAll(!showAll);
  };

  // toggle importance of each note
  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((data) => setNotes(notes.map((n) => (n.id !== id ? n : data))))
      .catch((error) => {
        alert(`The note ${note.content} was already deleted from server`);
        setNotes(notes.filter((e) => e.id !== id));
      });
  };

  return (
    <section className="contents">
      <div className="notes">
        <ul className="notes__list">
          {notesToShow.map((item) => (
            <Notes
              key={item.id}
              item={item}
              toggleImportance={() => toggleImportance(item.id)}
              dataLoaded={notes.length > 0} // to check if the data fetched. If not the 'important' will be disabled
            />
          ))}
        </ul>
        <div className="notes__form">
          <NotesForm
            newNote={newNote}
            handleSubmit={handleSubmit}
            setNewNote={setNewNote}
            inputRef={inputRef} // to focus on the input field when the component rendered
          />
        </div>
      </div>
      <button onClick={handleImportant}>
        Show {showAll ? "Important" : "All"}
      </button>
    </section>
  );
};

export default Content;
