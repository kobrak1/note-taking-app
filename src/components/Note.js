import React from "react";

const Note = ({ notes, deleteNote }) => {
  return (
    <ul className="note-list">
      {notes.map((e, index) => (
        <li className="note" key={index} style={{ listStyleType: "circle" }}>
          <div>
            <span>{e.content}</span>
            <button onClick={() => deleteNote(e.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Note;
