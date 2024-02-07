const NotesForm = ({handleSubmit, newNote, setNewNote, inputRef}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        ref={inputRef} // assign the ref to the input field
        autoFocus // to focus on input field when the component mounts
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default NotesForm;