import React, { Fragment } from "react";
import Header from "./components/Header/Header";

function App() {
  const notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true,
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true,
    },
  ];

  return (
    <Fragment>
      {/*This place is the main headquarter*/}
      <h2>Note Taking App</h2>
      <Header notes={notes} />
    </Fragment>
  );
}

export default App;
