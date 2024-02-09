const Notes = ({ item, toggleImportance, dataLoaded }) => {
  const label = item.important ? "Important" : "Not Important";

  return (
    <li>
      {item.content}
      <button disabled={!dataLoaded} onClick={toggleImportance}>
        {label}
      </button>
    </li>
  );
};

export default Notes;
