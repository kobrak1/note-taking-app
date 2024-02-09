const Notes = ({item, toggleImportance}) => {
  const label = item.important
    ? 'Important'
    : 'Shit'

  return (
    <li>
      {item.content}
      <button onClick={toggleImportance}> {label} </button>
    </li>
  );
};

export default Notes;
