import React from "react";
import './Note.css'

const Note = ({ notes, deleteNote }) => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString();
  return (
    <ul className="note-list">
      {notes.map((e, index) => (
        <li className="note" key={index} style={{ listStyleType: "none" }}>
          <div>
            <span>
              <div className="title">
                <p><b>Title</b></p>
                <p>{formattedDate}</p>
              </div>
              <p>{e.content}</p>
            </span>
            <button onClick={() => deleteNote(e.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Note;
