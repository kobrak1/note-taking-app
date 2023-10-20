import React from "react";

const Form = ({currentNote, setCurrentNote, addNote}) => {
  return (
    <form action="#">
      <textarea
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}
        placeholder="Add note..."
      ></textarea>
      <input type="submit" value={"Add"} onClick={() => addNote(currentNote)} />
    </form>
  );
};

export default Form;
