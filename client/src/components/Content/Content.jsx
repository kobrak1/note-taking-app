import React, { useRef, useState } from "react";
import NotesForm from "./NotesForm/NotesForm";
import Notes from "./Notes/Notes";
import "./Content.scss";

const Content = ({data}) => {
  const [notes, setNotes] = useState(data);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const inputRef = useRef(null);

  // the variable that keeps the notes value in condition of showAll state
  const notesToShow = showAll
    ? notes
    : notes.filter((item) => item.important);

  // the function that handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("button clicked", e.target);

    // create a note object that holds the id, content and important status info
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    };

    // set new note to the notes state
    noteObject.content && setNotes([...notes, noteObject]);

    // clear the input field
    setNewNote("");

    //focus on input field right after save button clicked
    inputRef.current.focus();
  };

  // handle important notes
  const handleImportant = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="contents">
      <div className="notes">
        <ul className="notes__list">
          {notesToShow.map((item, index) => (
            <Notes key={index} item={item} />
          ))}
        </ul>
        <div className="notes__form">
          <NotesForm
            newNote={newNote}
            handleSubmit={handleSubmit}
            setNewNote={setNewNote}
            inputRef={inputRef}
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
