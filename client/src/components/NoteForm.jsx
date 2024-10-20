import React, { useRef, useState } from "react";
import { fetchNotes } from "../services/noteService";

const NoteForm = () => {
  const [notes, setNotes] = useState([]);

  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchedNotes = await fetchNotes();
    setNotes(fetchedNotes);
    console.log("Notes:", notes);
  };

  return (
    <div className="flex justify-center align-center bg-secondary">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start align-start w-[500px]"
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g: Homework..."
        />
        <input
          id="note"
          name="note"
          type="textarea"
          placeholder="e.g: Write something here..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NoteForm;
