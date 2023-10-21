import React from "react";
import './Form.css';
import Button from "../Button/Button";

const Form = ({currentNote, setCurrentNote, addNote}) => {
  return (
    <form action="#">
      <textarea
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}
        placeholder="Add note..."
      ></textarea>
      <Button className='formButton' text={'Add'} onClick={() => addNote(currentNote)} />
    </form>
  );
};

export default Form;
