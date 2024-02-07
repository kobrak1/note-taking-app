const Notes = ({item}) => {
  return (
    <li>
      {item.content} id:{item.id} important:{item.important ? "true" : "false"}
    </li>
  );
};

export default Notes;
