import React, { useRef, useState } from "react";
import NotesForm from "./NotesForm/NotesForm";
import Notes from "./Notes/Notes";
import "./Content.scss";

const Content = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");
  const inputRef = useRef(null);

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

  return (
    <section className="contents">
      <div className="notes">
        <ul className="notes__list">
          {notes.map((item, index) => (
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
    </section>
  );
};

export default Content;
